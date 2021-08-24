<template>
<div>
  <v-overlay :value="overlay">
    <v-progress-circular
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>

  <v-card>
    <v-card-title>Apostas</v-card-title>
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="filtrar">
          <v-row>
            <v-col cols="12" sm="6" md="1">
              <v-text-field v-model="codigo" label="Código" outlined dense></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="cambista"
                :items="cambistas"
                outlined
                dense
                label="Cambistas"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox
                v-model="gerente"
                :items="gerentes"
                outlined
                dense
                label="Gerentes"
              ></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <v-combobox v-model="resultado" :items="resultados" label="Resultado" outlined dense></v-combobox>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <!-- <date-picker v-model="dataInicio" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="DE"></date-picker> -->
              <v-menu
                ref="menu1"
                v-model="menuDataInicio"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formatDataInicio"

                    label="Data Início"
                    persistent-hint
                    v-bind="attrs"
                      outlined
                      dense
                    @blur="dataInicio = parseDate(formatDataInicio)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataInicio" locale="pt-br" no-title @input="menuDataInicio = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="2">
              <!-- <date-picker v-model="dataFim" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="ATÉ"></date-picker> -->
              <v-menu
                ref="menu1"
                v-model="menuDataFim"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formatDataFim"

                    label="Data Até"
                    persistent-hint
                    v-bind="attrs"
                      outlined
                      dense
                    @blur="dataFim = parseDate(formatDataFim)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="dataFim" locale="pt-br" no-title @input="menuDataFim = false"></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6" md="1">
              <v-btn type="submit"><v-icon>mdi-magnify</v-icon></v-btn>
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
                      <v-btn v-if="aposta.status != 'cancelado' && $auth.user.perfil == 'administrador'" @click="cancelar(aposta.id)" small color="primary red darken-2">
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
</div>
</template>

<script>
import Swall from 'sweetalert2'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data: () => ({
    loading: true,
    codigo: '',
    dataInicio: null,
    dataFim: null,
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
      { id: 18, nome: 'Queima' }
    ],

    cambista: '',
    gerente: '',
    resultado: '',
    pagination: {
      current: 1,
      total: 0
    },
    menuDataInicio: false,
    menuDataFim: false,
    formatDataInicio: null,
    formatDataFim: null
  }),
  created () {
    this.dataInicio = (new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' : '') + new Date().getDate())
    this.dataFim = (new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '-' + (new Date().getDate() < 10 ? '0' : '') + new Date().getDate())
    this.verificaPerfil(['gerente', 'supervisor'])
    this.getApostas()
  },
  watch: {
    dataInicio (val) {
      this.formatDataInicio = this.formatDate(this.dataInicio)
    },
    dataFim (val) {
      this.formatDataFim = this.formatDate(this.dataFim)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) {
        return null
      }

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    verificaPerfil (perfil) {
      perfil.push('administrador')
      return perfil.includes(this.$auth.user.perfil) ? true : this.$router.push('/painel')
    },
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    },
    filtrar () {
      this.getApostas()
    },
    async getApostas () {
      this.overlay = true
      await this.$axios.get(`/painel/apostas?page=${this.pagination.current}&codigo=${this.codigo}&cambista=${this.cambista}&gerente=${this.gerente}&resultado=${this.resultado}&dataInicio=${this.dataInicio}&dataFim=${this.dataFim}`).then((r) => {
        this.overlay = false
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
