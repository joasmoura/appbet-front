<template>
  <v-card>
    <v-card-title>
      Comissões

      <v-spacer></v-spacer>

      <v-btn href="/painel/comissoes/form" color="white">
        <v-icon>mdi-plus</v-icon> Comissão
      </v-btn>
    </v-card-title>

    <v-card-text>
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'painel'
}
</script>
