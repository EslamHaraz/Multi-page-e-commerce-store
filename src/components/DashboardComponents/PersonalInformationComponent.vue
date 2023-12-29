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
            v-model="Email"
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
            v-model="Photo"
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
  name: "PersonalInformationComponent",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      Name: "",
      Email: "",
      Photo: "",
      PhotoPrevirew: "",
      Phone: "",
      Address: "",
      adminId: "",
      adminData: "",
      adminsList: [],
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
    let admin = window.localStorage.getItem("admin-detail");
    if (admin) {
      this.adminId = JSON.parse(admin).id;
      this.getAdminData();
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
    getAdminData() {
      axios.get(`Employees/${this.adminId}`).then((response) => {
        this.adminData = response.data;
        this.Name = response.data.Name;
        this.Email = response.data.Email;
        this.Photo = response.data.Photo;
        this.PhotoPrevirew = response.data.Photo;
        this.Phone = response.data.Phone;
        this.Address = response.data.Address;
      });
    },
    gatAllAdmins() {
      axios.get(`Employees`).then((response) => {
        response.data.filter((ele) => {
          this.adminsList.push(ele.Name, ele.Email,ele.Photo);
        });
      });
    },
    editAdminData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (
          !this.adminsList.includes(this.Name) ||
          !this.adminsList.includes(this.Email) ||
          !this.adminsList.includes(this.Photo)
        ) {
          this.editData();
          axios
            .put(
              `Employees/${this.adminId}`,
              this.adminData,
              (this.adminData.Name = this.Name),
              (this.adminData.Email = this.Email),
              (this.adminData.Photo = this.Photo),
              (this.adminData.Phone = this.Phone),
              (this.adminData.Address = this.Address)
            )
            .then((response) => {
              this.$toast.success("Your data has been modified successfully");
              this.PhotoPrevirew = this.Photo;
              setTimeout(() => {
                this.$router.push({ path: "/Dashboard/Home" });
              }, 2000);
            });
        } else this.$toast.error("This data is not available");
      } else this.$toast.error("Please fill in the data correctly");
    },
  },
};
</script>
