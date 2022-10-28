// Styles
// import "@mdi/font/css/materialdesignicons.css";
import "../main.scss";
// import { createVuetify } from "vuetify";

// export default createVuetify();

// Vuetify
import * as directives from "vuetify/directives";
import * as components from "vuetify/components";
import { createVuetify } from "vuetify";

// Misc
import { loadFonts } from "./webfontloader";
loadFonts();

// Styles
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  // https://next.vuetifyjs.com/en/getting-started/installation/
  components,
  directives,
});
