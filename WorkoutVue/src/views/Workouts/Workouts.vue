<template>
    <v-main>
        <v-container fluid>
            <v-row justify="center" align="center" style="height: 10vh;">
                <v-col cols="12" md="8">
                    <v-card elevation="3">
                        <v-card-title class="pa-5" align="center">Treinos - {{ alunoId }} </v-card-title>
                        <v-card-text>
                            {{ workoutsData }}
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
            workoutsData: [],
        }
    },

    props: ['alunoId'],
   
    async mounted() {
    try {
        const response = await axios.get(`http://localhost:3000/workouts?student_id=${this.alunoId}`)
        this.workoutsData = response.data
    } catch (error) {
        console.error('Erro ao buscar treinos:', error)
    }
}

}
</script>