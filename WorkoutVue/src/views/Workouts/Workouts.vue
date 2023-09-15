<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center" align="center" style="height: 10vh;">
        <v-col cols="12" md="8">
          <v-card elevation="3">
            <v-card-title class="pa-5" align="center">Treinos - {{ alunoNome }}</v-card-title>
            <v-card-text>
              <v-row style="flex-direction: row-reverse;">
                <v-col cols="12" md="4">
                  <v-select v-model="selectedDay" :items="days" label="Selecione o Dia" outlined></v-select>
                </v-col>
              </v-row>
              <v-table fixed-header height="300px">
                <thead>
                  <tr>
                    <th class="text-center">Exercício</th>
                    <th class="text-center">Repetições</th>
                    <th class="text-center">Peso</th>
                    <th class="text-center">Tempo de Descanso</th>
                    <th class="text-center">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(workout, id) in selectedDayWorkouts" :key="id">
                    <td class="text-center">{{ workout.exercise_description }}</td>
                    <td class="text-center">{{ workout.repetitions }}</td>
                    <td class="text-center">{{ workout.weight }}Kg</td>
                    <td class="text-center">{{ workout.break_time }}</td>
                    <td class="text-center">{{ workout.observations }}</td>
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
      alunoNome: '',
      selectedDay: '',
      availableDays: [],
      workoutsData: [],
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

  props: ['alunoId'],

  computed: {
    selectedDayWorkouts() {
      return this.workoutsData.filter(workout => workout.day.toLowerCase() === this.selectedDay.toLowerCase())
    }
  },

  mounted() {
    this.buscarDados()
  },

  methods: {
    async buscarDados() {
      try {
        const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.alunoId}`)
        this.workoutsData = response.data.workouts
        this.alunoNome = this.pegarAlunoNome(response.data)

        this.availableDays = [...new Set(this.workoutsData.map(workout => workout.day))]

        if (this.availableDays.length > 0) {
          this.selectedDay = this.availableDays[0]
        }
      } catch (error) {
        console.error('Erro ao buscar treinos:', error)
      }
    },
    pegarAlunoNome(data) {
      const alunoNome = data.workouts.map(workout => workout.student_name)[0]
      return alunoNome || ''
    }
  }
}
</script>