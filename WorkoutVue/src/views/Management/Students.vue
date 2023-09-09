<template>
    <v-main>
        <v-container fluid>
            <v-row justify="center" align="center" style="height: 50vh;">
                <v-col cols="12" md="8">
                    <v-card elevation="3">
                        <v-card-title class="pa-5" align="center">Gerenciamento de alunos</v-card-title>
                        <v-card-text>
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
                                    <tr v-for="(aluno, id) in alunos" :key="id">
                                        <td>{{ aluno.name }}</td>
                                        <td class="text-center" style="display: flex; justify-content: space-evenly;">
                                            <router-link to="/posts/visualizar"><v-btn>Ver
                                                    detalhes</v-btn></router-link>
                                            <v-btn>Deletar</v-btn>
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
            alunos: []
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
            } catch (error) {
                console.error('Erro ao buscar alunos:', error)
            }
        }
    }
}
</script>