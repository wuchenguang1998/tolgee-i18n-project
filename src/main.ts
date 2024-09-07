import { createApp } from "vue";
import i18n from "./i18n";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(i18n).mount("#app");
