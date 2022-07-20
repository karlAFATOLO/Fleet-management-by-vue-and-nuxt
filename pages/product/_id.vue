<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" class="text-left">
                <v-btn to="/product"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="12">
            <v-card v-if="product">
                <v-card-title>
                    Fiche produit
                </v-card-title>
                <v-card-text>
                    <div>Name : {{ product.name }} </div>
                    <div>Réference : {{ product.reference }} </div>
                    <div>URL: <v-btn text :href="product.url" target="_blank">Lien site Web</v-btn> <v-btn small @click="editInfo('url')"><v-icon class="pl-2" small>fas fa-pen</v-icon></v-btn></div>
                    <div>Limite Stock : {{product.limitStock}} <v-btn small @click="editInfo('limitStock')"><v-icon class="pl-2" small>fas fa-pen</v-icon></v-btn></div>
                </v-card-text>
                <v-card>
                    <v-card-title>Fournisseurs <v-btn text @click="dialogAddProvider = true"><v-icon>fas fa-plus-circle</v-icon></v-btn></v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headersProvider"
                        :items="product.providers"
                        >
                        <template v-slot:item.price="{ item }">
                            {{item.price}}€
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="showProvider(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteProvider(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-card>
            <v-dialog v-model="dialogInfo" persistent width="500px">
                <v-card>
                    <v-card-title>
                        Modification de {{infoEdited}}
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                        v-model="infoValue"
                        :label="infoEdited"
                        >
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" @click="dialogInfo = false">Annuler</v-btn>
                        <v-spacer/>
                        <v-btn color="success" @click="validateInfo()">Valider</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogAddProvider" persistent width="500px">
                <v-card>
                    <v-card-title>
                        Ajout du fournisseur
                    </v-card-title>
                    <v-card-text>
                        <v-combobox
                        v-model="providerName"
                        :items="providersList"
                        label="Nom du fournisseur"
                        ></v-combobox>
                        <v-text-field
                        v-model="providerPrice"
                        label="Prix chez le fournisseur"
                        :rules="[rules.price]"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" @click="dialogAddProvider = false">Annuler</v-btn>
                        <v-spacer/>
                        <v-btn color="success" @click="addProvider()">Valider</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="dialogEditProvider" persistent width="500px">
                <v-card>
                    <v-card-title>
                        Modification du fournisseur
                    </v-card-title>
                    <v-card-text>
                        <v-combobox
                        v-model="providerName"
                        :items="providersList"
                        label="Nom du fournisseur"
                        ></v-combobox>
                        <v-text-field
                        v-model="providerPrice"
                        label="Prix chez le fournisseur"
                        :rules="rules.price"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="red" @click="dialogEditProvider = false">Annuler</v-btn>
                        <v-spacer/>
                        <v-btn color="success" @click="editProvider()">Valider</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn color="red" @click="deleteProduct()">Supprimer</v-btn>
            </v-col>
            <v-col cols="4" offset-md="4" class="text-right">
                <v-btn color="success" @click="updateProduct()">Sauvegarder</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.refreshProduct()
        this.$axios.get('/providers')
        .then((response)=> this.providers = response.data)
    },
    data() {
        return {
            rules:{
                price: value => {
                    return !/,/.test(value) || 'Probleme prix'
                }
            },
            dialogEditProvider: false,
            providers:[],
            infoValue:'',
            infoEdited:'',
            dialogInfo:false,
            providerName:'',
            providerPrice:'',
            dialogAddProvider:false,
            product: null,
            headersProvider:[
                {text:'Name',value:'name'},
                {text:'Prix (HT)',value:'price'},
                { text: 'Actions', value: 'actions', sortable: false },
            ]
        }
    },
    computed:{
        providersList() {
            return this.providers ? this.providers.map(provider => provider.name) : [] 
        }
    },
    methods:{
        refreshProduct() {
            this.$axios.get(`/products/${this.$route.params.id}`)
            .then((response)=> this.product = response.data)
        },
        openNewTab(url) {
            window.open(url,"_blank")
        },
        addProvider(){
            if(/,/.test(this.providerPrice)) return
            if(!this.providers.find(provider => provider.name === this.providerName)) {
                this.$axios.post('/providers',{name:this.providerName})
            }
            this.product.providers.push({name:this.providerName,price:this.providerPrice})
            this.dialogAddProvider = false
            this.$axios.put(`/products/${this.$route.params.id}`,this.product)
            this.refreshProduct()  
        },
        showProvider(item) {
            this.dialogEditProvider = true
            this.providerName = item.name
            this.providerPrice = item.price
        },
        editProvider() {
            this.product.providers.find(provider => provider.name === this.providerName).price = this.providerPrice
            this.$axios.put(`/products/${this.$route.params.id}`,this.product)
            this.refreshProduct()
            this.dialogEditProvider = false  
        },
        deleteProvider(item) {
            this.product.providers = this.product.providers.filter(p => p.name !== item.name)
            this.$axios.put(`/products/${this.$route.params.id}`,this.product)
            this.refreshProduct()
        },
        updateProduct() {
            this.$axios.put(`/products/${this.$route.params.id}`,this.product)
            .then(() => {
                this.$toast.success('Produit modifié')
                this.$router.push('/product')
            })
        },
        editInfo(info){
            this.infoEdited = info
            this.dialogInfo = true
            this.infoValue = this.product[info]
        },
        validateInfo(){
            this.dialogInfo = false
            this.product[this.infoEdited] = this.infoValue
        },
        deleteProduct() {
            this.$axios.delete(`/products/${this.product._id}`)
            .then(() => this.$router.push('/product'))
        }
    }
}
</script>
