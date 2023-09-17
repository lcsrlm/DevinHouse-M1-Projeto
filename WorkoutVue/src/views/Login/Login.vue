<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
          <v-col cols="12" md="4">
            <v-card elevation="3">
              <v-card-title class="pa-5" align="center">
                WorkoutVue
              </v-card-title>
              <v-card-text>
                <v-form ref="form-login" v-model="form" @submit.prevent="login">
                  <v-text-field 
                  v-model="email" 
                  label="Email" 
                  :rules="[v => !!v || 'Preencha o email corretamente']"
                  outlined dense></v-text-field>
                  <v-text-field 
                  v-model="password" 
                  label="Password" 
                  type="password" 
                  :rules=" [v => !!v || 'Preencha a senha corretamente']"
                  outlined dense></v-text-field>
                  <v-btn color="primary" type="submit" block @submit="login">Login</v-btn>
                  <div class="text-center mt-2">
                    <router-link to="/new/user">Ainda não tem uma conta? Cadastre-se</router-link>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      const {valid} = await this.$refs['form-login'].validate()

      if(!valid){
        alert("Preencha todos os dados!")
        return
      }
      const loginData = {
        email: this.email,
        password: this.password
      }

      try {
        const response = await axios.post('http://localhost:3000/sessions', loginData)
        console.log('Resposta da API:', response.data)

        if(response.status == 200){
          localStorage.setItem("user-info", JSON.stringify(response.data))
          alert("Logado com sucesso!")
          this.$router.push('/home')
        }

      } catch (error){
        console.log('Erro ao fazer login:', error)
        alert('Erro ao fazer login. Verifique suas credenciais')
      }
      this.$refs['form-login'].reset()
    }
  }
}
</script>
  
  