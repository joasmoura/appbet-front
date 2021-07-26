<template>
  <v-card>
    <v-card-title>
      Cadastrar comissão

      <v-spacer></v-spacer>

      <v-btn href="/painel/comissoes" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Comissões
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field prepend-icon="mdi-tag" label="Nome"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-combobox v-model="regiao" :items="regioes" label="Região"></v-combobox>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          Loteria
          <v-spacer />
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field label="Bicho"></v-text-field>
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
  })
}
</script>
