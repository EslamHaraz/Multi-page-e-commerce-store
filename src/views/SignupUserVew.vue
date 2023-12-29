<template>
  <div class="parent">
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-5 col-md-12 edit-col mt-4 align-items-start">
          <form @submit.prevent class="text-initial w-100 form h-100">
            <div>
              <h1 class="font-weight mb-2 text-color">
                {{ $t("message.messageHello") }}
              </h1>
            </div>
            <div class="inputs mt-4">
              <div class="mb-3 text-color">
                <label class="label-weight mb-2 text-initial">{{
                  $t("message.Name")
                }}</label>
                <input
                  type="text"
                  autocomplete
                  class="form-control"
                  v-model.trim="Name"
                />
                <div v-if="this.v$.Name.$error" class="text-danger mt-2">
                  {{ $t("message.NameRequired") }}
                </div>
                <div
                  v-if="this.Name.length < 10 && this.Name != ''"
                  class="text-danger mt-2"
                >
                  {{ $t("message.shortName") }}
                </div>
                <div v-if="this.Name.length > 30" class="text-danger mt-2">
                  {{ $t("message.longName") }}
                </div>
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.Email") }}</label
                >
                <input
                  type="email"
                  autocomplete
                  class="form-control text-start"
                  v-model="Email"
                />
                <div v-if="this.v$.Email.$error" class="text-danger mt-2">
                  {{ $t("message.EmailRequired") }}
                </div>
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color text-initial w-100"
                  >{{ $t("message.personalPhoto") }}</label
                >
                <input
                  type="url"
                  autocomplete
                  class="form-control text-initial"
                  v-model="Photo"
                />
                <div v-if="this.v$.Photo.$error" class="text-danger mt-2">
                  {{ $t("message.PhotoRequired") }}
                </div>
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color text-initial w-100"
                  >{{ $t("message.phoneNumber") }}</label
                >
                <input
                  type="number"
                  autocomplete
                  class="form-control text-initial"
                  v-model="Phone"
                />
                <div v-if="this.v$.Phone.$error" class="text-danger mt-2">
                  {{ $t("message.NumberRequired") }}
                </div>
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color text-initial w-100"
                  >{{ $t("message.Address") }}</label
                >
                <input
                  type="text"
                  autocomplete
                  class="form-control text-initial"
                  v-model="Address"
                />
                <div v-if="this.v$.Address.$error" class="text-danger mt-2">
                  {{ $t("message.AddressRequired") }}
                </div>
                <div
                  v-if="this.Address.length < 30 && this.Address != ''"
                  class="text-danger mt-2"
                >
                  {{ $t("message.shortAddress") }}
                </div>
                <div v-if="this.Address.length > 100" class="text-danger mt-2">
                  {{ $t("message.LongAddress") }}
                </div>
              </div>
              <div class="mb-3">
                <label class="label-weight mb-2 text-color">{{
                  $t("message.securityQuestion")
                }}</label>
                <select class="form-select" v-model="SecurityQuestion">
                  <option>{{ $t("message.QuastionOne") }}</option>
                  <option>{{ $t("message.QuastionTwo") }}</option>
                  <option>{{ $t("message.QuastionThree") }}</option>
                  <option>{{ $t("message.QuastionFour") }}</option>
                </select>
              </div>
              <div
                v-if="this.v$.SecurityQuestion.$error"
                class="text-danger mt-2 mb-2"
              >
                {{ $t("message.SecurityQustionRequired") }}
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.Answer") }}</label
                >
                <input
                  type="text"
                  autocomplete
                  class="form-control text-initial"
                  v-model="Answer"
                />
                <div v-if="this.v$.Answer.$error" class="text-danger mt-2">
                  {{ $t("message.AnswerRequired") }}
                </div>
              </div>
              <div class="mb-3">
                <label class="label-weight mb-2 text-color">{{
                  $t("message.selectLanguage")
                }}</label>
                <select class="form-select" v-model="language">
                  <option value="ar">{{ $t("message.Arabic") }}</option>
                  <option value="en">{{ $t("message.English") }}</option>
                </select>
                <div v-if="this.v$.language.$error" class="text-danger mt-2">
                  {{ $t("message.languageRequired") }}
                </div>
              </div>
              <div class="mb-3">
                <label class="label-weight mb-2 text-color">{{
                  $t("message.selectMode")
                }}</label>
                <select class="form-select" v-model="mode">
                  <option value="light">{{ $t("message.LightMode") }}</option>
                  <option value="dark">{{ $t("message.DarkMode") }}</option>
                </select>
              </div>
              <div v-if="this.v$.mode.$error" class="text-danger mb-2 mt-2">
                {{ $t("message.modeRequired") }}
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.Password") }}</label
                >
                <input
                  type="password"
                  autocomplete
                  class="form-control text-initial"
                  v-model="Password"
                />
                <div v-if="this.v$.Password.$error" class="text-danger mt-2">
                  {{ $t("message.PasswordRequired") }}
                </div>
                <span
                  v-if="this.Password.length > 8 && this.Password.length < 15"
                  class="text-danger"
                >
                  {{ $t("message.PasswordLength") }}</span
                >
              </div>
              <div class="mb-3">
                <label
                  class="label-weight mb-2 text-color w-100 text-initial"
                  >{{ $t("message.confirmPassword") }}</label
                >
                <input
                  type="password"
                  autocomplete
                  class="form-control text-initial"
                  v-model="ConfirmPassword"
                />
                <span
                  v-if="this.ConfirmPassword !== this.Password"
                  class="text-danger"
                >
                  {{ $t("message.PasswordMatch") }}</span
                >
              </div>
            </div>
            <button
              @click="addNewUser()"
              type="submit"
              class="submit-button w-100 p-2"
            >
              {{ $t("message.signUp") }}
            </button>
            <h5 class="d-flex mt-3 text-color">
              {{ $t("message.haveAccount") }}
              <router-link
                :to="{ name: 'SigninUserView' }"
                class="ms-3 me-3 text-start d-block font-color mb-3 text-revert"
              >
                {{ $t("message.signIn") }}
              </router-link>
            </h5>
          </form>
        </div>
        <div class="col-7 edit-col bg-login">
          <img src="@/assets/login-bg-8f9a4137.svg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  url,
} from "vuelidate/lib/validators";
export default {
  name: "SignupVew",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      Name: "",
      Email: "",
      Photo: "",
      Phone: "",
      Address: "",
      SecurityQuestion: "",
      Answer: "",
      Password: "",
      ConfirmPassword: "",
      language: "",
      language: "",
      mode: "",
      userList: [],
      checkUser: "",
    };
  },
  validations() {
    return {
      Name: { required, minLength: minLength(10), maxLength: maxLength(30) },
      Email: { required, email },
      Photo: { required, url },
      Phone: { required },
      language: { required },
      Address: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(100),
      },
      SecurityQuestion: { required },
      Answer: { required },
      mode: { required },
      Password: { required, minLength: minLength(8), maxLength: maxLength(15) },
      ConfirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
    };
  },
  mounted() {
    this.getAllUsers();
    this.checkIfUser();
  },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
    filterEmailsUsers() {
      return this.userList.map((ele) => {
        return ele.Email;
      });
    },
    filterNamesUsers() {
      return this.userList.map((ele) => {
        return ele.Name;
      });
    },
  },
  methods: {
    addNewUser() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.Password === this.ConfirmPassword) {
          if (
            !this.filterEmailsUsers.includes(this.Email) &&
            !this.filterNamesUsers.includes(this.Name)
          ) {
            axios
              .post("Users", {
                Name: this.Name,
                Email: this.Email,
                Photo: this.Photo,
                Phone: this.Phone,
                Address: this.Address,
                SecurityQuestion: this.SecurityQuestion,
                Language: this.language,
                Answer: this.Answer,
                Status: "Good",
                Seller: false,
                Mode: this.mode,
                Password: this.Password,
              })
              .then((response) => {
                this.$toast.success("An account has been created successfully");

                window.localStorage.setItem(
                  "user-detail",
                  JSON.stringify(response.data)
                );
                window.localStorage.setItem(
                  "mode",
                  JSON.stringify(response.data.Mode)
                );
                window.localStorage.setItem(
                  "lang",
                  JSON.stringify(response.data.Language)
                );
                setTimeout(() => {
                  this.$router.push({ path: "/home" });
                }, 2500);
              })
              .catch((reject) => {
                this.$toast.error("Error 404");
              });
          } else this.$toast.error("Name or email is not available");
        } else this.$toast.error("Password Not Mathced");
      }
    },
    getAllUsers() {
      axios
        .get("Users")
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          this.$toast.error("Error In Get Users Please Refresh Site");
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
