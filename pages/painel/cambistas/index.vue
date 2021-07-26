<template>
  <v-card>
    <v-card-title>Cambistas

      <v-spacer />

      <v-btn href="/painel/cambistas/form" color="white">
        <v-icon>mdi-plus</v-icon> Cambista
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>

            <v-col cols="12" sm="6" md="3">
              <v-text-field label="Nome"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox v-model="gerente" :items="gerentes" label="Gerentes"></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox v-model="status" :items="lista_status" label="Status"></v-combobox>
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
                  <th class="text-left">Gerênte</th>
                  <th class="text-left">Comissão</th>
                  <th class="text-left">Login</th>
                  <th class="text-left">Telefone</th>
                  <th class="text-left"></th>
                </tr>
              </thead>

            </template>
          </v-simple-table>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    gerentes: [],
    lista_status: [],

    gerente: '',
    status: ''
  }),
  methods: {
    pesquisar () {

    }
  }
}
</script>
