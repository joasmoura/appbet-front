<template>
  <v-card>
    <v-card-title>
      Extrações

      <v-spacer></v-spacer>

      <v-btn href="/painel/extracao/form" color="white">
        <v-icon>mdi-plus</v-icon> Extração
      </v-btn>
    </v-card-title>

    <v-card-text>
        <v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Data</th>
                  <th class="text-left">Status</th>
                  <th class="text-left">Ações</th>
                </tr>
              </thead>

            </template>
          </v-simple-table>
        </v-container>
    </v-card-text>

    <v-card-actions>

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  layout: 'painel',
  data: () => ({
  }),
  methods: {

  }
}
</script>
