import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";
import "./App.css";
import "@/Modes/darkTheme.css";
import "@/Modes/lightTheme.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueEllipseProgress from "vue-ellipse-progress";
import JwPagination from "jw-vue-pagination";
import i18n from "./locales/translator";
import { Collapse } from "vue-collapsed";
Vue.config.productionTip = false;
import Vuelidate from "vuelidate";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./filters";
import { VueEditor } from "vue2-editor";
import axios from "axios";
Vue.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 2,
  newestOnTop: true,
  position: "top-right",
  timeout: 2400,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});
library.add(fas, far, fab);
axios.defaults.baseURL = "http://localhost:3000/";
Vue.use(Vuelidate, "jw-pagination", JwPagination,);
Vue.component(
  "FontAwesome",
  FontAwesomeIcon,
  "jw-pagination",
  JwPagination,
  VueEllipseProgress,
  "Collapse",
  Collapse,
  VueEditor
);
new Vue({
  router,
  store,
  i18n,

  render: (h) => h(App),
}).$mount("#app");
let language = window.localStorage.getItem(`lang`);
let admin = window.localStorage.getItem("admin-detail");
let mode = window.localStorage.getItem(`mode`);
let ordersList = JSON.parse(window.localStorage.getItem("Product-list"));

window.onload = function () {
  if (ordersList) {
    store.state.ordresList = ordersList;
  }
  axios.get(`SettingSite/1`).then((response) => {
    store.state.siteNameAr = response.data.SiteName.NameAr;
    store.state.siteNameEn = response.data.SiteName.NameEn;
    store.state.siteLogo = response.data.Logo;
    store.state.siteIcon = response.data.Icon;
  });
  store.state.mode = mode;
  if (admin) {
    axios.get(`Employees/${JSON.parse(admin).id}`).then((response) => {
      store.state.adminPhoto = response.data.Photo;
      store.state.adminName = response.data.Name;
      store.state.adminEmail = response.data.Email;
    });
  }
  language ? (store.state.lang = language) : "ar";
  if (language === "ar") {
    store.state.lang = "ar";
  } else {
    store.state.lang = "en";
  }
};
