<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-left">
                <v-btn to="/customer_order"><v-icon>fas fa-arrow-left</v-icon></v-btn>
            </v-col>
            <v-col cols="4" class="text-center">
                Calendrier d'installation
            </v-col>
            <v-col cols="4" class="text-right">
                
            </v-col>
        </v-row>
        <v-row>
            <v-col>
            <div height="64">
                <v-toolbar flat color="white">
                <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                    Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                    <v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                    <v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title class="black--text">{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
            </div>
            <v-sheet height="600">
                <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :weekdays="weekdays"
                :events="events"
                :event-color="getEventColor"
                :now="today"
                :type="type"
                @click:event="showEvent"
                @change="updateRange"
                ></v-calendar>
                <v-menu
                v-model="selectedOpen"
                :close-on-content-click="false"
                :activator="selectedElement"
                max-width="500px"
                offset-x
                >
                <v-card
                    color="grey lighten-4"
                   
                    flat
                >
                    <v-toolbar
                    :color="selectedEvent.color"
                    dark
                    >
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text class="black--text">
                    <span v-html="selectedEvent.details"></span>
                    {{selectedEvent.content}}
                    </v-card-text>
                    <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                        Cancel
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-menu>
            </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    mounted() {
        this.$axios.get('/orders')
        .then((response) => {
            this.events = response.data.map(order => {return {
                name:order.name,
                start:this.$moment(order.dateStart).format('YYYY-MM-DD'),
                end:this.$moment(order.dateEnd).format('YYYY-MM-DD'),
                color:this.colors[this.rnd(0, this.colors.length - 1)],
                id:order._id,
                content:order.content,
                customer:order.customer
            }})
        })
    },
    data() {
        return {
            weekdays:[1, 2, 3, 4, 5],
            focus: '',
            type: 'month',
            start: null,
            end: null,
            today:this.$moment().format('YYYY-MM-DD'),
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange'],
        }
    },
    methods:{
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = this.today
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        nth (d) {
            return d > 3 && d < 21
            ? 'th'
            : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => this.selectedOpen = true, 10)
            }

            if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
            } else {
            open()
            }

            nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
            this.start = start
            this.end = end
        },
    },
    computed:{
        title () {
            const { start, end } = this
            if (!start || !end) {
                return ''
            }

            const startMonth = this.monthFormatter(start)
            const endMonth = this.monthFormatter(end)
            const suffixMonth = startMonth === endMonth ? '' : endMonth

            const startYear = start.year
            const endYear = end.year
            const suffixYear = startYear === endYear ? '' : endYear

            const startDay = start.day + this.nth(start.day)
            const endDay = end.day + this.nth(end.day)

            
            return `${startMonth} ${startYear}`
            
        },
        monthFormatter () {
            return this.$refs.calendar.getFormatter({
                timeZone: 'UTC', month: 'long',
            })
        },
    }
}
</script>