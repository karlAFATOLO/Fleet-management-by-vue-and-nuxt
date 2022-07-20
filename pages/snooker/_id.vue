<template>
    <v-container>
        <v-row>
            <v-col cols=12 class="text-center display-2">
                <v-btn  color="green" @click="dialCancel = true">Corriger</v-btn>
                Compteur de Points Snooker
                <v-btn  color="red" @click="reset()">Retour au menu</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-if="game" cols=6 class="text-center red--text">
                <div v-for="item in game.teamA" :key="item" class="font-weight-bold display-1">{{item}}</div>
                <br/>
                <div class="font-weight-bold display-4">
                {{teamA_score}}
                </div>
            </v-col>
            <v-col v-if="game" cols=6 class="text-center blue--text">
                <div v-for="item in game.teamB" :key="item" class="font-weight-bold display-1">{{item}}</div>
                <br/>
                <div class="font-weight-bold display-4">
                {{teamB_score}}
                </div>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(1)" src="/img/1.png" max-width="150px" @click="showDial(1)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(2)" src="/img/2.png" max-width="150px" @click="showDial(2)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(3)" src="/img/3.png" max-width="150px" @click="showDial(3)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(4)" src="/img/4.png" max-width="150px" @click="showDial(4)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(5)" src="/img/5.png" max-width="150px" @click="showDial(5)"></v-img>
                </v-btn>
            </v-col>
        </v-row>
            <v-row justify="center">
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(6)" src="/img/6.png" max-width="150px" @click="showDial(6)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(7)" src="/img/7.png" max-width="150px" @click="showDial(7)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(8)" src="/img/8.png" max-width="150px" @click="showDial(8)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(9)" src="/img/9.png" max-width="150px" @click="showDial(9)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(10)" src="/img/10.png" max-width="150px" @click="showDial(10)"></v-img>
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(11)" src="/img/11.png" max-width="150px" @click="showDial(11)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(12)" src="/img/12.png" max-width="150px" @click="showDial(12)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(13)" src="/img/13.png" max-width="150px" @click="showDial(13)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(14)" src="/img/14.png" max-width="150px" @click="showDial(14)"></v-img>
                </v-btn>
            </v-col>
            <v-col cols=2 class="text-center">
                <v-btn icon width="auto" height="auto">
                   <v-img v-if="!isDisabled(15)" src="/img/15.png" max-width="150px" @click="showDial(15)"></v-img>
                </v-btn>
            </v-col>
        </v-row>
        <v-dialog v-model="showTeamAffect" persistent width="1500px">
            <v-card v-if="game != null">
                <v-card-title>Ajout de la boulle {{pointSelected}}</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols=6 class="text-center">
                            <v-btn x-large height="100px" color="red" @click="addPoints('A')">
                                <div>
                                <div v-for="item in game.teamA" :key="item" class="font-weight-bold display-1">{{item}} </div>
                                </div>
                            </v-btn>
                        </v-col>
                        <v-col cols=6 class="text-center">
                            <v-btn x-large height="100px" color="blue" @click="addPoints('B')">
                                <div>
                                <div v-for="item in game.teamB" :key="item" class="font-weight-bold display-1">{{item}} </div>
                                </div>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="showTeamAffect = false">Annuler</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="victory" persistent width="1000px">
            <v-card>
                <v-card-text class="text-center pa-3 display-4">
                    {{finalMessage}} 
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn color="green" @click="restart()">Retour Au menu</v-btn>
                    <v-spacer/>
                    retour au menu dans {{counter}} s
                    <v-spacer/>
                    <v-btn color="red" @click="revanche()">Revanche</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialCancel" persistent width="1000px">
            <v-card>
                <v-card-title class="text-center pa-3 display-2">
                    Annuler une boule
                </v-card-title>
                <v-card-text>
                    <v-btn v-for="item in teamA_balls" :key="item" icon width="auto" height="auto">
                        <v-img :src="'/img/'+ item+'.png'" max-width="150px" @click="cancelBall(item)"></v-img>
                    </v-btn>
                    <v-btn v-for="item in teamB_balls" :key="item" icon width="auto" height="auto">
                        <v-img :src="'/img/'+ item+'.png'" max-width="150px" @click="cancelBall(item)"></v-img>
                    </v-btn>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn @click="dialCancel = false">Annuler</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    auth: false,
    mounted() {
        this.$axios.get(`/games/${this.$route.params.id}`)
            .then((response)=> {
                this.game = response.data
            })
    },
   data(){
       return {
           id:this.$route.params.id,
           dialCancel:false,
           showTeamAffect:false,
           pointSelected:0,
           teamA_balls:[],
           teamB_balls:[],
           teamVictory:"",
           victory:false,
           game:null,
           finalMessage:"",
           counter:10,
           interval:''
       }
   },
   computed:{
       teamA_score() {
           let score = 0
           for(let i = 0;i<this.teamA_balls.length;i++) {
               score = score + this.teamA_balls[i]
           }
           return score
       },
       teamB_score() {
           let score = 0
           for(let i = 0;i<this.teamB_balls.length;i++) {
               score = score + this.teamB_balls[i]
           }
           return score
       }
   },
   methods:{
       cancelBall(ball) {
            var index = this.teamA_balls.indexOf(ball);
            if (index > -1) {
                this.teamA_balls.splice(index, 1);
            }
            index = this.teamB_balls.indexOf(ball);
            if (index > -1) {
                this.teamB_balls.splice(index, 1);
            }
            this.dialCancel = false
       },
       showDial(points) {
           this.showTeamAffect = true
           this.pointSelected = points
       },
       addPoints(team) {
           if(team === "A") {
            this.teamA_balls.push( this.pointSelected )
           } else {
               this.teamB_balls.push(this.pointSelected)
           }
           this.showTeamAffect = false
           if(this.teamA_score > 60) {
               this.finalMessage = "Victoire de Team A !!!!"
               this.countDownReset()
           }
           if(this.teamB_score > 60) {
               this.finalMessage = "Victoire de Team B !!!!"
               this.countDownReset()
           }
           if(this.teamB_score == 60 && this.teamA_score == 60 ) {
               this.finalMessage = "Egalité Dommage!!!"
               this.countDownReset()
           }
       },
       countDownReset() {
           this.victory = true
           this.counter = 10
           this.interval = setInterval(()=> {this.countDown()},1000)
       },
       countDown() {
           this.counter = this.counter - 1
           if(this.counter <= 0) {
               clearInterval(this.interval)
               this.restart()
           }
       },
       reset() {
           this.$router.push('/snooker')
       },
       isDisabled(value) {
           var index = this.teamA_balls.indexOf(value);
            if (index > -1) {
                return true
            }
           index = this.teamB_balls.indexOf(value);
            if (index > -1) {
                return true
            }
           return false
       },
       restart() {
           clearInterval(this.interval)
           this.victory = false
           this.game.scoreTeamA = this.teamA_score
           this.game.scoreTeamB = this.teamB_score
           this.$axios.put(`/games/${this.id}`,this.game)
            .then(() => {
                this.reset()
            })
           
       },
       revanche(){
           clearInterval(this.interval)
           this.victory = false
           this.game.scoreTeamA = this.teamA_score
           this.game.scoreTeamB = this.teamB_score
           this.$axios.put(`/games/${this.id}`,this.game)
           .then(() => {
               this.teamA_balls = []
               this.teamB_balls = []
               this.game.scoreTeamA = 0
                this.game.scoreTeamB = 0
                this.game.date = this.$moment()
                this.$axios.post('/games',this.game)
                .then((response)=> {  
                    this.$router.push(`/snooker/${response.data._id}`)
                })
           })
       }
   } 
}
</script>
