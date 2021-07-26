<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="grey darken-3"
      dark
    >
      <v-list>
        <v-list-item to="/painel">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title >Início</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group :value="false" prepend-icon="mdi-ticket" no-action>
          <template v-slot:activator>
            <v-list-item-title>Loteria</v-list-item-title>
          </template>

          <v-list-item v-for="([title, icon, to], i) in loteria" :key="i" :to="to">
            <v-list-item-title v-text="title"/>

            <v-list-item-icon>
              <v-icon v-text="icon"/>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-group :value="false" prepend-icon="mdi-account-group-outline" no-action>
          <template v-slot:activator>
            <v-list-item-title>Usuários</v-list-item-title>
          </template>

          <v-list-item v-for="([title, icon, to], i) in users" :key="i" :to="to">
            <v-list-item-title v-text="title"/>

            <v-list-item-icon>
              <v-icon v-text="icon"/>
            </v-list-item-icon>
          </v-list-item>

        </v-list-group>

        <v-list-group :value="false" prepend-icon="mdi-cash-register" no-action>
          <template v-slot:activator>
            <v-list-item-title>Caixa</v-list-item-title>
          </template>

          <v-list-item v-for="([title, icon, to], i) in caixa" :key="i" :to="to">
            <v-list-item-title v-text="title"/>

            <v-list-item-icon>
              <v-icon v-text="icon"/>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-list-item to="/painel">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title >Relatórios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/painel">
          <v-list-item-action>
            <v-icon>mdi-cogs</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title >Configurações</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="teal accent-4"
      dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant" >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      loteria: [
        [
          'Apostas', 'mdi-ticket', '/painel/apostas/'
        ],
        [
          'Extrações', 'mdi-calendar-month-outline', '/painel/extracao/'
        ],
        [
          'Mercados', 'mdi-chart-line', '/painel/mercados/'
        ],
        [
          'Configurações', 'mdi-cog', '/criar'
        ]
      ],
      users: [
        [
          'Gerentes', 'mdi-account-star', '/painel/gerentes'
        ],
        [
          'Supervisor', 'mdi-account-settings', '/painel/supervisores'
        ],
        [
          'Cambistas', 'mdi-account-group', '/painel/cambistas/'
        ],
        [
          'Regiões', 'mdi-map-marker', '/painel/regiao'
        ],
        [
          'Comissões', 'mdi-cash', '/painel/comissoes'
        ]
      ],
      caixa: [
        [
          'Gerente', 'mdi-cash-register', '/painel/caixa/gerentes'
        ],
        [
          'Supervisor', 'mdi-cash-register', '/painel/caixa/supervisor'
        ],
        [

          'Cambistas', 'mdi-cash-register', '/painel/caixa/cambista'
        ],
        [
          'Movimentações', 'mdi-cash-register', '/painel/caixa/movimentacoes'
        ]
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AppBet'
    }
  }
}
</script>
