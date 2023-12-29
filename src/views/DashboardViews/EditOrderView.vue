<template>
  <div class="parent">
    <div class="container">
      <div class="row justify-content-between">
        <h4 class="text-color p-3 bg-color">
          {{ $t("endUser.editOrderMessage") }} {{ UserName }}
        </h4>
        <div class="col-lg-4 bg-color p-3 fit-content mb-5">
          <div class="ordres-list pt-3 pb-3">
            <h4 class="text-color text-initial mb-3">
              {{ $t("endUser.order") }}
            </h4>
            <div
              v-for="(order, index) in UpdateOrdersList"
              :key="index"
              class="border-b"
            >
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
                  class="xmark"
                  @click="removeFromCart(order, index)"
                />
              </div>
              <div class="d-Flex">
                <div class="increment-decrement d-Flex mb-2">
                  <button class="btn-edit edit" @click="order.Quantity++">
                    +
                  </button>
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
          <div class="d-Flex" v-if="userOrder.length > 0">
            <h5 class="text-color">{{ $t("endUser.Subtotal") }}</h5>
            <h5 class="text-color" v-if="this.calculationOrder.length > 0">
              {{ calculationTotal }}
            </h5>
            <h5 class="text-color" v-else>{{ total }}</h5>
          </div>

          <button @click="editOrder()" class="btn btn-edit mt-3 btn-proceed">
            {{ $t("endUser.editOrder") }}
            <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
          </button>
        </div>
        <div class="col-lg-7 height-9">
          <div class="products-container">
            <form>
              <div class="form-group mb-2">
                <h6 class="text-color text-initial mb-3">
                  {{ $t("endUser.searchMessage") }}
                </h6>
                <input
                  @input="searchProduct()"
                  type="text"
                  class="form-control search-input"
                  aria-describedby="emailHelp"
                  v-model="productName"
                />
              </div>
            </form>
          </div>
          <div class="container-Products">
            <div
              class="box-product position-relative"
              v-for="(product, index) in searchOrdres"
              :key="index"
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
                <img :src="product.Photo" />
                <div class="content p-3">
                  <h4 v-if="Language == 'ar'" class="text-color">
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
                  @click="addNewOrder(product)"
                  :disabled="filterOrdres.includes(product.id)"
                >
                  {{ $t("endUser.addToCart") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      OrderId: this.$route.params.OrderId,
      userOrder: "",
      UserName: "",
      total: "",
      productName: "",
      productsList: "",
      orderDetails: "",
    };
  },
  name: "EditOrderView",
  mounted() {
    this.getUserOrder();
    this.getAllOrdres();
  },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
    UpdateOrdersList() {
      return this.userOrder;
    },
    calculationOrder() {
      return this.userOrder.map((order) => {
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
    searchOrdres() {
      if (this.productName.trim() != "") {
        return this.productsList.filter((ele) => {
          if (
            ele.Product.NameEn.includes(this.productName) ||
            ele.Product.NameAr.includes(this.productName)
          ) {
            return ele;
          }
        });
      }
    },
    filterOrdres() {
      return this.userOrder.map((ele) => {
        if (this.userOrder.length > 0) {
          return ele.id;
        }
      });
    },
  },

  methods: {
    getUserOrder() {
      axios
        .get(`Ordres/${this.OrderId}`)
        .then((response) => {
          this.userOrder = response.data.Orders;
          this.orderDetails = response.data;
          axios.get(`Users/${response.data.UserId}`).then((response) => {
            this.UserName = response.data.Name;
          });
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
    getAllOrdres() {
      axios
        .get("Products")
        .then((response) => {
          this.productsList = response.data;
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
    searchProduct(ele) {
      console.log(ele);
    },
    addNewOrder(Product) {
      Product.Quantity = 1;
      if (!this.filterOrdres.includes(Product.id)) {
        this.userOrder.push(Product);
      }
    },
    editOrder() {
      axios
        .put(
          `Ordres/${this.OrderId}`,
          this.orderDetails,
          (this.orderDetails.Orders = this.userOrder),
          (this.orderDetails.Total = this.calculationTotal + 36)
        )
        .then((response) => {
          this.$toast.success("The request has been modified successfully");
          setTimeout(() => {
            this.$router.push("/Dashboard/Ordres");
          }, 1500);
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
<style scoped>
.height-9 {
  height: 921.5px;
  overflow: auto;
}
.fit-content {
  height: fit-content;
}
.bg-color {
  background-color: var(--section-bg-Color);
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
  color: var(--text-Color);
}
.btn-proceed:hover,
.btn-edit:hover:not(:disabled) {
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
.btn-proceed {
  width: 200px;
}

.search-input {
  width: 400px;
}
.container-Products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.box-product img {
  max-width: 100%;
  width: 100%;
  background-color: var(--section-bg-Color);
  border-bottom: 2px solid var(--body-Color);
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
.box-product {
  border: 1px solid #e7e7e7;
  padding: 10px;
  border-radius: 6px;
  height: fit-content;
}
</style>
