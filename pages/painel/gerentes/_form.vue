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
        Cadastrar gerente

        <v-spacer></v-spacer>

        <v-btn to="/painel/gerentes" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Gerentes
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field prepend-icon="mdi-tag" solo v-model="nome" label="Nome"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field prepend-icon="mdi-cash" solo v-model="comissao_faturamento" label="Comissão faturamento"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field prepend-icon="mdi-cash" solo v-model="comissao_lucro" label="Comissão lucro"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="2">
            <v-combobox
            v-model="regiao"
            solo
            item-value="value"
            item-text="text"
            :items="regioes"
            label="Região">

            </v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field prepend-icon="mdi-cash" solo v-model="limite_credito" label="Limite de crédito"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="12">
            Usuário
            <v-divider/>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field prepend-icon="mdi-account" solo v-model="username" label="Login"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field prepend-icon="mdi-key" solo type="password" v-model="password" label="Senha"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field prepend-icon="mdi-email" solo v-model="email" label="Email"></v-text-field>
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
    regioes: [],
    overlay: false,
    id: '',
    perfil: 'gerente',
    regiao: '',
    nome: '',
    comissao_faturamento: '',
    limite_credito: '',
    comissao_lucro: '',
    username: '',
    password: '',
    email: ''
  }),
  created () {
    this.verificaPerfil([])
    this.getRegioes()
    const idGerente = this.$route.params.form
    if (idGerente !== 'form') {
      this.id = idGerente
      this.getGerente()
    }
  },
  methods: {
    verificaPerfil (perfil) {
      perfil.push('administrador')
      return perfil.includes(this.$auth.user.perfil) ? true : this.$router.push('/painel')
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
    async getGerente () {
      await this.$axios.get(`/painel/usuarios/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          const usuario = r.data.usuario

          this.nome = usuario.name

          const regiao = this.regioes.find(re => parseInt(re.value) === parseInt(usuario.regiao_id))
          this.regiao = {
            value: regiao.value,
            text: regiao.text
          }
          this.comissao_faturamento = usuario.comissao_faturamento
          this.limite_credito = usuario.limite_credito
          this.comissao_lucro = usuario.comissao_lucro
          this.username = usuario.username
          this.email = usuario.email
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
        comissao_faturamento: this.comissao_faturamento,
        perfil: this.perfil,
        comissao_lucro: this.comissao_lucro,
        regiao: this.regiao.value,
        limite_credito: this.limite_credito,
        username: this.username,
        password: this.password,
        email: this.email
      }).then(
        (r) => {
          if (r.data.status) {
            this.$router.push('/painel/gerentes')
            Swall.fire({
              icon: 'success',
              title: 'Gerente cadastrado com sucesso'
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
        comissao_faturamento: this.comissao_faturamento,
        perfil: this.perfil,
        comissao_lucro: this.comissao_lucro,
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
              title: 'Dados do gerente atualizados com sucesso'
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
