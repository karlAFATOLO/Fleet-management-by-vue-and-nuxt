<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Repartition materiel chez les clients
            </v-col>
            <v-col cols="4" class="text-right"> 
            </v-col>
        </v-row>
        <v-card class="mt-3">
            <v-card-title>
                <v-container>
                <v-row>
                    <v-col cols="6">
                        <v-btn color="success">Somme des produits : {{Number.parseFloat(amountItemsFiltered).toFixed(2)}}€</v-btn>
                    </v-col>
                    <!-- <v-col cols="6">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            clearable
                        ></v-text-field>
                    </v-col> -->
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-autocomplete
                        v-model="centerSelected"
                        :items="customers"
                        label="centres"
                        clearable
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                        v-model="billSelected"
                        :items="billList"
                        label="Référence facture"
                        clearable
                        ></v-autocomplete>
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
                </v-row>
                </v-container>          
            </v-card-title>
            <v-card-text>
                <v-data-table
                :items="itemsFiltered"
                :headers="headers"
                :search="search"
                >
                <template v-slot:item.price="{item}">
                    {{Number.parseFloat(item.price).toFixed(2)}}€
                </template>
                <template v-slot:item.billAmount="{item}">
                    <div v-if="item.billAmount">{{Number.parseFloat(item.billAmount).toFixed(2)}}€</div>
                </template>
                <template v-slot:item.billDate="{item}">
                    {{dateFormat(item.billDate)}}
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get("/items")
        .then((response) => {
            var data = response.data.filter(item => item.order)
            this.items = data.map( item => {return {name:item.name,reference:item.reference,customer:item.order.customer,serialNumber:item.serialNumber,price:item.price,billReference:item.billReference,billDate:item.billDate,billAmount:item.billAmount}})  
            //this.itemsBySearch = this.items
        })
        .catch(err=>this.items = [])
         this.$axios.get("/centers")
         .then((response) => {
             this.customers = response.data.map(center => center.name)
         })
    },
    data() {
        return {
            centerSelected:'',
            billSelected:'',
            customers:[],
            search:'',
            itemsBySearch:[],
            items:[],
            headers:[
                {text:"Désignation",value:"name"},
                {text:"Référence",value:"reference"},
                {text:"Client",value:"customer"},
                {text:"N° Série",value:"serialNumber"},
                {text:"Prix",value:"price"},
                {text:"Référence facture",value:"billReference"},
                {text:"Date facture",value:"billDate"},
                {text:"Montant facture",value:"billAmount"},
            ]
        }
    },
    methods:{
        dateFormat(date) {
            return date ? this.$moment(date).format("DD/MM/YYYY") : ''
        },
        getFiltered(e) {
            this.itemsBySearch = e
        }
    },
    computed:{
        amountItemsFiltered() {
            //return this.itemsBySearch ? this.itemsBySearch.reduce((accum, item) => accum + item.price,0) : 0
            return this.itemsFiltered ? this.itemsFiltered.reduce((accum, item) => accum + item.price,0) : 0
        },
        billList() {
            return this.items ? this.items.map(item => item.billReference) : []
        },
        itemsFiltered() {
            let itemsFiltered = this.items
            if(this.centerSelected) itemsFiltered = itemsFiltered.filter(item => item.customer === this.centerSelected)
            if(this.billSelected) itemsFiltered = itemsFiltered.filter(item => item.billReference === this.billSelected)
            return this.items ? itemsFiltered : []
        }
    }
}
</script>