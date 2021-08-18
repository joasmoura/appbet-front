<template>
<div>
  <v-card>
    <v-app-bar>
      <v-toolbar-title>Caixa</v-toolbar-title>
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
          <tbody>
            <tr>
              <th colspan="2">Saldo Anterior</th>
              <th>{{moeda(saldoAnterior)}}</th>
            </tr>
            <tr class="grey lighten-2">
              <th>Entradas</th>
              <th><v-img max-height="20" max-width="20" src="/plus.svg"></v-img></th>
              <th>{{moeda(totalEntradas)}}</th>
            </tr>

            <tr>
              <td>Apostas do Bicho</td>
              <td><v-img max-height="15" max-width="15" src="/plus.svg"></v-img></td>
              <td>{{moeda(valorApostas)}}</td>
            </tr>

            <tr class="grey lighten-2">
              <th>Saídas</th>
              <th><v-img max-height="20" max-width="20" src="/minus.svg"></v-img></th>
              <th>{{moeda(totalSaidas)}}</th>
            </tr>

            <tr>
              <td>Premios do Bicho</td>
              <td><v-img max-height="15" max-width="15" src="/minus.svg"></v-img></td>
              <td>{{moeda(valorPremios)}}</td>
            </tr>

            <tr>
              <td>Comissões Cambistas</td>
              <td><v-img max-height="15" max-width="15" src="/minus.svg"></v-img></td>
              <td>{{moeda(valorComissoesCambistas)}}</td>
            </tr>

            <tr class="grey lighten-2">
              <th>Comissão do Faturamento</th>
              <th><v-img max-height="20" max-width="20" src="/minus.svg"></v-img></th>
              <th>{{moeda(comissaoFaturamento)}}</th>
            </tr>

            <tr class="grey lighten-2">
              <th>Resultado</th>
              <th>=</th>
              <th>{{moeda(resultado)}}</th>
            </tr>

            <tr class="grey lighten-2">
              <th>Comissão do Lucro</th>
              <th><v-img max-height="20" max-width="20" src="/minus.svg"></v-img></th>
              <th>{{moeda(comissaoLucro)}}</th>
            </tr>

            <tr class="grey lighten-2">
              <th>Lançamentos</th>
              <th><v-img max-height="20" max-width="20" src="/plus.svg"></v-img></th>
              <th>{{moeda(lancamentos)}}</th>
            </tr>

            <tr>
              <td>Créditos</td>
              <td><v-img max-height="20" max-width="20" src="/plus.svg"></v-img></td>
              <td>{{moeda(valorCreditos)}}</td>
            </tr>

            <tr>
              <td>Débitos</td>
              <td><v-img max-height="20" max-width="20" src="/minus.svg"></v-img></td>
              <td>{{moeda(valorDebitos)}}</td>
            </tr>

            <tr class="grey lighten-2">
              <th>Saldo</th>
              <th>=</th>
              <th>{{moeda(saldo)}}</th>
            </tr>

          </tbody>
        </template>
      </v-simple-table>
    </v-card-text>
  </v-card>
</div>
</template>

<script>
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data () {
    return {
      saldoAnterior: 0,
      valorDebitos: 0,
      valorCreditos: 0,
      valorApostas: 0,
      valorComissoesCambistas: 0,
      comissaoFaturamento: 0,
      valorPremios: 0,
      totalSaidas: 0,
      totalEntradas: 0,
      resultado: 0,
      comissaoLucro: 0,
      lancamentos: 0,
      saldo: 0,
      datas: {
        dataInicio: (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + '/' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
        dataFim: (new Date().getDate() < 10 ? '0' : '') + new Date().getDate() + '/' + (new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()
      },
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    }
  },
  created () {
    this.getCaixa()
  },
  methods: {
    filtrar () {
      this.getCaixa()
    },
    async getCaixa () {
      await this.$axios.get(`/painel/caixa/gerente/meu-caixa?dataInicio=${this.datas.dataInicio}&dataFim=${this.datas.dataFim}`).then((r) => {
        if (r.data) {
          this.saldoAnterior = r.data.saldoAnterior
          this.valorDebitos = r.data.valorDebitos
          this.valorCreditos = r.data.valorCreditos
          this.lancamentos = r.data.lancamentos
          this.valorApostas = r.data.valorApostas
          this.valorComissoesCambistas = r.data.valorComissoesCambistas
          this.valorPremios = r.data.valorPremios
          this.totalSaidas = r.data.totalSaidas
          this.totalEntradas = r.data.totalEntradas
          this.comissaoFaturamento = r.data.comissaoFaturamento
          this.resultado = r.data.resultado
          this.comissaoLucro = r.data.comissaoLucro
          this.saldo = r.data.saldo
        }
      })
    },
    moeda (moeda) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(moeda)
    }
  }
}
</script>
