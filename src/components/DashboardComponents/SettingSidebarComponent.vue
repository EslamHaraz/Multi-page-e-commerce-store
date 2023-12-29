<template>
  <div class="col-4 border-right taps">
    <ul class="links mb-0 list-group">
      <li
        class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-4"
      >
        <router-link :to="{ name: 'PersonalInformation' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'user']"
            class="toggle me-3 m"
            :class="{ 'ms-3': align === 'ar' }"
          />

          {{ $t("message.PersonalInformation") }}
        </router-link>
      </li>
      <li
        class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-4"
      >
        <router-link :to="{ name: 'SecuritySetting' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'lock']"
            class="toggle me-3 m"
            :class="{ 'ms-3': align === 'ar' }"
          />

          {{ $t("message.SecuritySetting") }}
        </router-link>
      </li>
      <li
        class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-4"
      >
        <router-link :to="{ name: 'StyleSetting' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'magic']"
            class="toggle me-3 m"
            :class="{ 'ms-3': align === 'ar' }"
          />

          {{ $t("message.StyleSetting") }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "SettingSidebarComponent",
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      status: (state) => state.navbarStatus,
    }),
  },
};
</script>
<style scoped>
.border-right {
  border-right: 1px solid #ddd;
}
.li-link {
  transition: var(--main-transition);
  font-size: 18px;
}
.li-link:hover {
  background-color: var(--hover-link-Color);
}
@media (max-width: 991px) {
  .taps {
    flex: 0 0 auto;
    width: 100%;
  }
}
</style>
