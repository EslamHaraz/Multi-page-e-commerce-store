<template>
  <div class="parent">
    <h1 class="text-initial head text-color">
      {{ $t("message.addEmployee") }}
    </h1>
    <form @submit.prevent class="form">
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.Name") }}
        </label>
        <input
          type="text"
          class="form-control w-70 mb-2"
          id="inputProduct"
          v-model="Name"
        />
        <div v-if="this.v$.Name.$error" class="text-danger text-initial">
          {{ $t("message.NameRequired") }}
        </div>
        <div
          v-if="this.Name.length < 8 && this.Name != ''"
          class="text-danger text-initial"
        >
          {{ $t("message.shortName") }}
        </div>
        <div v-if="this.Name.length > 15" class="text-danger text-initial">
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="inputProduct2" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.Password") }}
        </label>
        <input
          type="password"
          class="form-control w-70 mb-2"
          id="inputProduct2"
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
      <div class="form-group mb-3">
        <label for="inputProduct3" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.Email") }}
        </label>
        <input
          type="text"
          class="form-control w-70 mb-2 text-start"
          id="inputProduct3"
          v-model="Email"
        />
        <div v-if="this.v$.Email.$error" class="text-danger text-initial">
          {{ $t("message.EmailRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="inputProduct4" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.confirmPassword") }}
        </label>
        <input
          type="password"
          class="form-control w-70 mb-2"
          id="inputProduct4"
          v-model="ConfirmPassword"
        />
        <div
          v-if="this.ConfirmPassword !== this.Password"
          class="text-danger text-initial"
        >
          {{ $t("message.PasswordMatch") }}
        </div>
      </div>
      <div class="mb-3">
        <label
          for="inputProduct5"
          class="label-weight mb-2 text-color w-100 text-initial"
          >{{ $t("message.phoneNumber") }}</label
        >
        <input
          type="number"
          autocomplete
          id="inputProduct5"
          class="form-control w-70 mb-2"
          v-model="Phone"
        />
        <div v-if="this.v$.Phone.$error" class="text-danger text-initial">
          {{ $t("message.NumberRequired") }}
        </div>
      </div>
      <div class="mb-3 text-initial">
        <label for="inputProduct6" class="label-weight mb-2 text-color">{{
          $t("message.Address")
        }}</label>
        <input
          type="text"
          autocomplete
          id="inputProduct6"
          class="form-control w-70"
          v-model="Address"
        />
        <div v-if="this.v$.Address.$error" class="text-danger text-initial">
          {{ $t("message.AddressRequired") }}
        </div>
        <div
          v-if="Address.length <= 10 && Address.length > 50"
          class="text-danger text-initial"
        >
          {{ $t("message.AddressMessage") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Photo" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productPhoto") }}</label
        >

        <input
          type="url"
          class="form-control w-70 mb-2"
          id="Photo"
          v-model="Photo"
        />
        <div v-if="this.v$.Photo.$error" class="text-danger text-initial">
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="Categories" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.permission") }}
        </label>
        <select class="form-select w-70 mb-2" v-model="Permission">
          <option>{{ $t("message.admin") }}</option>
          <option>{{ $t("message.superAdmin") }}</option>
        </select>
        <div v-if="this.v$.Permission.$error" class="text-danger text-initial">
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>

      <div class="mb-3 w-70">
        <label class="label-weight mb-2 text-initial w-100 text-color">{{
          $t("message.selectLanguage")
        }}</label>
        <select class="form-select mb-2" v-model="Mode">
          <option value="ar">{{ $t("message.Arabic") }}</option>
          <option value="en">{{ $t("message.English") }}</option>
        </select>
        <div v-if="this.v$.Mode.$error" class="text-danger text-initial">
          {{ $t("message.languageRequired") }}
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="Categories" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.type") }}
        </label>

        <select class="form-select w-70 mb-2" v-model="Type">
          <option>{{ $t("message.male") }}</option>
          <option>{{ $t("message.female") }}</option>
        </select>
        <div v-if="this.v$.Type.$error" class="text-danger text-initial">
          {{ $t("message.typeRequired") }}
        </div>
      </div>
      <div>
        <label class="label-weight w-70 text-initial text-color">{{
          $t("message.Mode")
        }}</label>
        <div
          class="mb-3 text-initial w-70 d-flex justify-content-between mt-4 mb-4"
        >
          <div class="form-check">
            <input
              id="dark"
              type="radio"
              name="os"
              value="dark"
              v-model="language"
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
              v-model="language"
              class="form-check-input"
            />
            <label class="form-check-label text-color" for="light">
              {{ $t("message.LightMode") }}</label
            >
          </div>
        </div>
          <div v-if="this.v$.Type.$error" class="text-danger text-initial">
            {{ $t("message.modeRequired") }}
          </div>
      </div>
      <div class="mb-3">
        <label class="label-weight mb-2 w-100 text-initial text-color">{{
          $t("message.securityQuestion")
        }}</label>
        <select class="form-select w-70 mb-2" v-model="SecurityQuestion">
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

      <button
        @click="addNewEmployee()"
        type="submit"
        class="btn btn-add mt-3 m-auto"
      >
        {{ $t("message.addEmployee") }}
      </button>

      <div class="mb-3 w-70">
        <label
          for="inputProduct8"
          class="label-weight mb-2 text-color w-100 text-initial"
          >{{ $t("message.Answer") }}</label
        >
        <input
          type="text"
          :class="{ 'text-end': Language === 'ar' }"
          autocomplete
          id="inputProduct8"
          class="form-control"
          v-model="Answer"
        />
        <div v-if="this.v$.Answer.$error" class="text-danger text-initial">
          {{ $t("message.AnswerRequired") }}
        </div>
      </div>
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
  name: "AddEmployeeComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      Name: "".trim(),
      Email: "".trim(),
      Address: "".trim(),
      Photo: "",
      Phone: "",
      Password: "",
      ConfirmPassword: "",
      language: "",
      Mode: "",
      Permission: "",
      Type: "",
      SecurityQuestion: "",
      Answer: "",
      employeesList: [],
    };
  },
  mounted() {
    this.getAllEmoloyees();
  },
  computed: {
    ...mapState({
      Language: (stete) => stete.lang,
    }),
  },
  validations() {
    return {
      Name: { required, minLength: minLength(10), maxLength: maxLength(15) },
      Email: { required, email },
      Photo: { required, url },
      Phone: { required },
      Mode: { required },
      Address: { required, minLength: minLength(10), maxLength: maxLength(50) },
      language: { required },
      Permission: { required },
      Password: { required, minLength: minLength(8), maxLength: maxLength(15) },
      SecurityQuestion: { required },
      ConfirmPassword: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(15),
      },
      Answer: { required },
      Type: { required },
    };
  },
  methods: {
    getAllEmoloyees() {
      axios.get(`Employees`).then((response) => {
        response.data.filter((ele) => {
          this.employeesList.push(ele.Name, ele.Email);
        });
      });
    },
    addNewEmployee() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (
          !this.employeesList.includes(this.Name) ||
          !this.employeesList.includes(this.Email)
        ) {
          axios
            .post(`Employees`, {
              Name: this.Name,
              Email: this.Email,
              Photo: this.Photo,
              Phone: this.Phone,
              Address: this.Address,
              Password: this.Password,
              language: this.language,
              Permission: this.Permission,
              Type: this.Type,
              SecurityQuestion: this.SecurityQuestion,
              Answer: this.Answer,
            })
            .then((response) => {
              this.$toast.success("The employee has been added successfully");
              setTimeout(() => {
                this.$router.push({ path: "Employees" });
              }, 2500);
            });
        } else this.$toast.error("The employee already exists");
      } else this.$toast.error("Please fill in the data correctly");
    },
  },
};
</script>
<style scoped>
.parent {
  height: 670px;
  overflow: auto;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
