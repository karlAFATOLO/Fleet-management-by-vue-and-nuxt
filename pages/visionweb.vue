<template>
  
<v-card class="overflow-hidden">
    <v-container fluid>
    <v-app-bar
      absolute
      color="#A60204"
      dark
      shrink-on-scroll
      prominent
      src="https://i.goopics.net/4fmnvx.gif"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(255,0,0,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
        <!-- icone de navigation  -->
      
 <!-- <h6
  class="font-italic">
      {{counter}}
 </h6>  -->
      <v-toolbar-title class="font-weight-thin" >Vision NGTV </v-toolbar-title>

      <v-spacer></v-spacer>

        <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      

      <v-menu
        bottom
        left
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn  color="red">Mise a jour {{counter}}</v-btn>
        </template> -->

            

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>





      <template v-slot:extension>
          
        <v-tabs align-with-title  v-model="value">
            
            <v-tab class="font-weight-light" to="vision" > Centre Office </v-tab>
            <v-tab to="visionweb" > Serveur Web </v-tab>
            <v-tab class="font-weight-light" to="visionia" > Serveur IA </v-tab>

        </v-tabs>
 
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-4"
      class="overflow-y-auto"
      max-height="990"
      
    >

            



      <v-container style="height: 1000px;">
          
            <br><br><br><br><br><br><br><br><br>

        <!-- le contener de la page centre office   -->


        <!---->


    
<!-- fin de la page centre office -->
<!-- Page vue server -->



        <v-row class="font-weight-light" >
            <v-col >
                
                <v-data-table
                :items="webServer"
                :headers="headers_webserver"
                disable-pagination
                :sort-by="['trouble','alive']"
                :sort-desc="[true,true]"
                multi-sort
                >
                <template v-slot:item.id="{item}">
                    {{ centerName(item.sport_center_id) }}
                </template>
                <template v-slot:item.os="{item}">
                    <v-icon v-if="item.os == 1">fab fa-windows</v-icon>
                    <v-icon v-else>fab fa-linux</v-icon>
                </template>
                <template >
                    
                </template>
                <template v-slot:item.stateServer="{item}">
                    <v-icon :disabled="!item.alive"  :class="item.front_on ? 'green--text ma-1' : 'red--text ma-1'">fab fa-chrome</v-icon>
                    <v-icon :disabled="!item.alive"  :class="item.api_on ? 'green--text ma-1' : 'red--text ma-1'">fab fa-docker</v-icon>
                    <v-icon :disabled="!item.alive"  :class="item.database_on ? 'green--text ma-1' : 'red--text ma-1'">fas fa-database</v-icon>
                </template>
                </v-data-table>
            </v-col>
            
        </v-row>


         


      </v-container>


      
    </v-sheet>
   






</v-container >
<v-progress-linear dark color="red" stream aria-valuenow="10"  aria-relevant="" buffer-value="0"  ></v-progress-linear>
  </v-card>

 
  
    
</template>

<script>
import moment from 'moment';
export default {
    auth: false,
    mounted(){
        this.getData()
        this.intervalId = setInterval(() => {
            this.counter--
            if(this.counter == 0) {
                this.counter = 30
                this.getData()
            }
        },1000)
    },
    // filtre 
    computed:{
       centerFiltered(){
           return this.OfflineCenterShowed ? this.centers : this.centers.filter(c => !this.isOffline(c.id))
       },
       centerOffline() {
           return this.centers.filter(c => this.isOffline(c.id)).length
       },
       webServer() {
           return this.computers.filter(c => c.type == "web_server" && this.getVisiblebyCenter(c.sport_center_id)).map( c => {return{id:c.id,sport_center_id :c.sport_center_id,os:c.os,available_space:c.available_space,alive:c.alive,pedro_version:c.pedro_version,front_on:c.front_on,api_on:c.api_on,database_on:c.database_on,trouble:this.serverHasTrouble(c.id)}})
       },
       iaServer(){
           return this.computers.filter(c => c.type == "calculation_server" && c.survey_on == 1)
       } 
    },
    data() {
        return {
            OfflineCenterShowed:true,
            ServerView:true,
            counter:30,
            intervalId:'',
            expanded: [],
            computers:[],
            centers:[],
            cameras:[],
            fields:[],
            headers_computers:[
                {text:"id",value:"id"},
                {text:"Centre",value:"sport_center_id"},
                {text:"Name",value:"name"},
                {text:"Last Update",value:"last_date_time_alive"},
                {text:"Espace Libre",value:"available_space"},
                {text:"Explorer",value:"explorer_on"},
                {text:"Surveillance",value:"survey_on"},
                {text:"Chrome",value:"browser_on"},
                {text:"Hi5 Version",value:"hi5_version"},
                {text:"Minion Version",value:"minion_version"},
                {text:"Pedro Version",value:"pedro_version"}

            ],
            headers_centers:[
                {text:"Nom du centre",value:"name"},
                {text:"Etat PCs",value:"statePC"},
                {text:"Etat Server",value:"stateServer"},
                {text:"Etat Camera",value:"stateCameras"},
                { text: '', value: 'data-table-expand' }
            ],
            headers_webserver:[
                {text:"Centre",value:"id"},
                {text:"Type",value:"os"},
                {text:"Espace Libre",value:"available_space"},
                {text:"Version",value:"pedro_version"},
                {text:"Etat Server",value:"stateServer"}
            ],
            
        }
    },
    methods:{
        dateFormat(date) {
            return date ? this.$moment(date).format("DD/MM/YYYY HH:mm") : ''
        },
        centerName(id) {
            let center = this.centers.find(c => c.id == id)
            return center ? center.name : ''
        },
        getData() {
            this.$axios.get("http://145.239.78.244:9090/computers")
            .then((response) => {
                this.computers = response.data
                this.$axios.get("http://145.239.78.244:9090/centers")
                .then((response) => {
                    this.centers = response.data.filter(c => c.visible)
                    this.checkUpdate()
                    this.$axios.get("http://145.239.78.244:9090/fields")
                    .then((response) => {
                        this.fields = response.data
                    })
                    this.$axios.get("http://145.239.78.244:9090/cameras")
                    .then((response) => {
                        this.cameras = response.data
                    })
                })
            })
        },
        statePC(id) {
            let totalPC = this.computers.filter(c => c.sport_center_id == id)
            return totalPC ? totalPC : ""
        },
        getDataServer(id) {
            let pc = this.computers.find(c => c.sport_center_id == id && c.type == "web_server")
            return pc ? pc : ""
        },
        getVisiblebyCenter(id) {
            let visible = this.centers.find( c => c.id == id)
            return visible ? visible : false
        },
        getCameraCenter(id) {
            let fieldsByCenter = this.fields.filter(f => f.sport_center_id == id).map( f => {return f.id})
            if(fieldsByCenter) {
                let camerasByCenter = this.cameras.filter(c => fieldsByCenter.find(f => f == c.field_id)).map(c => {return {id:c.id,name:c.name,on:c.switched_on}})
                return camerasByCenter
            } else {
                return ""
            }
        },
        // recuperation de l'espace disponible sur le serveur des centres
        getEpaceCentr(id) {
            let pc = this.computers.find(c => c.sport_center_id == id && c.type == "web_server")

        },
        serverHasTrouble(id){
            let server = this.computers.find( c => c.id == id)
            if(server && server.alive) {
                if(!server.front_on || !server.api_on || !server.database_on)
                {
                    return true
                } else {
                    return false
                } 
            } else {
                return false
            }
        },
        hasTrouble(id) {
            if(this.statePC(id).filter(c => c.alive).length != 0 && this.statePC(id).length > 0) {
                if(!this.getDataServer(id).database_on || !this.getDataServer(id).front_on || !this.getDataServer(id).api_on)
                {
                    return true
                }
                return false
            }
            else
                return false
        },
        isOffline(id) {
            if(this.statePC(id).filter(c => c.alive).length == 0 && this.statePC(id).length >= 0) {
                return true
            }
            else
                return false
        },
        updateMinion(id) {
            let url = "http://145.239.78.244:9090/computers/"+ id + "/update_minion"
            this.$axios.get(url)
            
        },
        updatePedro(id) {
            let url = "http://145.239.78.244:9090/computers/"+ id + "/update_pedro"
            this.$axios.get(url)
            
        },
        importBDD(id) {
            let url = "http://145.239.78.244:9090/computers/"+ id + "/import_start"
            this.$axios.get(url)
            
        },
        reloadBrowser(id) {
            let url = "http://145.239.78.244:9090/computers/"+ id + "/reload_front"
            this.$axios.get(url)
            
        },
        checkUpdate() {
            for(let i=0;i<this.computers.length;i++) {
                let duration = moment(moment()).diff(this.computers[i].last_date_time_alive)
                if((duration / (60*1000)) > 5 )
                    this.computers[i].alive = false
            }
        }

    }

    
}


</script>

