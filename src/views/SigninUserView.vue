<template>
  <div class="parent">
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-5 col-md-12 edit-col">
          <form
            @submit.prevent
            class="text-start w-100 form"
            :class="{ 'text-end': Language == 'ar' }"
          >
            <h1 class="font-weight mb-2 text-color">
              {{ $t("message.messageHello") }}
            </h1>
            <div class="inputs mt-4">
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.Email") }}</label
                >
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
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.Password") }}</label
                >
                <input
                  type="password"
                  class="form-control text-initial"
                  :placeholder="$t('message.Password')"
                  v-model="Password"
                />
                <span v-if="this.v$.Password.$error" class="text-danger">
                  {{ $t("message.PasswordRequired") }}</span
                >
              </div>
            </div>
            <router-link
              :to="{ name: 'ForgetPassword' }"
              class="w-100 text-end d-block font-color mb-3 text-danger"
            >
              {{ $t("message.forgetPassword") }}
            </router-link>
            <button
              type="submit"
              @click="signInUser()"
              class="submit-button w-100 p-2"
            >
              {{ $t("message.signIn") }}
            </button>
            <router-link
              :to="{ name: 'SignupView' }"
              class="w-100 text-center d-block font-color mt-3"
            >
              {{ $t("message.createAccount") }}
            </router-link>
          </form>
        </div>
        <div class="col-7 edit-col bg-login">
          <img src="@/assets/login-bg-8f9a4137.svg" class="img-fluid" />
          <!-- <img src="@/assets/4957136.jpg"  class="img-fluid"/> -->
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
      blockedUsersList: [],
      userId: "",
      checkUser: "",
    };
  },
  validations() {
    return {
      Email: { required, email },
      Password: { required },
    };
  },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
    getUserIds() {
      return this.blockedUsersList.map((ele) => {
        return ele.id;
      });
    },
  },
  mounted() {
    this.getBlockedUsers();
    this.checkUser = JSON.parse(localStorage.getItem("user-detail"));
    this.checkIfUser();
  },
  methods: {
    signInUser() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .get(`Users?Email=${this.Email}&Password=${this.Password}`)
          .then((response) => {
            if (response.data.length > 0) {
              this.userId = response.data[0].id;
              if (!this.getUserIds.includes(this.userId)) {
                this.$toast.success("Logged in successfully");
                window.localStorage.setItem(
                  "user-detail",
                  JSON.stringify(response.data[0])
                );
                window.localStorage.setItem(
                  "mode",
                  JSON.stringify(response.data[0].Mode)
                );
                window.localStorage.setItem(
                  "lang",
                  JSON.stringify(response.data[0].Language)
                );
                setTimeout(() => {
                  this.$router.push({ path: "/home" });
                }, 2500);
              } else this.$toast.error("Sorry you have been Blocked");
            } else this.$toast.error("User Not Found");
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("Error In Data");
    },
    getBlockedUsers() {
      axios
        .get(`Users?Status=Block`)
        .then((response) => {
          this.blockedUsersList = response.data;
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
    checkIfUser() {
      if (this.checkUser) {
        this.$router.push({ path: "/home" });
      }
    },
  },
};
</script>
<style>
.form {
  margin-left: 30px;
}
.edit-col {
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
}
.bg-login {
  background-color: var(--bg-login-Color);
}
.font-weight {
  font-weight: 700;
}
.label-weight {
  font-weight: 600;
}
.submit-button {
  background-color: var(--main-Color);
  border: none;
  border-radius: 5px;
  transition: var(--main-transition);
  color: white;
}
.submit-button:hover {
  background-color: var(--hover-font-Color);
}
.font-color {
  color: var(--authintaction-Color);
  font-size: 20px;
  font-weight: 500;
}
.ar::placeholder {
  text-align: start;
}
.ar {
  text-align: end;
}
@media (max-width: 991px) {
  .bg-login {
    display: none;
  }
  .form {
    margin: 0px !important;
  }
}
.text-revert {
  text-decoration: revert;
}
</style>
