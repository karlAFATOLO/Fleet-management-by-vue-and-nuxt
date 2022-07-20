<template>
<v-container>
    <v-row>
      <v-col cols="3" class="text-left">
        <v-btn to="/"><v-icon>fas fa-arrow-left</v-icon></v-btn>
      </v-col>
      <v-col cols="6" class="text-center">
          <v-btn color="success" class="black--text"> Montant du stock <span class="ml-4">{{Number.parseFloat(amountStorage).toFixed(2)}}€</span></v-btn>
        </v-col>
      <v-col cols="3" class="text-right">
        <v-btn @click="addDialog = true"><v-icon>fas fa-plus-circle</v-icon></v-btn>
      </v-col> 
    </v-row>
    <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Stock
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
              :headers="headersMain"
              :items="nameItemList"              
              :expanded.sync="expanded"
              show-expand
              :items-per-page="20"
              :search="search"
              item-key="name"
              >
              <template v-slot:item.alert="{item}">
                <v-icon v-if="item.alert" color="orange">fas fa-exclamation-triangle</v-icon>
              </template>
              <template v-slot:expanded-item="{item}">
                <td :colspan="headers.length">
                  <v-data-table
                  :items="itemsByName(item.name)"
                  :headers="headers"
                  >
                    <template v-slot:item.price="{ item }">
                      {{item.price}}€
                    </template>
                    <template v-slot:item.billAmount="{ item }">
                      <span v-if="item.billAmount">{{item.billAmount}}€</span>
                    </template>
                    <template v-slot:item.billDate="{ item }">
                      {{DateFormat(item.billDate)}}
                    </template>
                    <template v-slot:item.actions="{ item }">
                          <v-icon
                              small
                              class="mr-2"
                              @click="editItem(item)"
                          >
                              mdi-pencil
                          </v-icon>
                          <v-icon
                              small
                              @click="deleteItem(item)"
                          >
                              mdi-delete
                          </v-icon>
                      </template>
                  </v-data-table>
                </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
    </v-row>
    <v-dialog v-model="addDialog" persistent width="500px">
      <v-card>
        <v-card-title class="justify-center" >
          Ajout au stock
        </v-card-title>
        <v-card-text>
          <v-autocomplete
          :items="nameList"
          label="Désignation"
          v-model="nameSelected"
          clearable
          @change="eraseNameSelected"
          ></v-autocomplete>
          <v-autocomplete
          :items="referenceList"
          v-model="referenceSelected"
          label="Réference"
          clearable
          @change="eraseReferenceSelected"
          ></v-autocomplete>
          <v-select
          :items="providersList"
          label="Fournisseur"
          v-model="provider"
          clearable
          ></v-select>
          <v-text-field
          label="Prix du Produit (modifiable)"
          suffix="€"
          v-model="priceProduct"
          ></v-text-field>
          <v-text-field
          v-model="billReference"
          label="Réference Facture"
          ></v-text-field>
          <v-menu
            ref="refBillDate"
            v-model="menuBillDate"
            :close-on-content-click="false"
            :return-value.sync="billDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                v-model="billDate"
                label="Date de facture"
                prepend-icon="event"
                readonly
                v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="billDate" color="primary">
                <v-spacer/>
                <v-btn text color="red" @click="menuBillDate = false">Cancel</v-btn>
                <v-btn text color="success" @click="$refs.refBillDate.save(billDate)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          <v-text-field
          v-model="billAmount"
          suffix="€"
          label="Montant Facture"
          ></v-text-field>
          <v-switch
          v-model="switchMultiple"
          label="Ajout Multiples"
          ></v-switch>
          <v-text-field
          ref="serialNumber"
          v-model="serialNumber"
          label="Numero de Serie (ou code barre si matériel physique)"
          v-on:keyup.enter="addStorage()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="addDialog = false; resetForm()">Annuler</v-btn>
          <v-spacer/>
          <v-btn color="success" @click="addStorage()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog v-model="modifyDialog" persistent width="500px">
      <v-card>
        <v-card-title class="justify-center" >
          Modification Produit
        </v-card-title>
        <v-card-text>
          <v-autocomplete
          :items="nameList"
          label="Désignation"
          v-model="nameSelected"
          clearable
          ></v-autocomplete>
          <v-text-field
          v-model="referenceSelected"
          label="Réference"
          readonly
          ></v-text-field>
          <v-text-field
          v-model="serialNumber"
          label="Numero de Serie"
          ></v-text-field>
          <v-select
          :items="providersList"
          label="Fournisseur"
          v-model="provider"
          ></v-select>
          <v-text-field
          label="Prix du Produit (modifiable)"
          suffix="€"
          v-model="priceProduct"
          ></v-text-field>
          <v-text-field
          v-model="billReference"
          label="Réference Facture"
          ></v-text-field>
          <v-menu
            ref="refBillDate"
            v-model="menuBillDate"
            :close-on-content-click="false"
            :return-value.sync="billDate"
            transition="scale-transition"
            offset-y
            min-width="290px"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                v-model="billDate"
                label="Date de facture"
                prepend-icon="event"
                readonly
                v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker v-model="billDate" color="primary">
                <v-spacer/>
                <v-btn text color="red" @click="menuBillDate = false;resetForm()">Cancel</v-btn>
                <v-btn text color="success" @click="$refs.refBillDate.save(billDate)">OK</v-btn>
            </v-date-picker>
            </v-menu>
          <v-text-field
          v-model="billAmount"
          suffix="€"
          label="Montant Facture"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" @click="modifyDialog = false;resetForm()">Annuler</v-btn>
          <v-spacer/>
          <v-btn color="success" @click="modifyItem()">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
</template>

<script>
export default {
  mounted() {
    this.$axios.get("/products")
    .then((response) => this.products = response.data)
    .catch(err=>this.produts = [])
    this.refreshItems()
    this.$axios.get("/orders")
    .then((response) => this.orders = response.data)
    this.$axios.get("/providers")
    .then((response) => this.providers = response.data)
    this.$axios.get("/providerOrders")
    .then((response) => this.providerOrders = response.data)
  },
  data () {
    return {
      expanded:[],
      providers:[],
      providerOrders:[],
      orders:[],
      idItemModified:'',
      modifyDialog:false,
      search:'',
      menuBillDate:false,
      switchMultiple:false,
      serialNumber:'',
      billReference:'',
      provider:'',
      billDate:null,
      billAmount:'',
      nameSelected:'',
      referenceSelected:'',
      items:[],
      priceProduct:0,
      addDialog:false,
      products:[],
      headers: [
          {text:'Désignation',value:'name'},
          {text:'Réference',value:'reference'},
          {text:'N° Série',value:'serialNumber'},
          {text:'Fournisseur',value:'provider'},
          {text:'Prix',value:'price'},
          {text:'Réference Facture',value:'billReference'},
          {text:'Date Facture',value:'billDate'},
          {text:'Montant Facture',value:'billAmount'},
          {text: 'Actions', value: 'actions', sortable: false }

      ],
      headersMain: [
          {text:'Désignation',value:'name'},
          {text:'Alerte',value:'alert'},
          {text:'Virtuel',value:'virtual'},
          {text:'Réel',value:'real'},
          {text:'Commandé',value:'ordered'},
          {text:'Réservé',value:'reserved'},
          {text:'Limit',value:'limit'},
          {text: '', value:'data-table-expand' },
      ]
    }
  },
  computed:{
    nameItemList() {
      if(!this.products) return []
      else {
        let items = this.products
        items.forEach(i => {
          i.virtual = this.virtualByName(i.name)
          i.real = this.itemsByName(i.name).length
          i.reserved = this.reservedByName(i.name)
          i.ordered = this.orderedByName(i.name)
          i.limit = this.productByName(i.name).limitStock
          if(i.limit == 0 || i.limit == null) i.alert = false
          else {
            if(i.virtual < i.limit) i.alert = true
            else i.alert = false
          }
        })
        items = items.sort( (a,b) => {
          if(a.alert) return -1
          else return 1
        })
        return items
      } 
    },
    nameList() {
      if(this.products) {
        if(this.referenceSelected !== '') return this.products.filter(product => product.reference === this.referenceSelected).map(product => product.name)
        else return this.products.map(product => product.name)
      } else return []
    },
    providersList() {
      return this.productSelected !== null ? this.productSelected.providers.map(provider => provider.name)  : []
    },
    referenceList() {
      if(this.products) {
        if(this.nameSelected === '') return this.products.map(product => product.reference)
        else return this.products.filter(product => product.name === this.nameSelected).map(product => product.reference)
      } else return []
    },
    productSelected() {
      return this.nameSelected !== '' ? this.products.find(product => product.name === this.nameSelected) : null
    },
    amountStorage() {
      return this.items ? this.items.filter(item => !item.order).reduce((accum, item) => accum + item.price,0) + "€" : 0 + "€"
    }
  },
  methods:{
    eraseNameSelected() {
      if(this.nameSelected === undefined)
        this.nameSelected = ''
    },
    eraseReferenceSelected() {
      if(this.referenceSelected === undefined)
        this.referenceSelected = ''
    },
    clicked(value) {
      this.expanded.push(value)
    },
    refreshItems() {
      this.$axios.get("/items")
      .then((response) => this.items = response.data)
      .catch(err=>this.items = [])     
    },
    addStorage() {
      let item = {}
      item.name =  this.productSelected.name
      item.reference = this.productSelected.reference
      item.serialNumber = this.serialNumber
      item.price = this.priceProduct
      item.provider = this.provider
      item.billReference = this.billReference
      item.billDate = this.billDate
      item.billAmount = this.billAmount
      item.order = {}
      this.$axios.post("/items",item)
      .then(() => {
        this.refreshItems()
        this.serialNumber = ''
        this.$refs.serialNumber.focus()
        if(!this.switchMultiple) {
          this.addDialog = false
          this.resetForm()
        }
      })
      
    },
    DateFormat(date) {
      return date ? this.$moment(date).format("YYYY-MM-DD") : ''
    },
    itemsByName(itemName) {
      return this.items ? this.items.filter(item => item.name === itemName && !item.order) : []
    },
    reservedByName(itemName) {
      return this.orders ? this.orders.map(order => { 
      if(!order.reserved) return 0
      else {
        if(order.reserved.filter(item => item.name === itemName).length > 0) return order.reserved.find(item => item.name === itemName).quantity
        else return 0
      }
      }).reduce((accum, item) => accum + item,0) : 0
    },
    virtualByName(itemName) {
      return this.itemsByName(itemName).length + this.orderedByName(itemName) - this.reservedByName(itemName)
    },
    orderedByName(itemName) {
      if( !this.providerOrders) return 0
      else { 
        let quantityTable = []
        this.providerOrders.forEach( order => {
            if(order.products.find(product => product.name === itemName && product.received != true) && order.status === 'ordered')
            quantityTable.push(order.products.find(product => product.name === itemName).quantity)
          });
        return quantityTable.reduce((accum, item) => accum + item,0)
      }
    },
    productByName(itemName){
      return this.products ? this.products.find(product => product.name === itemName) : []
    },
    deleteItem(item) {
      this.$axios.delete(`/items/${item._id}`)
      .then(() =>this.refreshItems())
      
    },
    editItem(item){
      this.nameSelected = item.name
      this.serialNumber = item.serialNumber
      this.provider = item.provider
      this.billReference = item.billReference
      this.billDate = this.DateFormat(item.billDate)
      this.billAmount = item.billAmount
      this.idItemModified = item
      this.modifyDialog = true
    },
    modifyItem() {
      this.idItemModified.name =  this.productSelected.name
      this.idItemModified.reference = this.productSelected.reference
      this.idItemModified.serialNumber = this.serialNumber
      this.idItemModified.provider = this.provider
      this.idItemModified.price = this.priceProduct
      this.idItemModified.billReference = this.billReference
      this.idItemModified.billDate = this.$moment(this.billDate)
      this.idItemModified.billAmount = this.billAmount
      this.$axios.put(`/items/${this.idItemModified._id}`,this.idItemModified)
      .then(() => {
        this.refreshItems()
        this.modifyDialog = false
        this.resetForm()
        this.idItemModified = null
      })
    },
    resetForm() {
      this.serialNumber = ''
      this.referenceSelected = ''
      this.nameSelected = ''
      this.provider = ''
      this.billReference = ''
      this.billDate = null
      this.billAmount = ''
      this.switchMultiple = false
    }
  },
  watch:{
    provider : function() {
      if (this.provider !== '' && this.productSelected !== null) {
        let pro = this.productSelected.providers.find( provider => provider.name === this.provider)
        if (pro) {
          this.priceProduct =  pro.price
        } else return 0
      } else return 0
    }
  }
}
</script>