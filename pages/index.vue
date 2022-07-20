<template>
  <v-container>
    <v-row>
      <v-col lg="12" xs="12" class="headline text-center">
        DashBoard
      </v-col>
    </v-row>
    <v-row> 
      <v-col cols="12">
        <v-btn block color="primary" to="/product">
          <v-row align="center">
          <v-col class="text-left">
              Produits
          </v-col>
          <v-col class="text-right">
            <v-icon>fas fa-box</v-icon>
          </v-col>
          </v-row>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block color="red" to="/storage">
          <v-row align="center">
          <v-col class="text-left">
              Stock NGTV
          </v-col>
          <v-col class="text-right">
            <v-icon >fas fa-warehouse</v-icon>
          </v-col>
          </v-row>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block color="orange" to="/customer_order">
          <v-row align="center">
          <v-col class="text-left">
              Commandes clients
          </v-col>
          <v-col class="text-right">
            <v-icon>fas fa-dolly-flatbed</v-icon>
          </v-col>
          </v-row>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block color="success" to="/customer_storage">
          <v-row align="center">
          <v-col class="text-left">
              Stock Clients
          </v-col>
          <v-col class="text-right">
            <v-icon>fas fa-warehouse</v-icon>
          </v-col>
          </v-row>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn block color="purple" to="/provider_order">
          <v-row align="center">
          <v-col class="text-left">
              Commandes fournisseurs
          </v-col>
          <v-col class="text-right">
            <v-icon >fas fa-dolly-flatbed</v-icon>
          </v-col>
          </v-row>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>
