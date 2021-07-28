<template>
  <v-card>
    <v-card-title>
      Extrações

      <v-spacer></v-spacer>

      <v-btn to="/painel/extracao/form" color="white">
        <v-icon>mdi-plus</v-icon> Extração
      </v-btn>
    </v-card-title>

    <v-card-text>
        <v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Data</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Ações</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="extracao in extracoes" :key="extracao.id">
                  <td>{{extracao.data}}</td>
                  <td>{{extracao.status}}</td>
                  <td>
                    <v-btn :to="`/painel/extracao/${extracao.id}`">
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
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
    extracoes: []
  }),
  created () {
    this.getExtracoes()
  },
  methods: {
    getExtracoes () {
      this.$axios.get('/painel/extracoes').then((r) => {
        if (r.data) {
          this.extracoes = r.data
        }
      })
    }

  }
}
</script>
