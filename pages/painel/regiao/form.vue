<template>
<v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
        Cadastrar extensão

        <v-spacer></v-spacer>

        <v-btn to="/painel/regiao" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Regiões
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="nome" label="Nome"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn color="primary" type="submit"><v-icon>mdi-save</v-icon> Salvar</v-btn>
      </v-card-actions>

    </v-card>
</v-form>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    nome: ''
  }),
  methods: {
    salvar () {
      this.$axios.post('/painel/regioes', {
        nome: this.nome
      }).then(
        (r) => {
          if (r.status) {
            this.$router.push('/painel/regiao')
            alert('Salvo com sucesso')
          }
        }
      )
    }
  }
}
</script>
