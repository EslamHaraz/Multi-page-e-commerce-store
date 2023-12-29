<template>
  <div class="parent">
    <div class="col-12">
      <div class="w-100 slider">
        <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(product, index) in productsList" :key="index">
            <img class="mb-4" :src="product.Photo" />
            <h3 class="text-color content mb-3" v-if="Language === 'ar'">
              {{ product.Product.NameAr }}
            </h3>
            <h3 class="text-color content mb-3" v-else>
              {{ product.Product.NameEn }}
            </h3>
            <h3 class="text-color content" v-if="Language === 'ar'">
              {{ product.Description.DescriptionAr | descriptionLetters}}
            </h3>
            <h3 class="text-color content" v-else>
              {{ product.Description.DescriptionEn | descriptionLetters}}
            </h3>
          </slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
    </div>
    <Offers-Component></Offers-Component>
    <Products-Component></Products-Component>
  </div>
</template>

<script>
// @ is an alias to /src
import OffersComponent from "@/components/EndUserComponents/OffersComponent.vue";
import ProductsComponent from "@/components/EndUserComponents/ProductsComponent.vue";
import { slider, slideritem } from "vue-concise-slider";
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "HomeView",
  data() {
    return {
      productsList: [],
      categoriesList: [],
      options: {
        currentPage: 0,
        autoplay: 3000,
        loop: true,
      },
    };
  },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
  },
  mounted() {
    this.getAllProducts();
    this.getAllCategories();
  },
  components: {
    slider,
    slideritem,
    OffersComponent,
    ProductsComponent,
  },
  methods: {
    getAllProducts() {
      axios.get(`Products`).then((response) => {
        this.productsList = response.data;
        this.productsList = this.productsList.reverse().slice(0, 10);
      });
    },
    getAllCategories() {
      axios.get(`Categories`).then((response) => {
        this.categoriesList = response.data;
      });
    },
  },
};
</script>
<style scoped>
.news-container {
  border-bottom: 35px solid var(--main-Color);
  border-right: none;
}
.news-container::before,
.news-container::after {
  content: "";
  position: absolute;
  background-color: var(--main-Color);
  width: 2%;
  bottom: 0;
  height: 45%;
  z-index: 4;
}
.news-container::before {
  left: 0;
}
.news-container::after {
  right: 0;
}
.slider-pagination {
  background-color: red;
}
.slider-container {
  background-color: var(--section-bg-Color);
  padding: 100px 0;
  position: relative;
}
.content {
  z-index: -1;
  font-weight: 600;
}
.slider-item {
  margin-bottom: 20px;
  display: block;
}
.slider-item img {
  width: 300;
}
.search-icon {
  left: 155px;
  top: 21px;
  font-size: 12px;
}
@media (max-width: 991px) {
  .content {
    font-size: 20px;
    white-space: break-spaces;
  }
}
@media (max-width: 567px) {
  .slider-item img {
    width: 350px;
  }
}
</style>
