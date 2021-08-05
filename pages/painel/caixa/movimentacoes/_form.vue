<template>
  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
       {{(id ? 'Editar Movimentação' : 'Cadastrar Movimentação')}}

        <v-spacer></v-spacer>

        <v-btn href="/painel/caixa/movimentacoes" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Movimentações
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="cambista" :items="cambistas" label="Cambista"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="descricao" label="Descrição"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="tipo" :items="tipos" label="Tipo"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-input>
              <template>
                <date-picker v-model="data" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="dd/MM/YYYY" />
              </template>
            </v-input>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="valor" label="Valor"></v-text-field>
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
import Swall from 'sweetalert2'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data: () => ({
    cambistas: [],
    tipos: [
      { value: '1', text: 'Crédito' },
      { value: '2', text: 'Retirada' }
    ],

    id: '',
    menu1: true,
    descricao: '',
    valor: '',
    cambista: '',
    tipo: '',
    data: new Date(),
    lang: {
      formatLocale: {
        firstDayOfWeek: 1
      },
      monthBeforeYear: false
    }
  }),
  created () {
    this.getCambistas()

    const idMovimentacao = this.$route.params.form
    if (idMovimentacao !== 'form') {
      this.id = idMovimentacao
      this.getMovimentacao()
    }
  },
  methods: {
    salvar () {
      if (this.id) {
        this.atualizar()
      } else {
        this.criar()
      }
    },
    async criar () {
      await this.$axios.post('/painel/movimentacao', {
        cambista: this.cambista.value,
        descricao: this.descricao,
        tipo: this.tipo.value,
        data: this.data,
        valor: this.valor
      }).then((r) => {
        Swall.fire({
          icon: 'success',
          title: 'Movimentação cadastrada com sucesso!'
        })

        this.$router.push('/painel/caixa/movimentacoes')
      })
    },
    async atualizar () {
      await this.$axios.put(`/painel/movimentacao/${this.id}`, {
        cambista: this.cambista.value,
        descricao: this.descricao,
        tipo: this.tipo.value,
        data: this.data,
        valor: this.valor
      }).then((r) => {
        Swall.fire({
          icon: 'success',
          title: 'Movimentação atualizada com sucesso!'
        })
      })
    },
    async getMovimentacao () {
      await this.$axios.get(`/painel/movimentacao/${this.id}/edit`).then((r) => {
        const movimentacao = r.data
        if (movimentacao) {
          this.descricao = movimentacao.descricao
          this.tipo = {
            value: (movimentacao.tipo === 'credito' ? 'credito' : 'debito'),
            text: (movimentacao.tipo === 'credito' ? 'Crédito' : 'Débito')
          }
          this.data = movimentacao.data
          this.valor = movimentacao.valor
          this.cambista = {
            value: movimentacao.cambista.id,
            text: movimentacao.cambista.name
          }
        }
      })
    },
    async getCambistas () {
      await this.$axios.get('/painel/usuarios/selectCambistas').then((r) => {
        const cambistas = r.data
        if (cambistas) {
          this.cambistas = cambistas.map((c) => {
            return {
              value: c.id,
              text: c.name
            }
          })
        }
      })
    }
  }
}
</script>
