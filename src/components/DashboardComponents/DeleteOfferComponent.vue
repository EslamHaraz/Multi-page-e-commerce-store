<template>
  <div class="parent">
    <table
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Name") }}</th>
        <th scope="col">{{ $t("message.Photo") }}</th>
        <th scope="col">{{ $t("message.productPrice") }}</th>
        <th scope="col" class="td-display">
          {{ $t("message.productDescription") }}
        </th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>

      <tbody>
        <tr v-for="(product, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="lang == 'ar'">{{ product.Product.NameAr }}</td>
          <td v-else>{{ product.Product.NameEn }}</td>
          <td><img :src="product.Photo" class="img-fluid small-img" /></td>
          <td>{{ product.Price }}</td>
          <td v-if="lang == 'ar'" class="td-display">
            {{ product.Description.DescriptionAr }}
          </td>
          <td v-else class="td-display">
            {{ product.Description.DescriptionEn }}
          </td>

          <td>
            <button
              @click="getData(product, index)"
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.remove") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
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
                      {{ $t("message.remove") }}
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
                      {{ $t("message.remove") }}
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
    <jw-pagination
      class="pagination"
      :pageSize="5"
      :items="offerList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import JwPagination from "jw-vue-pagination";
import axios from "axios";
export default {
  name: "DeleteOfferComponent",
  data() {
    return {
      offerList: [],
      pageOfItems: [],
      OfferId: "",
      OfferIndex: "",
    };
  },
  components: { JwPagination },

  computed: {
    ...mapState({
      lang: (state) => state.lang,
      mode: (state) => state.mode,
    }),
  },
  mounted() {
    this.getAllProducts();
  },
  methods: {
    getData(Offer, index) {
      this.OfferId = Offer.id;
      this.OfferIndex = index;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getAllProducts() {
      axios.get(`Products?Offer=true`).then((response) => {
        this.offerList = response.data;
      });
    },
    deleteProduct() {
      axios
        .delete(`Products/${this.OfferId}`)
        .then((response) => {
          this.$toast.success("The Product has been cleared successfully", {
            timeout: 1500,
          });
          this.pageOfItems.splice(this.OfferIndex, 1);
          document.getElementById("closed").click();
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
<style></style>
