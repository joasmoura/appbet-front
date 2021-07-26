<template>
  <v-card>
    <v-card-title>Apostas</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>

            <v-col cols="12" sm="6" md="1">
              <v-text-field label="Código"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="cambista"
                :items="cambistas"
                label="Cambistas"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="gerente"
                :items="gerentes"
                label="Gerentes"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox v-model="resultado" :items="resultados" label="Resultado"></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Periodo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field label="à"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="1">
              <v-btn v-on:click="pesquisar"><v-icon>mdi-magnify</v-icon></v-btn>
            </v-col>

          </v-row>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Horário</th>
                  <th class="text-left">Cambista</th>
                  <th class="text-left">Extração</th>
                  <th class="text-left">Total</th>
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
    cambistas: [
      {
        text: 'Todos', value: ''
      },
      {
        text: 'Cambista 1', value: 1
      }
    ],
    gerentes: [
      {
        text: 'Todos', value: ''
      },
      {
        text: 'Cambista 1', value: 1
      },
      {
        text: 'Cambista 2', value: 2
      }
    ],
    resultados: [
      {
        text: 'Todos', value: ''
      },
      {
        text: 'Resultado 1', value: 1
      },
      {
        text: 'Resultado 2', value: 2
      }
    ],

    cambista: '',
    gerente: '',
    resultado: ''
  }),
  methods: {
    pesquisar () {
      console.log(this.cambista.value)
    }
  }
}
</script>
