<template>
  <v-card>
    <v-card-title>
      Cadastrar supervisor

      <v-spacer></v-spacer>

      <v-btn href="/painel/supervisores" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Supervisores
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field prepend-icon="mdi-tag" label="Nome"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-combobox v-model="gerente" :items="gerentes" label="Gerente"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="regiao" :items="regioes" label="Região"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-cash" label="Limite de crédito"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="12">
          Usuário
          <v-divider/>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field prepend-icon="mdi-account" label="Login"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field prepend-icon="mdi-key" label="Senha"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-text-field prepend-icon="mdi-email" label="Email"></v-text-field>
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
    gerentes: [],

    regiao: '',
    gerente: ''
  }),
  methods: {

  }
}
</script>
