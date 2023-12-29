<template>
  <div class="parent">
    <table
      v-if="productsList.length > 0"
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Name") }}</th>
        <th class="td-display" scope="col">{{ $t("message.Photo") }}</th>
        <th scope="col">{{ $t("message.productPrice") }}</th>
        <th class="td-display" scope="col">
          {{ $t("message.productDescription") }}
        </th>
        <th scope="col">{{ $t("message.edit") }}</th>
      </tr>
      <tbody>
        <tr v-for="(product, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="lang == 'ar'">{{ product.Product.NameAr | filter(10) }}</td>
          <td v-else>{{ product.Product.NameEn | filter(20) }}</td>
          <td class="td-display">
            <img :src="product.Photo" class="img-fluid small-img" />
          </td>
          <td>{{ product.Price }}</td>
          <td v-if="lang == 'ar'" class="td-display">
            {{ product.Description.DescriptionAr | filter(80) }}
          </td>
          <td v-else class="td-display">
            {{ product.Description.DescriptionEn | filter(80) }}
          </td>
          <td>
            <div class="d-flex justify-content-evenly flex-wrap">
              <button
                @click="getData(product, index)"
                class="btn btn-edit"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrob12"
              >
                {{ $t("message.edit") }}
                <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
              </button>
              <button
                @click="getData(product, index)"
                class="btn btn-delete"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrob13"
              >
                {{ $t("message.delete") }}
                <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
              </button>
            </div>
            <div
              class="modal fade"
              id="staticBackdrob12"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdrob1Label"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header flex-row-reverse">
                    <button
                      type="button"
                      id="closed"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <h5 class="modal-title" id="staticBackdrob1Label">
                      {{ $t("message.edit") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <form @submit.prevent class="form">
                          <div class="form-group mb-3">
                            <label
                              for="inputProduct"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productNameEn") }}
                            </label>
                            <input
                              type="text"
                              class="form-control w-70"
                              id="inputProduct"
                              :placeholder="$t('message.productNameEn')"
                              v-model.trim="NameEn"
                              :class="{ 'text-start': lang == 'ar' }"
                            />
                            <div
                              v-if="v$.NameEn.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.NameRequired") }}
                            </div>
                            <div
                              v-if="NameEn.length < 5 && NameEn != ''"
                              class="text-danger text-initial w-100 mb-2"
                            >
                              {{ $t("message.shortName") }}
                            </div>
                            <div
                              v-if="NameEn.length > 60"
                              class="text-danger text-initial w-100 mb-2"
                            >
                              {{ $t("message.longName") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="inputProduct"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productNameAr") }}
                            </label>
                            <input
                              type="text"
                              class="form-control w-70"
                              id="inputProduct"
                              :placeholder="$t('message.productNameAr')"
                              v-model="NameAr"
                              :class="{ 'text-end': lang == 'en' }"
                            />
                            <div
                              v-if="v$.NameAr.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.NameRequired") }}
                            </div>
                            <div
                              v-if="NameAr.length < 8 && NameAr != ''"
                              class="text-danger text-initial w-100 mb-2"
                            >
                              {{ $t("message.shortName") }}
                            </div>
                            <div
                              v-if="NameAr.length > 60"
                              class="text-danger text-initial w-100 mb-2"
                            >
                              {{ $t("message.longName") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Description"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productDescriptionAr") }}</label
                            >

                            <input
                              type="text"
                              class="form-control w-70"
                              id="Description"
                              :placeholder="$t('message.productDescriptionAr')"
                              v-model="DescriptionAr"
                              :class="{ 'text-end': lang == 'en' }"
                            />
                            <div
                              v-if="v$.DescriptionAr.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionRequired") }}
                            </div>
                            <div
                              v-if="
                                DescriptionAr.length < 15 &&
                                DescriptionAr !== ''
                              "
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.descriptionShort") }}
                            </div>
                            <div
                              v-if="DescriptionAr.length > 250"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.descriptionLong") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Description"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productDescriptionEn") }}</label
                            >

                            <input
                              type="text"
                              class="form-control w-70"
                              id="Description"
                              :placeholder="$t('message.productDescriptionEn')"
                              v-model="DescriptionEn"
                              :class="{ 'text-start': lang == 'ar' }"
                            />
                            <div
                              v-if="v$.DescriptionEn.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionRequired") }}
                            </div>
                            <div
                              v-if="
                                DescriptionEn.length < 15 &&
                                DescriptionEn !== ''
                              "
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.descriptionShort") }}
                            </div>
                            <div
                              v-if="DescriptionEn.length > 250"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.descriptionLong") }}
                            </div>
                          </div>

                          <div class="form-group mb-3">
                            <label
                              for="Photo"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
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
                              v-if="v$.Photo.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.PhotoRequired") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Stock"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
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
                              v-if="v$.Stock.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.stockRequired") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Categories"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.Category") }}
                              <div v-if="lang == 'ar'">({{ CategoryAr }})</div>
                              <div v-else>({{ CategoryEn }})</div>
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
                              <option v-else :value="cat.id">
                                {{ cat.category.NameEn }}
                              </option>
                            </select>
                            <div
                              v-if="v$.Category.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.CategoryRequired") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="price"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
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
                              v-if="v$.Price.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.priceRequired") }}
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer flex-row-reverse">
                    <button
                      type="button"
                      class="btn btn-secondary close"
                      data-bs-dismiss="modal"
                    >
                      {{ $t("message.cancel") }}
                    </button>
                    <button
                      @click="editProduct()"
                      type="button"
                      class="btn btn-edit"
                    >
                      {{ $t("message.edit") }}
                      <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="staticBackdrob13"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdrob1Label"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header flex-row-reverse">
                    <button
                      type="button"
                      ref="close"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <h5 class="modal-title" id="staticBackdrob1Label">
                      {{ $t("message.delete") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="text-danger">
                          {{ $t("message.deleteMessage") }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer flex-row-reverse">
                    <button
                      type="button"
                      class="btn btn-secondary close"
                      data-bs-dismiss="modal"
                    >
                      {{ $t("message.cancel") }}
                    </button>
                    <button
                      @click="deleteProduct()"
                      type="button"
                      class="btn btn-delete"
                    >
                      {{ $t("message.delete") }}
                      <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="message-length" v-else>
      <h3>{{ $t("message.nothingProducts") }}</h3>
    </div>
    <jw-pagination
      class="pagination"
      :pageSize="8"
      :items="productsList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import JwPagination from "jw-vue-pagination";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
let user = localStorage.getItem("user-detail");
export default {
  name: "ProductsView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      user,
      productsList: [],
      pageOfItems: [],
      categoriesList: [],
      productsNames: [],
      NameAr: "",
      NameEn: "",
      DescriptionAr: "",
      DescriptionEn: "",
      Photo: "",
      Price: "",
      Stock: "",
      Category: "",
      CategoryEn: "",
      CategoryAr: "",
      categorId: "",
      productId: "",
      productIndex: "",
      userId: "",
    };
  },
  components: { JwPagination },
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
        minLength: minLength(15),
        maxLength: maxLength(250),
      },
      Photo: { url, required },
      Price: { required },
      Stock: { required },
      Category: { required },
    };
  },
  mounted() {
    this.getAllCategories();
    if (user) {
      this.userId = JSON.parse(user).id;

      this.getAllProducts();
    }
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      lang: (state) => state.lang,
      ar: (state) => state.ar,
      en: (state) => state.en,
    }),
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getData(product, index) {
      this.productId = product.id;
      this.productIndex = index;
      this.NameAr = product.Product.NameAr;
      this.NameEn = product.Product.NameEn;
      this.DescriptionAr = product.Description.DescriptionAr;
      this.DescriptionEn = product.Description.DescriptionEn;
      this.Photo = product.Photo;
      this.Price = product.Price;
      this.Stock = product.Stock;
      this.Category = product.CategoryId;
      axios.get(`Categories/${this.Category}`).then((response) => {
        this.CategoryEn = response.data.category.NameEn;
        this.CategoryAr = response.data.category.NameAr;
      });
    },
    getAllProducts() {
      axios.get(`Products?userId=${this.userId}`).then((response) => {
        this.productsList = response.data;
        console.log(response.data);
        response.data.filter((ele) => {
          this.productsNames.push(ele.Product.NameEn, ele.Photo);
        });
      });
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
    editProduct() {
      if (
        !this.productsNames.includes(this.NameEn) &&
        !this.productsNames.includes(this.Photo)
      ) {
        if (!this.v$.$error) {
          axios
            .put(`Products/${this.productId}`, {
              Product: {
                NameAr: this.NameAr,
                NameEn: this.NameEn,
              },
              Description: {
                DescriptionAr: this.DescriptionAr,
                DescriptionEn: this.DescriptionEn,
              },
              userId: this.productsList[this.productIndex].userId,
              Photo: this.Photo,
              Price: Number.parseInt(this.Price),
              Stock: Number.parseInt(this.Stock),
              CategoryId: this.Category,
            })
            .then((response) => {
              this.$toast.success("The Product has been Edited successfully", {
                timeout: 1500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1600);
            })
            .catch((reject) => {
              this.$toast.error("Error 404");
            });
        } else this.$toast.error("Please type the data correctly");
      } else this.$toast.error("This Product already exists");
    },
    deleteProduct() {
      axios
        .delete(`Products/${this.productId}`)
        .then((response) => {
          this.$toast.success("The product has been successfully deleted");
          this.$refs.close[0].click();
          this.productsList.splice(this.productIndex, 1);
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
<style scoped>
.small-img {
  width: 90px;
}
.parent {
  height: 500px;
  overflow: auto;
}
</style>
