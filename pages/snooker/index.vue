<template>
    <v-container>
        <v-card>
        <v-card-title class="text-center pa-3 display-2">Menu Principal</v-card-title>
        <v-card-text>
            <v-row>
            <v-col cols="6" class="text-left">
            <v-btn x-large color="green" to="/snooker/create">Créer une nouvelle partie</v-btn>
            </v-col>
            <v-col cols="6" class="text-right">
            <v-btn x-large color="purple" to="/snooker/stats">Statistiques</v-btn>
            </v-col>
            </v-row>
        </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>
                Dernières parties
            </v-card-title>
            <v-card-text>
                <v-data-table
                :items="games"
                :headers="headers"
                sort-by="date"
                sort-desc
                >
                <template v-slot:item.scoreTeamA="{item}">
                    <span :class="item.scoreTeamA > item.scoreTeamB ? 'green--text' : 'red--text'">
                    {{item.scoreTeamA}}
                    </span>
                </template>
                <template v-slot:item.scoreTeamB="{item}">
                    <span :class="item.scoreTeamB > item.scoreTeamA ? 'green--text' : 'red--text'">
                    {{item.scoreTeamB}}
                    </span>
                </template>
                <template v-slot:item.date="{item}">
                    {{dateFormat(item.date)}}
                </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>

export default {
    auth: false,
    mounted(){
        this.$axios.get("/games")
        .then((response) => {
            this.games = response.data.filter(g => g.scoreTeamA != 0 || g.scoreTeamB != 0)
        })
    },
    data() {
        return {
            games:[],
            headers:[
                {text:"Date",value:"date"},
                {text:"Team A",value:"teamA"},
                {text:"score",value:"scoreTeamA"},
                {text:"score",value:"scoreTeamB"},
                {text:"Team B",value:"teamB"}
            ]
        }
    },
    methods:{
        dateFormat(date) {
            return date ? this.$moment(date).format("DD/MM/YYYY HH:mm") : ''
        }
    }
}
</script>