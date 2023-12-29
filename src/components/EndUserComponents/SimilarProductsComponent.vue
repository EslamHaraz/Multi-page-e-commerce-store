<template>
  <div class="parent me-2">
    <h4 class="text-color mb-3" v-if="products.length > 0">
      {{ $t("endUser.similarProducts") }}
    </h4>
    <div class="container d-flex justify-content-center">
      <div class="container-products">
        <router-link
          target="_blank"
          :to="{
            name: 'Product',
            params: {
              productId: product.id,
              productName: product.Product.NameEn,
              CategoryId: product.CategoryId,
            },
          }"
          class="box-product mb-3 justify-content-start"
          v-if="product.id != productId"
          v-for="(product, index) in products.slice(0, 3)"
          :key="index"
        >
          <div class="product-box mb-3">
            <img :src="product.Photo" class="img-fluid product-img mb-2" />
            <div class="content flex-column mb-2">
              <h5 class="text-color mb-3 text-initial" v-if="language == 'ar'">
                {{ product.Product.NameAr | namesLitters }}
              </h5>
              <h5 class="text-color mb-3 text-initial" v-else>
                {{ product.Product.NameEn | namesLitters }}
              </h5>
            </div>
            <div class="text-center d-flex justify-content-center show-me-box mb-3">
              <h6 class="text-color mb-0">{{ $t("endUser.ShowMe") }}</h6>
              <FontAwesome
                :icon="['fas', 'eye']"
                class="text-color ms-2 me-2"
              />
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "SimilarProductsComponent",
  data() {
    return {
      products: [],
      CategoryId: this.$route.params.CategoryId,
      productId: this.$route.params.productId,
    };
  },
  mounted() {
    this.getSimilarProducts();
  },
  computed: {
    ...mapState({
      language: (state) => state.lang,
    }),
  },
  methods: {
    getSimilarProducts() {
      axios.get(`Products?CategoryId=${this.CategoryId}`).then((response) => {
        this.products = response.data;
      });
    },
  },
};
</script>
<style scoped>
.show-me-box h6 {
  line-height: 15px;
}
.product-box {
  padding: 10px 0;
  border-bottom: 1px solid #a7a6a6;
}
.product-img {
  width: 70%;
  background-color: var(--section-bg-Color);
  border-bottom: 2px solid var(--body-Color);
  padding: 15px;
}

@media (max-width: 1199px) {
  .container-products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
}
</style>
