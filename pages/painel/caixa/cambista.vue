<template>
  <v-card>
    <v-card-title>
      Caixa cambista

      <v-spacer />

    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">

        </v-col>
      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Cambista</th>
              <th class="text-left">Saldo Anterior</th>
              <th class="text-left">Entradas</th>
              <th class="text-left">Saídas</th>
              <th class="text-left">Créditos</th>
              <th class="text-left">Comissão cambista</th>
              <th class="text-left">Débitos</th>
              <th class="text-left">Saldo</th>
              <th class="text-left">Ação</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cambista in cambistas" :key="cambista.id">
              <td>{{cambista.name}}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <v-btn color="primary" small>
                  Creditar
                </v-btn>

                <v-btn color="primary red" small>
                  Debitar
                </v-btn>
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
  data () {
    return {
      cambistas: []
    }
  },
  created () {
    this.getCaixa()
  },
  methods: {
    async getCaixa () {
      await this.$axios.get('/painel/caixa/caixa_cambistas').then((r) => {
        if (r.data) {
          this.cambistas = r.data
        }
      })
    }
  }
}
</script>
