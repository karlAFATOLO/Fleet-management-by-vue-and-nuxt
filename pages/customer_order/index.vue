<template>
    <v-container>
        <v-row>
            <v-col cols="2" class="text-left">
                <v-btn to="/"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="10" class="text-center">
                Listes des commandes
            </v-col>
            <v-col cols="4">
                <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                clearable
            ></v-text-field>
            </v-col>
            <v-spacer/> 
            <v-col cols="4" class="text-right">
                <v-switch
                v-model="showInstalled"
                label="Installé"
                ></v-switch> 
                <v-btn to="/customer_order/calendar"><v-icon>far fa-calendar-alt</v-icon></v-btn>
                <v-btn to="/customer_order/create"><v-icon>fas fa-plus-circle</v-icon></v-btn>
            </v-col>
            <v-col cols="12">
                <v-data-table
                    :headers="headers"
                    :items="ordersFiltered"
                    @click:row="openOrder"
                    show-expand
                    :expanded.sync="expanded"
                    item-key="name"
                    sort-by="dateStart"
                    sort-asc
                    :search="search"
                >
                <template v-slot:item.status="{ item }">
                    <div :class="`${getStatus(item.status).color}--text`">{{getStatus(item.status).name}}</div>
                </template>
                <template v-slot:item.dateStart="{item}">
                    {{dateFormat(item.dateStart)}} - {{dateFormat(item.dateEnd)}}
                </template>
                <template v-slot:item.dateEnd="{item}">
                    {{numberWeekday(item)}}
                </template>
                <template v-slot:item.order="{item}">
                    {{Number.parseFloat(amountOrder(item)).toFixed(2)}}€
                </template>
                <template v-slot:item.materialAvailable="{item}">
                    <div v-if="item.materialAvailable" class="success--text">OK</div>
                    <div v-else class="red--text">NOK</div>
                </template>
                 <template v-slot:item.materialPrepared="{item}">
                    <div v-if="item.materialPrepared" class="success--text">OK</div>
                    <div v-else class="red--text">NOK</div>
                </template>
                <template v-slot:item.reserved="{item}">
                    <span v-if="item.reserved.length > 0">Oui</span>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">Périmètre : {{ item.content }}</td>
                </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('/orders')
        .then((response)=> this.orders = response.data)
        this.$axios.get('/items')
        .then((response)=> this.items = response.data)
    },
    data(){
        return {
            showInstalled:false,
            expanded:[],
            statusListColor:[
                {status:"created",color:"blue",name:"Crée"},
                {status:"in progress",color:"orange",name:"En cours de préparation"},
                {status:"prepared",color:"yellow",name:"Préparé"},
                {status:"installing",color:"purple",name:"En cours d'installation"},
                {status:"installed",color:"success",name:"Installé"}
            ],
            order:null,
            orders:[],
            items:[],
            search:'',
            headers:[
                {text:'Désignation',value:'name',align:'center'},
                {text:'Client',value:'customer',align:'center'},
                {text:'Commercial',value:'commercial',align:'center'},
                {text:'Date de d\'intervention',value:'dateStart',align:'center'},
                {text:'Nb de jours',value:'dateEnd',align:'center'},
                {text:'Montant Total',value:'order',align:'center'},
                {text:'Materiel disponible',value:'materialAvailable',align:'center'},
                {text:'Materiel préparé',value:'materialPrepared',align:'center'},
                {text:'Materiel Reservé',value:'reserved',align:'center'},
                {text:'Status',value:'status',align:'center'}
            ]
        }
    },
    computed: {
        ordersFiltered () {
            return this.orders ? this.showInstalled == false ? this.orders.filter( o => o.status !== "installed") : this.orders : []
        }
    },
    methods:{
        
        openOrder(value) {
            this.$router.push(`/customer_order/${value._id}`)
        },
        getStatus(status){
            return this.statusListColor.find( s => s.status === status)
        },
        dateFormat(date) {
            return this.$moment(date).format("DD/MM/YYYY")
        },
        amountOrder(order) {
            let setupCost = 0
            let costNights = 0
            let costTech = 0
            let costWire = 0
            let accessories = 0
            let travellingCost = 0
            let ndf = 0
            if(order.nightCost && order.nightsNumber) costNights = order.nightCost * order.nightsNumber
            if(order.installDuration && order.tjm) costTech = order.installDuration * order.tjm
            if(order.wireDistance && order.wireCostMeter) costWire = order.wireDistance * order.wireCostMeter
            if(order.accessories) accessories = order.accessories
            if(order.travellingCost) travellingCost = order.travellingCost
            if(order.ndf) ndf = order.ndf
            if(order.setupCost) setupCost = order.setupCost
            return this.itemsByOrder(order) ? this.itemsByOrder(order).reduce((accum, item) => accum + item.price,0) + costNights + costTech + costWire + accessories + travellingCost + ndf + setupCost : 0
        },
        itemsByOrder(order) {
            return this.items.filter(item => item.order ? order._id === item.order._id : false)
        },
        numberWeekday(order) {
            let start = this.$moment(order.dateStart)
            let end = this.$moment(order.dateEnd)
            let weekdayCounter = 0
            while (start <= end) {
                if (this.$moment(start).format('d') !== '0' && this.$moment(start).format('d') !== '6'){
                     weekdayCounter = weekdayCounter + 1
                }
                start = this.$moment(start).add(1, 'days'); //increment by one day
            }
            return weekdayCounter
        }
    }
}
</script>