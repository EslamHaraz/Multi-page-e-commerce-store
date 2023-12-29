<template>
  <div class="parent">
    <table
      v-if="OffersList.length > 0"
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.offer") }}</th>
        <th scope="col">{{ $t("message.Photo") }}</th>
        <th scope="col">{{ $t("message.productPrice") }}</th>
        <th scope="col">{{ $t("message.productDescription") }}</th>
        <th scope="col">{{ $t("message.edit") }}</th>
      </tr>
      <tbody>
        <tr v-for="(offer, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="lang == 'ar'">{{ offer.Product.NameAr }}</td>
          <td v-else>{{ offer.Product.NameEn }}</td>
          <td><img :src="offer.Photo" class="img-fluid small-img" /></td>
          <td>{{ offer.Price }}</td>
          <td v-if="lang == 'ar'" class="td-display">
            {{ offer.Description.DescriptionAr }}
          </td>
          <td v-else class="td-display">
            {{ offer.Description.DescriptionEn }}
          </td>
          <td>
            <button
              @click="getData(offer, index)"
              class="btn btn-edit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
            <div
              class="modal fade"
              id="staticBackdrob1"
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
                              v-if="NameAr.length > 65"
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

                            <textarea
                              class="form-control w-70 resize-none"
                              id="textAreaExample1"
                              rows="4"
                              v-model.trim="DescriptionAr"
                              :class="{ 'text-end': lang == 'en' }"
                            ></textarea>
                            <div
                              v-if="v$.DescriptionAr.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionRequired") }}
                            </div>
                            <div
                              v-if="
                                DescriptionAr.length < 20 &&
                                DescriptionAr.length > 60
                              "
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionLength") }}
                            </div>
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Description"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productDescriptionEn") }}</label
                            >
                            <textarea
                              class="form-control w-70 resize-none"
                              id="textAreaExample1"
                              rows="4"
                              v-model.trim="DescriptionAr"
                              :class="{ 'text-end': lang == 'en' }"
                            ></textarea>
                            <div
                              v-if="v$.DescriptionEn.$error"
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionRequired") }}
                            </div>
                            <div
                              v-if="
                                DescriptionEn.length < 15 &&
                                DescriptionEn.length > 60
                              "
                              class="text-danger text-initial w-100 mb-2 mt-2"
                            >
                              {{ $t("message.DescriptionLength") }}
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
          </td>
        </tr>
      </tbody>
    </table>
    <div class="message-length" v-else>
      <h3>{{ $t("message.nothingOffers") }}</h3>
    </div>
    <jw-pagination
      class="pagination"
      :pageSize="5"
      :items="OffersList"
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
export default {
  name: "OffersView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      OffersList: [],
      pageOfItems: [],
      categoriesList: [],
      productsNames: [],
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      Photo: "",
      Price: "",
      Stock: "",
      discount: "",
      Category: "",
      CategoryEn: "",
      CategoryAr: "",
      categorId: "",
      offerId: "",
      offerIndex: "",
    };
  },
  components: { JwPagination },
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
      Price: { required },
      Stock: { required },
      discount: { required },
      Category: { required },
    };
  },
  mounted() {
    this.getAllOffers();
    this.getAllCategories();
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
    getData(offer, index) {
      this.offerId = offer.id;
      this.offerIndex = index;
      this.NameAr = offer.Product.NameAr;
      this.NameEn = offer.Product.NameEn;
      this.DescriptionAr = offer.Description.DescriptionAr;
      this.DescriptionEn = offer.Description.DescriptionEn;
      this.Photo = offer.Photo;
      this.Price = offer.Price;
      this.Stock = offer.Stock;
      this.discount = offer.Discount;
      this.Category = offer.CategoryId;
      axios.get(`Categories/${this.Category}`).then((response) => {
        this.CategoryEn = response.data.category.NameEn;
        this.CategoryAr = response.data.category.NameAr;
      });
    },
    getAllOffers() {
      axios.get(`Products?Offer=true`).then((response) => {
        this.OffersList = response.data;
        console.log(this.OffersList);
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
      this.v$.$validate();
      if (
        !this.productsNames.includes(this.NameEn) ||
        !this.productsNames.includes(this.Photo)
      ) {
        if (!this.v$.$error) {
          axios
            .put(`Products/${this.offerId}`, {
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
              Discount: Number.parseInt(this.discount),
              Price: Number.parseInt(this.Price),
              Stock: Number.parseInt(this.Stock),
              CategoryId: this.Category,
            })
            .then((response) => {
              this.$toast.success("The Offer has been Edited successfully", {
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
      } else this.$toast.error("This Offer already exists");
    },
  },
};
</script>
<style scoped>
.small-img {
  width: 90px;
}
</style>
