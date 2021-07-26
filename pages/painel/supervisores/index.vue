<template>
  <v-card>
    <v-card-title>Supervisores

      <v-spacer />

      <v-btn href="/painel/supervisores/form" color="white">
        <v-icon>mdi-plus</v-icon> Supervisor
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>

        <v-col cols="12" sm="6" md="3">
          <v-text-field label="Nome"></v-text-field>
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

    status: '',
    regiao: ''
  }),
  methods: {
    pesquisar () {

    }
  }
}
</script>
