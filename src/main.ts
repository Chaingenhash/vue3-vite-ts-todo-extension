import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { useImage } from "./plugins/utils";
// import router from "./router";
import store from "./store";

const app = createApp(App);

// app.use(router);
app.use(store);
app.use(vuetify);

app.config.globalProperties.$useImage = useImage;
// app.$useImage = useImage;

// Run!
// router.isReady().then(() => {
app.mount("#app");
// });
