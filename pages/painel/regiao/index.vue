<template>
  <v-card>
    <v-card-title>
      Regiões

      <v-spacer></v-spacer>

      <v-btn href="/painel/regiao/form" color="white">
        <v-icon>mdi-plus</v-icon> Região
      </v-btn>
    </v-card-title>

    <v-card-text>
        <v-container>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left"></th>
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
  layout: 'painel'
}
</script>
