<template>
  <div class="parent text-color">
    <div class="container grid-container">
      <div class="logo d-flex align-items-center">
        <h3 class="text-color mb-0" v-if="lang == 'ar'">{{ SiteNameAr }}</h3>
        <h3 class="text-color mb-0" v-else>{{ SiteNameEn }}</h3>
        <img :src="SiteLogo" class="img-fluid site-logo mt-3" />
      </div>
      <div class="pads d-Flex">
        <router-link :to="{}" class="me-3">
          <img
            src="@/assets/Facebook_f_logo_(2021).svg.png"
            class="pad-logo img-fluid"
          />
        </router-link>
        <router-link :to="{}" class="me-3">
          <img
            src="@/assets/Instagram_logo_2016.svg.webp"
            class="pad-logo img-fluid"
          />
        </router-link>
        <router-link :to="{}" class="me-3">
          <img src="@/assets/WhatsApp.svg.png" class="pad-logo img-fluid" />
        </router-link>
        <router-link :to="{}">
          <img
            src="@/assets/Logo_of_Twitter.svg.png"
            class="pad-logo img-fluid"
          />
        </router-link>
      </div>
      <div class="contacts">
        <h6>info@technozonegaming.com</h6>
        <h6>Customer Service: +201278900619</h6>
        <h6>Technical Support: +201278900916</h6>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "FooterComponent",
  computed: {
    ...mapState({
      SiteNameAr: (state) => state.siteNameAr,
      SiteNameEn: (state) => state.siteNameEn,
      SiteLogo: (state) => state.siteLogo,
      lang: (state) => state.lang,
    }),
  },
};
</script>
<style scoped>
.pad-logo {
  width: 40px;
}
.parent {
  padding: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}
.pads {
  justify-content: space-evenly !important;
}
.site-logo {
  width: 90px;
}
.logo {
  flex-direction: column !important;
}
</style>
