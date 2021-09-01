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
       {{(id ? 'Editar Movimentação' : 'Cadastrar Movimentação')}}

        <v-spacer></v-spacer>

        <v-btn href="/painel/caixa/movimentacoes" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Movimentações
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="usuario" :items="cambistas" label="Cambista"></v-combobox>
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
</div>
</template>

<script>
import Swall from 'sweetalert2'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data: () => ({
    overlay: false,
    cambistas: [],
    tipos: [
      { value: '1', text: 'Crédito' },
      { value: '2', text: 'Retirada' }
    ],

    id: '',
    menu1: true,
    descricao: '',
    valor: '',
    usuario: '',
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
      this.overlay = true
      await this.$axios.post('/painel/movimentacao', {
        usuario: this.usuario.value,
        descricao: this.descricao,
        tipo: this.tipo.value,
        data: this.data,
        valor: this.valor
      }).then((r) => {
        Swall.fire({
          icon: 'success',
          title: 'Movimentação cadastrada com sucesso!'
        })

        this.overlay = false
        this.$router.push('/painel/caixa/movimentacoes')
      })
    },
    async atualizar () {
      this.overlay = true
      await this.$axios.put(`/painel/movimentacao/${this.id}`, {
        usuario: this.usuario.value,
        descricao: this.descricao,
        tipo: this.tipo.value,
        data: this.data,
        valor: this.valor
      }).then((r) => {
        Swall.fire({
          icon: 'success',
          title: 'Movimentação atualizada com sucesso!'
        })

        this.overlay = false
      })
    },
    async getMovimentacao () {
      this.overlay = true
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
          this.usuario = {
            value: movimentacao.usuario.id,
            text: movimentacao.usuario.name
          }
        }
        this.overlay = false
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
