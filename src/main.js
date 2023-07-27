import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { InstallCodemirro } from "codemirror-editor-vue3";
import './index.css'

const app = createApp(App);
app.use(router)
app.use(InstallCodemirro);
app.mount("#app");
