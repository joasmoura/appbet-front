<template>
  <v-card>
    <v-card-title>Movimentações Financeiras

      <v-spacer />

    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="beneficiario" :items="beneficiarios" label="Beneficiário"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="1">
          <v-combobox v-model="tipo" :items="tipos" label="Tipo"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="gerente" :items="gerentes" label="Gerente"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-combobox v-model="cambista" :items="cambistas" label="Cambista"></v-combobox>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field label="Período"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="2">
          <v-text-field label="Até"></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="1">
          <v-btn v-on:click="pesquisar"><v-icon>mdi-magnify</v-icon></v-btn>
        </v-col>

      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Data Registro</th>
              <th class="text-left">Data</th>
              <th class="text-left">Nome</th>
              <th class="text-left">Descrição</th>
              <th class="text-left">Tipo</th>
              <th class="text-left">Valor</th>
              <th class="text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>25/07/2021</td>
              <td>25/07/2021</td>
              <td>Nome</td>
              <td>Descrição</td>
              <td>Débito</td>
              <td>10,00</td>
              <td>
                <v-btn to="/painel/caixa/movimentacoes/form">
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                </v-btn>
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
    beneficiarios: [
      { value: '1', text: 'Cambista' },
      { value: '2', text: 'Gerente' },
      { value: '3', text: 'Supervisor' }
    ],
    tipos: [
      { value: '1', text: 'Crédito' },
      { value: '2', text: 'Débito' }
    ],
    gerentes: [],
    cambistas: [],

    beneficiario: '',
    tipo: '',
    gerente: '',
    cambista: ''
  }),
  method: {
    pesquisar () {

    }
  }
}
</script>
