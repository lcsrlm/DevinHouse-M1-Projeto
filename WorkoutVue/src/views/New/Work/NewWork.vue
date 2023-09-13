
<template>
    <v-main>
        <v-container fluid="">
            <v-row justify="center" align="center" style="height: 100vh;">
                <v-col cols="12" md="8">
                    <v-card elevation="3">
                        <v-card-title class="pa-5" align="center">Treinos</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent="cadastrarTreino" ref="form-cadastro">
                                <v-select :rules="[v => !!v || '']" v-model="selectedExercise" item-title="description"
                                    item-value="id" :items="exercises" label="Exercício" required></v-select>
                                <v-text-field :rules="[v => !!v || '']" v-model="repetitions"
                                    label="Quantidade de Repetições" type="number" min="1" required></v-text-field>
                                <v-text-field :rules="[v => !!v || '']" v-model="weight" label="Quantidade de Peso"
                                    type="number" required></v-text-field>
                                <v-text-field :rules="[v => !!v || '']" v-model="breakTime" label="Tempo de Pausa"
                                    type="time" required></v-text-field>
                                <v-textarea v-model="observations" label="Observações do Treino"></v-textarea>
                                <v-select :rules="[v => !!v || '']" v-model="selectedDay" :items="days"
                                    label="Dia da Semana"></v-select>
                                <v-btn type="submit" color="primary">Cadastrar Treino</v-btn>
                            </v-form>
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
            selectedExercise: null,
            exercises: [],
            repetitions: 1,
            weight: null,
            breakTime: null,
            observations: '',
            selectedDay: '',
            days: [{
                title: 'Segunda-Feira',
                value: 'segunda'
            },
            {
                title: 'Terça-Feira',
                value: 'terca'
            },
            {
                title: 'Quarta-Feira',
                value: 'quarta'
            },
            {
                title: 'Quinta-Feira',
                value: 'quinta'
            },
            {
                title: 'Sexta-Feira',
                value: 'sexta'
            },
            {
                title: 'Sábado',
                value: 'sabado'
            },
            {
                title: 'Domingo',
                value: 'domingo'
            }]
        }
    },
    props:
        ['alunoId']
    ,
    mounted() {
        this.buscarExercicios()
    },
    methods: {
        async buscarExercicios() {
            try {
                const response = await axios.get('http://localhost:3000/exercises')
                this.exercises = response.data
            } catch (error) {
                console.error('Erro ao buscar exercícios:', error)
            }
        },
        async cadastrarTreino() {
            try {
                const data = {
                    student_id: this.alunoId,
                    exercise_id: this.selectedExercise,
                    repetitions: this.repetitions,
                    weight: this.weight,
                    break_time: this.breakTime,
                    observations: this.observations,
                    day: this.selectedDay
                }
                await axios.post('http://localhost:3000/workouts', data)
                alert('Treino cadastrado com sucesso!')
                this.$refs['form-cadastro'].reset()
            } catch (error) {
                console.error('Erro ao cadastrar treino:', error)
            }
        }
    }
}
</script>
    