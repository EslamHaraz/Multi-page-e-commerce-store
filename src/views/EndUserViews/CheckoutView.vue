<template>
  <div class="parent">
    <header>
      <div class="container d-Flex">
        <h3 class="text-color mb-0">{{ $t("endUser.Completethepurchase") }}</h3>
        <img :src="siteLogo" class="img-fluid logo" />
      </div>
    </header>
    <div class="container mt-4">
      <div class="row justify-content-between">
        <div class="col-xl-8 col-md-12 text-initial">
          <div class="address-options d-Flex mb-3">
            <h4 class="text-color header">
              1-{{ $t("endUser.ShippingAddress") }}
            </h4>
            <div class="box-address">
              <ul class="text-color text-initial">
                <li>{{ userName }}</li>
                <li>{{ userAddress }}</li>
                <li>{{ Phone }}</li>
              </ul>
            </div>
            <button
              class="btn btn-link"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("endUser.change") }}
            </button>
          </div>
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
                    ref="close"
                    class="btn-close m-0"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <h5 class="modal-title" id="staticBackdrob1Label">
                    {{ $t("message.edit") }}
                  </h5>
                </div>
                <div class="modal-body">
                  <div class="form-group mb-3">
                    <label
                      for="exampleInputtext "
                      class="text-initial w-100 mb-2"
                      >{{ $t("message.Name") }}</label
                    >
                    <input
                      type="text"
                      v-model.trim="userName"
                      class="form-control"
                      id="exampleInputtext"
                      :placeholder="$t('message.Name')"
                    />
                    <div v-if="v$.userName.$error" class="text-danger mt-2">
                      {{ $t("message.NameRequired") }}
                    </div>
                    <div v-if="userName.length > 15" class="text-danger mt-2">
                      {{ $t("message.NameLength") }}
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label
                      for="exampleInputPhone "
                      class="text-initial w-100 mb-2"
                      >{{ $t("message.phoneNumber") }}</label
                    >
                    <input
                      type="text"
                      v-model="Phone"
                      class="form-control"
                      id="exampleInputPhone"
                      :placeholder="$t('message.phoneNumber')"
                    />
                    <div v-if="this.v$.Phone.$error" class="text-danger mt-2">
                      {{ $t("message.NumberRequired") }}
                    </div>
                  </div>
                  <div class="form-group mb-3">
                    <label
                      for="exampleInputaddress "
                      class="text-initial w-100 mb-2"
                      >{{ $t("message.Address") }}</label
                    >
                    <input
                      type="text"
                      v-model="userAddress"
                      class="form-control text-end"
                      id="exampleInputaddress"
                      :placeholder="$t('message.Address')"
                    />
                    <div v-if="v$.userAddress.$error" class="text-danger mt-2">
                      {{ $t("message.AddressRequired") }}
                    </div>
                    <div
                      v-if="this.userAddress.length > 40"
                      class="text-danger mt-2"
                    >
                      {{ $t("message.AddressLength") }}
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
                    type="button"
                    class="btn btn-edit"
                    @click="changeAddress()"
                  >
                    {{ $t("message.edit") }}
                    <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="address-options">
            <h4 class="text-color header mb-4">
              2- {{ $t("endUser.Choosethepaymentmethod") }}
            </h4>
            <div class="method-one">
              <div class="form-check d-flex w-100 justify-content-start">
                <div class="d-flex justify-content-between">
                  <h5 class="text-color text-initial">1-</h5>
                  <input
                    class="form-check-input d-flex me-2 ms-2"
                    type="radio"
                    disabled
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                </div>
                <label for="flexRadioDefault2">
                  <h5 class="text-color header mb-4">
                    {{ $t("endUser.Paymentbycreditcard") }}
                  </h5>
                </label>
              </div>
              <a
                class="d-flex align-items-center"
                href=""
                @click.prevent
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrob11"
              >
                <FontAwesome :icon="['fas', 'plus']" style="margin: 0" />
                <img src="@/assets/visa.svg" class="small-img" />
                {{ $t("endUser.addNewCredit") }}
                <p class="text-color mb-0 me-2">
                  {{ $t("endUser.serviceCreditMessage") }}
                </p>
              </a>
              <div
                class="modal fade"
                id="staticBackdrob11"
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
                        ref="close"
                        class="btn-close m-0"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                      <h5 class="modal-title" id="staticBackdrob1Label">
                        {{ $t("endUser.addNewCredit") }}
                        <!-- {{ $t("message.edit") }} -->
                      </h5>
                    </div>
                    <div class="modal-body">
                      <div class="container">
                        <div class="row">
                          <div class="col-6 border-l">
                            <div class="form-group mb-3">
                              <label
                                for="number "
                                class="text-initial w-100 mb-2"
                                >{{ $t("endUser.cardNumber") }}</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="number"
                                :placeholder="$t('endUser.cardNumber')"
                              />
                            </div>
                            <div class="form-group mb-3">
                              <label
                                for="name "
                                class="text-initial w-100 mb-2"
                              >
                                {{ $t("endUser.NameinTheCard") }}</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                id="name"
                                :placeholder="$t('endUser.NameinTheCard')"
                              />
                            </div>
                            <div class="form-group mb-3">
                              <label
                                for="date "
                                class="text-initial w-100 mb-2"
                                >{{ $t("endUser.cardDate") }}</label
                              >
                              <div
                                class="box-select d-flex justify-content-around"
                              >
                                <select class="customize-select">
                                  <option
                                    v-for="(day, index) in days"
                                    :key="index"
                                  >
                                    {{ day }}
                                  </option>
                                </select>
                                <select class="customize-select">
                                  <option
                                    v-for="(year, index) in years"
                                    :key="index"
                                  >
                                    {{ year }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-6 box-methods d-flex align-items-center flex-column justify-content-start"
                          >
                            <img src="@/assets/Meza.png" class="small-img" />
                            <img
                              src="@/assets/Visa-new.jpg"
                              class="small-img"
                            />
                            <img
                              src="@/assets/MasterCard.png"
                              class="small-img"
                            />
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
                      </button>
                      <button type="button" class="btn btn-edit">
                        <FontAwesome :icon="['fas', 'add']" style="margin: 0" />
                        {{ $t("endUser.addYourCredit") }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="method-two mb-2">
              <div class="form-check d-flex w-100 justify-content-start">
                <div class="d-flex justify-content-between">
                  <h5 class="text-color text-initial">2-</h5>
                  <input
                    class="form-check-input d-flex me-2 ms-2"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault"
                  />
                </div>
                <label for="flexRadioDefault" ref="flexRadioDefault">
                  <h5 class="text-color header mb-4">
                    {{ $t("endUser.Paiementwhenrecieving") }}
                  </h5>
                </label>
              </div>
              <p class="text-color text-initial">
                {{ $t("endUser.Paymentincash") }}
              </p>
            </div>
            <div class="method-three mt-3">
              <div class="form-check d-flex w-100 justify-content-start">
                <div class="d-flex justify-content-between">
                  <h5 class="text-color text-initial">3-</h5>
                </div>
                <label
                  for="flexRadioDefault1"
                  :class="{ 'me-3': language == 'ar' }"
                >
                  <h5 class="text-color header mb-4">
                    {{ $t("endUser.Entergift") }}
                  </h5>
                </label>
              </div>
              <div class="group d-Flex">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="plus-icon text-color"
                />
                <div class="form-group mb-3">
                  <input type="text" class="form-control" />
                </div>
                <button class="btn btn-edit mb-2">
                  {{ $t("endUser.Submit") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-12 custom-col">
          <div class="box-total">
            <button @click="confirmOrder()" class="btn btn-warn">
              {{ $t("endUser.confirmOrder") }}
            </button>
            <h6 class="text-color text-center mt-3 mb-2">
              {{ $t("endUser.Privacynotice") }}
            </h6>
          </div>
          <div class="box-detail">
            <h4 class="text-color header text-initial mt-3">
              {{ $t("endUser.Ordersummary") }}
            </h4>

            <div class="goods d-Flex mb-2">
              <p class="text-color mb-0">{{ $t("endUser.goods") }}</p>
              <p class="text-color mb-0">{{ total }}</p>
            </div>
            <div class="goods d-Flex mb-2">
              <p class="text-color mb-0">
                {{ $t("endUser.Shippingandhandling") }}
              </p>
              <p class="text-color mb-0">26</p>
            </div>
            <div class="goods d-Flex mb-2">
              <p class="text-color mb-0">{{ $t("endUser.Paymentfees") }}</p>
              <p class="text-color mb-0">12</p>
            </div>
          </div>
          <div class="total mt-4">
            <div class="goods d-Flex mb-2">
              <h4 class="text-Danger mb-0">{{ $t("endUser.totaldemand") }}</h4>
              <h4 class="text-Danger mb-0">{{ this.getCheckout }}</h4>
            </div>
          </div>
          <div class="total mt-4">
            <div class="goods d-Flex mb-2">
              <h4 class="text-color mb-0">
                {{ $t("endUser.shipmentTime") }} {{ dayName }}
                {{ date.getDate() }} {{ $t("endUser.from") }} {{ month }}
                {{ date.getFullYear() }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let Language = window.localStorage.getItem("lang");
let date = new Date();
date.setDate(date.getDate() + 3);
import axios from "axios";
import { mapState } from "vuex";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
export default {
  name: "CheckoutView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      date,
      ordresList: [],
      Language,
      userName: "",
      userAddress: "",
      Phone: "",
      user: "",
      usersList: [],
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
      chracters: [
        "A",
        "B",
        "C",
        "D",
        "F",
        "E",
        "G",
        "H",
        "K",
        "L",
        "M",
        "N",
        "O",
        "S",
        "Z",
        "U",
        "Y",
        "T",
        "Q",
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
      dayName: "",
      dayNumber: "",
      month: "",
      total: "",
      Demand: "",
      randomCharecters: "",
      discountsArray: [],
    };
  },
  computed: {
    ...mapState({
      siteLogo: (state) => state.siteLogo,
      language: (state) => state.lang,
    }),
    filterUsers() {
      return this.usersList.map((ele) => {
        return ele.Name;
      });
    },
    getCheckout() {
      if (this.getDiscoounts.length > 1) {
        return (
          Number.parseInt(window.localStorage.getItem("Total")) -
          this.getProductsWithDiscount +
          26 +
          12
        );
      } else
        return Number.parseInt(window.localStorage.getItem("Total")) + 26 + 12;
    },
    getDiscoounts() {
      return this.ordresList
        .map((ele) => {
          return ele.Discount;
        })
        .filter((ele) => {
          return ele != undefined;
        });
    },
    getProductsWithDiscount() {
      return this.ordresList
        .map((ele) => {
          return ele.Discount;
        })
        .filter((ele) => {
          return ele != undefined;
        })
        .reduce((cur, acc) => {
          if (this.getDiscoounts.length > 1) {
            return cur + acc;
          }
        });
    },
  },
  validations() {
    return {
      userName: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(15),
      },
      Phone: { required },
      userAddress: {
        required,
        minLength: minLength(15),
        maxLength: maxLength(40),
      },
    };
  },
  mounted() {
    this.ordresList = JSON.parse(window.localStorage.getItem("Product-list"));
    this.getAllUsers();
    this.$refs.flexRadioDefault.click();
    this.user = JSON.parse(window.localStorage.getItem("user-detail"));
    this.checkOrdresLength();
    this.checkUser();
    this.custmoizeDate();
  },
  methods: {
    checkOrdresLength() {
      if (!this.ordresList || this.ordresList.length < 1) {
        this.$router.push({ path: "home" });
      }
    },
    checkUser() {
      if (this.user) {
        this.userName = this.user.Name;
        this.userAddress = this.user.Address;
        this.Phone = this.user.Phone;
      }
    },
    custmoizeDate() {
      if (Language == "ar") {
        this.dayName = this.daysNamesAr[date.getDay()];
        this.month = this.monthsAr[date.getUTCMonth()];
      } else {
        this.dayName = this.daysNamesEn[date.getDay()];
        this.month = this.monthsEn[date.getUTCMonth()];
      }
    },
    randomChracter() {
      this.randomCharecters = "";
      for (let i = 0; i < 5; i++) {
        this.randomCharecters +=
          this.chracters[Math.trunc(Math.random() * this.chracters.length)];
      }
    },
    getAllUsers() {
      axios.get("Users").then((response) => {
        this.usersList = response.data;
      });
    },
    changeAddress() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.filterUsers.includes(this.userName)) {
          this.$toast.error("This UserName Is Used");
        } else {
          axios
            .put(
              `Users/${this.user.id}`,
              this.user,
              (this.user.Name = this.userName),
              (this.user.Address = this.userAddress),
              (this.user.Phone = this.Phone)
            )
            .then((response) => {
              window.localStorage.setItem(
                "user-detail",
                JSON.stringify(this.user)
              );
            })
            .catch((reject) => this.$toast.error("Error 404"));
        }
      }
    },
    confirmOrder() {
      this.randomChracter(),
        axios
          .post(`Ordres`, {
            UserId: this.user.id,
            UserAddress: this.userAddress,
            Status: "Pending",
            Total: this.getCheckout,
            TrackingNumber: this.randomCharecters + Date.now(),
            PhoneNumber: this.Phone,
            DateArriveAr: `${
              this.daysNamesAr[date.getDay()]
            } ${date.getDate()} ${
              this.monthsAr[date.getUTCMonth()]
            } ${date.getFullYear()}`,
            DateArriveEn: `${
              this.daysNamesEn[date.getDay()]
            } ${date.getDate()} ${
              this.monthsEn[date.getUTCMonth()]
            } ${date.getFullYear()}`,
            Orders: this.$store.state.ordresList,
          })
          .then((response) => {
            this.$toast.success("The purchase was completed successfully");
            setTimeout(() => {
              this.$router.push({ path: "/" });
            }, 1400);
            window.localStorage.removeItem("Product-list");
            window.localStorage.removeItem("Total");
            this.$store.state.ordresList = [];
          })
          .catch((error) => {
            this.$toast.error("Error 404");
          });
    },
  },
};
</script>
<style scoped>
.text-Danger {
  color: var(--danger-Color);
}
img.logo {
  width: 115px;
}
header .container {
  justify-content: space-around !important;
}
header {
  background-color: var(--section-bg-Color);
}
.address-options,
.box-total,
.box-detail {
  border-bottom: 1px solid #a7a6a6;
}
.custom-col {
  border: 1px solid #a7a6a6;
  border-radius: 10px;
  padding: 20px;
}
.border-l {
  border-left: 1px solid #a7a6a6;
}
.small-img {
  width: 100px;
}
.customize-select {
  background-color: #f0f2f2;
  border: none;
  padding: 6px;
  border-radius: 6px;
  color: var(--text-Color);
  outline: none;
}

.method-two {
  background-color: var(--bg-danger-Color);
  padding: 12px;
  border-radius: 5px;
}
.plus-icon {
  margin: 0px 0px 16px;
  font-size: 20px;
}
.group {
  width: 350px;
}
.btn-warn {
  width: 250px;
  font-size: 20px;
}
.sadas {
  border: 1px solid #a7a6a6;
  padding: 18px;
  border-radius: 7px;
}
.w-70px {
  width: 50px;
}
.form-check-input:disabled {
  background-color: #c7c7c7b5;
}
</style>
