<template>
  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>Cambistas

        <v-spacer />

        <v-btn to="/painel/cambistas/form" color="white">
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
                    <th class="text-left">Gerente</th>
                    <th class="text-left">Comissão</th>
                    <th class="text-left">Login</th>
                    <th class="text-left">Telefone</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="cambista in cambistas" :key="cambista.id">
                    <td>{{cambista.name}}</td>
                    <td>{{cambista.gerente_id}}</td>
                    <td>{{cambista.comissao_id}}</td>
                    <td>{{cambista.username}}</td>
                    <td>{{cambista.telefone}}</td>
                    <td>
                      <v-btn :to="`/painel/cambistas/${cambista.id}`"><v-icon>mdi-square-edit-outline</v-icon></v-btn>
                    </td>
                  </tr>
                </tbody>

              </template>
            </v-simple-table>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>

      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    cambistas: [],
    gerentes: [],
    lista_status: [],

    gerente: '',
    status: ''
  }),
  created () {
    this.getCambistas()
  },
  methods: {
    getCambistas () {
      this.$axios.get('/painel/usuarios/cambistas').then((r) => {
        if (r.data) {
          this.cambistas = r.data
        }
      })
    },
    pesquisar () {

    }
  }
}
</script>
