<template>
  <div class="row position-relative">
    <NavBarComponent></NavBarComponent>
    <CartComponent></CartComponent>
    <div class="main-content">
      <router-view></router-view>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>
<script>
import NavBarComponent from "@/components/EndUserComponents/NavBarComponent.vue";
import CartComponent from "@/components/EndUserComponents/CartComponent.vue";
import FooterComponent from "@/components/EndUserComponents/FooterComponent.vue";
import axios from "axios";
export default {
  name: "EndUserLayout",
  components: {
    NavBarComponent,
    CartComponent,
    FooterComponent,
  },
  data() {
    return {};
  },
  mounted() {
    let user = window.localStorage.getItem("user-detail");
    if (!user) {
      this.$router.push({ path: "/authentication/SignInuser" });
    } else {
      if (this.$route.fullPath == "/") {
        this.$router.push({ path: "home" });
      }
      axios.get(`Users/${JSON.parse(user).id}`).then((response) => {
        window.localStorage.setItem("lang", response.data.Language);
        window.localStorage.setItem("mode", response.data.Mode);
      });
    }
  },
};
</script>
