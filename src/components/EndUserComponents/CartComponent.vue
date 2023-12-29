<template>
  <div class="parent" :class="{ active: cartBar }">
    <div
      class="header d-Flex"
      :class="{ 'flex-row-reverse': Language == 'ar' }"
    >
      <h4 class="mb-0 p-2 text-color">{{ $t("endUser.shoppingCart") }}</h4>
      <div @click="editcartBarStatus()" class="head cursor-pointer text-color">
        <FontAwesome :icon="['fas', 'xmark']" class="toggle" />
        {{ $t("endUser.close") }}
      </div>
    </div>
    <div class="orders-length mt-4" v-if="ordersList.length < 1">
      <img class="xmark mb-3" src="@/assets/cart-xmark.svg" />
      <h5 class="text-color">{{ $t("endUser.noProductsMessage") }}</h5>
      <button @click="editcartBarStatus()" class="btn btn-edit mt-3">
        {{ $t("endUser.returnToShopping") }}
        <FontAwesome :icon="['fas', 'cart-shoppin g']" style="margin: 0" />
      </button>
    </div>
    <div class="ordres-list pt-3 pb-3">
      <div v-for="(order, index) in ordersList" :key="index" class="border-b">
        <div class="box-order d-Flex">
          <img :src="order.Photo" class="product-photo mb-2" />
          <h6
            v-if="Language == 'ar'"
            class="text-initial text-color product-address mb-0"
          >
            {{ order.Product.NameAr }}
          </h6>
          <h6 v-else class="text-initial text-color product-address mb-0">
            {{ order.Product.NameEn }}
          </h6>
          <FontAwesome
            :icon="['fas', 'xmark']"
            class="xmark text-color"
            @click="removeFromCart(order, index), setToLocalStorage()"
          />
        </div>
        <div class="d-Flex">
          <div class="increment-decrement d-Flex mb-2">
            <button class="btn-edit edit" @click="order.Quantity++">+</button>
            <div class="quantity">{{ order.Quantity }}</div>
            <button
              :disabled="order.Quantity == 1"
              class="btn-delete edit"
              @click="order.Quantity--"
            >
              -
            </button>
          </div>
          <div class="cashing text-color" v-if="order.Quantity > 0">
            {{ order.Quantity }}
            <FontAwesome :icon="['fas', 'xmark']" class="fs-10" />
            {{ order.Price }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-Flex" v-if="ordersList.length > 0">
      <h5 class="text-color">{{ $t("endUser.Subtotal") }}</h5>
      <h5 class="text-color" v-if="this.calculationOrder.length > 0">
        {{ calculationTotal }}
      </h5>
      <h5 class="text-color" v-else>{{ total }}</h5>
    </div>
    <router-link :to="{ name: 'Checkout' }">
      <button @click="setTotalToStore()" class="btn btn-edit mt-3 btn-proceed">
        {{ $t("endUser.proceedCheckout") }}
        <FontAwesome :icon="['fas', 'cart-shopping']" style="margin: 0" />
      </button>
    </router-link>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "CartComponent",
  data() {
    return {
      total: "",
    };
  },
  computed: {
    ...mapState({
      ordersList: (state) => state.ordresList,
      cartBar: (state) => state.cartBar,
      Language: (state) => state.lang,
    }),
    calculationOrder() {
      return this.ordersList.map((order) => {
        return order.Price * order.Quantity;
      });
    },
    calculationTotal() {
      if (this.calculationOrder.length > 0) {
        return this.calculationOrder.reduce((cur, acc) => {
          return (this.total = cur + acc);
        });
      } else {
        return (this.total = this.calculationOrder[0]);
      }
    },
  },
  methods: {
    setTotalToStore(value) {
      this.$store.commit("getTotalOrder", {
        total: this.calculationTotal,
      });
      localStorage.setItem("Total", this.$store.state.total);
      this.$store.state.cartBar = false;
    },
    setToLocalStorage() {
      window.localStorage.setItem(
        "Product-list",
        JSON.stringify(this.$store.state.ordresList)
      );
    },
    editcartBarStatus() {
      this.$store.commit("editCartBarStatus");
    },
    removeFromCart(order, index) {
      this.ordersList.splice(index, 1);
      order.Quantity = 0;
    },
  },
};
</script>
<style scoped>
.parent {
  background-color: var(--body-Color);
  position: fixed;
  right: -100%;
  width: 350px;
  top: 0;
  height: 100vh;
  padding: 25px;
  transition: var(--main-transition);
  z-index: 500;
}
.parent.active {
  right: 0px;
  z-index: 5000;
}
.header {
  border-bottom: 1px solid #838383;
  padding: 5px;
}
.head {
  font-size: 20px;
}
.xmark {
  width: 100px;
}
.btn-proceed {
  position: absolute;
  width: 90%;
  left: 15px;
  bottom: 15px;
}
.btn-proceed:hover,
.btn-edit:hover {
  color: var(--text-Color);
  background-color: var(--bg-primary-Color);
}
.product-photo {
  width: 60px;
}
.product-address {
  max-width: 180px;
}
.xmark {
  width: fit-content;
  font-size: 20px;
  cursor: pointer;
}
button.edit {
  padding: 10px;
  width: 50px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 26px;
}
.increment-decrement {
  width: 120px;
}
.border-b {
  border-bottom: 1px solid #a7a6a6;
  margin-bottom: 5px;
  margin-left: 10px;
}
.quantity {
  background-color: #f3f3f3;
  padding: 6px;
  height: 30px;
  line-height: 18px;
}
.cashing {
  font-size: 20px;
  margin-bottom: 9px;
}
.ordres-list {
  height: 800px;
  overflow: auto;
}
/* width */
::-webkit-scrollbar {
  width: 8px;
  border-radius: 20px;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(105, 105, 105);
  border-radius: 40px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--section-bg-Color);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(184, 184, 184);
}
</style>
