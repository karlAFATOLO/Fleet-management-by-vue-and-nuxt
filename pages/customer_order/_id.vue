<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/customer_order"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                {{order.name}}
            </v-col>
            
            <v-col cols="4" class="text-right">
                <v-menu
                v-if="order.status"
                ref="refStatus"
                :close_on_click="true"
                :close-on-content-click="true"
                offset-y
                >
                    <template v-slot:activator="{ on }">
                        <v-btn
                        :color="getStatus.color"
                        v-on="on"
                        >
                        Status : {{getStatus.name}}
                        </v-btn>
                    </template>
                    <v-list dense>
                        <v-list-item
                            v-for="(item,index) in statusListColor"
                            :key="index"
                            @click="changeStatus(item.status)"
                        >
                            <v-list-item-title  :class="`${item.color}--text`">{{ item.name }}</v-list-item-title>
                            
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <div>Client : {{order.customer}}</div>
                <v-text-field
                v-model="order.commercial"
                label="Commercial"
                @change="ModifyOrder"
                ></v-text-field>
                <v-menu
                    ref="refDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    :return-value.sync="dateStart"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateStartFormated"
                        label="Date de départ"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStart" color="primary" locale="fr" @change="ModifyOrder">
                        <v-spacer/>
                        <v-btn text color="red" @click="menuDateStart = false">Cancel</v-btn>
                        <v-btn text color="success" @click="$refs.refDateStart.save(dateStart)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                    <v-menu
                    ref="refDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    :return-value.sync="dateEnd"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                    >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateEndFormated"
                        label="Date de fin"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateEnd" color="primary" locale="fr" @change="ModifyOrder">
                        <v-spacer/>
                        <v-btn text color="red" @click="menuDateEnd = false">Cancel</v-btn>
                        <v-btn text color="success" @click="$refs.refDateEnd.save(dateEnd)">OK</v-btn>
                    </v-date-picker>
                </v-menu>
                
            </v-col>
            <v-col cols="12">
                <v-textarea
                v-model="order.content"
                label="Périmètre"
                @change="ModifyOrder"
                outlined
                height="100px"
                ></v-textarea>
                <v-textarea
                v-model="order.commentary"
                label="Commentaires"
                @change="ModifyOrder"
                outlined
                height="100px"
                ></v-textarea>
                <v-textarea
                label="Revue d'init"
                @change="ModifyOrder"
                v-model="order.initReview"
                outlined
                height="100px"
                ></v-textarea>
                <v-row>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="Nombre de jour d'intervention"
                        v-model="order.installDuration"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="TJM (300 défaut)"
                        v-model="order.tjm"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6" >
                        <v-btn color="green">{{techCost}}€</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="Nombre de nuits"
                        v-model="order.nightsNumber"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="Coût nuit (70 défaut)"
                        v-model="order.nightCost"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6" >
                        <v-btn color="green">{{nightsCost}}€</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="Nombre de mètre"
                        v-model="order.wireDistance"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="cout du mètre (0.65 défaut)"
                        v-model="order.wireCostMeter"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6" >
                        <v-btn color="green">{{wireCost}}€</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="couts accessoires (100 défaut)"
                        v-model="order.accessories"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="couts de transport (voir mappy)"
                        v-model="order.travellingCost"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6" >
                        <v-btn color="green">{{accessories + travellingCost}}€</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="NDF"
                        v-model="order.ndf"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6">
                        <v-text-field
                        @change="ModifyOrder"
                        label="Cout de préparation (150/j)"
                        v-model="order.setupCost"
                        ></v-text-field>
                    </v-col>
                    <v-col col="6" >
                        <v-btn color="green">{{ndf + setupCost}}€</v-btn>
                    </v-col>
                </v-row>
                <v-row>
                    <v-btn text class="success--text">Montant Matériel :  {{Number.parseFloat(amountStorage + wireCost + accessories).toFixed(2)}}€ </v-btn>
                    <v-btn text class="success--text">Montant Total :  {{Number.parseFloat(amountStorage + wireCost + nightsCost + techCost + accessories + travellingCost + ndf + setupCost).toFixed(2)}}€ </v-btn>
                </v-row>
                <v-row>     
                    <v-col col="6">
                        <v-switch
                        @change="ModifyOrder"
                        v-model="order.materialAvailable"
                        label="Matériel disponible"
                        ></v-switch>
                    </v-col>
                    <v-col cols="6">
                        <v-switch
                        @change="ModifyOrder"
                        v-model="order.materialPrepared"
                        label="Matériel préparé"
                        ></v-switch>
                    </v-col>
                </v-row>
                <v-card class="mb-2">
                    <v-card-title>
                        Liste du materiel réservé<v-btn class="ml-2" @click="addReservedDialog = true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
                        <v-spacer/>
                        <v-text-field
                        v-model="searchReserved"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        clearable
                        ></v-text-field>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headers_reserved"
                        :items="order.reserved"
                        :search="searchReserved"
                        >
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                @click="modifyReservedShow(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteReserve(item.name)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
                <v-card>
                    <v-card-title>
                        Liste du materiel définitif<v-btn class="ml-2" @click="addFinalDialog = true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
                        <v-spacer/>
                        <v-text-field
                        label="Search"
                        append-icon="mdi-magnify"
                        v-model="searchFinal"
                        clearable
                        ></v-text-field>
                        <v-btn text class="success--text">Montant commande :  {{Number.parseFloat(amountStorage).toFixed(2)}}€ </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headers_final"
                        :items="itemsByOrder"
                        :search="searchFinal"
                        >
                        <template v-slot:item.price="{ item }">
                            {{item.price}}€
                        </template>
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
            <v-col cols="3" offset-md="9" class="text-right">
                <v-btn @click="saveOrder()" :color="saved ? 'grey' : 'success'">Sauvegarder</v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="addFinalDialog" persistent width="500px">
            <v-card>
                <v-card-title>
                    Ajout d'un produit
                </v-card-title>
                <v-card-text>
                    <v-combobox
                    v-model="itemNameChosen"
                    :items="productsList"
                    clearable
                    label="Produit"
                    ></v-combobox>
                    <v-combobox
                    v-model="itemSerialNumberChosen"
                    :items="serialNumberByItem"
                    label="N° de série"
                    clearable
                    @change="fillData(itemSerialNumberChosen)"
                    ></v-combobox>
                    <v-autocomplete
                    v-model="providerSelected"
                    :items="providerByProduct"
                    label="Fournisseur(si pas n° série)"
                    clearable
                    @input="selectPrice"
                    ></v-autocomplete>
                    <v-combobox
                    v-model="priceItem"
                    label="Prix pour produit libre"
                    ></v-combobox>
                    <v-text-field
                    label="quantité"
                    v-model="quantity"
                    :disabled="quantityDisabled"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="addFinalDialog = false;resetForm()">Annuler</v-btn>
                    <v-spacer/>
                    <v-btn color="success" @click="addProduct()">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="addReservedDialog" persistent width="500px">
            <v-card>
                <v-card-title>
                    Ajout d'un produit
                </v-card-title>
                <v-card-text>
                    <v-autocomplete
                    v-model="itemNameChosen"
                    :items="productsList"
                    label="Produit"
                    ></v-autocomplete>
                    <v-text-field
                    v-model="reservedQuantity"
                    label="Quantité à réserver"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="addReservedDialog = false;resetForm()">Annuler</v-btn>
                    <v-spacer/>
                    <v-btn color="success" @click="addReserve()">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modifyReservedDialog" persistent width="500px">
            <v-card>
                <v-card-title>
                    Modification d'un produit
                </v-card-title>
                <v-card-text>
                    <v-text-field
                    v-model="itemNameChosen"
                    readonly
                    label="Produit"
                    ></v-text-field>
                    <v-text-field
                    v-model="reservedQuantity"
                    label="Quantité à réserver"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" @click="modifyReservedDialog = false;resetForm()">Annuler</v-btn>
                    <v-spacer/>
                    <v-btn color="success" @click="modifyReserve()">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get(`/orders/${this.$route.params.id}`)
        .then((response)=> {
            this.order = response.data
            if(this.order.dateStart !== null)
                this.dateStart = this.$moment(this.order.dateStart).format("YYYY-MM-DD")
            if(this.order.dateEnd !== null)
                this.dateEnd = this.$moment(this.order.dateEnd).format("YYYY-MM-DD")
        })
        .catch(err=>this.order={})
        this.$axios.get('/products')
        .then((response) => this.products = response.data)
        this.refreshItems()
    },
    computed:{
        setupCost() {
            return this.order.setupCost ? this.order.setupCost * 1 : 0
        },
        ndf(){
            return this.order.ndf ? this.order.ndf * 1 : 0
        },
        travellingCost() {
            return this.order.travellingCost ? this.order.travellingCost * 1 : 0
        },
        accessories() {
            return this.order.accessories ? this.order.accessories * 1 : 0
        },
        nightsCost() {
            return (this.order.nightsNumber && this.order.nightCost) ? this.order.nightCost * this.order.nightsNumber : 0
        },
        techCost() {
            return (this.order.installDuration && this.order.tjm) ? this.order.tjm * this.order.installDuration : 0
        },
        wireCost() {
            return (this.order.wireDistance && this.order.wireCostMeter)  ? this.order.wireCostMeter * this.order.wireDistance : 0
        },
        getStatus() {
            return this.statusListColor.find( s => s.status === this.order.status)
        },
        dateStartFormated() {
            return this.$moment(this.dateStart).format('DD-MM-YYYY')
        },
        dateEndFormated() {
            return this.$moment(this.dateEnd).format('DD-MM-YYYY')
        },
        serialNumberByItem() {
            return (this.itemNameChosen != '' && this.itemNameChosen != null) ? this.items.filter(item => item.name === this.itemNameChosen && !item.order).map(item => item.serialNumber) : []
        },
        providerByProduct() {
            return (this.itemNameChosen != '' && this.itemNameChosen != null) ? this.products.find(p => p.name === this.itemNameChosen).providers.map( pr => pr.name ) : []
        },
        amountStorage() {
            return this.itemsByOrder ? this.itemsByOrder.reduce((accum, item) => accum + item.price,0) : 0
        },
        itemsByOrder() {
            return this.items.filter( item => item.order ? item.order !== null && item.order._id === this.order._id : false)
        },
        productsList() {
            return this.products ? this.products.map(product => product.name) : []
        }
    },
    data() {
        return {
            quantity:1,
            providerSelected:'',
            searchFinal:'',
            searchReserved:'',
            saved:true,
            priceItem:null,
            modifyReserved:null,
            modifyReservedDialog:false,
            products:[],
            reservedQuantity:'',
            itemNameChosen:'',
            quantityDisabled:false,
            itemSerialNumberChosen:'',
            items:[],
            dateStart:null,
            dateEnd:null,
            statusListColor:[
                {status:"created",color:"blue",name:"Crée"},
                {status:"in progress",color:"orange",name:"En cours de préparation"},
                {status:"prepared",color:"yellow",name:"Préparé"},
                {status:"installing",color:"purple",name:"En cours d'installation"},
                {status:"installed",color:"success",name:"Installé"}
            ],
            order:{},
            addFinalDialog:false,
            addReservedDialog:false,
            menuDateStart:false,
            menuDateEnd:false,
            headers_final:[
                {text:"Produit",value:"name"},
                {text:"N° Serie",value:"serialNumber"},
                {text:"Prix",value:"price"},
                {text: 'Actions', value: 'actions', sortable: false }
            ],
            headers_reserved:[
                {text:"Produit",value:"name"},
                {text:"Quantité",value:"quantity"},
                {text: 'Actions', value: 'actions', sortable: false }
            ]
            
        }
    },
    methods:{
        selectPrice(e) {
            if(this.providerSelected !== '' && this.providerSelected !== undefined) {
                this.priceItem = this.products.find(p => p.name === this.itemNameChosen).providers.find( pr => pr.name === this.providerSelected ).price
            }
            else 
                this.priceItem = ''
        },
        ModifyOrder() {
            this.saved = false
        },
        modifyReservedShow(item) {
            this.itemNameChosen = item.name
            this.reservedQuantity = item.quantity
            this.modifyReservedDialog = true
        },
        modifyReserve() {
            this.order.reserved.find(item => item.name === this.itemNameChosen).quantity = parseInt(this.reservedQuantity)
            this.modifyReservedDialog = false
            this.updateOrder()
        },
        resetForm() {
            this.itemNameChosen = ''
            this.reservedQuantity = ''
            this.itemSerialNumberChosen = ''
            this.providerSelected = ''
            this.priceItem = null
            this.quantityDisabled = false
        },
        deleteReserve(itemName) {
            this.order.reserved = this.order.reserved.filter(item => item.name !== itemName)
            this.updateOrder()
        },
        addReserve () {
            this.order.reserved.push({name:this.itemNameChosen,quantity:parseInt(this.reservedQuantity)})
            this.updateOrder()
            this.addReservedDialog = false
            this.resetForm()
        },
        addProduct() {
            this.addFinalDialog = false
            // Find item with the same name and same serialNumber and without order
            let item = this.items.find(item => item.name === this.itemNameChosen && item.serialNumber === this.itemSerialNumberChosen && !item.order)
            //if item found
            if(item) {
                item.order = {_id:this.order._id,customer:this.order.customer}
                this.updateItem(item)
            } else {
                //create item quantity
                for(let i = 0; i < this.quantity;i++) {
                    let item = {}
                    item.name = this.itemNameChosen
                    item.serialNumber = this.itemSerialNumberChosen
                    item.price = this.priceItem
                    item.order = {}
                    item.order.customer = this.order.customer
                    item.order._id = this.order._id
                    this.$axios.post('/items/',item)
                }
            }
            this.refreshItems()
            this.resetForm()
        },
        changeStatus(status) {
            this.order.status = status
            this.ModifyOrder()
        },
        updateOrder() {
            this.order.dateStart = this.$moment(this.dateStart)
            this.order.dateEnd = this.$moment(this.dateEnd) 
            this.$axios.put(`/orders/${this.order._id}`,this.order)
        },
        saveOrder() {
            this.updateOrder()
            this.$router.push('/customer_order')
        },
        dateFormat(date) {
            return this.$moment(date).format("DD/MM/YYYY")
        },
        refreshItems() {
            this.$axios.get('/items')
            .then((response) => {
                this.items = response.data
            })
            .catch(err=> this.items=[])
        },
        updateItem(item) {
            this.$axios.put(`/items/${item._id}`,item)
        },
        deleteItem(itemSelected) {
            if(itemSelected.serialNumber != "") {
                let item = this.items.find(item => item._id === itemSelected._id)
                item.order = null
                console.log(item)
                this.updateItem(item)
            } else {
                let item = this.items.filter(item => item.name === itemSelected.name).find(item => item.order._id === this.order._id)
                this.$axios.delete(`/items/${item._id}`,item)
            }
            this.refreshItems()
        },
        fillData(numserie) {
            let p = this.items.find(p => p.serialNumber == numserie && p.name == this.itemNameChosen )
            if(p){
                this.providerSelected = p.provider
                this.priceItem = p.price
                this.quantityDisabled = true
            }
        }
    }
}
</script>