<template>
  <div class="parent">
    <table
      v-if="pageOfItems.length > 0"
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Total") }}</th>
        <th scope="col">{{ $t("message.Status") }}</th>
        <th scope="col">{{ $t("message.ClintName") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody>
        <tr v-for="(order, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>$ {{ order.Total }}</td>
          <td class="td-status" :class="order.Status">{{ order.Status }}</td>
          <td
            v-for="(user, index) in usersList"
            :key="index"
            v-if="user.id === order.UserId"
          >
            {{ user.Name }}
          </td>
          <td>
            <button
              @click="getOrderId(order, index)"
              v-if="
                order.Status != 'Refound' &&
                order.Status != 'Complete' &&
                order.Status != 'Canceled' &&
                order.Status != 'Shipping'
              "
              class="btn btn-edit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
            </button>
            <button
              @click="getOrderId(order, index)"
              class="btn btn-delete"
              :class="{ 'me-2': Language === 'ar', 'ms-2': Language === 'en' }"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob12"
            >
              {{ $t("message.remove") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
            </button>
            <button
              @click="getOrderId(order, index), getUserName(order.UserId)"
              class="btn btn-show"
              :class="{ 'me-2': Language === 'ar', 'ms-2': Language === 'en' }"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob13"
            >
              {{ $t("message.show") }}
              <FontAwesome :icon="['fas', 'eye']" style="margin: 0" />
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
                      id="closeModel"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <h5 class="modal-title" id="staticBackdrob1Label">
                      {{ $t("message.editOrder") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 Language-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="modal-text-color text-initial mb-3">
                          {{ $t("message.status") }}
                        </h4>
                        <select class="form-select" v-model="status">
                          <option value="Pending">
                            {{ $t("message.pending") }}
                          </option>
                          <option value="Complete">
                            {{ $t("message.complete") }}
                          </option>
                          <option value="Processing">
                            {{ $t("message.processing") }}
                          </option>
                          <option value="Shipping">
                            {{ $t("message.shipping") }}
                          </option>
                          <option value="Refuond">
                            {{ $t("message.refound") }}
                          </option>
                          <option value="Canceled">
                            {{ $t("message.canceled") }}
                          </option>
                        </select>
                      </div>
                      <router-link
                        :to="{
                          name: 'EditOrder',
                          params: { OrderId: orderId },
                        }"
                        class="btn btn-edit"
                        target="_blank"
                      >
                        {{ $t("message.editDetails") }}
                        <FontAwesome
                          :icon="['fas', 'edit']"
                          style="margin: 0"
                        />
                      </router-link>
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
                      @click="editOrderStatus()"
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
            <div
              class="modal fade"
              id="staticBackdrob12"
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
                    <div class="row g-3 Language-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="text-danger text-initial mb-3">
                          {{ $t("message.deleteOrderMessage") }}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer flex-row-reverse">
                    <button
                      type="button"
                      class="btn btn-secondary close"
                      ref="deleteModel"
                      data-bs-dismiss="modal"
                    >
                      {{ $t("message.cancel") }}
                    </button>
                    <button
                      @click="removeOrder()"
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
            <div
              class="modal fade"
              id="staticBackdrob13"
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
                      {{ $t("message.details") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3">
                      <div style="position: relative" class="d-block mx-auto">
                        <div
                          class="box-details d-flex align-items-center justify-content-between flex-wrap p-3 flex-column"
                        >
                          <div
                            class="d-flex align-items-center mb-3 text-color fs-19"
                          >
                            {{ $t("message.Name") }}:
                            <h5 class="mb-0 ms-2">{{ userName }}</h5>
                          </div>
                          <div
                            class="d-flex align-items-center mb-3 text-color fs-19"
                          >
                            {{ $t("message.phoneNumber") }}:
                            <h5 class="mb-0 ms-2">{{ PhoneNumber }}</h5>
                          </div>
                          <div
                            class="d-flex align-items-center text-color fs-19"
                          >
                            {{ $t("message.Address") }}:
                            <h5 class="mb-0 ms-2 text-end">
                              {{ userAddress }}
                            </h5>
                          </div>
                        </div>
                        <table
                          class="table table-striped mt-3"
                          :class="{ 'table-dark': mode === 'dark' }"
                        >
                          <tr class="taple-head">
                            <th scope="col">#</th>
                            <th scope="col">{{ $t("message.Name") }}</th>
                            <th scope="col">{{ $t("message.quantity") }}</th>
                            <th scope="col">
                              {{ $t("message.productPrice") }}
                            </th>
                          </tr>
                          <tbody>
                            <tr
                              v-for="(order, index) in ordres"
                              :key="index"
                              class="b-1"
                            >
                              <td class="b-1">{{ index + 1 }}</td>
                              <td class="b-1" v-if="Language == 'ar'">
                                {{ order.Product.NameAr | filter(50) }}
                              </td>
                              <td class="b-1" v-else>
                                {{ order.Product.NameEn | filter(50) }}
                              </td>
                              <td class="b-1">{{ order.Quantity }}</td>
                              <td class="b-1">{{ order.Price }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div class="tracking-number">
                          <h5 class="mb-0 p-3 text-initial">
                            {{ $t("endUser.TrackingNumber") }} :
                            {{ orderDetails.TrackingNumber }}
                          </h5>
                        </div>
                        <div class="arrive-time">
                          <h5
                            v-if="Language == 'ar'"
                            class="mb-0 p-3 text-initial"
                          >
                            {{ $t("endUser.shipmentTime") }}

                            {{ orderDetails.DateArriveAr }}
                          </h5>
                          <h5 v-else class="mb-0 p-3 text-initial">
                            {{ $t("endUser.shipmentTime") }}
                            {{ $t("endUser.in") }} :
                            {{ orderDetails.DateArriveEn }}
                          </h5>
                        </div>
                        <div class="total-box">
                          <h5 class="mb-0 p-3 text-initial">
                            {{ $t("message.Total") }} : $
                            {{ orderDetails.Total }} +
                            {{ $t("endUser.Shippingexpenses") }}
                          </h5>
                        </div>
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
                      <FontAwesome
                        :icon="['fas', 'cancel']"
                        style="margin: 0"
                      />
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
      <h3>{{ $t("message.noOrdresNow") }}</h3>
    </div>
    <jw-pagination
      class="pagination"
      :pageSize="8"
      :items="ordresList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
let date = new Date();
import axios from "axios";
import { mapState } from "vuex";
import JwPagination from "jw-vue-pagination";
export default {
  name: "OrdresView",
  data() {
    return {
      date,
      pageOfItems: [],
      ordresList: [],
      usersList: [],
      orderId: "",
      orderIndex: "",
      status: "",
      ordres: "",
      userId: "",
      userName: "",
      userAddress: "",
      PhoneNumber: "",
      orderDetails: "",
      days: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      years: [
        2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
        2035,
      ],
      daysNamesAr: [
        "الاحد",
        "الاثنين",
        "الثلاثاء",
        "الاربعاء",
        "الخميس",
        "الجمعه",
        "السبت",
      ],
      daysNamesEn: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      monthsEn: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsAr: [
        "يناير",
        "فبراير",
        "مارس",
        "ابريل",
        "مايو",
        "يونيو",
        "يوليو",
        "اغسطس",
        "سبتمبر",
        "اكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
      dayDate: "",
      ordersFinshed: "".split(""),
    };
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      Language: (state) => state.lang,
    }),
    checkDate() {
      return this.ordresList.filter((ele) => {
        if (ele.DateArriveEn === this.dayDate) {
          return this.ordersFinshed.push(ele.id);
        }
      });
    },
  },
  components: { JwPagination },

  mounted() {
    this.dayDate = `${this.daysNamesEn[date.getDay()]} ${date.getDate()} ${
      this.monthsEn[date.getUTCMonth()]
    } ${date.getFullYear()}`;
    this.getAllOrdres();
    this.getAllUsers();
    setTimeout(() => {
      this.autoEditOrderStatus();
    }, 1000);
  },
  methods: {
    getOrderId(order, index) {
      this.orderId = order.id;
      this.orderIndex = index;
      this.ordres = order.Orders;
      this.userAddress = order.UserAddress;
      this.PhoneNumber = order.PhoneNumber;
      this.orderDetails = order;
    },
    getAllUsers() {
      axios.get("Users").then((respnse) => {
        this.usersList = respnse.data;
      });
    },
    getAllOrdres() {
      axios.get("Ordres").then((response) => {
        this.ordresList = response.data;
        this.ordersLength = response.data.length;
      });
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    editOrderStatus() {
      if (this.status != "") {
        axios
          .put(
            `Ordres/${this.orderId}`,
            this.pageOfItems[this.orderIndex],
            (this.pageOfItems[this.orderIndex].Status = this.status)
          )
          .then((response) => {
            this.pageOfItems[this.orderIndex].Status = this.status;
            document.getElementById("closeModel").click();
          })
          .catch((error) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("Please Select The Status");
    },
    getUserName(id) {
      axios.get(`Users/${id}`).then((response) => {
        this.userName = response.data.Name;
      });
    },
    removeOrder() {
      axios
        .delete(`Ordres/${this.orderId}`)
        .then((response) => {
          this.$toast.success("The Order has been successfully deleted");
          this.pageOfItems.splice(this.orderIndex, 1);
        })
        .catch((error) => {
          this.$toast.error("Error 404");
        });
    },
    autoEditOrderStatus() {
      for (let i = 0; i < this.checkDate.length; i++) {
        if (this.checkDate.length > 0) {
          axios.put(
            `Ordres/${this.ordersFinshed[i]}`,
            this.checkDate[i],
            (this.checkDate[i].Status = "Complete")
          );
        }
        // axios.put() this.ordersFinshed[i]
      }
    },
  },
};
</script>
<style>
.box-details {
  background-color: var(--bg-primary-Color);
  color: white;
  border-radius: 6px;
}
.taple-head {
  background-color: var(--bg-primary-Color);
}
.b-1 {
  border: 1px solid #e3e3e3;
}
.fs-19 {
  font-size: 19px;
}
.tracking-number {
  background-color: var(--bg-danger-Color);
  color: var(--danger-Color);
}
.arrive-time {
  background-color: var(--bg-warning-Color);
  color: var(--warning-Color);
}
.total-box {
  background-color: var(--bg-success-Color);
  color: var(--success-Color);
}
</style>
