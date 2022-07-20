<template>
  <v-app dark>
    <!-- <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    > -->
      <!-- <v-row>
        <v-col cols="6" class="text-left">
          <v-btn v-if="!isAuthenticated" color="purple" to="/register">Register</v-btn>
        </v-col>
        <v-col cols="6" class="text-right">
          <v-btn v-if="isAuthenticated" color="primary" @click="logout()">Logout</v-btn>
          <v-btn v-else color="primary" to="/login">Login</v-btn>
        </v-col>
      </v-row> -->
    <!-- </v-app-bar> -->
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>Powered by NGTV Experience   &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data () {
    return {
      clipped: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'fas fa-box',
          title: 'Produits',
          to: '/product'
        },
        {
          icon: 'fas fa-warehouse',
          title: 'Stock',
          to: '/storage'
        }
      ]
    }
  },
   methods:{
    async logout() {
      await this.$auth.logout()
      .then(() =>  {
        this.$store.commit('clearData')
        this.$router.push('/login')
        })
    }
   }
}
</script>