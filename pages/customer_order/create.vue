<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/customer_order"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Création d'une commande
            </v-col>
            
            <v-col cols="4" class="text-right">
                <span class="blue--text">Status : Créé </span>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-text-field
                v-model="nameOrder"
                label="Nom de la commande"
                ></v-text-field>
                <v-autocomplete
                    v-model="customerOrder"
                    :items="customerList"
                    label="Client"
                    clearable
                    placeholder="Si le client n'existe pas, créez le dans le boo"
                ></v-autocomplete>
                <v-text-field
                v-model="commercialOrder"
                label="Commercial"
                ></v-text-field>
                <v-menu
                    ref="refDateStart"
                    v-model="menuDateStart"
                    :close-on-content-click="false"
                    :return-value.sync="dateStartOrder"
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
                    <v-date-picker v-model="dateStartOrder" color="primary" locale="fr">
                        <v-spacer/>
                        <v-btn text color="red" @click="menuDateStart = false">Cancel</v-btn>
                        <v-btn text color="success" @click="$refs.refDateStart.save(dateStartOrder)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                    <v-menu
                    ref="refDateEnd"
                    v-model="menuDateEnd"
                    :close-on-content-click="false"
                    :return-value.sync="dateEndOrder"
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
                    <v-date-picker v-model="dateEndOrder" color="primary" locale="fr">
                        <v-spacer/>
                        <v-btn text color="red" @click="menuDateEnd = false">Cancel</v-btn>
                        <v-btn text color="success" @click="$refs.refDateEnd.save(dateEndOrder)">OK</v-btn>
                    </v-date-picker>
                    </v-menu>
                
            </v-col>
            <v-col cols="12">
                <v-textarea
                label="Périmètre"
                v-model="contentOrder"
                outlined
                height="100px"
                ></v-textarea>
                <v-textarea
                label="Commentaires"
                v-model="commentaryOrder"
                outlined
                height="100px"
                ></v-textarea>
                <v-textarea
                label="Revue d'init"
                v-model="initReview"
                outlined
                height="100px"
                ></v-textarea>
            </v-col>
            <v-col cols="3" offset-md="9" class="text-right">
                <v-btn color="success" @click="createOrder()">Sauvegarder</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('/centers')
        .then((response)=> {
            this.customerList = response.data.map(center => center.name)
        })
    },
    data() {
        return {
            commercialOrder:'',
            initReview:'',
            commentaryOrder:'',
            customerOrder:'',
            nameOrder:'',
            dateStartOrder:new Date().toISOString().substr(0,10),
            dateEndOrder:new Date().toISOString().substr(0,10),
            contentOrder:'',
            customerList:[],
            menuDateStart:false,
            menuDateEnd:false,
        }
    },
    methods:{
        createOrder() {
            let order = {}
            order.name = this.nameOrder
            order.customer = this.customerOrder
            order.status = "created"
            order.dateStart = this.$moment(this.dateStartOrder)
            order.dateEnd = this.$moment(this.dateEndOrder)
            order.content = this.contentOrder
            order.commentary = this.commentaryOrder
            order.initReview = this.initReview
            order.materialAvailable = false
            order.materialPrepared = false
            order.commercial = this.commercialOrder
            this.$axios.post('/orders',order)
            .then((response)=> {
                this.$toast.success("Commande crée")
                this.$router.push('/customer_order')
            })
        }
    },
    computed:{
        dateStartFormated() {
            return this.$moment(this.dateStartOrder).format('DD-MM-YYYY')
        },
        dateEndFormated() {
            return this.$moment(this.dateEndOrder).format('DD-MM-YYYY')
        },
    }
}
</script>