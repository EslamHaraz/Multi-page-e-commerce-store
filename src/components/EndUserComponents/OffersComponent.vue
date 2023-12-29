<template>
  <div class="parent row align-items-center p-5">
    <h2 class="mb-3 head text-color">{{ $t("message.offers") }}</h2>
    <div class="col-12">
      <div class="offer-box-img d-Flex flex-wrap">
        <img :src="PhotoOne" class="mb-3" />

        <img class="mb-3" :src="PhotoTwo" />
        <img :src="PhotoThree" class="mb-3" />
      </div>
    </div>
    <div class="box-description col-lg-6 m-auto text-initial">
      <div class="text-color w-100">
        <h3 v-if="language == 'ar'" class="mb-3">
          {{ NameAr }}
        </h3>
        <h3 v-else-if="language == 'en'" class="mb-3">
          {{ NameEn }}
        </h3>
        <h4 v-if="language == 'ar'" class="mb-3">
          {{ DescriptionAr }}
        </h4>
        <h3 v-else-if="language == 'en'">
          {{ DescriptionEn }}
        </h3>
        <div class="d-Flex">
          <h4 class="text-color">
            {{ $t("endUser.originalPrice") }} : {{ price }}
          </h4>
          <h4 class="text-color">
            {{ $t("message.discount") }} : {{ discount }}
          </h4>
        </div>
        <div class="text-inital mt-3">
          <button
            class="add-offer cursor-pointer d-flex align-items-center flex-row-reverse"
            :disabled="filterCart.includes(offer.id)"
          >
            <FontAwesome
              :icon="['fas', 'cart-shopping']"
              class="toggle me-3 add-cart"
              @click="addToCart()"
            />
            <h5 class="mb-0">{{ $t("endUser.Takeadvantageoftheoffer") }}</h5>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "OffersComponent",
  data() {
    return {
      offersList: [],
      randomNumber: "",
      PhotoOne: "",
      PhotoTwo: "",
      PhotoThree: "",
      offer: "",
      NameAr: "",
      NameEn: "",
      DescriptionAr: "",
      DescriptionEn: "",
      price: "",
      discount: "",
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.lang,
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
    this.getOffer();
  },
  methods: {
    getOffer() {
      axios.get(`Products?Offer=true`).then((response) => {
        this.offersList = response.data;
        this.getRandomNumber(response.data.length);
        this.PhotoOne = response.data[this.randomNumber].Photo;
        this.PhotoTwo = response.data[this.randomNumber].PhotoTwo;
        this.PhotoThree = response.data[this.randomNumber].PhotoThree;
        this.NameAr = response.data[this.randomNumber].Product.NameAr;
        this.NameEn = response.data[this.randomNumber].Product.NameEn;
        this.discount = response.data[this.randomNumber].Discount;
        this.price = response.data[this.randomNumber].Price;
        this.offer = response.data[this.randomNumber];
        this.DescriptionAr =
          response.data[this.randomNumber].Description.DescriptionAr;
        this.DescriptionEn =
          response.data[this.randomNumber].Description.DescriptionEn;
      });
    },
    getRandomNumber(Array) {
      this.randomNumber = Math.trunc(Math.random() * Array);
      this.offersList[this.randomNumber];
    },
    pushToCart(offer) {
      this.$store.commit("pushOrdresToCart", {
        order: offer,
      });
    },
    addToCart() {
      if (!this.filterCart.includes(this.offer.id)) {
        this.offer.Quantity++;
        this.pushToCart(this.offer);
      }
    },
  },
};
</script>
<style scoped>
.head {
  text-transform: uppercase;
}
.col-reverse {
  display: flex;
  flex-direction: column;
}
.col-reverse img,
.offer-box-img img {
  width: 350px;
}
.offer-box-img {
  justify-content: space-evenly;
}
button.add-offer {
  width: fit-content;
  border: none;
  background-color: var(--bg-primary-Color);
  color: var(--primary-Color);
  padding: 7px;
  border-radius: 3px;
}

.box-description {
  align-items: center;
  display: flex;
  background-color: var(--section-bg-Color);
  border-radius: 5px;
  box-shadow: 0px 0px 3px 0px var(--section-bg-Color);
  padding: 30px;
}
.add-cart {
  border: 1px solid white;
  padding: 7px;
  border-radius: 50%;
}
</style>
