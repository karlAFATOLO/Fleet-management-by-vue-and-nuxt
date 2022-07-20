<template>
    <v-container>
        <v-row>
            <v-col>
            <v-btn to="/snooker">Retour</v-btn>
            </v-col>
            <!-- <v-col>
            <v-card color="green">
                <v-card-title>
                Partie Jouées
                </v-card-title>
                <v-card-text>
                {{games.length}}
                </v-card-text>
            </v-card>
            </v-col> -->
        </v-row>
        <v-row>
        <v-card v-for="item in players" :key="item.id" class="ma-2">
            <v-card-title>
            {{item.name}}
            </v-card-title>
            <v-card-text>
            
            <div class="green--text">{{(item.wins * 100 / item.games.length).toFixed(2)}} %</div>
            <div class="orange--text">{{(item.null * 100 / item.games.length).toFixed(2)}} %</div>
            <div class="red--text">{{(item.lost * 100 / item.games.length).toFixed(2)}} %</div>
            </v-card-text>
        </v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    auth: false,
    mounted(){
        this.$axios.get("/games")
        .then((response) => {
            this.games = response.data.filter(g => g.scoreTeamA != 0 || g.scoreTeamB != 0)
            this.$axios.get("/players")
            .then((response) => {
                this.players = response.data
                this.makeStats()
            })
        })
        
    },
    data() {
        return {
            games:[],
            players:[]
        }
    },
    methods:{
        makeStats() {
            for(let i=0;i<this.players.length;i++){
                this.players[i].wins = 0
                this.players[i].lost = 0
                this.players[i].null = 0
                this.players[i].games = this.games.filter( g => g.teamA.includes(this.players[i].name) || g.teamB.includes(this.players[i].name) )
                for(let j=0;j<this.players[i].games.length;j++){
                    if(this.players[i].games[j].teamA.includes(this.players[i].name) && this.players[i].games[j].scoreTeamA > 60)
                        this.players[i].wins++
                    if(this.players[i].games[j].teamB.includes(this.players[i].name) && this.players[i].games[j].scoreTeamB > 60)
                        this.players[i].wins++
                    if(this.players[i].games[j].teamA.includes(this.players[i].name) && this.players[i].games[j].scoreTeamA == 60)
                        this.players[i].null++
                    if(this.players[i].games[j].teamB.includes(this.players[i].name) && this.players[i].games[j].scoreTeamB == 60)
                        this.players[i].null++
                    if(this.players[i].games[j].teamA.includes(this.players[i].name) && this.players[i].games[j].scoreTeamA < 60)
                        this.players[i].lost++
                    if(this.players[i].games[j].teamB.includes(this.players[i].name) && this.players[i].games[j].scoreTeamB < 60)
                        this.players[i].lost++
                }
            }
        }
    }
    
}
</script>