<template>
  <div class="parent">
    <h3 class="text-initial head text-color">{{ $t("message.addProduct") }}</h3>
    <form @submit.prevent class="form">
      <div class="form-group mb-3">
        <label for="inputProduct" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productNameEn") }}
        </label>
        <input
          type="text"
          class="form-control w-70"
          id="inputProduct"
          :placeholder="$t('message.productNameEn')"
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
        <label for="arabic" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productNameAr") }}
        </label>
        <input
          ref="productArabic"
          id="arabic"
          type="text"
          class="form-control w-70"
          :placeholder="$t('message.productNameAr')"
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
          v-if="this.NameAr.length > 60"
          class="text-danger text-initial w-100 mb-2"
        >
          {{ $t("message.longName") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productDescriptionAr") }}</label
        >
        <textarea
          class="form-control w-70 resize-none"
          ref="descriptionArabic"
          id="Description"
          rows="4"
          :placeholder="$t('message.productDescriptionAr')"
          v-model.trim="DescriptionAr"
        ></textarea>
        <div
          v-if="this.v$.DescriptionAr.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="this.DescriptionAr.length < 15 && this.DescriptionAr !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.descriptionShort") }}
        </div>
        <div
          v-if="this.DescriptionAr.length > 250"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.descriptionLong") }}
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Description" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productDescriptionEn") }}</label
        >
        <textarea
          class="form-control w-70 resize-none"
          id="Description"
          rows="4"
          :placeholder="$t('message.productDescriptionEn')"
          v-model.trim="DescriptionEn"
          :class="{ 'text-start': lang == 'en' }"
        ></textarea>

        <div
          v-if="this.v$.DescriptionEn.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.DescriptionRequired") }}
        </div>
        <div
          v-if="this.DescriptionEn.length < 15 && this.DescriptionEn !== ''"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.descriptionShort") }}
        </div>
        <div
          v-if="this.DescriptionEn.length > 250"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.descriptionLong") }}
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
          :placeholder="$t('message.productPhoto')"
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
        <label for="Stock" class="w-100 text-initial mb-2 text-color">
          {{ $t("message.productStock") }}</label
        >

        <input
          type="number"
          class="form-control w-70"
          id="Stock"
          :placeholder="$t('message.productStock')"
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
          type="text"
          class="form-control w-70"
          id="price"
          :placeholder="$t('message.productPrice')"
          v-model="Price"
        />
        <div
          v-if="this.v$.Price.$error"
          class="text-danger text-initial w-100 mb-2 mt-2"
        >
          {{ $t("message.priceRequired") }}
        </div>
      </div>
      <button @click="addNewProduct()" type="submit" class="btn btn-add mt-3">
        {{ $t("message.addProduct") }}
      </button>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
let user = localStorage.getItem("user-detail");
export default {
  name: "AddProductUserComponent",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      user,
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      Photo: "",
      Price: "",
      Stock: "",
      Category: "",
      categoriesList: [],
      productList: [],
      productsNames: [],
      userId: "",
      userStatus: "",
    };
  },
  validations() {
    return {
      NameAr: { required, minLength: minLength(7), maxLength: maxLength(60) },
      NameEn: { required, minLength: minLength(7), maxLength: maxLength(60) },
      DescriptionAr: {
        required,
        minLength: minLength(20),
        maxLength: maxLength(250),
      },
      DescriptionEn: {
        required,
        minLength: minLength(25),
        maxLength: maxLength(250),
      },
      Photo: { url, required },
      Price: { required },
      Stock: { required },
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
    if (user) {
      this.userId = JSON.parse(user).id;
      this.checkSellerStatus();
    }
    this.getAllCategories();
    this.getAllProducts();
  },
  methods: {
    checkSellerStatus() {
      if (JSON.parse(user).SellerStatus == "Bad") {
        this.$router.push({ path: "/home" });
      }
    },
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
    getAllProducts() {
      axios.get(`Products`).then((response) => {
        this.productsList = response.data;

        response.data.filter((ele) => {
          this.productsNames.push(ele.Product.NameEn, ele.Photo);
        });
      });
    },
    addNewProduct() {
      this.v$.$validate();
      if (!this.v$.$error) {
        [this.DescriptionAr, this.DescriptionEn] = [
          this.DescriptionEn,
          this.DescriptionAr,
        ];
        if (
          !this.productsNames.includes(this.NameEn) &&
          !this.productsNames.includes(this.Photo)
        ) {
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
              Photo: this.Photo,
              Price: Number.parseInt(this.Price),
              Stock: Number.parseInt(this.Stock),
              CategoryId: this.Category,
              userId: this.userId,
            })
            .then((response) => {
              this.$toast.success("Product added successfully");
              setTimeout(() => {
                this.$router.push({ path: "/home" });
              }, 2500);
            })
            .catch((reject) => {
              this.$toast.error("Error 404");
            });
        } else this.$toast.error("This Product Is Already Exisit ");
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
