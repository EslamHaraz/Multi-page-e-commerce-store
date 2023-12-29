<template>
  <div class="col-8 parent">
    <div class="navbar p-3">
      <div class="box-icons">
        <FontAwesome
          :icon="['fas', 'bars']"
          class="toggle me-4"
          @click="editStatus()"
        />
        <FontAwesome
          :icon="['fas', 'magnifying-glass']"
          class="toggle"
          :class="{ 'me-3': align == 'ar' }"
        />
      </div>
      <div class="profile-box d-flex align-items-center position-relative">
        <FontAwesome
          :icon="['fas', 'bell']"
          class="toggle me-3"
          :class="{ 'ms-3': align == 'ar' }"
        />
        <img
          @click="active = !active"
          :src="adminImg"
          class="img-fluid small-img user-img"
        />
        <div
          class="user-info text-start p-3"
          :class="{ 'text-end center-box': align === 'ar', active: active }"
        >
          <h4 class="mb-4 text-color">{{ $t("message.userProfile") }}</h4>
          <div class="user-details">
            <div class="d-flex justify-content-evenly content">
              <div class="info ms-4 text-center">
                <h4 class="mb-0 text-color">{{ adminName }}</h4>

                <h5
                  class="mb-3 d-flex align-items-center"
                  :class="{ 'flex-row-reverse': align === 'ar' }"
                >
                  <FontAwesome
                    :icon="['fas', 'envelope']"
                    class="toggle text-color me-2"
                    :class="{ 'ms-2': align === 'ar' }"
                  />
                  <span class="text-color mb-0">
                    {{ adminEmail }}
                  </span>
                </h5>
              </div>
            </div>

            <div class="mt-3" @click="active = !active">
              <router-link
                class="d-flex align-items-center"
                :to="{ name: 'AccountSetting' }"
                :class="{
                  'justify-content-stretch ': align === 'ar',
                }"
              >
                <FontAwesome
                  :icon="['fas', 'user']"
                  class="toggle user-icon p-3 text-white"
                />
                <div class="ms-3 me-3">
                  <h5 class="text-color font-Weight-medium">
                    {{ $t("message.myProfile") }}
                  </h5>
                  <h6 class="text-color">{{ $t("message.AccountSetting") }}</h6>
                </div>
              </router-link>
            </div>
            <button
              @click="logOutAdmin()"
              type="button"
              class="w-100 btn-log mt-4 p-2"
            >
              {{ $t("message.LogOut") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavbarComponent",
  data() {
    return {
      active: false,
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      status: (state) => state.navbarStatus,
      adminImg: (state) => state.adminPhoto,
      adminName: (state) => state.adminName,
      adminEmail: (state) => state.adminEmail,
    }),
  },
  methods: {
    editStatus() {
      this.$store.commit("editNavbarStatus");
    },
    logOutAdmin() {
      window.localStorage.removeItem("admin-detail");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
  },
};
</script>
<style scoped>
.navbar {
  height: 80px;
}
.parent {
  background-color: var(--section-bg-Color);
  border-bottom: 2px solid #ddd;
}
.toggle {
  color: var(--toggle-Color);
  font-size: 20px;
  cursor: pointer;
}
.user-img {
  height: auto;
  width: 80px;
  border-radius: inherit;
}
.small-img {
  cursor: pointer;
}
.user-info {
  position: absolute;
  top: 85px;
  width: 382px;
  left: -270px;
  border: 1px solid #7d7d7d17;
  border-radius: 8px;
  transition: var(--main-transition);
  opacity: 0;
  background-color: var(--body-Color);
  z-index: -1;
}

.user-info.active {
  opacity: 1;
  z-index: 1;
}
.user-icon {
  background-color: var(--main-Color);
  color: var(--text-Color);
  border-radius: 50%;
}

.btn-log {
  background-color: transparent;
  color: var(--text-Color);
  border: 1px solid var(--border-Color);
  border-radius: 5px;
  font-weight: 600;
  transition: var(--main-transition);
}
.btn-log:hover {
  background-color: var(--main-Color);
  color: white;
}
.center-box {
  left: -20px;
}
.user-details .content {
  border-bottom: 1px solid #cfcfcf;
  padding: 10px;
}
</style>
