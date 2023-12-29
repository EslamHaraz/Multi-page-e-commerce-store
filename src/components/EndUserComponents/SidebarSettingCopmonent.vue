<template>
  <div class="parent">
    <ul class="links">
      <li
        class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-4"
      >
        <router-link :to="{ name: 'InformationPresonal' }" class="text-color">
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
        <router-link :to="{ name: 'SettingSecurity' }" class="text-color">
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
        <router-link :to="{ name: 'SettingStyle' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'magic']"
            class="toggle me-3 m"
            :class="{ 'ms-3': align === 'ar' }"
          />

          {{ $t("message.StyleSetting") }}
        </router-link>
      </li>
      <li
        v-if="Seller === true"
        class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-4"
      >
        <router-link :to="{ name: 'Purchases' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'bars-progress']"
            class="toggle me-3"
            :class="{ 'ms-3': align === 'ar' }"
          />

          {{ $t("endUser.yourpurchases") }}
        </router-link>
      </li>
      <li
        v-if="Seller == false"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrob1"
        class="text-start d-flex align-items-center p-2 li-link mb-4 text-color cursor-pointer"
      >
        <FontAwesome
          :icon="['fas', 'cart-flatbed-suitcase']"
          class="toggle me-3"
          :class="{ 'ms-3': align === 'ar' }"
        />

        {{ $t("endUser.sellerUpgrade") }}
      </li>
      <li
        v-if="Seller == true"
        class="text-start d-flex align-items-center p-2 li-link mb-4 text-color cursor-pointer"
      >
        <router-link :to="{ name: 'AddProductUser' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'plus']"
            class="toggle me-3"
            :class="{ 'ms-3': align === 'ar' }"
          />
          {{ $t("message.addProduct") }}
        </router-link>
      </li>

      <li
        v-if="Seller == true"
        class="text-start d-flex align-items-center p-2 li-link mb-4 text-color cursor-pointer"
      >
        <router-link :to="{ name: 'SellerProducts' }" class="text-color">
          <FontAwesome
            :icon="['fas', 'bars-progress']"
            class="toggle me-3"
            :class="{ 'ms-3': align === 'ar' }"
          />
          {{ $t("message.Products") }}
        </router-link>
      </li>

      <div
        class="modal fade"
        id="staticBackdrob1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdrob1Label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header flex-row-reverse">
              <button
                type="button"
                id="closed"
                ref="close"
                class="btn-close m-0"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
              <h5 class="modal-title" id="staticBackdrob1Label">
                {{ $t("endUser.upgrade") }}
              </h5>
            </div>
            <div class="modal-body">
              <div class="row g-3 align-items-center">
                <div style="position: relative" class="d-block mx-auto">
                  <h4 class="text-color">{{ $t("endUser.upgradeMessage") }}</h4>
                </div>
              </div>
            </div>
            <div class="modal-footer flex-row-reverse">
              <button
                type="button"
                class="btn btn-secondary close"
                data-bs-dismiss="modal"
              >
                {{ $t("message.cancel") }}
              </button>
              <button
                @click="upgradeToSeller()"
                type="button"
                class="btn btn-edit"
              >
                {{ $t("endUser.upgrade") }}
                <FontAwesome :icon="['fas', 'arrow-up']" style="margin: 0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
let user = localStorage.getItem("user-detail");
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "SidebarSettingCopmonent",
  data() {
    return {
      user,
      Seller: "",
      sellerStatus: "",
      userstatus: "",
      userData: [],
      userId: "",
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      status: (state) => state.navbarStatus,
    }),
  },
  mounted() {
    this.getuserStaus();
  },
  methods: {
    getuserStaus() {
      if (user) {
        this.Seller = JSON.parse(user).Seller;

        this.sellerStatus = JSON.parse(user).SellerStatus;
        this.userData = JSON.parse(user);
        this.userId = JSON.parse(user).id;
      }
    },
    upgradeToSeller() {
      axios
        .put(
          `Users/${this.userData.id}`,
          this.userData,
          (this.userData.Seller = true)
        )
        .then((response) => {
          this.$toast.success("Upgraded successfully");
          this.$refs.close.click();
          setTimeout(() => {
            this.$toast.success("Please log out and log in again", {
              position: "top-center",
            });
          }, 3000);
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
``
