<template>
  <div class="col-4">
    <div class="sidebar p-3">
      <div class="container">
        <router-link :to="{ name: 'Home' }">
          <div
            class="logo d-flex justify-content-between align-items-center flex-row-reverse"
          >
            <img :src="SiteLogo" class="img-fluid" />
            <h3 class="mb-0 site-name" v-if="lang == 'ar'">{{ SiteNameAr }}</h3>
            <h3 class="mb-0 site-name" v-else>{{ SiteNameEn }}</h3>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import RoutresComponent from "@/components/DashboardComponents/RoutresComponent.vue";
import { mapState } from "vuex";
export default {
  name: "SidebarComponent",
  data() {
    return {};
  },
  components: {
    RoutresComponent,
  },
  computed: {
    ...mapState({
      SiteNameAr: (state) => state.siteNameAr,
      SiteNameEn: (state) => state.siteNameEn,
      SiteLogo: (state) => state.siteLogo,
      lang: (state) => state.lang,
    }),
  },
  methods: {},
};
</script>
<style scoped>
.sidebar {
    min-height: 80px;
  border-right: 1px solid #7d7d7d17;
  background-color: var(  --section-bg-Color);
  border-bottom: 2px solid #ddd;
}
.site-name {
  font-weight: 700;
  color: var(--text-Color);
}
@media (max-width: 767px) {
  .site-name {
    display: none;
  }
}
img {
  width: 90px;
}
</style>
