<template>
  <v-card>
    <v-card-title>
      Extrações
      <v-spacer />

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
                      color="success"
                      v-model="extracao.status"
                      hide-details
                      @change="(() => {
                        extracao.status = (extracao.status === 1 ? null : 1)
                        setaStatus(extracao.id)
                      })"
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
    extracoes: [],

    pagination: {
      current: 1,
      total: 0
    }
  }),
  created () {
    this.verificaPerfil([])
    this.getExtracoes()
  },
  methods: {
    verificaPerfil (perfil) {
      perfil.push('administrador')
      return perfil.includes(this.$auth.user.perfil) ? true : this.$router.push('/painel')
    },
    async setaStatus (id) {
      await this.$axios.get(`/painel/extracoes/setar_status/${id}`)
    },
    informarResultado (id) {
      this.$router.push(`/painel/extracao/resultado/${id}`)
    },
    getExtracoes () {
      this.$axios.get(`/painel/extracoes?page=${this.pagination.current}`).then((r) => {
        const extracoes = r.data
        if (extracoes) {
          this.extracoes = extracoes.data
          this.pagination.current = extracoes.current_page
          this.pagination.total = extracoes.last_page
        }
      })
    },
    onPageChange () {
      this.getExtracoes()
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
