<template>
    <v-app>
      <v-main>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-card class="pa-4" elevation="3">
                <v-card-title class="mb-3">Dashboard</v-card-title>
                <v-card-text>
                    <h3>Bem-vindo, {{ userName }}</h3>
                    <br>
                  <v-row>
                    <v-col cols="6">
                      <v-card class="pa-4" outlined>
                        <div class="text-center">
                          <div class="headline">{{ totalStudents }}</div>
                          <div>Alunos Cadastrados</div>
                          <br>
                          <router-link to="/new/student">
                            <v-btn>Adicionar</v-btn>
                          </router-link>
                        </div>
                      </v-card>
                    </v-col>
                    <v-col cols="6">
                      <v-card class="pa-4" outlined>
                        <div class="text-center">
                          <div class="headline">{{ totalExercises }}</div>
                          <div>Exercícios</div>
                          <br>
                          <router-link to="/new/work" >
                            <v-btn>Adicionar</v-btn>
                          </router-link>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        totalStudents: 0,
        totalExercises: 0,
        userName: ''
      };
    },
    mounted() {
      this.loadDashboardData();
      this.loadUserName();
    },
    methods: {
      async loadDashboardData() {
        try {
          const response = await axios.get('http://localhost:3000/dashboard');
          this.totalStudents = response.data.amount_students;
          this.totalExercises = response.data.amount_exercises;
        } catch (error) {
          console.error('Erro ao buscar dados do dashboard:', error);
        }
      },
      loadUserName() {
        const userInfo = JSON.parse(localStorage.getItem('user-info'));
        this.userName = userInfo.name;
      }
    }
  };
  </script>
  
  <style scoped>
  .headline {
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  