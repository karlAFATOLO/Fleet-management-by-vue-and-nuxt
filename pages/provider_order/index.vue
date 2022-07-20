<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Listes des commandes fournisseurs
            </v-col>
            <v-col cols="4" class="text-right">
                <v-btn to="/provider_order/create"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-data-table
                :items="providerOrders"
                :headers="headers"
                @click:row="openOrder"
                >
                <template v-slot:item.date="{item}">
                    {{$moment(item.date).format("HH:mm DD/MM/YYYY")}}
                </template>
                <template v-slot:item.products="{item}">
                    {{sumProducts(item.products)}}
                </template>
                <template v-slot:item.status="{item}">
                   <v-btn text v-if="item.status === 'created'" :color="item.status === 'created' ? 'primary' : ''">Créé</v-btn>
                   <v-btn text v-else-if="item.status === 'ordered'" :color="item.status === 'ordered' ? 'orange' : ''">Commandée</v-btn>
                   <v-btn text v-else-if="item.status === 'delivered'" :color="item.status === 'delivered' ? 'success' : ''">Reçue</v-btn>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        @click="showOrder(item)"
                    >
                        mdi-pencil
                    </v-icon>
                        </template>
                </v-data-table>
            </v-col>
        </v-row>
        <v-row>
            <v-spacer/>
            <v-btn color="grey" @click="close()">Fermer</v-btn>
        </v-row>
        <v-dialog v-model="orderdialog" width="1000px" persistent>
            <v-card v-if="order">
                <v-card-title>
                    <v-row>
                        <v-col cols="6">
                            Commande {{order.name}} <br/> le {{this.$moment(order.date).format("DD/MM/YYYY")}}
                        </v-col>
                        <v-col cols="6">
                            <v-select
                                v-model="order.status"
                                :items="status"
                                label="Status"
                                class="ml-4"
                                @change="editStatus(order.id)"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :headers="headersOrder"
                        :items="order.products"
                    >
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                :color="item.received ? 'success' : 'red'"
                                @click="ToggleReceivedItem(order,item)"
                            >
                                mdi-check
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red" :disabled="order.products ? order.products.length > 0 : false" @click="deleteOrder()" >Supprimer</v-btn>
                    <v-spacer/>
                    <v-btn color="grey" @click="orderdialog = false">Fermer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('/providerOrders')
        .then((response) => this.providerOrders = response.data)
    },
    data() {
        return {
            status:['created','ordered','delivered'],
            itemSelected:'',
            quantityValue:null,
            orderdialog:false,
            providerOrders:[],
            headers:[
                {text:'Fournisseur',value:'name'},
                {text:'Date',value:'date',align:'center'},
                {text:'Nombre de produits',value:'products',align:'center'},
                {text:'Status',value:'status',align:'center'},
                {text: 'Actions', value: 'actions', sortable: false }
            ],
            orderId:'',
            headersOrder:[
                {text:"Désignation",value:'name'},
                {text:"Quantité",value:'quantity',align:'center'},
                {text: 'Actions', value: 'actions', sortable: false }
            ]
        }
    },
    computed:{
        order() {
            return this.providerOrders ? this.providerOrders.find(o => o._id === this.orderId) : {} 
        }
    },
    methods:{
        ToggleReceivedItem(order,item) {
            this.order.products.find(p => p.name === item.name).received = !this.order.products.find(p => p.name === item.name).received
            this.$axios.put(`/providerOrders/${this.order._id}`,this.order)
            this.$axios.get('/providerOrders')
            .then((response) => this.providerOrders = response.data)
        },
        showOrder(item) {
            this.$router.push(`/provider_order/${item._id}`)
        },
        deleteOrder() {
            this.$axios.delete(`/providerOrders/${this.order._id}`)
            this.$axios.get('/providerOrders')
            .then((response) => this.providerOrders = response.data)
            this.orderdialog = false
        },
        editStatus(orderId) {
            this.$axios.put(`/providerOrders/${this.order._id}`,this.order)
        },
        sumProducts(products) {
            let sum = 0;
            products.forEach(element => {
                sum += element.quantity
            });
            return sum
        },
        openOrder(e) {
            this.orderdialog = true
            this.orderId = e._id
        },
        close() {
            this.$router.push("/")
        }
    }
}
</script>