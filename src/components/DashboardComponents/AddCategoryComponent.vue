<template>
  <div class="parent">
    <h1 class="text-initial head text-color">
      {{ $t("message.AddCategory") }}
    </h1>
    <form @submit.prevent>
      <div class="form-group mb-3 w-70">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.categoryNameEnglish") }}
        </label>
        <input
          type="text"
          class="form-control text-start"
          id="inputProduct"
          v-model="NameEn"
        />
      </div>
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
      <div class="form-group mb-3 w-70">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.categoryNameArabic") }}
        </label>
        <input
          type="text"
          class="form-control text-end"
          id="inputProduct"
          v-model="NameAr"
        />
      </div>
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
        v-if="this.NameAr.length > 15"
        class="text-danger text-initial w-100 mb-2"
      >
        {{ $t("message.longName") }}
      </div>
      <div class="form-group mb-3 w-70">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.CategoryDescriptionEnglish") }}</label
        >

        <input
          type="text"
          class="form-control text-start"
          id="Description"
          v-model="DescriptionEn"
        />
        <div
          v-if="this.v$.DescriptionEn.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="this.DescriptionEn.length < 30 && DescriptionEn !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionShort") }}
        </div>
        <div
          v-if="this.DescriptionEn.length > 500 && DescriptionEn !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionLong") }}
        </div>
      </div>
      <div class="form-group mb-3 w-70">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.CategoryDescriptionArabic") }}</label
        >

        <input
          type="text"
          class="form-control text-end"
          id="Description"
          v-model="DescriptionAr"
        />
        <div
          v-if="this.v$.DescriptionAr.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="this.DescriptionAr.length < 30 && DescriptionAr !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionShort") }}
        </div>
        <div
          v-if="this.DescriptionAr.length > 500 && DescriptionAr !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionLong") }}
        </div>
      </div>
      <div class="form-group mb-3 w-70">
        <label for="Photo" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productPhoto") }}</label
        >

        <input type="url" class="form-control" id="Photo" v-model="Photo" />
        <div
          v-if="this.v$.Photo.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>
      <button @click="addCategory()" type="submit" class="btn btn-add mt-3">
        {{ $t("message.AddCategory") }}
      </button>
    </form>
  </div>

</template>

<script>
import axios from "axios";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
export default {
  name: "AddCategoryComponent",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      Photo: "",
      categoriesList: [],
    };
  },
  mounted() {
    this.getAllCategories();
  },
  validations() {
    return {
      NameAr: { required, minLength: minLength(7), maxLength: maxLength(15) },
      NameEn: { required, minLength: minLength(7), maxLength: maxLength(15) },
      DescriptionAr: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(500),
      },
      DescriptionEn: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(500),
      },
      Photo: { required, url },
    };
  },
  methods: {
    async getAllCategories() {
      let result = await axios.get("Categories");
      if (result.status == 200) {
        result.data.filter((ele) => {
          this.categoriesList.push(ele.category.NameEn);
        });
      }
    },

    addCategory() {
      this.v$.$validate();
      if (!this.categoriesList.includes(this.NameEn)) {
        if (!this.v$.$error) {
          axios
            .post("Categories", {
              category: {
                NameAr: this.NameAr,
                NameEn: this.NameEn,
              },
              Description: {
                DescriptionAr: this.DescriptionAr,
                DescriptionEn: this.DescriptionEn,
              },
              Photo: this.Photo,
            })
            .then((response) => {
              this.$toast.success("The category has been added successfully");
              setTimeout(() => {
                this.$router.push({ path: "Categories" });
              }, 2500);
            });
        } else this.$toast.error("Please fill in the data correctly");
      } else this.$toast.error("This category already exists");
    },
  },
};
</script>

<style></style>
