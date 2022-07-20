<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="purple">
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <v-form @submit.prevent="register">
          <v-card-text>
            <v-text-field
              v-model="name"
              name="name"
              label="Name"
              type="text"
              data-vv-name="name"
              required
            />
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
              :type="show1 ? 'text' : 'password'"
              required
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-model="confirmPassword"
              name="password"
              label="Confirm Password"
              :type="show2 ? 'text' : 'password'"
              required
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show2 = !show2"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn type="submit" color="success">
              Valider
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
      <v-icon>fa warning</v-icon>Votre demande devra être acceptée par l'adminitrateur
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
        show1:false,
        show2:false,
        name:'',
        email: '',
        password: '',
        confirmPassword:''
    }
  },
  methods: {
    register() {
        this.$axios.post('/auth/register', {name:this.name,email: this.email,password: this.password})
        .then((response) => {
          if(response.status === 200)
            this.$router.push('/')
        }) 
    }
  }
}
</script>