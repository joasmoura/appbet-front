<template>
  <v-card>
    <v-card-title>Apostas</v-card-title>
    <v-card-text>
      <v-container>
        <v-form>
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <v-text-field label="Código"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="cambista"
                :items="cambistas"
                label="Cambistas"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="gerente"
                :items="gerentes"
                label="Gerentes"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox v-model="resultado" :items="resultados" label="Resultado"></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field label="Periodo"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-text-field label="à"></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="1">
              <v-btn ><v-icon>mdi-magnify</v-icon></v-btn>
            </v-col>

          </v-row>
        </v-form>

          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Horário</th>
                  <th class="text-left">Cambista</th>
                  <th class="text-left">Extração</th>
                  <th class="text-left">Total</th>
                  <th class="text-left"></th>
                </tr>
              </thead>

              <tbody>
                <template v-for="aposta in apostas">
                  <tr
                    :key="aposta.id"
                    :class="
                    (aposta.status == 'cancelado' ? 'red white--text' : '')+
                    (aposta.status == 'ganhou' ? 'green white--text' : '')+
                    (aposta.status == 'perdeu' ? 'red white--text' : '')
                    "
                  >
                    <td>{{aposta.codigo}}</td>
                    <td>{{aposta.hora}}</td>
                    <td>{{aposta.cambista.name}}</td>
                    <td>{{aposta.extracao.data}} {{aposta.horario.nome}}</td>
                    <td>{{moeda(aposta.total)}}</td>
                    <td>
                      <v-btn v-if="aposta.status != 'cancelado'" @click="cancelar(aposta.id)" small color="primary red darken-2">
                        <v-icon>mdi-cancel</v-icon> Cancelar
                      </v-btn>

                      <span v-else>Cancelada</span>
                    </td>
                  </tr>

                  <template v-for="item in aposta.itens">
                    <tr :key="item.id">
                      <td colspan="6">
                        <v-card class="mt-2 mb-2">
                          <v-card-text :class=" (aposta.status == 'cancelado' ? 'red white--text' : '')">
                            <v-row>
                              <v-col cols="3" sm="2" md="2">{{moeda(item.subtotal)}}</v-col>
                              <v-col cols="3" sm="2" md="2">{{item.premio_de}}º ao {{item.premio_ate}}º</v-col>
                              <v-col cols="3" sm="2" md="2">{{getModalidade(item.modalidade )}}</v-col>
                              <v-col cols="3" sm="2" md="2">{{moeda(item.poss_ganho)}}</v-col>
                              <v-col cols="12">{{renderNumero(item.numero)}}</v-col>
                            </v-row>
                          </v-card-text>
                        </v-card>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>

    </v-card-text>

    <v-card-actions>
      <div class="text-center">
        <v-pagination
          v-model="pagination.current"
          :length="pagination.total"
          total-visible="10"
          @input="onPageChange"
        ></v-pagination>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import Swall from 'sweetalert2'

export default {
  layout: 'painel',
  data: () => ({
    loading: true,
    cambistas: [
      {
        text: 'Todos', value: ''
      }
    ],
    gerentes: [
      {
        text: 'Todos', value: ''
      }
    ],
    resultados: [
      {
        text: 'Todos', value: ''
      }
    ],
    apostas: [],

    modalidades: [
      { id: 1, nome: 'Milhar' },
      { id: 2, nome: 'Centena' },
      { id: 3, nome: 'Dezena' },
      { id: 4, nome: 'Grupo' },
      { id: 5, nome: 'Milhar Centena' },
      { id: 6, nome: 'Milhar Invertida' },
      { id: 7, nome: 'MC Invertida' },
      { id: 8, nome: 'Centena Invertida' },
      { id: 9, nome: 'Duque de Grupo' },
      { id: 10, nome: 'Terno de Grupo' },
      { id: 11, nome: 'Duque de Dezena' },
      { id: 12, nome: 'Terno Dezena' },
      { id: 13, nome: 'Passe Combinado' },
      { id: 14, nome: 'Terno de Grupo Combinado' },
      { id: 15, nome: 'Passe Seco' },
      { id: 16, nome: 'Terno de Dezena Cercado' },
      { id: 17, nome: 'Grupo Combinado' },
      { id: 18, nome: 'Passe Vai Vem' },
      { id: 19, nome: 'Passe Vai' }
    ],

    cambista: '',
    gerente: '',
    resultado: '',
    pagination: {
      current: 1,
      total: 0
    }
  }),
  created () {
    this.getApostas()
  },
  methods: {
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    },
    async getApostas () {
      await this.$axios.get(`/painel/apostas?page=${this.pagination.current}`).then((r) => {
        const apostas = r.data
        if (apostas) {
          this.apostas = apostas.data
          this.pagination.current = apostas.current_page
          this.pagination.total = apostas.last_page
        }
      })
    },
    getModalidade (id) {
      const modalidade = this.modalidades.find(mod => parseInt(mod.id) === parseInt(id))
      return modalidade.nome
    },
    renderNumero (numero) {
      numero = JSON.parse(numero)
      let novoNumero = ''
      numero.map((num, i) => {
        novoNumero += ' ' + num
        return novoNumero
      })
      return novoNumero
    },
    onPageChange () {
      this.getApostas()
    },
    cancelar (id) {
      Swall.fire({
        title: '',
        text: 'Deseja realmente cancelar essa aposta?',
        showCancelButton: true,
        icon: 'question'
      }).then((c) => {
        if (c.isConfirmed) {
          this.$axios.get(`/painel/apostas/cancelar_aposta/${id}`).then((r) => {
            if (r.status) {
              Swall.fire({
                title: 'Aposta Cancelada!',
                timer: 1000,
                icon: 'success'
              })
            }

            this.getApostas()
          })
        }
      })
    }
  }
}
</script>
