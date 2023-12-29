<template>
  <div class="container">
    <div class="row">
      <sidebar-component></sidebar-component>

      <navbar-component></navbar-component>

      <routres-component></routres-component>

      <div
        class="main-content col-lg-12 pt-4 col-xl-8"
        :class="{ 'col-xl-12': status == false }"
      >
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarComponent from "@/components/DashboardComponents/SidebarComponent.vue";
import NavbarComponent from "@/components/DashboardComponents/NavbarComponent.vue";
import RoutresComponent from "@/components/DashboardComponents/RoutresComponent.vue";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "dashboard",
  components: {
    SidebarComponent,
    NavbarComponent,
    RoutresComponent,
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState({
      status: (state) => state.navbarStatus,
    }),
  },

  mounted() {
    let admin = window.localStorage.getItem("admin-detail");
    if (!admin) {
      this.$router.push({ path: "/authentication/SignInAdmin" });
    } else {
      axios.get(`Employees/${JSON.parse(admin).id}`).then((response) => {
        window.localStorage.setItem("lang", response.data.language);
        window.localStorage.setItem("mode", response.data.Mode);
      });
    }
  },
};
</script>
<style scoped>
.main-content {
  transition: 0.2s linear;
}
</style>
