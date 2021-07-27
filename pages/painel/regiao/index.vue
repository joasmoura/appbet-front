<template>
  <v-card>
    <v-card-title>
      Regiões

      <v-spacer></v-spacer>

      <v-btn to="/painel/regiao/form" color="white">
        <v-icon>mdi-plus</v-icon> Região
      </v-btn>
    </v-card-title>

    <v-card-text>
        <v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left"></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="regiao in regioes" :key="regiao.id">
                  <td class="text-left">{{regiao.nome}}</td>
                  <td class="text-left">
                    <v-button><v-icon></v-icon></v-button>
                  </td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>
        </v-container>
    </v-card-text>

    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    regioes: []
  }),
  created () {
    this.getRegioes()
  },
  methods: {
    getRegioes () {
      this.$axios.get('/painel/regioes').then((r) => {
        if (r.data) {
          this.regioes = r.data
        }
      })
    }
  }
}
</script>
