<template>
<div>
  <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
        Cadastrar supervisor

        <v-spacer></v-spacer>

        <v-btn to="/painel/supervisores" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Supervisores
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field prepend-icon="mdi-tag" solo v-model="nome" label="Nome"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-combobox v-model="gerente" solo :items="gerentes" label="Gerente"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-combobox v-model="regiao" solo :items="regioes" label="Região"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field  v-model="limite_credito" solo prepend-icon="mdi-cash" label="Limite de crédito"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="12">
            Usuário
            <v-divider/>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field  v-model="username" solo prepend-icon="mdi-account" label="Login"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field type="password" solo v-model="password" prepend-icon="mdi-key" label="Senha"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field  v-model="email" solo prepend-icon="mdi-email" label="Email"></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn type="submit" color="primary" >
          <v-icon>mdi-content-save-outline</v-icon> Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</div>
</template>
<script>
import Swall from 'sweetalert2'
export default {
  layout: 'painel',
  data: () => ({
    overlay: false,
    regioes: [],
    gerentes: [],

    id: '',
    nome: '',
    perfil: 'supervisor',
    regiao: '',
    gerente: '',
    limite_credito: '',
    username: '',
    email: '',
    password: ''
  }),
  created () {
    this.getRegioes()
    this.getGerentes()

    const idGerente = this.$route.params.form
    if (idGerente !== 'form') {
      this.id = idGerente
      this.getSupervisor()
    }
  },
  methods: {
    async getSupervisor () {
      await this.$axios.get(`/painel/usuarios/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          const usuario = r.data.usuario

          this.nome = usuario.name

          const regiao = this.regioes.find(re => parseInt(re.value) === parseInt(usuario.regiao_id))
          this.regiao = {
            value: regiao.value,
            text: regiao.text
          }

          const gerente = this.gerentes.find(re => parseInt(re.value) === parseInt(usuario.gerente_id))
          this.gerente = {
            value: gerente.value,
            text: gerente.text
          }

          this.limite_credito = usuario.limite_credito
          this.username = usuario.username
          this.email = usuario.email
        }
      })
    },
    async getRegioes () {
      await this.$axios.get('/painel/regioes/select').then((r) => {
        if (r.data) {
          const regioes = r.data
          this.regioes = regioes.map((reg) => {
            return {
              value: reg.id,
              text: reg.nome
            }
          })
        }
      })
    },
    async getGerentes () {
      await this.$axios.get('/painel/usuarios/gerentes_select').then((r) => {
        if (r.data) {
          const gerentes = r.data
          this.gerentes = gerentes.map((reg) => {
            return {
              value: reg.id,
              text: reg.name
            }
          })
        }
      })
    },

    salvar () {
      if (this.id) {
        this.atualizar()
      } else {
        this.criar()
      }
    },
    criar () {
      this.overlay = true
      this.$axios.post('/painel/usuarios', {
        nome: this.nome,
        perfil: this.perfil,
        regiao: this.regiao.value,
        gerente_id: this.gerente.value,
        limite_credito: this.limite_credito,
        username: this.username,
        password: this.password,
        email: this.email
      }).then(
        (r) => {
          if (r.data.status) {
            this.$router.push('/painel/supervisores')
            Swall.fire({
              icon: 'success',
              title: 'Sepervisor cadastrado com sucesso'
            })
          }
          this.overlay = false
        }
      )
    },
    atualizar () {
      this.overlay = true
      this.$axios.put(`/painel/usuarios/${this.id}`, {
        nome: this.nome,
        gerente_id: this.gerente.value,
        perfil: this.perfil,
        regiao: this.regiao.value,
        limite_credito: this.limite_credito,
        username: this.username,
        password: this.password,
        email: this.email
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Dados do supervisor atualizados com sucesso'
            })
          } else {
            Swall.fire({
              icon: 'error',
              title: 'Não foi possível atualizar'
            })
          }
          this.overlay = false
        }
      )
    }
  }
}
</script>
