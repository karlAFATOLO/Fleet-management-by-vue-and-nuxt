<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/provider_order"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Modification commande fournisseur
            </v-col>
        </v-row>
        <v-row v-if="order">
            <v-col cols="12">
                <v-text-field
                readonly
                v-model="order.name"
                ></v-text-field>
                <v-card>
                    <v-card-title>
                        Produits commandés
                        <v-btn class="mx-2" @click="addProductDialog = true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :items="order.products"
                        :headers="headers"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                    small
                                    @click="deleteItem(item)"
                                >
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="4" offset-md="8" class="text-right">
                <v-btn color="grey" @click="closeOrder()">Fermer</v-btn>
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
        this.refreshProviderOrder()
        this.$axios.get('/products')
        .then((response) => this.products = response.data)
    },
    data() {
        return {
            productToAdd:'',
            quantityToAdd:null,
            addProductDialog:false,
            order:{},
            products:[],
            headers:[
                {text:"Désignation",value:'name'},
                {text:"Quantité",value:'quantity'},
                {text: 'Actions', value: 'actions', sortable: false }
            ]
        }
    },
    computed: {
        productsByProvider() {
            return this.products ? this.products.filter(product => product.providers.find(provider => provider.name === this.order.nameProvider)).map( product => product.name) : []
        }
    },
    methods:{
        refreshProviderOrder() {
            this.$axios.get(`/providerOrders/${this.$route.params.id}`)
            .then((response) => {
                this.order = response.data
            })
        },
        deleteItem(item) {
            this.order.products = this.order.products.filter(product => product.name !== item.name)
            this.$axios.put(`/providerOrders/${this.order._id}`,this.order)
            this.refreshProviderOrder()
        },
        closeOrder() {
            this.$router.push('/provider_order')
        },
        addProduct(){
            this.order.products.push({name:this.productToAdd,quantity:parseInt(this.quantityToAdd),received:false})
            this.productToAdd = ''
            this.quantityToAdd = null
            this.addProductDialog = false
            this.$axios.put(`/providerOrders/${this.order._id}`,this.order)
        }
    }
}
</script>
