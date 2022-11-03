/**
 * Vue3 Main script
 */

// Load vue core
import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';

// Load Vuetify
import vuetify from '@/plugins/vuetify';

// Load Layout vue.
import App from './App.vue';

window.onload = async () => {
  const el = document.querySelector('body');
  if (el) {
    el.insertAdjacentHTML('afterend', '<div id="app" class="hi" >hello</div>');
    /** Register Vue */
    const vue = createApp(App);
    vue.use(router);
    vue.use(store);
    vue.use(vuetify);

    // Run!
    router.isReady().then(() => {
      vue.mount('#app');
    });
  }
};
