<template>
  <v-card>
    <v-card-title>
      Cadastrar cambista

      <v-spacer></v-spacer>

      <v-btn href="/painel/cambistas" color="white">
        <v-icon>mdi-format-list-bulleted</v-icon> Cambistas
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-calendar-month" label="Nome"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="gerente" :items="gerentes" label="Gerente"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="supervisor" :items="supervisores" label="Supervisor"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="comissao" :items="comissoes" label="Tabela de comissão"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-phone" label="Telefone"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-account" label="Login"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-key" label="Senha"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field prepend-icon="mdi-cash" label="Limite de crédito"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-text-field label="Percentual do prêmio"></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          Regiões
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
    gerentes: [],
    supervisores: [],
    comissoes: [],

    gerente: '',
    supervisor: '',
    comissao: ''
  }),
  methods: {

  }
}
</script>
