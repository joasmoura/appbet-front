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
        {{(!id ? 'Cadastrar Extração' : 'Editar Extração')}}

        <v-spacer></v-spacer>

        <v-btn to="/painel/extracao" color="white">
          <v-icon>mdi-format-list-bulleted</v-icon> Extrações
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-input>
              <date-picker v-model="data" value-type="DD/MM/YYYY" format="DD/MM/YYYY" :lang="lang" placeholder="dd/MM/YYYY" />
            </v-input>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            Horários
            <v-divider/>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="nome" solo dense label="Nome"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="hora"
              type="time"
              solo
              dense
              prepend-icon="mdi-clock-outline"
              label="Hora"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="regiao" solo dense :items="regioes" label="Região"></v-combobox>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-btn @click="adicionar_horario()" color="primary">
              <v-icon>mdi-plus</v-icon> Adicionar
            </v-btn>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            Quadro de Horários
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-left">Horário</th>
                    <th class="text-left">Região</th>
                    <th class="text-left">Excluir</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(horario, i) in horarios" :key="i">
                    <td>{{horario.nome}}</td>
                    <td>{{horario.hora}}</td>
                    <td>{{(horario.regiao ? horario.regiao.text : '')}}</td>
                    <td>
                      <v-btn color="red accent-3" v-on:click="remover(i)"><v-icon color="white">mdi-close</v-icon></v-btn>
                    </td>
                  </tr>
                </tbody>

              </template>
            </v-simple-table>
          </v-col>

        </v-row>
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
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/pt-br'

export default {
  layout: 'painel',
  data: () => ({
    overlay: false,
    regioes: [],
    horarios: [],

    id: '',
    regiao: '',
    nome: '',
    hora: '',
    data: new Date(),
    lang: {
      formatLocale: {
        firstDayOfWeek: 1
      },
      monthBeforeYear: false
    }
  }),
  created () {
    this.verificaPerfil([])
    this.getRegioes()

    const idExtracao = this.$route.params.form
    if (idExtracao !== 'form') {
      this.id = idExtracao
      this.getExtracao()
    }
  },
  methods: {
    verificaPerfil (perfil) {
      perfil.push('administrador')
      return perfil.includes(this.$auth.user.perfil) ? true : this.$router.push('/painel')
    },
    async getExtracao () {
      this.overlay = true
      await this.$axios.get(`/painel/extracoes/${this.id}/edit`).then((r) => {
        if (r.data.status) {
          const extracao = r.data.extracao

          this.data = extracao.data

          if (extracao.horas) {
            const horas = extracao.horas
            this.horarios = horas.map((h) => {
              const regiao = this.regioes.find(re => parseInt(re.value) === parseInt(h.regiao_id))

              return {
                id: h.id,
                nome: h.nome,
                hora: h.hora,
                regiao
              }
            })
          }
          this.overlay = false
        }
      })
    },
    async getRegioes () {
      await this.$axios.get('/painel/regioes/select').then((r) => {
        if (r.data) {
          const regioes = r.data
          this.regioes = regioes.map((reg) => {
            return {
              value: reg.id,
              text: reg.nome
            }
          })
        }
      })
    },
    adicionar_horario () {
      if (this.nome && this.hora && this.regiao) {
        this.horarios.push({
          id: '',
          nome: this.nome,
          hora: this.hora,
          regiao: this.regiao
        })
      } else {
        Swall.fire({
          icon: 'warning',
          title: 'Preencha dos os campos!'
        })
      }
    },
    remover (index) {
      const hora = this.horarios[index]
      if (hora.id) {
        this.$axios.get(`/painel/extracoes/removerHora/${hora.id}`).then(
          (r) => {
            console.log('excluído')
          }
        )
      }
      this.horarios.splice(index, 1)
    },

    salvar () {
      if (this.id) {
        this.atualizar()
      } else {
        this.criar()
      }
    },
    criar () {
      if (this.data.length && this.horarios.length) {
        this.overlay = true
        this.$axios.post('/painel/extracoes', {
          data: this.data,
          horarios: this.horarios
        }).then(
          (r) => {
            if (r.data.status) {
              this.$router.push('/painel/extracao')
              Swall.fire({
                icon: 'success',
                title: 'Extração cadastrada com sucesso'
              })
            }
            this.overlay = false
          }
        )
      } else {
        Swall.fire({
          icon: 'warning',
          title: 'Necessário selecionar uma data e adicionar pelo menos uma extração!'
        })
      }
    },
    atualizar () {
      const data = this.data
      this.overlay = true
      this.$axios.put(`/painel/extracoes/${this.id}`, {
        data,
        horarios: this.horarios
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Extração atualizada com sucesso'
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
