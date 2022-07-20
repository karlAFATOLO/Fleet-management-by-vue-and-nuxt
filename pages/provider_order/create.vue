<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/provider_order"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Création commande fournisseur
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field
                v-model="nameOrder"
                label="Nom de la commande"
                ></v-text-field>
                <v-select
                :items="providerList"
                label="Fournisseur"
                v-model="providerNameSelected"
                ></v-select>
                <v-card>
                    <v-card-title>
                        Produits commandés
                        <v-btn class="mx-2" @click="addProductDialog = true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :items="productsOrdered"
                        :headers="headers"
                        ></v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4" offset-md="8" class="text-right">
                <v-btn color="success" @click="createOrder()">Sauvegarder</v-btn>
            </v-col>
        </v-row>
        <v-dialog persistent width="500px" v-model="addProductDialog">
            <v-card>
                <v-card-title>Ajout d'un produit</v-card-title>
                <v-card-text>
                    <v-autocomplete
                    :items="productsByProvider"
                    v-model="productToAdd"
                    label="Produit"
                    ></v-autocomplete>
                    <v-text-field
                    v-model="quantityToAdd"
                    label="Quantité à commander"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="addProductDialog = false">Annuler</v-btn>
                    <v-spacer/>
                    <v-btn color="success" @click="addProduct()">Ajouter</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('/providers')
        .then((response) => this.providers = response.data)
        this.$axios.get('/products')
        .then((response) => this.products = response.data)
    },
    data() {
        return {
            nameOrder:'',
            productToAdd:'',
            quantityToAdd:null,
            addProductDialog:false,
            providers:[],
            providerSelected:{},
            providerNameSelected:'',
            products:[],
            productsOrdered:[],
            headers:[
                {text:"Désignation",value:'name'},
                {text:"Quantité",value:'quantity'}
            ]
        }
    },
    computed:{
        productsByProvider() {
            return this.products ? this.products.filter(product => product.providers.filter( provider => provider.name === this.providerNameSelected).length > 0).map(product => product.name) : []
        },
        providerList() {
            return this.providers ? this.providers.map(provider => provider.name) : []
        }
    },
    methods:{
        createOrder() {
            this.providerSelected = this.providers.find(provider => provider.name === this.providerNameSelected) 
            this.providerSelected.orders.push({id:this.$moment().unix(),date:this.$moment(),products:this.productsOrdered,status:"created"})
            this.$axios.post('/providerOrders',{name:this.nameOrder,nameProvider:this.providerNameSelected,products:this.productsOrdered})
            .then(() => this.$router.push('/provider_order'))
        },
        addProduct(){
            this.productsOrdered.push({name:this.productToAdd,quantity:parseInt(this.quantityToAdd),received:false})
            this.productToAdd = ''
            this.quantityToAdd = null
            this.addProductDialog = false
        }
    }
}
</script>
