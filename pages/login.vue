<template>
<v-card
    class="mx-auto"
    max-width="400"
  >
    <v-card-text>
      <v-row>
         <v-col cols="12" sm="12" md="12">
            <v-text-field  v-model="login.username" prepend-icon="mdi-accound" label="Nome do Usuário"></v-text-field>
        </v-col>

         <v-col cols="12" sm="12" md="12">
            <v-text-field type="password" v-model="login.password" prepend-icon="mdi-accound" label="Senha"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn @click="efetuarLogin()" color="primary" >
        <v-icon>mdi-content-save-outline</v-icon> Salvar
      </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
  data () {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    efetuarLogin () {
      this.$auth.loginWith('local', {
        data: this.login
      }).then(
        () => {
          console.log('Sucesso')
        }
      ).catch((erro) => {
        console.log('Erro')
        console.log(erro)
      })
    }
  }

}
</script>

<style>

</style>
