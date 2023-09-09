<template>
  <v-layout>  
    <v-main>
      <v-container fluid>
        <v-row justify="center" align="center" style="height: 100vh;">
          <v-col cols="12" md="8">
            <v-card elevation="3">
              <v-card-title class="pa-5" align="center">Cadastro de Aluno</v-card-title>
              <v-card-text>
                <v-form ref="form-aluno" v-model="form" @submit.prevent="cadastrarAluno">
                  <v-text-field v-model="aluno.name" label="Nome Completo" :rules="[v => !!v || 'O nome é obrigatório!']"
                    outlined dense></v-text-field>
                  <v-text-field type="date" label="Data de Nascimento" v-model="aluno.date_birth" :max="new Date()" ></v-text-field>
                  <v-text-field v-model="aluno.email" label="E-mail" :rules="emailRules" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.contact" label="Contato" :rules="[v => !!v || 'O contato é obrigatório!']"
                    outlined dense></v-text-field>                  
                  <v-text-field v-model="cep" label="CEP" @input="consultarCEP" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.street" label="Logradouro" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.number" label="Número" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.neighborhood" label="Bairro" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.city" label="Cidade" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.province" label="Estado" outlined dense></v-text-field>
                  <v-text-field v-model="aluno.complement" label="Complemento" outlined dense></v-text-field>
                  <v-btn color="primary" type="submit" block>Cadastrar</v-btn>
                </v-form>
                <div class="text-center mt-2">
                  <router-link to="/home">Voltar para o Dashboard</router-link>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: null,
      aluno: {
        name: '',
        email: '',
        contact: '',
        date_birth: null,
        street: '',
        number: '',
        neighborhood: '',
        city: '',
        province: '',
        complement: '',
      },
      cep: '',
      emailRules: [
        (v) => !!v || 'O e-mail é obrigatório!',
        (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
    }
  },
  methods: {
    async cadastrarAluno() {
      const { valid } = await this.$refs['form-aluno'].validate()

      if (!valid) {
        return
      }

      const alunoData = {
        name: this.aluno.name,
        email: this.aluno.email,
        contact: this.aluno.contact,
        date_birth: this.aluno.date_birth,
        cep: this.cep,
        street: this.aluno.street,
        number: this.aluno.number,
        neighborhood: this.aluno.neighborhood,
        city: this.aluno.city,
        province: this.aluno.province,
        complement: this.aluno.complement,
      }

      try {
        const response = await axios.post('http://localhost:3000/students', alunoData)
        console.log('Resposta da API:', response.data)
        this.limparCampos()
        alert('Aluno cadastrado com sucesso!')
      } catch (error) {
        console.error('Erro ao cadastrar aluno:', error)
        alert('Erro ao cadastrar aluno. Verifique os dados.')
      }
    },
    consultarCEP() {
      if (this.cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
          .then((response) => {
            const data = response.data
            this.aluno.street = data.logradouro
            this.aluno.neighborhood = data.bairro
            this.aluno.city = data.localidade
            this.aluno.province = data.uf
          })
          .catch((error) => {
            console.error('Erro ao consultar CEP:', error)
          })
      }
    },
    limparCampos() {
      this.$refs['form-aluno'].reset()
    },
  }
}
</script>
  