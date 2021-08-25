<template>
<div>
  <v-form @submit.prevent="salvar">
    <v-card>
      <v-card-title>
        Informar Resultado

        <v-spacer></v-spacer>

        <v-btn to="/painel/extracao" color="white">
          <v-icon>mdi-list</v-icon> Extrações
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <h3>Extração {{(hora.extracao ? hora.extracao.data : null)}} {{hora.nome}}</h3>

          <v-row>
            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_1" v-mask="'####'" label="1º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_2" v-mask="'####'" label="2º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_3" v-mask="'####'" label="3º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_4" v-mask="'####'" label="4º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_5" v-mask="'####'" label="5º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_6" v-mask="'####'" label="6º Prêmio"></v-text-field>
            </v-col>

            <v-col cols="12" sm="2" md="2">
              <v-text-field v-model="premio_7" v-mask="'###'" label="7º Prêmio"></v-text-field>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn type="submit" color="primary" >
          <v-icon>mdi-content-save-outline</v-icon> Salvar
        </v-btn>
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
    hora: [],
    id: '',
    premio_1: '',
    premio_2: '',
    premio_3: '',
    premio_4: '',
    premio_5: '',
    premio_6: '',
    premio_7: ''
  }),
  created () {
    const idHora = this.$route.params.resultado
    if (idHora !== 'resultado') {
      this.id = idHora
      this.getHora()
    }
  },
  methods: {
    async getHora () {
      this.$nuxt.$emit('setoverlay')
      await this.$axios.get(`/painel/extracoes/hora/${this.id}`).then((r) => {
        if (r.data) {
          const hora = r.data.hora
          this.hora = hora

          const premios = this.hora.premios
          if (premios) {
            this.premio_1 = (premios.premio_1 ? premios.premio_1 : '')
            this.premio_2 = (premios.premio_2 ? premios.premio_2 : '')
            this.premio_3 = (premios.premio_3 ? premios.premio_3 : '')
            this.premio_4 = (premios.premio_4 ? premios.premio_4 : '')
            this.premio_5 = (premios.premio_5 ? premios.premio_5 : '')
            this.premio_6 = (premios.premio_6 ? premios.premio_6 : '')
            this.premio_7 = (premios.premio_7 ? premios.premio_7 : '')
          }
          this.$nuxt.$emit('setoverlay')
        }
      })
    },
    salvar () {
      this.$nuxt.$emit('setoverlay')
      this.$axios.post(`/painel/extracoes/salvar_premios/${this.id}`, {
        premio_1: this.premio_1,
        premio_2: this.premio_2,
        premio_3: this.premio_3,
        premio_4: this.premio_4,
        premio_5: this.premio_5,
        premio_6: this.premio_6,
        premio_7: this.premio_7
      }).then((r) => {
        console.log(r.data)
        if (r.data.status) {
          this.$router.push('/painel/extracao')
          Swall.fire({
            icon: 'success',
            title: 'Premios salvos com sucesso'
          })
        }
        this.$nuxt.$emit('setoverlay')
      })
    }
  }
}
</script>
