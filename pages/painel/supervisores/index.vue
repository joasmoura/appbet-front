<template>
  <v-card>
    <v-card-title>Supervisores

      <v-spacer />

      <v-btn to="/painel/supervisores/form" color="white">
        <v-icon>mdi-plus</v-icon> Supervisor
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>

        <v-col cols="12" sm="6" md="3">
          <v-text-field prepend-icon="mdi-tag" label="Nome"></v-text-field>
        </v-col>

         <v-col cols="12" sm="6" md="2">
            <v-combobox v-model="status" :items="lista_status" label="Status"></v-combobox>
          </v-col>

         <v-col cols="12" sm="6" md="2">
            <v-combobox v-model="regiao" :items="regioes" label="Região"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="1">
            <v-btn v-on:click="pesquisar"><v-icon>mdi-magnify</v-icon> Filtrar</v-btn>
          </v-col>

      </v-row>

      <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Região</th>
                  <th class="text-left"></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="supervisor in supervisores" :key="supervisor.id">
                  <td>{{supervisor.name}}</td>
                  <td>{{supervisor.regiao_id}}</td>
                  <td>
                    <v-btn :to="`/painel/supervisores/${supervisor.id}`"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
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
    lista_status: [],
    regioes: [],
    supervisores: [],

    status: '',
    regiao: ''
  }),
  created () {
    this.getSupervisores()
  },
  methods: {
    getSupervisores () {
      this.$axios.get('/painel/usuarios/supervisores').then((r) => {
        if (r.data) {
          this.supervisores = r.data
        }
      })
    }
  }
}
</script>
