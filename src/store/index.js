import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";
import axios from "axios";

Vue.use(Vuex);
const state = {
  lang: null,
  dashboardLanguage: null,
  navbarStatus: true,
  ar: false,
  en: false,
  cartBar: false,
  mode: "",
  userId: "10",
  siteNameAr: "",
  siteNameEn: "",
  siteLogo: "",
  siteIcon: "",
  adminPhoto: "",
  adminName: "",
  adminEmail: "",
  categoryId: "",
  categoriesList: [],
  ordresList: [],
  total: "",
};

const mutations = {
  redirectTo(state, payload) {
    router.push({ name: payload });
  },
  editNavbarStatus(state, payload) {
    state.navbarStatus === true
      ? (state.navbarStatus = false)
      : (state.navbarStatus = true);
  },
  editCartBarStatus(state, payload) {
    state.cartBar === true ? (state.cartBar = false) : (state.cartBar = true);
  },
  getSiteData(state) {
    axios.get(`SettingSite/1`).then((response) => {
      state.siteNameAr = response.data.SiteName.NameAr;
      state.siteNameEn = response.data.SiteName.NameEn;
      state.siteLogo = response.data.Logo;
      state.siteIcon = response.data.Icon;
    });
  },
  setadminData(state, payload) {
    state.adminPhoto = payload.Photo;
    state.adminName = payload.Name;
    state.adminEmail = payload.Email;
  },
  shopPyCategory(state, payload) {
    state.categoryId = payload.id;
  },
  pushOrdresToCart(state, payload) {
    state.ordresList.push(payload.order);
    window.localStorage.setItem(
      "Product-list",
      JSON.stringify(state.ordresList)
    );
  },
  getTotalOrder(state, payload) {
    state.total = payload.total;
  },
};
const actions = {
  redirectTo({ commit }, payload) {
    commit("redirectTo", payload.val);
  },
};
export default new Vuex.Store({
  state: state,
  getters: {},
  mutations: mutations,
  actions: actions,
  modules: {},
});
