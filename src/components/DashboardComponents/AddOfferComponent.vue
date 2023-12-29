<template>
  <div class="parent">
    <h1 class="text-initial head text-color">{{ $t("message.addOffer") }}</h1>
    <form @submit.prevent class="form">
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productNameEn") }}
        </label>
        <input
          type="text"
          class="form-control w-70 text-start"
          id="inputProduct"
          v-model.trim="NameEn"
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
          v-if="this.NameEn.length > 60"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productNameAr") }}
        </label>
        <input
          type="text"
          class="form-control w-70 text-end"
          id="inputProduct"
          v-model.trim="NameAr"
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
          v-if="this.NameAr.length > 65"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productDescriptionAr") }}</label
        >

        <input
          type="text"
          class="form-control w-70 text-start"
          id="Description"
          v-model.trim="DescriptionEn"
        />
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
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productDescriptionEn") }}</label
        >

        <input
          type="text"
          class="form-control w-70 text-end"
          id="Description"
          v-model.trim="DescriptionAr"
        />
        <div
          v-if="this.v$.DescriptionAr.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="
            this.DescriptionAr.length > 15 && this.DescriptionAr.length < 30
          "
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionLength") }}
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="Photo" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productPhoto") }}</label
        >

        <input
          type="url"
          class="form-control w-70"
          id="Photo"
          v-model="Photo"
        />
        <div
          v-if="this.v$.Photo.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Photo2" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.TwicePhoto") }}</label
        >

        <input
          type="url"
          class="form-control w-70"
          id="Photo2"
          v-model="PhotoTwo"
        />
        <div
          v-if="this.v$.PhotoTwo.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="PhotoThree" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.ThirdPhoto") }}</label
        >

        <input
          type="url"
          class="form-control w-70"
          id="PhotoThree"
          v-model="PhotoThree"
        />
        <div
          v-if="this.v$.PhotoThree.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.PhotoRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Stock" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productStock") }}</label
        >

        <input
          type="number"
          class="form-control w-70"
          id="Stock"
          v-model="Stock"
        />
        <div
          v-if="this.v$.Stock.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.stockRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Categories" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.Category") }}
        </label>
        <select class="form-select w-70" v-model="Category">
          <option
            :value="cat.id"
            v-for="(cat, index) in categoriesList"
            :key="index"
            v-if="lang == 'ar'"
          >
            {{ cat.category.NameAr }}
          </option>
          <option v-else :value="cat.id">{{ cat.category.NameEn }}</option>
        </select>
        <div
          v-if="this.v$.Category.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.CategoryRequired") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="price" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productPrice") }}</label
        >

        <input
          type="number"
          class="form-control w-70"
          id="price"
          v-model="Price"
        />
        <div
          v-if="this.v$.Price.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.priceRequired") }}
        </div>
        <div
          v-if="Price < 50 && Price !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.priceMinValue") }}
        </div>
        <div
          v-if="Price < 0 && Price !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.stockError") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="discount" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.discount") }}</label
        >

        <input
          type="number"
          class="form-control w-70"
          id="discount"
          v-model="discount"
        />
        <div
          v-if="this.v$.discount.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.discountRequired") }}
        </div>
        <div
          v-if="discount < 10 && discount !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.discountMinValueEg") }}
        </div>
      </div>
      <button @click="addNewProduct()" type="submit" class="btn btn-add mt-3">
        {{ $t("message.addOffer") }}
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  url,
  minValue,
} from "vuelidate/lib/validators";
export default {
  name: "AddOfferComponent",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      Photo: "",
      Price: "",
      Stock: "",
      discount: "",
      Category: "",
      PhotoTwo: "",
      PhotoThree: "",
      categoriesList: [],
    };
  },
  validations() {
    return {
      NameAr: { required, minLength: minLength(7), maxLength: maxLength(60) },
      NameEn: { required, minLength: minLength(7), maxLength: maxLength(65) },
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
      Photo: { url, required },
      PhotoTwo: { url, required },
      PhotoThree: { url, required },
      Price: { required, minValue: minValue(10) },
      Stock: { required, minValue: minValue(10) },
      discount: { required, minValue: minValue(10) },
      Category: { required },
    };
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      lang: (state) => state.lang,
    }),
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      axios
        .get("Categories")
        .then((response) => {
          this.categoriesList = response.data;
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
    addNewProduct() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post(`Products`, {
            Product: {
              NameAr: this.NameAr,
              NameEn: this.NameEn,
            },
            Description: {
              DescriptionAr: this.DescriptionAr,
              DescriptionEn: this.DescriptionEn,
            },
            Quantity: 0,
            Offer: true,
            Photo: this.Photo,
            PhotoTwo: this.PhotoTwo,
            PhotoThree: this.PhotoThree,
            Discount: Number.parseInt(this.discount),
            Price: Number.parseInt(this.Price),
            Stock: Number.parseInt(this.Stock),
            CategoryId: this.Category,
          })
          .then((response) => {
            this.$toast.success("Offer added successfully");
            setTimeout(() => {
              this.$router.push({ path: "Offers" });
            }, 2500);
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("Please type the data correctly");
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
