<template>
  <v-card>
    <v-card-title>
      Comissões

      <v-spacer></v-spacer>

      <v-btn to="/painel/comissoes/form" color="white">
        <v-icon>mdi-plus</v-icon> Comissão
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="comissao in comissoes" :key="comissao.id">
              <td>{{comissao.nome}}</td>
              <td>
                <v-btn :to="`/painel/comissoes/${comissao.id}`"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
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
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    comissoes: [],

    pagination: {
      current: 1,
      total: 0
    }
  }),
  created () {
    this.getComissoes()
  },
  methods: {
    async getComissoes () {
      await this.$axios.get(`/painel/comissoes?page=${this.pagination.current}`).then((r) => {
        const comissoes = r.data
        if (comissoes) {
          this.comissoes = comissoes.data
          this.pagination.current = comissoes.current_page
          this.pagination.total = comissoes.last_page
        }
      })
    },
    onPageChange () {
      this.getComissoes()
    }
  }
}
</script>
