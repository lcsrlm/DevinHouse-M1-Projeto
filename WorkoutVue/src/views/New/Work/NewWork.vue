<template>
    <v-layout>
    <v-container fluid>
        <v-row align="center" justify="center" style="height: 85vh">
            <v-col cols="15" sm="6" md="7">
                <v-card elevation="3">
                    <v-card-title class="text-h5">Gerenciamento de Exercícios</v-card-title>
                    <v-form @submit.prevent="cadastrarExercicio" ref="exercise-form">
                        <v-text-field v-model="novoExercicio.description" label="Nome do Exercício" outlined
                            :rules="[v => !!v || '']"></v-text-field>
                        <div class="text-center mt-2">
                            <v-btn type="submit" color="primary">Cadastrar</v-btn>
                        </div>
                    </v-form>
                    <v-list>
                        <v-list-item v-for="(exercicio, id) in exercicios" :key="id">
                            <v-list-item-content>
                                <v-list-item-title>{{ exercicio.description }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-layout>
</template>
  
<script>
import axios from 'axios'

export default {
    data() {
        return {
            novoExercicio: {
                description: '',
            },
            exercicios: [],
        }
    },
    mounted() {
        this.carregarExercicios()
    },
    methods: {
        carregarExercicios() {
            axios.get('http://localhost:3000/exercises')
                .then((response) => {
                    this.exercicios = response.data
                })
                .catch((error) => {
                    console.error('Erro ao carregar exercícios:', error)
                });
        },
        async cadastrarExercicio() {
            const { valid } = await this.$refs['exercise-form'].validate()

            if (!valid) {
                alert("Preencha o nome do exercício!")
                return
            }

            axios.post('http://localhost:3000/exercises', this.novoExercicio)
                .then(() => {
                    alert('Exercício cadastrado com sucesso!')
                    this.$refs['exercise-form'].reset()
                    this.carregarExercicios()
                })
                .catch((error) => {
                    console.error('Erro ao cadastrar exercício:', error)
                })
        }
    }
}
</script>
  