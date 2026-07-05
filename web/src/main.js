import './assets/main.css'
import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


const siraaj = window.SiraajAnalytics?.analytics || window.SiraajAnalytics?.default
siraaj?.init({
  apiUrl: 'https://siraaj.live',
  projectId: 'muslim-fortress',
  autoTrack: true
})

const app = createApp(App)
let pinia = createPinia()

app.use(pinia)
const piniaState = localStorage.getItem('piniaState')
if (piniaState) {
    pinia.state.value = JSON.parse(piniaState)
}
watch(
    pinia.state,
    (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
)

app.mount('#app')
