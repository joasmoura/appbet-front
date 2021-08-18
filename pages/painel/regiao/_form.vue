<template>
<div>

  <v-overlay :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>

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
            <v-text-field v-model="nome" solo label="Nome"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn color="primary" type="submit"><v-icon>mdi-save</v-icon> Salvar</v-btn>
      </v-card-actions>

    </v-card>
</v-form>
</div>
</template>

<script>
import Swall from 'sweetalert2'
export default {
  layout: 'painel',
  data: () => ({
    overlay: false,
    id: '',
    nome: ''
  }),
  created () {
    const idRegiao = this.$route.params.form
    if (idRegiao !== 'form') {
      this.id = idRegiao
      this.getRegiao()
    }
  },
  methods: {
    getRegiao () {
      this.$axios.get(`/painel/regioes/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          this.nome = r.data.regiao.nome
        } else {
          this.$router.push('/painel/regiao')
        }
      })
    },
    salvar () {
      if (this.id) {
        this.atualizar()
      } else {
        this.criar()
      }
    },
    criar () {
      this.overlay = true
      this.$axios.post('/painel/regioes', {
        nome: this.nome
      }).then(
        (r) => {
          if (r.data.status) {
            this.$router.push('/painel/regiao')
            Swall.fire({
              icon: 'success',
              title: 'Região cadastrada com sucesso'
            })
          }
          this.overlay = false
        }
      )
    },
    atualizar () {
      this.overlay = true
      this.$axios.put(`/painel/regioes/${this.id}`, {
        nome: this.nome
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Região cadastrada com sucesso'
            })
          } else {
            Swall.fire({
              icon: 'warning',
              title: 'Não foi possível atualizar'
            })
          }
          this.overlay = false
        }
      )
    }
  }
}
</script>
