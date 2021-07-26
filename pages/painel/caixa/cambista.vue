<template>
  <v-card>
    <v-card-title>
      Caixa cambista

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
              <th class="text-left">Cambista</th>
              <th class="text-left">Saldo Anterior</th>
              <th class="text-left">Entradas</th>
              <th class="text-left">Saídas</th>
              <th class="text-left">Créditos</th>
              <th class="text-left">Comissão cambista</th>
              <th class="text-left">Débitos</th>
              <th class="text-left">Saldo</th>
              <th class="text-left">Ação</th>
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
