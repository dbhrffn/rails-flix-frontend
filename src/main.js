import './style.css';
import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filters = {
    voteAveragePercentage(value) {
      return value.toFixed(1) * 10 + "%";
    }
}
app.use(router);
app.use(store)
app.mount('#app');