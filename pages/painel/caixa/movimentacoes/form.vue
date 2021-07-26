<template>
  <v-card>
    <v-card-title>
      Editar Movimentação

      <v-spacer></v-spacer>

      <v-btn href="/painel/cambistas" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Movimentações
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="cambista" :items="cambistas" label="Cambista"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field  label="Descrição"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="tipo" :items="tipos" label="Tipo"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field  label="Data"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field  label="Valor"></v-text-field>
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
    cambistas: [],
    tipos: [
      { value: '1', text: 'Crédito' },
      { value: '2', text: 'Retirada' }
    ],

    cambista: '',
    tipo: ''
  })
}
</script>
