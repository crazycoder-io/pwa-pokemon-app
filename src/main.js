import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

const vuetify = createVuetify({
  components,
});

// Add ability for pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}

createApp(App).use(vuetify).mount("#app");
