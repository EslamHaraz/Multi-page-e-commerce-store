<template>
  <div class="parent">
    <div class="container position-relative text-initial">
      <div class="row">
        <div class="col-lg-5 col-md-12 edit-col">
          <form @submit.prevent class="w-100 form" :class="{ 'text-end': ar }">
            <h1 class="font-weight mb-2 text-color">
              {{ $t("message.messageHello") }}
            </h1>
            <div class="inputs mt-4">
              <div class="mb-3">
                <label class="label-weight mb-2 text-color">{{
                  $t("message.Email")
                }}</label>
                <input
                  type="email"
                  class="form-control text-start"
                  v-model="Email"
                />
                <span v-if="this.v$.Email.$error" class="text-danger">
                  {{ $t("message.EmailRequired") }}</span
                >
              </div>
              <div class="mb-3">
                <label class="label-weight mb-2 text-color">{{
                  $t("message.Password")
                }}</label>
                <input
                  type="password"
                  :class="{ 'text-end': ar }"
                  class="form-control"
                  v-model="Password"
                />
                <span v-if="this.v$.Password.$error" class="text-danger">
                  {{ $t("message.PasswordRequired") }}</span
                >
              </div>
            </div>
            <router-link
              :to="{ name: '' }"
              class="w-100 text-end d-block font-color mb-3 text-danger"
            >
              {{ $t("message.forgetPassword") }}
            </router-link>
            <button
              type="submit"
              @click="signInAdmin()"
              class="submit-button w-100 p-2"
            >
              {{ $t("message.signIn") }}
            </button>
          </form>
        </div>
        <div class="col-7 edit-col bg-login">
          <img src="@/assets/login-bg-8f9a4137.svg" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "SigninUserView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      Email: "",
      Password: "",
      Photo: "",
      Name: "",
    };
  },
  validations() {
    return {
      Email: { required, email },
      Password: { required },
    };
  },
  mounted() {
    let admin = window.localStorage.getItem("admin-detail");
    if (admin) {
      this.$router.push({ path: "/Dashboard/Home" });
    }
  },
  computed: {
    ...mapState({
      ar: (state) => state.ar,
      en: (state) => state.en,
    }),
  },
  methods: {
    getAdminData() {
      this.$store.commit("setadminData", {
        Photo: this.Photo,
        Name: this.Name,
        Email: this.Email,
      });
    },
    signInAdmin() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .get(`Employees?Email=${this.Email}&Password=${this.Password}`)
          .then((response) => {
            if (response.data.length > 0) {
              this.Photo = response.data[0].Photo;
              this.Name = response.data[0].Name;
              this.$toast.success("Logged in successfully");
              window.localStorage.setItem(
                "admin-detail",
                JSON.stringify(response.data[0])
              );
              setTimeout(() => {
                this.$router.push({ path: "/Dashboard/Home" });
                this.getAdminData();
              }, 2500);
            } else this.$toast.error("Admin Not Found");
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      }
    },
  },
};
</script>
<style></style>
