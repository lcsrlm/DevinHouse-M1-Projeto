<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
          <v-col cols="12" md="4">
            <v-card elevation="3">
              <v-card-title class="pa-5" align="center">
              </v-card-title>
              <v-card-text>
                <v-form ref="form-login">
                  <v-text-field 
                  label="Nome completo" 
                  v-model="name" 
                  type="text"
                  :rules="[v => !!v || 'O nome é obrigatório!']" 
                  outlined dense>
                </v-text-field>
                  <v-text-field 
                  label="Email" 
                  v-model="email" 
                  type="email" 
                  :rules="[v => !!v || 'O email é obrigatório!']"
                  outlined dense>
                </v-text-field>
                  <v-text-field 
                  label="Senha" 
                  v-model="password" 
                  type="password"
                  :rules="[v => !!v || 'A senha é obrigatória',
                 v => (v && v.length >= 8 && v.length <= 20) || 'A senha deve ter entre 8 e 20 caracteres']" 
                  outlined dense>
                </v-text-field>
                  <v-text-field 
                  label="Confirme a senha" 
                  type="password"
                  :rules="[v => v === password || 'As senhas não coincidem']" 
                  outlined dense>
                </v-text-field>
                  <v-select label="Tipo de plano"
                    v-model="type_plan"
                    :items="items"
                    outlined dense>
                  </v-select>
                  {{ type_plan }}
                  <v-btn color="primary" type="submit" block>Cadastre-se</v-btn>
                  <div class="text-center mt-2">
                    <router-link to="/">Já tem uma conta? Faça o login</router-link>
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
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      type_plan: 'Bronze',
      items: ['Bronze', 'Prata', 'Ouro']
    }
  }
}

</script>