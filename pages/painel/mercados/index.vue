<template>
  <v-card>
    <v-card-title>
      Mercados Bicho
    </v-card-title>

    <v-card-text>
      <v-row>

        <v-col cols="12" sm="6" md="4">
          <v-combobox v-model="regiao" :items="regioes" label="Regiões" ></v-combobox>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          <v-divider/>
        </v-col>

        <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse">
          <v-btn color="primary"><v-icon>mdi-save</v-icon> Salvar</v-btn>
        </v-col>

        <v-col cols="12" sm="12" md="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Cotação</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Grupo</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo ></v-text-field>
                      </v-col>
                    </v-row>
                    </td>
                </tr>

                <tr>
                  <td>Dezena</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </td>

                </tr>

                <tr>
                  <td>Centena</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                </tr>

                <tr>
                  <td>Milhar</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                </tr>

                <tr>
                  <td>Duque de Grupo</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                </tr>

                <tr>
                  <td>Terno de Grupo</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
                      </v-col>
                    </v-row>
                  </td>
                </tr>

                <tr>
                  <td>Terno de Dezena</td>
                  <td>
                    <v-row>
                      <v-col md="3">
                        <v-text-field label="" solo></v-text-field>
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
      <v-col cols="12" sm="12" md="12" class="d-flex flex-row-reverse">
          <v-btn color="primary"><v-icon>mdi-save</v-icon> Salvar</v-btn>
        </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
    regioes: [],
    regiao: ''
  })
}
</script>
