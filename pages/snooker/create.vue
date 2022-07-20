<template>
    <v-container>
        <v-card>
            <v-card-title>
                Création de partie
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="6">
                        <v-card>
                            <v-card-title>
                                Team A
                            </v-card-title>
                            <v-card-text>
                            <v-select
                            :items="list_teamA_player1"
                            placeholder="Joueur 1"
                            v-model="teamA_player1"
                            clearable
                            >
                            </v-select>
                            <v-select
                            :items="list_teamA_player2"
                            placeholder="Joueur 2"
                            v-model="teamA_player2"
                            clearable
                            >
                            </v-select>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card>
                            <v-card-title>
                                Team B
                            </v-card-title>
                            <v-card-text>
                            <v-select
                            :items="list_teamB_player1"
                            placeholder="Joueur 1"
                            v-model="teamB_player1"
                            clearable
                            >
                            </v-select>
                            <v-select
                            :items="list_teamB_player2"
                            placeholder="Joueur 2"
                            v-model="teamB_player2"
                            clearable
                            >
                            </v-select>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" to="/snooker">Annuler</v-btn>
                <v-spacer/>
                <v-btn color="green" @click="createGame()">Créer</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    auth: false,
    mounted() {
        this.$axios.get("/players")
        .then((response) => {
            this.players = response.data.map( d => {return d.name})
        })
    },
    computed:{
        list_teamA_player1(){
            let playersFiltered = this.players
            if(this.players) {
                return this.players.filter(p => p !== this.teamA_player2 && p !== this.teamB_player1 && p !== this.teamB_player2)
            } else return []
        },
        list_teamA_player2(){
            let playersFiltered = this.players
            if(this.players) {
                return this.players.filter(p => p !== this.teamA_player1 && p !== this.teamB_player1 && p !== this.teamB_player2)
            } else return []
        },
        list_teamB_player1(){
            let playersFiltered = this.players
            if(this.players) {
                return this.players.filter(p => p !== this.teamA_player1 && p !== this.teamA_player2 && p !== this.teamB_player2)
            } else return []
        },
        list_teamB_player2(){
            let playersFiltered = this.players
            if(this.players) {
                return this.players.filter(p => p !== this.teamA_player1 && p !== this.teamA_player2 && p !== this.teamB_player1)
            } else return []
        }
    },
    data() {
        return {
            players:[],
            teamA_player1:null,
            teamA_player2:null,
            teamB_player1:null,
            teamB_player2:null
        }
    },
    methods:{
        updateList(val, id) {
            this.playersAvailable = this.players.filter( p => p !== val)
        },
        createGame() {
            if(this.teamA_player1 && this.teamB_player1) {
                var teamA = []
                var teamB = []
                teamA.push(this.teamA_player1)
                teamB.push(this.teamB_player1)
                if(this.teamA_player2) {
                    teamA.push(this.teamA_player2)
                }
                if(this.teamB_player2) {
                    teamB.push(this.teamB_player2)
                }
                let game = {}
                game.teamA = teamA
                game.teamB = teamB
                game.date = this.$moment()
                this.$axios.post('/games',game)
                .then((response)=> {  
                    this.$router.push(`/snooker/${response.data._id}`)
                })
            }
            else {
                //pas de premier joueur
            }

        }
    }
}
</script>