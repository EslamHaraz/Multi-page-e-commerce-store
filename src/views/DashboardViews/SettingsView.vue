<template>
  <div class="parent">
    <h1 class="text-initial head text-color">
      {{ $t("message.editSiteSetting") }}
    </h1>
    <form @submit.prevent class="form">
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteNameEn") }}
        </label>
        <input
          type="text"
          class="form-control w-70"
          id="inputProduct"
          v-model.trim="NameEn"
          :class="{ 'text-start': lang == 'ar' }"
        />
        <div
          v-if="this.v$.NameEn.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.NameRequired") }}
        </div>
        <div
          v-if="this.NameEn.length < 5 && this.NameEn != ''"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.shortName") }}
        </div>
        <div
          v-if="this.NameEn.length > 15"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteNameAr") }}
        </label>
        <input
          type="text"
          class="form-control w-70"
          id="inputProduct"
          v-model.trim="NameAr"
          :class="{ 'text-end': lang == 'en' }"
        />
        <div
          v-if="this.v$.NameAr.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.NameRequired") }}
        </div>
        <div
          v-if="this.NameAr.length < 8 && this.NameAr != ''"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.shortName") }}
        </div>
        <div
          v-if="this.NameAr.length > 30"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="price" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteIcon") }}</label
        >

        <input
          type="text"
          class="form-control w-70"
          id="price"
          v-model="Icon"
        />
        <div
          v-if="v$.Icon.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.IconRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteLogo") }}</label
        >

        <input
          type="text"
          class="form-control w-70"
          id="Description"
          v-model="Logo"
        />
        <div
          v-if="v$.Logo.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.logoRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Photo" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteDescriptionEn") }}</label
        >

        <textarea
          class="form-control w-70 resize-none"
          id="textAreaExample1"
          rows="4"
          v-model.trim="DescriptionEn"
          :class="{ 'text-start': lang == 'ar' }"
        ></textarea>
        <div
          v-if="this.v$.DescriptionEn.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="
            this.DescriptionEn.length > 15 && this.DescriptionEn.length < 20
          "
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionLength") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Photo" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteDescriptionAr") }}</label
        >

        <textarea
          class="form-control w-70 resize-none"
          id="textAreaExample1"
          rows="4"
          v-model.trim="DescriptionAr"
          :class="{ 'text-end': lang == 'en' }"
        ></textarea>
        <div
          v-if="this.v$.DescriptionAr.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="
            this.DescriptionAr.length > 15 && this.DescriptionAr.length < 20
          "
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionLength") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Stock" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.altText") }}</label
        >
        <textarea
          class="form-control w-70 resize-none"
          id="textAreaExample1"
          rows="4"
          v-model.trim="altText"
        ></textarea>
        <div
          v-if="v$.altText.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.altTextRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Categories" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.siteStatus") }}
        </label>
        <select class="form-select w-70" v-model="Status">
          <option value="Open">{{ $t("message.open") }}</option>
          <option value="Close">{{ $t("message.closed") }}</option>
        </select>
        <div
          v-if="v$.Status.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.StatusRequired") }}
        </div>
      </div>
      <button @click="editSite()" type="submit" class="btn btn-add mt-3">
        {{ $t("message.editNow") }}
      </button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, url, minLength, maxLength } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SettingsView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      Icon: "",
      Logo: "",
      altText: "",
      Status: "",
    };
  },
  computed: {
    ...mapState({
      lang: (state) => state.lang,
    }),
  },
  mounted() {
    this.getData();
  },
  validations() {
    return {
      NameAr: { required, minLength: minLength(5), maxLength: maxLength(15) },
      NameEn: { required, minLength: minLength(8), maxLength: maxLength(15) },
      DescriptionAr: {
        required,
        minLength: minLength(20),
        maxLength: maxLength(60),
      },
      DescriptionEn: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(60),
      },
      Icon: { required, url },
      Logo: { required, url },
      altText: { required, minLength: minLength(20), maxLength: maxLength(60) },
      Status: { required },
    };
  },
  methods: {
    getData() {
      axios.get(`SettingSite/1`).then((response) => {
        this.NameAr = response.data.SiteName.NameAr;
        this.NameEn = response.data.SiteName.NameEn;
        this.DescriptionAr = response.data.Description.DescriptionAr;
        this.DescriptionEn = response.data.Description.DescriptionEn;
        this.Icon = response.data.Icon;
        this.Logo = response.data.Logo;
        this.altText = response.data.AltText;
        this.Status = response.data.Status;
      });
    },
    editSiteData() {
      this.$store.commit("getSiteData", {
        siteNameAr: this.NameAr,
        siteNameEn: this.NameEn,
        siteLogo: this.Logo,
        siteIcon: this.Icon,
      });
    },
    editSite() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(`SettingSite/1`, {
            SiteName: {
              NameAr: this.NameAr,
              NameEn: this.NameEn,
            },
            Description: {
              DescriptionAr: this.DescriptionAr,
              DescriptionEn: this.DescriptionEn,
            },
            Icon: this.Icon,
            Logo: this.Logo,
            AltText: this.altText,
            Status: this.Status,
          })
          .then((response) => {
            this.$toast.success("Page data has been modified successfully");
            this.editSiteData();
          })
          .catch((rejext) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("Please fill in the data correctly");
    },
  },
};
</script>
<style scoped>
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
