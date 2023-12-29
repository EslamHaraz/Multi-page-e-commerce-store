<template>
  <div class="parent">
    <div class="container">
      <div class="row">
        <div
          class="box-parent mb-5"
          v-for="(order, index) in userOrdres"
          :key="index"
        >
          <div class="box-detail d-Flex mb-4 text-initial">
            <div class="order-total">
              <h5 class="text-color mb-0">{{ $t("message.Total") }}</h5>
              <h5 class="text-color mb-0">{{ order.Total }}</h5>
            </div>
            <div class="order-shipping">
              <h5 class="text-color mb-0">{{ $t("endUser.shippingTo") }}</h5>
              <h5 class="text-color mb-0">{{ userName }}</h5>
            </div>
            <div class="order-id">
              <h5 class="text-color mb-0">{{ $t("endUser.OrderID") }}</h5>
              <h5 class="text-color mb-0">{{ order.TrackingNumber }}</h5>
            </div>
            <div class="order-date">
              <h5 class="text-color mb-0">{{ $t("endUser.Deliverytime") }}</h5>
              <h5 v-if="Language == 'ar'" class="text-color mb-0">
                {{ order.DateArriveAr }}
              </h5>
              <h5 v-else class="text-color mb-0">
                {{ order.DateArriveEn }}
              </h5>
            </div>
          </div>
          <h4
            v-if="order.Status === 'Complete' && Language == 'en'"
            class="text-color text-initial mb-2"
          >
            {{ $t("endUser.Deliveredin") }} {{ order.DateArriveEn }}
            <img src="@/assets/Complete.svg" class="small-svg" />
          </h4>
          <h4
            v-else-if="order.Status === 'Complete' && Language == 'ar'"
            class="text-color text-initial mb-2"
          >
            {{ $t("endUser.Deliveredin") }} {{ order.DateArriveAr }}
            <img src="@/assets/Complete.svg" class="small-svg fade" />
          </h4>
          <h4
            v-if="order.Status === 'Pending'"
            class="text-color text-initial mb-2"
          >
            {{ $t("endUser.orderPending") }}
            <img src="@/assets/Spinner.svg" class="small-svg fade" />
          </h4>
          <div
            class="order-box text-initial"
            v-for="(order, Index) in userOrdres[index].Orders"
            :key="Index"
          >
            <div>
              <router-link
                :to="{
                  name: 'Product',
                  params: {
                    productId: order.id,
                    productName: order.Product.NameEn,
                    CategoryId: order.CategoryId,
                  },
                }"
                class="text-color mb-0 d-flex align-items-center"
              >
                <img :src="order.Photo" class="img-fluid order-img mb-3" />
                <div class="me-3 ms-3">
                  {{ order.Product.NameEn }}
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "PurchasesComponent",
  data() {
    return {
      userDetails: localStorage.getItem("user-detail"),
      userId: "",
      userName: "",
      userOrdres: [],
      ordres: [],
    };
  },
  computed: {},
  mounted() {
    this.userId = JSON.parse(this.userDetails).id;
    this.userName = JSON.parse(this.userDetails).Name;
    this.getUserOrdres();
  },
  computed: {
    ...mapState({
      Language: (state) => state.lang,
    }),
  },
  methods: {
    getUserOrdres() {
      axios.get(`Ordres?UserId=${this.userId}`).then((response) => {
        this.userOrdres = response.data;
      });
    },
  },
};
</script>
<style scoped>
.fade {
  opacity: 0;
  animation: fade infinite 1.5s linear ;
  animation-direction: alternate;
}
.small-svg {
  width: 50px;
}
.parent {
  height: 500px;
  overflow: auto;
}
.box-detail {
  background-color: var(--section-bg-Color);
  padding: 13px;
  border-radius: 4px;
}
.light-mode {
  background-color: white;
  padding: 15px;
}
.order-img {
  width: 120px;
}
@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
