<template>
  <v-card>
    <v-card-title>
      Cadastrar extensão

      <v-spacer></v-spacer>

      <v-btn href="/painel/extracao" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Extrações
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-calendar-month" label="Data"></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          Horários
          <v-divider/>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-clock-outline" label="Hora"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="regiao" :items="regioes" label="Região"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Nome"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-btn  color="primary">
            <v-icon>mdi-plus</v-icon> Adicionar
          </v-btn>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          Quadro de Horários
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Horário</th>
                  <th class="text-left">Região</th>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Excluir</th>
                </tr>
              </thead>

            </template>
          </v-simple-table>
        </v-col>

      </v-row>
    </v-card-text>

    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn color="primary" >
        <v-icon>mdi-content-save-outline</v-icon> Salvar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    regioes: [],

    regiao: ''
  }),
  methods: {

  }
}
</script>
