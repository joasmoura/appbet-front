<template>
  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
        Cadastrar comissão

        <v-spacer></v-spacer>

        <v-btn to="/painel/comissoes" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Comissões
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="nome" prepend-icon="mdi-tag" label="Nome"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-combobox v-model="regiao" :items="regioes" label="Região"></v-combobox>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            Loteria
            <v-spacer />
          </v-col>

          <v-col cols="12" sm="6" md="6">
            <v-text-field v-model="valor" label="Bicho"></v-text-field>
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
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    regioes: [],

    id: '',
    nome: '',
    regiao: '',
    valor: ''
  }),
  created () {
    this.getRegioes()

    const idComissao = this.$route.params.form
    if (idComissao !== 'form') {
      this.id = idComissao
      this.getComissao()
    }
  },
  methods: {
    async getComissao () {
      await this.$axios.get(`/painel/comissoes/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          const comissao = r.data.comissao

          this.nome = comissao.nome

          const regiao = this.regioes.find(re => re.value === comissao.regiao_id)
          this.regiao = {
            value: regiao.value,
            text: regiao.text
          }
          this.valor = comissao.valor
        }
      })
    },
    async getRegioes () {
      await this.$axios.get('/painel/regioes').then((r) => {
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
    salvar () {
      if (this.id) {
        this.atualizar()
      } else {
        this.criar()
      }
    },

    criar () {
      this.$axios.post('/painel/comissoes', {
        nome: this.nome,
        regiao: (this.regiao ? this.regiao.value : null),
        valor: this.valor
      }).then(
        (r) => {
          if (r.data.status) {
            this.$router.push('/painel/comissoes')
            alert('Salvo com sucesso')
          }
        }
      )
    },
    atualizar () {
      this.$axios.put(`/painel/comissoes/${this.id}`, {
        nome: this.nome,
        regiao: (this.regiao ? this.regiao.value : null),
        valor: this.valor
      }).then(
        (r) => {
          if (r.data.status) {
            alert('Atualizado com sucesso')
          } else {
            alert('Não foi possível atualizar')
          }
        }
      )
    }
  }
}
</script>
