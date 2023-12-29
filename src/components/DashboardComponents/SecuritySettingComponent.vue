<template>
  <div class="parent">
    <form @submit.prevent class="text-start w-100 form">
      <div class="inputs mt-4">
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.securityQuestion")
          }}</label>
          <select value="ali" class="form-select" v-model="SecurityQuestion">
            <option>{{ $t("message.QuastionOne") }}</option>
            <option>{{ $t("message.QuastionTwo") }}</option>
            <option>{{ $t("message.QuastionThree") }}</option>
            <option>{{ $t("message.QuastionFour") }}</option>
          </select>
          <div
            v-if="this.v$.SecurityQuestion.$error"
            class="text-danger text-initial"
          >
            {{ $t("message.SecurityQustionRequired") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <input
            type="text"
            autocomplete
            class="form-control text-center"
            v-model="SecurityQuestion"
            disabled
          />
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.Answer")
          }}</label>
          <input
            type="text"
            autocomplete
            class="form-control"
            :placeholder="$t('message.Answer')"
            v-model="Answer"
          />
          <div v-if="this.v$.Answer.$error" class="text-danger text-initial">
            {{ $t("message.AnswerRequired") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.Password")
          }}</label>
          <input
            type="password"
            autocomplete
            class="form-control"
            :placeholder="$t('message.Password')"
            v-model="Password"
          />
          <div v-if="this.v$.Password.$error" class="text-danger text-initial">
            {{ $t("message.PasswordRequired") }}
          </div>
          <div
            v-if="this.Password.length > 8 && this.Password.length > 15"
            class="text-danger text-initial"
          >
            {{ $t("message.PasswordLength") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.confirmPassword")
          }}</label>
          <input
            type="password"
            autocomplete
            class="form-control"
            :placeholder="$t('message.confirmPassword')"
            v-model="ConfirmPassword"
          />
          <div
            v-if="this.ConfirmPassword !== this.Password"
            class="text-danger text-initial"
          >
            {{ $t("message.PasswordMatch") }}
          </div>
        </div>
      </div>
      <button
        @click="editAdminData()"
        type="submit"
        class="submit-button w-100 p-2 text-white"
      >
        {{ $t("message.editSetting") }}
      </button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  number,
  url,
} from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SecuritySettingComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      Password: "",
      ConfirmPassword: "",
      SecurityQuestion: "as ",
      Answer: "",
      adminId: "",
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
      Password: { required, minLength: minLength(8), maxLength: maxLength(15) },
      ConfirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
      SecurityQuestion: { required },
      Answer: { required },
    };
  },
  methods: {
    getAdminData() {
      axios.get(`Employees/${this.adminId}`).then((response) => {
        this.adminData = response.data;
        this.SecurityQuestion = response.data.SecurityQuestion;
        this.Answer = response.data.Answer;
      });
    },
    editAdminData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.Password == this.ConfirmPassword) {
          axios
            .put(
              `Employees/${this.adminId}`,
              this.adminData,
              (this.adminData.SecurityQuestion = this.SecurityQuestion),
              (this.adminData.Answer = this.Answer),
              (this.adminData.Password = this.Password)
            )
            .then((response) => {
              this.$toast.success(
                "Security settings have been modified successfully"
              );
              setTimeout(() => {
                this.$router.push({ path: "/Dashboard/Home" });
              }, 2000);
            })
            .catch((reject) => {
              this.$toast.error("Error 404");
            });
        } else this.$toast.error("Passwords do not match");
      } else this.$toast.error("Please fill in the data correctly");
    },
  },
};
</script>
