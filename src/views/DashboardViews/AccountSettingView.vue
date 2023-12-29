<template>
  <div class="container">
    <div class="row">
      <Setting-Sidebar-Component></Setting-Sidebar-Component>
      <div class="main-content col-lg-12 col-xl-8 p-0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import SettingSidebarComponent from "@/components/DashboardComponents/SettingSidebarComponent.vue";
import { mapState } from "vuex";

export default {
  name: "AccountSettingView",
  components: {
    SettingSidebarComponent,
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
};
</script>
<style scoped>
.main-content{
  padding: 0 !important;
}
</style>
