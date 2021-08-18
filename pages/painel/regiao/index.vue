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
                    <v-btn :to="`/painel/regiao/${regiao.id}`"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                  </td>
                </tr>
              </tbody>

            </template>
          </v-simple-table>
        </v-container>
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
    regioes: [],
    pagination: {
      current: 1,
      total: 0
    }
  }),
  created () {
    this.getRegioes()
  },
  methods: {
    async getRegioes () {
      this.overlay = true
      await this.$axios.get(`/painel/regioes?page=${this.pagination.current}`).then((r) => {
        const regioes = r.data
        if (regioes) {
          this.regioes = regioes.data
          this.pagination.current = regioes.current_page
          this.pagination.total = regioes.last_page
        }
        this.overlay = false
      })
    },
    onPageChange () {
      this.getRegioes()
    }
  }
}
</script>
