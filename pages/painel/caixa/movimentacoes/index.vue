<template>
<div>
  <v-overlay :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>

  <v-card>
    <v-card-title>
      Movimentações Financeiras

      <v-spacer />

      <v-btn href="/painel/caixa/movimentacoes/form" color="white">
        <v-icon>mdi-plus</v-icon> Movimentação
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="beneficiario" :items="beneficiarios" label="Beneficiário"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="1">
          <v-combobox v-model="tipo" :items="tipos" label="Tipo"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="gerente" :items="gerentes" label="Gerente"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="cambista" :items="cambistas" label="Cambista"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field label="Período"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field label="Até"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="1">
          <v-btn><v-icon>mdi-magnify</v-icon></v-btn>
        </v-col>

      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Data Registro</th>
              <th class="text-left">Data</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Descrição</th>
              <th class="text-left">Tipo</th>
              <th class="text-left">Valor</th>
              <th class="text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id" :class="(movimentacao.tipo == 'retirada' ? 'red--text' : 'green--text')">
              <td>{{movimentacao.data_criacao}}</td>
              <td>{{movimentacao.data}}</td>
              <td>{{movimentacao.usuario.name}}</td>
              <td>{{movimentacao.descricao}}</td>
              <td>{{movimentacao.tipo}}</td>
              <td>{{moeda(movimentacao.valor)}}</td>
              <td>
                <v-btn :to="`/painel/caixa/movimentacoes/${movimentacao.id}`">
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>

        </template>
      </v-simple-table>

    </v-card-text>

    <v-card-actions>
      <div class="text-center">
        <v-pagination
          v-model="pagination.current"
          :length="pagination.total"
          total-visible="10"
          @input="onPageChange"
        ></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    overlay: false,
    beneficiarios: [
      { value: '1', text: 'Cambista' },
      { value: '2', text: 'Gerente' },
      { value: '3', text: 'Supervisor' }
    ],
    tipos: [
      { value: '1', text: 'Crédito' },
      { value: '2', text: 'Débito' }
    ],
    gerentes: [],
    cambistas: [],
    movimentacoes: [],

    beneficiario: '',
    tipo: '',
    gerente: '',
    cambista: '',
    pagination: {
      current: 1,
      total: 0
    }
  }),
  created () {
    this.getMovimentacoes()
  },
  methods: {
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    },
    async getMovimentacoes () {
      this.overlay = true
      await this.$axios.get(`/painel/movimentacao?page=${this.pagination.current}`).then((r) => {
        const movimentacoes = r.data
        if (movimentacoes) {
          this.movimentacoes = movimentacoes.data
          this.pagination.current = movimentacoes.current_page
          this.pagination.total = movimentacoes.last_page
        }
        this.overlay = false
      })
    },
    onPageChange () {
      this.getMovimentacoes()
    }
  }
}
</script>
