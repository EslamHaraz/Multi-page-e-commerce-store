<template>
  <div class="parent p-4 mt-4">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-3 col-md-4"
          :class="{
            'border-l': Language === 'ar',
            'border-r': Language === 'en',
          }"
        >
          <Sidebar-Setting-Copmonent></Sidebar-Setting-Copmonent>
        </div>
        <div class="main-content col-xl-9 col-md-8 col-sm-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarSettingCopmonent from "@/components/EndUserComponents/SidebarSettingCopmonent.vue";
import { mapState } from "vuex";
export default {
  name: "MyAccountView",
  data() {
    return {
      path: "",
    };
  },
  components: { SidebarSettingCopmonent },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
  },
  mounted() {
    this.path = this.$route.fullPath;
    if (this.path == "/MyAccount") {
      this.$router.push({ path: "/MyAccount/InformationPresonal" });
    }
  },
};
</script>
<style scoped>
.border-l {
  border-left: 1px solid #a7a6a6;
}
.border-r {
  border-right: 1px solid #a7a6a6;
}
@media (max-width: 767px) {
  .border-l {
    border: none;
  }
}
</style>
