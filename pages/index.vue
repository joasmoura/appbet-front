<template>
  <v-row justify="center" align="center">
        <h1></h1>
    <v-col cols="12" sm="12" md="12">
      <v-card class="logo py-4 d-flex justify-center">
      </v-card>

    </v-col>
  </v-row>
</template>

<script>
export default {
  created () {
    this.$router.push('/login')
  }
}
</script>
