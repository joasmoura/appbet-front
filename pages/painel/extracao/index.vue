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
                  <td>
                    <v-checkbox
                      v-model="extracao.status"
                      color="success"
                      :value="extracao.status"
                      hide-details
                      @change="setaStatus(extracao.id)"
                    ></v-checkbox>
                  </td>
                  <td class="d-flex">
                    <v-btn class="align-self-center" small :to="`/painel/extracao/${extracao.id}`">
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>

                    <v-select
                      :items="montarSelect(extracao.horas)"
                      label="Informar resultado"
                      dense
                      solo
                      @change="informarResultado"
                    ></v-select>
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
    async setaStatus (id) {
      const extracao = this.extracoes.find(ex => ex.id === id)
      if (extracao) {
        extracao.status = (extracao.status ? 0 : 1)
      }
      await this.$axios.get(`/painel/extracoes/setar_status/${id}`)
    },
    informarResultado (id) {
      this.$router.push(`/painel/extracao/resultado/${id}`)
    },
    getExtracoes () {
      this.$axios.get('/painel/extracoes').then((r) => {
        if (r.data) {
          this.extracoes = r.data
        }
      })
    },
    montarSelect (hora) {
      let novaHora = []
      if (hora) {
        novaHora = hora.map((h) => {
          return {
            value: h.id,
            text: `${h.hora} (${h.nome})`
          }
        })
      }
      return novaHora
    }

  }
}
</script>
