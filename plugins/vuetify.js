import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Toasted from 'vue-toasted';


Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa, md',
  },
})

Vue.use(Toasted)

