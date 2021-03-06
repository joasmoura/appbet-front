<template>
<div>
  <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  <v-card>
    <v-app-bar>
      <v-toolbar-title>Caixa cambista</v-toolbar-title>
      <v-spacer />

      <div>
        <date-picker v-model="datas.dataInicio" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="DE"></date-picker>
        <date-picker v-model="datas.dataFim" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="ATÉ"></date-picker>
        <v-btn small @click="filtrar"><v-icon>mdi-magnify</v-icon></v-btn>
      </div>
    </v-app-bar>

    <v-card-text>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Cambista</th>
              <th class="text-left">Saldo Anterior</th>
              <th class="text-left">Entradas</th>
              <th class="text-left">Saídas</th>
              <th class="text-left">Créditos</th>
              <th class="text-left">Débitos</th>
              <th class="text-left">Saldo</th>
              <th class="text-left">Ação</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="cambista in cambistas">
              <tr  :key="cambista.id">
                <td>{{cambista.name}}</td>
                <td>{{moeda(cambista.saldoAnterior)}}</td>
                <td>{{moeda(cambista.entradas)}}</td>
                <td>{{moeda(cambista.saidas)}}</td>
                <td>{{moeda(cambista.creditos)}}</td>
                <td>{{moeda(cambista.retiradas)}}</td>
                <td>{{moeda(cambista.saldo)}}</td>
                <td>
                  <v-btn color="primary" small @click="() => creditar(cambista.id)">Creditar</v-btn>
                  <v-btn color="primary red" small @click="() => debitar(cambista.id)">Debitar</v-btn>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-simple-table>
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

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px" >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{tipo == 'credito' ? 'Creditar' : 'Debitar'}}</span>
        </v-card-title>
        <v-form @submit.prevent="salvar">
          <v-card-text>
            <v-container>
                <v-row>
                  <v-col cols="12" md="12" >
                    <v-text-field v-model="descricao" label="Descrição" required ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12" >
                    <date-picker v-model="data" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="Data" />
                  </v-col>

                  <v-col cols="12">
                    <v-text-field v-model="valor" label="Valor" required ></v-text-field>
                  </v-col>
                </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false" >Fechar</v-btn>
            <v-btn type="submit" color="blue darken-1" text >Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</div>
</template>

<script>
import Swall from 'sweetalert2'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data () {
    return {
      cambistas: [],
      overlay: false,
      dialog: false,
      descricao: '',
      valor: '',
      datas: {
        dataInicio: (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + '/' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
        dataFim: (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + '/' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
      },
      data: new Date(),
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      tipo: '',
      id: '',
      pagination: {
        current: 1,
        total: 0
      }
    }
  },
  created () {
    this.getCaixa()
  },
  methods: {
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    },
    creditar (id) {
      this.tipo = 'credito'
      this.dialog = true
      this.id = id
    },
    debitar (id) {
      this.tipo = 'retirada'
      this.dialog = true
      this.id = id
    },
    filtrar () {
      this.pagination.current = 1
      this.getCaixa()
    },
    async getCaixa () {
      this.overlay = true
      await this.$axios.get(`/painel/caixa/caixa_cambistas?page=${this.pagination.current}&dataInicio=${this.datas.dataInicio}&dataFim=${this.datas.dataFim}`).then((r) => {
        const cambistas = r.data
        if (cambistas) {
          this.cambistas = cambistas.data
          this.pagination.current = cambistas.current_page
          this.pagination.total = cambistas.last_page
        }
        this.overlay = false
      })
    },
    onPageChange () {
      this.getCaixa()
    },
    async salvar () {
      this.dialog = false
      await this.$axios.post('/painel/movimentacao', {
        usuario: this.id,
        descricao: this.descricao,
        tipo: this.tipo,
        data: this.data,
        valor: this.valor
      }).then((r) => {
        Swall.fire({
          icon: 'success',
          title: 'Movimentação cadastrada com sucesso!',
          timer: 1500
        })
        this.getCaixa()
        this.id = ''
        this.descricao = ''
        this.tipo = ''
        this.data = new Date()
        this.valor = ''
      })
    }
  }
}
</script>
