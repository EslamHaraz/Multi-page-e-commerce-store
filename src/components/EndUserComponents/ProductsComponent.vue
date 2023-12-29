<template>
  <div class="parent">
    <div class="container">
      <h2 class="text-color">{{ $t("message.Categories") }}</h2>
      <div
        class="category-container mb-4"
        v-for="(category, index) in getcategory"
        :key="index"
        v-if="getProductsIds.includes(category.id)"
      >
        <h3 class="text-initial text-color mb-4" v-if="langauge == 'ar'">
          {{ category.category.NameAr }}
        </h3>
        <h3 class="text-initial text-color mb-4" v-if="langauge == 'en'">
          {{ category.category.NameEn }}
        </h3>
        <div class="container-Products">
          <div
            class="box-product position-relative"
            v-for="(product, index) in filterProducts.slice(0, 40)"
            :key="index"
            v-if="product.CategoryId == category.id"
          >
            <router-link
              :to="{
                name: 'Product',
                params: {
                  productId: product.id,
                  productName: product.Product.NameEn,
                  CategoryId: product.CategoryId,
                },
              }"
            >
              <div class="parent-img">
                <img :src="product.Photo" />
              </div>

              <div class="content p-3">
                <h4 v-if="langauge == 'ar'" class="text-color">
                  {{ product.Product.NameAr | namesLitters }}
                </h4>
                <h4 v-else class="text-color">
                  {{ product.Product.NameEn | namesLitters }}
                </h4>
                <div class="stock-price d-Flex mt-4 w-100">
                  <h5 class="text-initial text-color mb-0">
                    <FontAwesome
                      :icon="['fas', 'list']"
                      class="bars-icon fs-20 text-color"
                    />
                    {{ $t("message.productStock") }} : {{ product.Stock }}
                  </h5>
                  <h5 class="text-initial text-color mb-0">
                    {{ $t("message.productPrice") }} :
                    <FontAwesome
                      :icon="['fas', 'dollar']"
                      class="bars-icon fs-20 text-color"
                    />
                    {{ product.Price }}
                  </h5>
                </div>
              </div>
            </router-link>
            <div class="add-to-cart p-2">
              <button
                type="button"
                class="btn-edit mt-3 w-100 add-order"
                :id="product.id"
                :disabled="filterCart.includes(product.id)"
                @click="addToCart(product, index), getTarget($event, index)"
              >
                {{ $t("endUser.addToCart") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let user = JSON.parse(localStorage.getItem("user-detail"));
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "ProductsComponent",
  data() {
    return {
      user,
      categoriesList: [],
      productsList: [],
      randomNumber: "",
      index: "",
    };
  },
  mounted() {
    this.getAllProducts();
    this.getAllCategoreis();
  },
  computed: {
    ...mapState({
      CategoryId: (state) => state.categoryId,
      langauge: (state) => state.lang,
    }),

    getProductsIds() {
      return this.productsList.map((ele) => {
        return ele.CategoryId;
      });
    },
    getcategory() {
      return this.categoriesList.filter((ele) => {
        if (this.$store.state.categoryId !== "") {
          return ele.id == this.$store.state.categoryId;
        } else return this.categoriesList;
      });
    },
    filterCart() {
      return this.$store.state.ordresList.map((ele) => {
        if (this.$store.state.ordresList.length > 0) {
          return ele.id;
        }
      });
    },
    filterProducts() {
      return this.productsList.filter((ele) => {
        return ele.Offer != true;
      });
    },
  },
  methods: {
    getTarget(e) {
      e.target.setAttribute("disabled", "");
    },
    pushToCart(product) {
      this.$store.commit("pushOrdresToCart", {
        order: product,
      });
    },
    getAllCategoreis() {
      axios.get(`Categories`).then((response) => {
        this.categoriesList = response.data.reverse().slice(0, 5);
      });
    },
    getAllProducts() {
      axios.get(`Products`).then((response) => {
        this.productsList = response.data;
      });
    },
    addToCart(product) {
      if (!this.filterCart.includes(product.id)) {
        product.Quantity++;
        this.pushToCart(product);
      }
    },
  },
};
</script>
<style scoped>
.box-product {
  overflow: hidden;
  background-color: var(--section-bg-Color);
}
.box-product:hover .add-to-cart {
  bottom: -7px;
}
.add-to-cart {
  position: absolute;
  z-index: 500;
  bottom: -50px;
  width: 100%;
  left: 0;
  transition: 0.4s;
}
.container-Products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.box-product .content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-product img {
  max-width: 100%;
  width: 100%;
  background-color: var(--section-bg-Color);
  border-bottom: 2px solid var(--body-Color);
  padding: 20px;
}

.btn:hover {
  background-color: var(--bg-primary-Color);
  color: var(--text-Color);
}
.add-order {
  padding: 10px;
  border-radius: 6px;
  border: none;
}

</style>
