<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="text-left">
        <v-btn to="/"><v-icon>fas fa-arrow-left</v-icon></v-btn>
      </v-col>
      <v-col cols="6" class="text-right">
        <v-btn @click="productDialog = true">
        <v-icon>fas fa-plus-circle</v-icon>
        </v-btn>
      </v-col> 
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Liste des produits
            <v-spacer/>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            clearable
          ></v-text-field>
          </v-card-title>
          <v-card-text>
          <v-data-table
          :headers="headers"
          :items="products"
          :search="search"
          @click:row="openProduct"
          :items-per-page="30"
          >
            <template v-slot:item.name="{ item }">
            {{ item.name }}
            </template>
            <template v-slot:item.providers="{ item }">
            <v-icon :color="item.providers.length > 0 ? 'success' : 'red'">fas fa-check-circle</v-icon>
            </template>
            <template v-slot:item.bestPrice="{ item }">
              {{bestPrice(item).price}}€
            </template>
            <template v-slot:item.bestProvider="{ item }">
              {{bestPrice(item).name}}
            </template>
          </v-data-table>
          </v-card-text>
      </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="productDialog" persistent width="500px">
      <v-card>
        <v-card-title>
        Création de produit
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nom du produit"
            ></v-text-field>
          <v-text-field
            v-model="reference"
            label="Réference du produit"
            ></v-text-field>
          <v-text-field
            v-model="url"
            label="URL du produit"
            ></v-text-field>
          <v-text-field
            v-model="limitStock"
            label="Limite du stock"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="productDialog = false;resetForm()">Annuler</v-btn>
          <v-spacer/>
          <v-btn color="success" @click="createProduct()">Créer produit</v-btn>
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
export default {
  mounted() {
    this.refreshProducts()
  },
  data() {
    return {
      search:'',
      name:'',
      reference:'',
      url:'',
      limitStock:null,
      productDialog: false,
      products:[],
      headers:[
        {text:'Désignation',value:'name'},
        {text:'Référence',value:'reference',align:'center'},
        {text:'Limite Stock',value:'limitStock',align:'center'},
        {text:'Prix Fournisseurs',value:'providers',align:'center'},
        {text:'Meilleur Prix',value:'bestPrice',align:'center'},
        {text:'Meilleur Forunisseur',value:'bestProvider',align:'center'}
      ]
    }
  },
  methods:{
    openProduct(value) {
      this.$router.push(`/product/${value._id}`)
    },
    createProduct() {
      if(this.name != '') {
        this.$axios.post("/products", {name:this.name,reference:this.reference,url:this.url,limitStock:this.limitStock})
        .then(() => {
          this.$toast.success("Produit crée")
          this.resetForm()
          this.refreshProducts()
        })
      } else {
        this.$toast.error("Invalid Name")
      }
    },
    resetForm() {
      this.productDialog = false
      this.limitStock = ''
      this.name = ''
      this.reference = ''
      this.url = ''
    },
    refreshProducts() {
      this.$axios.get("/products")
      .then((response) => this.products = response.data)
    },
    bestPrice(product) {
      return product.providers ? product.providers.reduce((bestProvider,provider) => {
        if(bestProvider.price === 0) bestProvider = provider
        if(provider.price < bestProvider.price) bestProvider = provider 
        return bestProvider
        },{name:'',price:0} ) : {}
    }
  }
}
</script>