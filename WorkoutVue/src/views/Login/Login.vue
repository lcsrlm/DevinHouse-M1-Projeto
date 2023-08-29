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
                                <v-form v-model="form" @submit.prevent="login">
                                    <v-text-field v-model="email" label="Email" outlined dense></v-text-field>
                                    <v-text-field v-model="password" label="Password" type="password" outlined
                                        dense></v-text-field>
                                    <v-btn color="primary" block @click="login">Login</v-btn>
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
export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
                this.$router.push('/home')
        }
    }
}
</script>
  
  