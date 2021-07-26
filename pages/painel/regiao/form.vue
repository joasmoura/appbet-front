<template>
  <v-card>
    <v-card-title>
      Cadastrar extensão

      <v-spacer></v-spacer>

      <v-btn href="/painel/regiao" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Regiões
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Nome"></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary"><v-icon>mdi-save</v-icon> Salvar</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
  }),
  methods: {

  }
}
</script>
