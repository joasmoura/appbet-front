<template>
  <v-card>
    <v-card-title>Gerentes

      <v-spacer />

      <v-btn to="/painel/gerentes/form" color="white">
        <v-icon>mdi-plus</v-icon> Gerente
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
                  <th class="text-left">Limite</th>
                  <th class="text-left"></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="gerente in gerentes" :key="gerente.id">
                  <td>{{gerente.name}}</td>
                  <td>{{gerente.regiao.nome}}</td>
                  <td>{{moeda(gerente.limite_credito)}}</td>
                  <td><v-btn :to="`/painel/gerentes/${gerente.id}`"><v-icon>mdi-square-edit-outline</v-icon></v-btn></td>
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
    lista_status: [],
    regioes: [],
    gerentes: [],

    status: '',
    regiao: ''
  }),
  created () {
    this.getGerentes()
  },
  methods: {
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    },
    getGerentes () {
      this.$axios.get('/painel/usuarios/gerentes').then((r) => {
        if (r.data) {
          this.gerentes = r.data
        }
      })
    }
  }
}
</script>
