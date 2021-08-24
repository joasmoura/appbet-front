<template>
  <v-app >

    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

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

        <v-list-group v-if="this.verificaPerfil(['gerente','supervisor'])" :value="false" prepend-icon="mdi-ticket" no-action>
          <template v-slot:activator>
            <v-list-item-title>Loteria</v-list-item-title>
          </template>

          <div v-for="([title, icon, to, permissao], i) in loteria" :key="i" >
            <v-list-item v-if="permissao" :to="to">
              <v-list-item-title v-text="title"/>

              <v-list-item-icon>
                <v-icon v-text="icon"/>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list-group>

        <v-list-group :value="false" prepend-icon="mdi-account-group-outline" no-action>
          <template v-slot:activator>
            <v-list-item-title>Usuários</v-list-item-title>
          </template>

          <div v-for="([title, icon, to, permissao], i) in users" :key="i">
            <v-list-item v-if="permissao" :to="to">
              <v-list-item-title v-text="title"/>

              <v-list-item-icon>
                <v-icon v-text="icon"/>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list-group>

        <v-list-group :value="false" prepend-icon="mdi-cash-register" no-action>
          <template v-slot:activator>
            <v-list-item-title>Caixa</v-list-item-title>
          </template>

          <div  v-for="([title, icon, to, permissao], i) in caixa" :key="i">
            <v-list-item :to="to" v-if="permissao">
              <v-list-item-title v-text="title"/>

              <v-list-item-icon>
                <v-icon v-text="icon"/>
              </v-list-item-icon>
            </v-list-item>
          </div>
        </v-list-group>

        <v-list-item v-if="this.verificaPerfil([])" to="/painel/relatorios">
          <v-list-item-action>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>Relatórios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="this.verificaPerfil([])" to="/painel">
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

      <v-btn icon @click="$auth.logout()" >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
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
      overlay: false,
      clipped: false,
      drawer: false,
      fixed: false,
      loteria: [
        [
          'Apostas', 'mdi-ticket', '/painel/apostas/', this.verificaPerfil(['gerente', 'supervisor'])
        ],
        [
          'Extrações', 'mdi-calendar-month-outline', '/painel/extracao/', this.verificaPerfil([])
        ],
        [
          'Mercados', 'mdi-chart-line', '/painel/mercados/', this.verificaPerfil([])
        ],
        [
          'Configurações', 'mdi-cog', '/criar', this.verificaPerfil([])
        ]
      ],
      users: [
        [
          'Gerentes', 'mdi-account-star', '/painel/gerentes', this.verificaPerfil([])
        ],
        [
          'Supervisor', 'mdi-account-settings', '/painel/supervisores', this.verificaPerfil(['gerente'])
        ],
        [
          'Cambistas', 'mdi-account-group', '/painel/cambistas/', this.verificaPerfil(['gerente', 'supervisor'])
        ],
        [
          'Regiões', 'mdi-map-marker', '/painel/regiao', this.verificaPerfil([])
        ],
        [
          'Comissões', 'mdi-cash', '/painel/comissoes', this.verificaPerfil([])
        ]
      ],
      caixa: [
        ['Meu Caixa', 'mdi-cash-register', '/painel/caixa/meu-caixa', this.verificaPerfil(['gerente', 'supervisor'], false)],
        ['Gerente', 'mdi-cash-register', '/painel/caixa/gerentes', this.verificaPerfil([''])],
        ['Supervisor', 'mdi-cash-register', '/painel/caixa/supervisor', this.verificaPerfil(['gerente'])],
        ['Cambistas', 'mdi-cash-register', '/painel/caixa/cambista', this.verificaPerfil(['gerente', 'supervisor'])],
        ['Movimentações', 'mdi-cash-register', '/painel/caixa/movimentacoes', this.verificaPerfil([])]
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AppBet'
    }
  },
  created () {
    // if (!this.verificaPerfil(['gerente', 'supervisor'], true)) {
    //   this.$auth.logout()
    // }

    this.$nuxt.$on('setoverlay', () => {
      this.overlay = !this.overlay
    })
  },
  methods: {
    verificaPerfil (perfil, admin = true) {
      if (admin) {
        perfil.push('administrador')
      }
      return perfil.includes(this.$auth.user.perfil)
    }
  }
}
</script>
