<template>
  <div class="parent">
    <form @submit.prevent class="text-start w-100 form">
      <div class="inputs mt-4">
        <h4 class="text-color p-2 head text-initial">
          {{ $t("message.Mode") }}
        </h4>

        <div
          class="mb-3 text-initial w-70 d-flex justify-content-between mt-4 mb-4"
        >
          <div class="form-check">
            <input
              id="dark"
              type="radio"
              name="os"
              value="dark"
              v-model="mode"
              class="form-check-input"
            />
            <label class="form-check-label text-color" for="dark">
              {{ $t("message.DarkMode") }}</label
            >
          </div>
          <div class="form-check">
            <input
              id="light"
              type="radio"
              name="os"
              value="light"
              v-model="mode"
              class="form-check-input"
            />
            <label class="form-check-label text-color" for="light">
              {{ $t("message.LightMode") }}</label
            >
          </div>
        </div>
        <h4 class="text-color p-2 head text-initial">
          {{ $t("message.Language") }}
        </h4>

        <div
          class="mb-3 text-initial w-70 d-flex justify-content-between mt-4 mb-4"
        >
          <div class="form-check">
            <input
              id="arabic"
              type="radio"
              name="ln"
              value="ar"
              class="form-check-input"
              v-model="language"
            />
            <label class="form-check-label text-color" for="arabic">
              {{ $t("message.Arabic") }}</label
            >
          </div>
          <div class="form-check">
            <input
              id="English"
              type="radio"
              name="ln"
              value="en"
              class="form-check-input"
              v-model="language"
            />
            <label class="form-check-label text-color" for="English">
              {{ $t("message.English") }}</label
            >
          </div>
        </div>
      </div>
      <button
        @click="editStyle()"
        type="submit"
        class="submit-button w-100 p-2 text-white"
      >
        {{ $t("message.editSetting") }}
      </button>
    </form>
  </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import { required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "StyleSettingComponent",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      adminId: "",
      mode: "",
      language: "",
      adminData: "",
    };
  },
  mounted() {
    let admin = window.localStorage.getItem("admin-detail");
    if (admin) {
      this.adminId = JSON.parse(admin).id;
      this.getAdminData();
    }
  },
  validations() {
    return {
      mode: { required },
      language: { required },
    };
  },

  methods: {
    getAdminData() {
      axios.get(`Employees/${this.adminId}`).then((respone) => {
        this.adminData = respone.data;
        this.mode = respone.data.Mode;
        this.language = respone.data.language;
      });
    },
    editStyle() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(
            `Employees/${this.adminId}`,
            this.adminData,
            (this.adminData.Mode = this.mode),
            (this.adminData.language = this.language)
          )
          .then((response) => {
            this.$toast.success("Style has been modified successfully", {
              timeout: 1500,
            });
            window.localStorage.setItem("lang", this.language);
            window.localStorage.setItem("mode", this.mode);
            setTimeout(() => {
              window.location.reload();
            }, 1600);
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("The data must be filled in correctly");
    },
  },
};
</script>
<style scoped>
.head {
  border-bottom: 1px solid #626262;
}
</style>
