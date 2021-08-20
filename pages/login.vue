<template>
<v-form @submit.prevent="efetuarLogin">
    <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <v-card-title class="justify-center">Acessar Painel</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="12" md="12">
            <v-text-field  v-model="login.username" prepend-icon="mdi-accound" label="Usuário"></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="12">
            <v-text-field type="password" v-model="login.password" prepend-icon="mdi-accound" label="Senha"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions class="justify-center">
      <v-btn
        depressed
        color="primary"
        type="submit"
      >
        Acessar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-form>
</template>
<script>
import Swall from 'sweetalert2'

export default {
  layout: 'auth',
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async efetuarLogin () {
      this.loading = true
      await this.$auth.loginWith('local', {
        data: this.login
      }).then((r) => {
        // Swall.fire({
        //   title: r.data.msg,
        //   icon: 'warning'
        // })

        this.loading = false
      }
      ).catch((erro) => {
        console.log('Erro')
        console.log(erro)

        Swall.fire({
          title: 'Não foi possível efetuar o login! Verifique seus dados.',
          icon: 'warning',
          timer: 2000
        })

        this.loading = false
      })
    }
  }

}
</script>

<style>

</style>
