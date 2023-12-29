<template>
  <div class="parent pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-xl-9 p-0 mb-5">
          <div class="product-box d-flex justify-content-evenly customize-box">
            <img :src="Photo" class="img-fluid product-img" />
            <div class="content p-4 d-flex flex-column me-3">
              <h3 class="text-color mb-3 text-initial" v-if="language == 'ar'">
                {{ NameAr }}
              </h3>
              <h3 class="text-color mb-3 text-initial" v-else>
                {{ NameEn }}
              </h3>
              <h4
                class="text-color product-description text-initial"
                v-if="language == 'ar'"
              >
                {{ DescriptionAr }}
              </h4>
              <h4 class="text-color product-description text-initial" v-else>
                {{ DescriptionEn }}
              </h4>
              <div class="stock-price d-Flex justify-content-around mt-4 w-100">
                <h5 class="text-initial text-color mb-0 text-initial">
                  <FontAwesome
                    :icon="['fas', 'list']"
                    class="bars-icon fs-20 text-color"
                  />
                  {{ $t("message.productStock") }} : {{ Stock }}
                </h5>
                <h5 class="text-initial text-color mb-0 text-initial">
                  {{ $t("message.productPrice") }} :
                  <FontAwesome
                    :icon="['fas', 'dollar']"
                    class="bars-icon fs-20 text-color"
                  />
                  {{ Price }}
                </h5>
              </div>
              <div class="add-to-cart p-2">
                <button
                  type="button"
                  :id="ProductId"
                  :disabled="filterCart.includes(ProductId)"
                  class="btn-edit mt-3 w-100 add-order"
                  @click="addToCart(), getTarget($event)"
                >
                  {{ $t("endUser.addToCart") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-12">
          <Similar-Products-Component></Similar-Products-Component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SimilarProductsComponent from "@/components/EndUserComponents/SimilarProductsComponent.vue";
import { mapState } from "vuex";
export default {
  name: "ProductView",
  data() {
    return {
      productId: this.$route.params.productId,
      NameAr: "",
      NameEn: "",
      DescriptionAr: "",
      DescriptionEn: "",
      Photo: "",
      Price: "",
      Stock: "",
      CategoryId: "",
      ProductId: "",
      ProductInCart: "a",
      product: "",
    };
  },
  components: { SimilarProductsComponent },
  computed: {
    ...mapState({
      language: (state) => state.lang,
      ordersList: (state) => state.ordresList,
    }),
    filterCart() {
      return this.$store.state.ordresList.map((ele) => {
        if (this.$store.state.ordresList.length > 0) {
          return ele.id;
        }
      });
    },
  },
  mounted() {
    this.getProductData();
  },

  methods: {
    getProductData() {
      axios.get(`Products/${this.productId}`).then((response) => {
        this.product = response.data;
        this.NameAr = response.data.Product.NameAr;
        this.NameEn = response.data.Product.NameEn;
        this.DescriptionAr = response.data.Description.DescriptionAr;
        this.DescriptionEn = response.data.Description.DescriptionEn;
        this.Photo = response.data.Photo;
        this.Price = response.data.Price;
        this.Stock = response.data.Stock;
        this.CategoryId = response.data.CategoryId;
        this.ProductId = response.data.id;
        console.log(this.product)
      });
    },
    getTarget(e) {
      e.target.setAttribute("disabled", "");
    },
    pushToCart() {
      this.$store.commit("pushOrdresToCart", {
        order: this.product,
      });
    },
    addToCart() {
      if (!this.filterCart.includes(this.product.id)) {
        this.product.Quantity++;
        this.pushToCart(this.product);
      }
    },
  },
};
</script>
<style scoped>
.parent {
  min-height: 66vh;
}
.product-img {
  width: 400px;
    background-color: var(--section-bg-Color);
  border-bottom: 2px solid var(--body-Color);
  padding: 20px;
}

@media (max-width: 991px) {
  .customize-box {
    flex-direction: column;
  }
  .product-img {
    margin: auto;
  }
}
.product-description {
  max-width: 450px;
  line-height: 1.5;
}
.add-to-cart {
  z-index: 500;
  bottom: -50px;
  width: 100%;
  left: 0;
  transition: 0.4s;
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
button:disabled {
  background-color: var(--btn-disabled-bg);
  color: darkgrey;
}
</style>
