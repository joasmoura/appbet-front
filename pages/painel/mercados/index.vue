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
        Mercados Bicho
      </v-card-title>

      <v-card-text>
        <v-row>

          <v-col cols="12" sm="6" md="4">
            <v-combobox v-model="regiao" solo :items="regioes" @change="selecionaRegiao" label="Regiões" ></v-combobox>
          </v-col>

          <v-col cols="12" sm="12" md="12">
            <v-divider />
          </v-col>

          <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse" v-if="regiao">
            <v-btn type="submit" color="primary"><v-icon>mdi-save</v-icon> Salvar</v-btn>
          </v-col>

          <v-col cols="12" sm="12" md="12" v-if="regiao">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Código</th>
                    <th class="text-left"></th>
                    <th class="text-left">Nome</th>
                    <th class="text-left">Congregação</th>
                    <th class="text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Grupo</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.grupo" label="" solo ></v-text-field>
                        </v-col>
                      </v-row>
                      </td>
                  </tr>

                  <tr>
                    <td>Dezena</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.dezena" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Centena</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.centena" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Milhar</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field  v-model="mercado.milhar" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Duque de Grupo</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.duque_grupo" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Terno de Grupo</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.terno_grupo" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Terno de Dezena</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.terno_dezena" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Milhar e Centena</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.milhar_centena" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Milhar Invertida</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.milhar_invertida" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>MC Invertida</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.mc_invertida" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Centena Invertida</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.centena_invertida" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Duque de Dezena</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.duque_dezena" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Passe Combinado</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.passe_combinado" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Terno de Grupo Combinado</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.terno_grupo_combinado" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Passe Seco</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.passe_seco" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Terno Dezena Cercado</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.terno_dezena_cercado" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Grupo Combinado</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.grupo_combinado" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                  <tr>
                    <td>Queima</td>
                    <td>
                      <v-row>
                        <v-col md="3">
                          <v-text-field v-model="mercado.queima" label="" solo></v-text-field>
                        </v-col>
                      </v-row>
                    </td>
                  </tr>

                </tbody>

              </template>
            </v-simple-table>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse" v-if="regiao">
            <v-btn type="submit" color="primary"><v-icon>mdi-save</v-icon> Salvar</v-btn>
          </v-col>
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
    regioes: [],
    mercado: {
      regiao_id: '',
      grupo: '',
      dezena: '',
      centena: '',
      milhar: '',
      duque_grupo: '',
      terno_grupo: '',
      terno_dezena: '',
      milhar_centena: '',
      milhar_invertida: '',
      mc_invertida: '',
      centena_invertida: '',
      duque_dezena: '',
      passe_combinado: '',
      terno_grupo_combinado: '',
      passe_seco: '',
      terno_dezena_cercado: '',
      grupo_combinado: '',
      queima: ''
    },

    regiao: ''
  }),
  created () {
    this.verificaPerfil([])
    this.getRegioes()
  },
  methods: {
    verificaPerfil (perfil) {
      perfil.push('administrador')
      return perfil.includes(this.$auth.user.perfil) ? true : this.$router.push('/painel')
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
    async selecionaRegiao () {
      this.overlay = true
      await this.$axios.get(`/painel/mercados/${this.regiao.value}/edit`).then((r) => {
        const mercado = r.data

        this.mercado.regiao_id = (mercado ? mercado.regiao_id : '')
        this.mercado.grupo = (mercado ? mercado.grupo : '')
        this.mercado.dezena = (mercado ? mercado.dezena : '')
        this.mercado.centena = (mercado ? mercado.centena : '')
        this.mercado.milhar = (mercado ? mercado.milhar : '')
        this.mercado.duque_grupo = (mercado ? mercado.duque_grupo : '')
        this.mercado.terno_grupo = (mercado ? mercado.terno_grupo : '')
        this.mercado.terno_dezena = (mercado ? mercado.terno_dezena : '')
        this.mercado.milhar_centena = (mercado ? mercado.milhar_centena : '')
        this.mercado.milhar_invertida = (mercado ? mercado.milhar_invertida : '')
        this.mercado.mc_invertida = (mercado ? mercado.mc_invertida : '')
        this.mercado.centena_invertida = (mercado ? mercado.centena_invertida : '')
        this.mercado.duque_dezena = (mercado ? mercado.duque_dezena : '')
        this.mercado.passe_combinado = (mercado ? mercado.passe_combinado : '')
        this.mercado.terno_grupo_combinado = (mercado ? mercado.terno_grupo_combinado : '')
        this.mercado.passe_seco = (mercado ? mercado.passe_seco : '')
        this.mercado.terno_dezena_cercado = (mercado ? mercado.terno_dezena_cercado : '')
        this.mercado.grupo_combinado = (mercado ? mercado.grupo_combinado : '')
        this.mercado.queima = (mercado ? mercado.queima : '')

        this.overlay = false
      })
    },
    salvar () {
      if (this.regiao) {
        if (this.mercado.grupo.length > 0 && this.mercado.dezena.length > 0 &&
          this.mercado.centena.length > 0 &&
          this.mercado.milhar.length > 0 &&
          this.mercado.duque_grupo.length > 0 &&
          this.mercado.terno_grupo.length > 0 &&
          this.mercado.terno_dezena.length > 0 &&
          this.mercado.milhar_centena.length > 0 &&
          this.mercado.milhar_invertida.length > 0 &&
          this.mercado.mc_invertida.length > 0 &&
          this.mercado.centena_invertida.length > 0 &&
          this.mercado.duque_dezena.length > 0 &&
          this.mercado.passe_combinado.length > 0 &&
          this.mercado.terno_grupo_combinado.length > 0 &&
          this.mercado.passe_seco.length > 0 &&
          this.mercado.terno_dezena_cercado.length > 0 &&
          this.mercado.grupo_combinado.length > 0 &&
          this.mercado.queima.length > 0
        ) {
          if (this.mercado.regiao_id) {
            this.atualizar()
          } else {
            this.criar()
          }
        } else {
          Swall.fire({
            title: 'Preencha todos os campos!',
            icon: 'warning',
            timer: 1500
          })
        }
      } else {
        Swall.fire({
          title: 'Selecione uma região',
          icon: 'warning',
          timer: 1500
        })
      }
    },
    criar () {
      this.overlay = true
      this.$axios.post('/painel/mercados', {
        regiao: this.regiao.value,
        mercado: this.mercado
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Dados salvos com sucesso!'
            })
            this.selecionaRegiao()
          }
          this.overlay = false
        }
      )
    },
    atualizar () {
      this.overlay = true
      this.$axios.put(`/painel/mercados/${this.mercado.regiao_id}`, {
        mercado: this.mercado
      }).then(
        (r) => {
          if (r.data.status) {
            Swall.fire({
              icon: 'success',
              title: 'Dados atualizados com sucesso'
            })
          } else {
            Swall.fire({
              icon: 'error',
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
