<template>
<div>
  <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  <v-card>
    <v-card-title>
      Caixa supervisor

      <v-spacer />

    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" md="6">

        </v-col>
      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Supervisor</th>
              <th class="text-left">Saldo Anterior</th>
              <th class="text-left">Entradas</th>
              <th class="text-left">Saídas</th>
              <th class="text-left">Créditos</th>
              <th class="text-left">Débitos</th>
              <th class="text-left">Saldo</th>
              <th class="text-left"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="supervisor in supervisores" :key="supervisor.id">
              <td>{{supervisor.name}}</td>
              <td></td>
              <td>{{moeda(supervisor.entradas)}}</td>
              <td></td>
              <td>{{moeda(supervisor.creditos)}}</td>
              <td>{{moeda(supervisor.retiradas)}}</td>
              <td></td>
              <td>
                <v-btn color="primary" small @click="() => creditar(supervisor.id)">Creditar</v-btn>
                <v-btn color="primary red" small @click="() => debitar(supervisor.id)">Debitar</v-btn>
              </td>
            </tr>
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
      supervisores: [],
      overlay: false,
      dialog: false,
      descricao: '',
      valor: '',
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
    async getCaixa () {
      this.overlay = true
      await this.$axios.get(`/painel/caixa/caixa_supervisores?page=${this.pagination.current}`).then((r) => {
        const supervisores = r.data
        if (supervisores) {
          this.supervisores = supervisores.data
          this.pagination.current = supervisores.current_page
          this.pagination.total = supervisores.last_page
        }
        this.overlay = false
      })
    },
    onPageChange () {
      this.getCaixa()
    },
    async salvar () {
      this.overlay = true
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
        this.overlay = false
      })
    }
  }
}
</script>
