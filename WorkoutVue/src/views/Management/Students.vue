
<template>
    <v-main>
        <v-container fluid>
            <v-row justify="center" align="center" style="height: 50vh;">
                <v-col cols="12" md="8">
                    <v-card elevation="3">
                        <div style="display: flex; flex-direction: row; justify-content: space-between;">
                            <v-card-title class="pa-5" align="left">Gerenciamento de alunos</v-card-title>
                            <router-link to="/new/student">
                                <v-btn style="margin-top: 20px; margin-right: 20px;" color="primary">Novo Aluno</v-btn>
                            </router-link>
                        </div>
                        <v-card-text>
                            <v-text-field v-model="nomeDoAluno" @input="filtraAlunos"
                                placeholder="Digite o nome do aluno"></v-text-field>
                            <v-table fixed-header height="300px">
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                            Nome
                                        </th>
                                        <th class="text-center">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(aluno, id) in alunosFiltrados" :key="id">
                                        <td>{{ aluno.name }}</td>
                                        <td class="text-center"
                                            style="display: flex; justify-content: space-evenly; margin-top: 15px;">
                                            <v-btn @click="montarTreino(aluno.id)" variant="tonal" color="light-blue-darken-4" size="small">Montar
                                                treino</v-btn>
                                            <v-btn @click="verTreino(aluno.id)" variant="tonal" color="green-accent-4" size="small">Ver
                                                Treinos</v-btn>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>
    
<script>
import axios from 'axios'

export default {
    data() {
        return {
            alunos: [],
            nomeDoAluno: '',
            alunosFiltrados: [],
            selectedAlunoId: null
        }
    },
    mounted() {
        this.buscarAlunos()
    },
    methods: {
        async buscarAlunos() {
            try {
                const response = await axios.get('http://localhost:3000/students')
                this.alunos = response.data.students
                this.alunosFiltrados = [...this.alunos]
            } catch (error) {
                console.error('Erro ao buscar alunos:', error)
            }
        },
        filtraAlunos() {
            const nomeDoAluno = this.nomeDoAluno.toLowerCase()
            this.alunosFiltrados = this.alunos.filter(aluno => aluno.name.toLowerCase().includes(nomeDoAluno)
            )
        }, montarTreino(alunoId) {
            this.selectedAlunoId = alunoId
            this.$router.push(`/new/work/${alunoId}`)
        },
        verTreino(alunoId) {
            this.selectedAlunoId = alunoId
            this.$router.push(`/workouts/${alunoId}`)
        }
    }
}
</script>
    