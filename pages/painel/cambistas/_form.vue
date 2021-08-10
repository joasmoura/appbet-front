<template>
  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
        Cadastrar cambista

        <v-spacer />

        <v-btn to="/painel/cambistas" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Cambistas
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="nome" solo prepend-icon="mdi-tag" label="Nome" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="gerente" solo :items="gerentes" label="Gerente" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="supervisor" solo :items="supervisores" label="Supervisor" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="comissao" solo :items="comissoes" label="Tabela de comissão" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="telefone" solo prepend-icon="mdi-phone" label="Telefone" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="username" solo prepend-icon="mdi-account" label="Login" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="password" solo type="password" prepend-icon="mdi-key" label="Senha" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="limite_credito" solo prepend-icon="mdi-cash" label="Limite de crédito" />
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="percentual_premio" solo label="Percentual do prêmio" />
          </v-col>

          <v-col cols="12" sm="12" md="12">
            Regiões

            <div class="d-flex">
              <v-checkbox
                v-for="regiao in regioes"
                :key="regiao.id"
                solo
                v-model="regiaoSelecionada"
                :label="regiao.nome"
                color="success"
                class="ml-5"
                :value="regiao.id"
                hide-details
              />
            </div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn type="submit" color="primary">
          <v-icon>mdi-content-save-outline</v-icon> Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import Swall from 'sweetalert2'
export default {
  layout: 'painel',
  data: () => ({
    gerentes: [],
    supervisores: [],
    comissoes: [],
    regioes: [],
    regiaoSelecionada: [],

    nome: '',
    perfil: 'cambista',
    telefone: '',
    username: '',
    password: '',
    limite_credito: '',
    gerente: '',
    supervisor: '',
    comissao: '',
    percentual_premio: ''
  }),
  mounted () {

  },
  created () {
    this.getRegioes()
    this.getGerentes()
    this.getSupervisores()
    this.getComissoes()

    const idGerente = this.$route.params.form
    if (idGerente !== 'form') {
      this.id = idGerente
      this.getCambista()
    }
  },
  methods: {
    async getCambista () {
      await this.$axios.get(`/painel/usuarios/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          const usuario = r.data.usuario

          this.nome = usuario.name
          if (usuario.gerente_id) {
            const gerente = this.gerentes.find(re => parseInt(re.value) === parseInt(usuario.gerente_id))
            if (gerente) {
              this.gerente = {
                value: gerente.value,
                text: gerente.text
              }
            }
          }

          if (usuario.supervisor_id) {
            const supervisor = this.supervisores.find(re => parseInt(re.value) === parseInt(usuario.supervisor_id))
            if (supervisor) {
              this.supervisor = {
                value: supervisor.value,
                text: supervisor.text
              }
            }
          }

          if (usuario.comissao_id) {
            const comissao = this.comissoes.find(re => parseInt(re.value) === parseInt(usuario.comissao_id))
            if (comissao) {
              this.comissao = {
                value: comissao.value,
                text: comissao.text
              }
            }
          }

          this.limite_credito = usuario.limite_credito
          this.username = usuario.username
          this.email = usuario.email
          this.telefone = usuario.telefone
          this.percentual_premio = usuario.percentual_premio

          if (usuario.regioes) {
            this.regiaoSelecionada = usuario.regioes.map((reg) => {
              return reg.id
            })
          }
        }
      })
    },
    async getRegioes () {
      await this.$axios.get('/painel/regioes/select').then((r) => {
        const regioes = r.data
        if (regioes) {
          this.regioes = regioes
        }
      })
    },
    async getGerentes () {
      await this.$axios.get('/painel/usuarios/gerentes_select').then((r) => {
        const gerentes = r.data
        if (gerentes) {
          this.gerentes = gerentes.map((reg) => {
            return {
              value: reg.id,
              text: reg.name
            }
          })
        }
      })
    },
    async getSupervisores () {
      await this.$axios.get('/painel/usuarios/supervisores_select').then((r) => {
        const supervisores = r.data
        if (supervisores) {
          this.supervisores = supervisores.map((reg) => {
            return {
              value: reg.id,
              text: reg.name
            }
          })
        }
      })
    },
    async getComissoes () {
      await this.$axios.get('/painel/comissoes/select').then((r) => {
        const comissoes = r.data
        if (comissoes) {
          this.comissoes = comissoes.map((reg) => {
            return {
              value: reg.id,
              text: reg.nome
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
      this.$axios.post('/painel/usuarios', {
        nome: this.nome,
        perfil: this.perfil,
        limite_credito: this.limite_credito,
        telefone: this.telefone,
        username: this.username,
        password: this.password,
        comissao_id: (this.comissao ? this.comissao.value : null),
        percentual_premio: this.percentual_premio,
        gerente_id: (this.gerente ? this.gerente.value : null),
        supervisor_id: (this.supervisor ? this.supervisor.value : null),
        regiaoSelecionada: this.regiaoSelecionada
      }).then(
        (r) => {
          if (r.data.status) {
            this.$router.push('/painel/cambistas')
            Swall.fire({
              icon: 'success',
              title: 'Cambista cadastrado com sucesso'
            })
          }
        }
      )
    },
    atualizar () {
      this.$axios.put(`/painel/usuarios/${this.id}`, {
        nome: this.nome,
        perfil: this.perfil,
        limite_credito: this.limite_credito,
        telefone: this.telefone,
        username: this.username,
        password: this.password,
        comissao_id: (this.comissao ? this.comissao.value : null),
        percentual_premio: this.percentual_premio,
        gerente_id: (this.gerente ? this.gerente.value : null),
        supervisor_id: (this.supervisor ? this.supervisor.value : null),
        regiaoSelecionada: this.regiaoSelecionada
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Dados do cambista cadastrado com sucesso'
            })
          } else {
            Swall.fire({
              icon: 'warning',
              title: 'Não foi possível atualizar'
            })
          }
        }
      )
    }
  }
}
</script>
