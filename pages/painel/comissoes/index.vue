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
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    comissoes: []
  }),
  created () {
    this.getComissoes()
  },
  methods: {
    async getComissoes () {
      await this.$axios.get('/painel/comissoes').then((r) => {
        if (r.data) {
          this.comissoes = r.data
        }
      })
    }
  }
}
</script>
