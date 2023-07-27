import { createApp } from 'vue'
import App from './App.vue'
import { InstallCodemirro } from "codemirror-editor-vue3";
import './index.css'

const app = createApp(App);
app.use(InstallCodemirro);
app.mount("#app");
