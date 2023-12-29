<template>
  <div class="parent">
    <form @submit.prevent class="text-start w-100 form">
      <div class="inputs mt-4">
        <div class="mb-3 text-color text-initial">
          <label class="label-weight mb-2">{{ $t("message.Name") }}</label>
          <input
            type="text"
            autocomplete
            class="form-control"
            :placeholder="$t('message.Name')"
            v-model.trim="Name"
          />
          <div v-if="v$.Name.$error" class="text-danger text-initial">
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
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.Email")
          }}</label>
          <input
            type="email"
            autocomplete
            class="form-control text-start"
            :placeholder="$t('message.Email')"
            v-model.trim="Email"
          />
          <div v-if="v$.Email.$error" class="text-danger text-initial">
            {{ $t("message.EmailRequired") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.personalPhoto")
          }}</label>
          <input
            type="url"
            autocomplete
            class="form-control"
            :placeholder="$t('message.personalPhoto')"
            v-model.trim="Photo"
          />
          <img :src="PhotoPrevirew" class="img-fluid w-50 h-100 mt-2 mb-2" />
          <div v-if="this.v$.Photo.$error" class="text-danger text-initial">
            {{ $t("message.PhotoRequired") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.phoneNumber")
          }}</label>
          <input
            type="text"
            autocomplete
            class="form-control"
            :placeholder="$t('message.phoneNumber')"
            v-model="Phone"
          />
          <div v-if="this.v$.Phone.$error" class="text-danger text-initial">
            {{ $t("message.NumberRequired") }}
          </div>
        </div>
        <div class="mb-3 text-initial">
          <label class="label-weight mb-2 text-color">{{
            $t("message.Address")
          }}</label>
          <input
            type="text"
            autocomplete
            class="form-control"
            :placeholder="$t('message.Address')"
            v-model="Address"
          />
          <div v-if="this.v$.Address.$error" class="text-danger text-initial">
            {{ $t("message.AddressRequired") }}
          </div>
          <div
            v-if="Address.length < 10 || Address.length > 50"
            class="text-danger text-initial"
          >
            {{ $t("message.AddressMessage") }}
          </div>
        </div>
      </div>
      <div class="text-initial mt-4">
        <button
          @click="editUserData()"
          type="submit"
          class="submit-button p-2 text-white"
        >
          {{ $t("message.editSetting") }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  url,
} from "vuelidate/lib/validators";
export default {
  name: "InformationPresonalComponent",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      Name: "",
      Email: "",
      Photo: "",
      PhotoPrevirew: "",
      Phone: "",
      Address: "",
      userId: "",
      userData: "",
      usersList: [],
    };
  },
  validations() {
    return {
      Name: { required, minLength: minLength(10), maxLength: maxLength(15) },
      Email: { required, email },
      Photo: { required, url },
      Phone: { required },
      Address: { required, minLength: minLength(10), maxLength: maxLength(50) },
    };
  },
  mounted() {
    let user = window.localStorage.getItem("user-detail");
    if (user) {
      this.userId = JSON.parse(user).id;
      this.getUserData();
    }
    this.gatAllAdmins();
  },
  methods: {
    editData() {
      this.$store.commit("setadminData", {
        Photo: this.Photo,
        Name: this.Name,
        Email: this.Email,
      });
    },
    getUserData() {
      axios.get(`Users/${this.userId}`).then((response) => {
        this.userData = response.data;
        this.Name = response.data.Name;
        this.Email = response.data.Email;
        this.Photo = response.data.Photo;
        this.PhotoPrevirew = response.data.Photo;
        this.Phone = response.data.Phone;
        this.Address = response.data.Address;
      });
    },
    gatAllAdmins() {
      axios.get(`Users`).then((response) => {
        response.data.filter((ele) => {
          this.usersList.push(ele.Name, ele.Email, ele.Photo);
        });
      });
    },
    editUserData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (
          !this.usersList.includes(this.Name) ||
          !this.usersList.includes(this.Email) ||
          !this.usersList.includes(this.Photo)
        ) {
          axios
            .put(
              `Users/${this.userId}`,
              this.userData,
              (this.userData.Name = this.Name),
              (this.userData.Email = this.Email),
              (this.userData.Photo = this.Photo),
              (this.userData.Phone = this.Phone),
              (this.userData.Address = this.Address)
            )
            .then((response) => {
              this.$toast.success("Your data has been modified successfully");
              this.PhotoPrevirew = this.Photo;
              setTimeout(() => {
                this.$router.push({ path: "/home" });
              }, 2000);
            });
        } else this.$toast.error("This data is not available");
      } else this.$toast.error("Please fill in the data correctly");
    },
  },
};
</script>
<style scoped>
.submit-button {
  width: 150px;
}
</style>
