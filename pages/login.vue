<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="primary">
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <v-form @submit.prevent="login">
          <v-card-text>
            <v-text-field
              v-model="email"
              name="login"
              label="Email"
              type="text"
              data-vv-name="email"
              required
            />
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn type="submit" color="success">
              Se Connecter
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  data() {
    return {
        email: '',
        password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (e) {
         this.$toast.error('Erreur de connexion')
      }
    }
  }
}
</script>