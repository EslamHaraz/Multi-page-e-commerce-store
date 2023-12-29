<template>
  <div class="col-sm-12 col-xl-4">
    <div class="parent pt-3 pb-3 position-relative" :class="{ active: status }">
      <div class="container">
        <ul class="links mb-0 list-group">
          <li
            @click="(isCategories = !isCategories), getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 active li-link cursor-pointer"
          >
            <router-link
              :to="{ name: 'Categories' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'list']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />
              {{ $t("message.Categories") }}
            </router-link>

            <p class="length mb-0">
              <span class="circle d-block mb-0 text-center">{{
                CategoriesLength
              }}</span>
            </p>
            <FontAwesome
              :icon="['fas', 'arrow-down']"
              class="toggle me-3 fs-10"
              :class="{ 'ms-3': align === 'ar' }"
            />
          </li>
          <Collapse :when="isCategories" class="v-collapse">
            <li
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
              :class="{ 'mb-3': isExpanded }"
            >
              <router-link :to="{ name: 'AddCategory' }">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.AddCategory") }}
              </router-link>
            </li>
          </Collapse>
          <Collapse :when="isCategories" class="v-collapse">
            <li
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
              :class="{ 'mb-3': isExpanded }"
            >
              <router-link :to="{ name: 'DeleteCategory' }">
                <FontAwesome
                  :icon="['fas', 'trash']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.DeleteCategory") }}
              </router-link>
            </li>
          </Collapse>
          <li
            @click="(isExpanded = !isExpanded), getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center p-2 li-link mb-3"
          >
            <router-link
              :to="{ name: 'Products' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'bars-progress']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Products") }}
            </router-link>
            <p class="length mb-0">
              <span class="circle d-block mb-0 text-center">{{
                ProductsLength
              }}</span>
            </p>
            <FontAwesome
              :icon="['fas', 'arrow-down']"
              class="toggle me-3 fs-10"
              :class="{ 'ms-3': align === 'ar' }"
            />
          </li>
          <Collapse :when="isExpanded" class="v-collapse">
            <li
              :class="{ 'mb-3': isExpanded }"
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
            >
              <router-link :to="{ name: 'AddProduct' }">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.addProduct") }}
              </router-link>
            </li>
          </Collapse>
          <Collapse :when="isExpanded" class="v-collapse">
            <li
              :class="{ 'mb-3': isExpanded }"
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
            >
              <router-link :to="{ name: 'DeleteProduct' }">
                <FontAwesome
                  :icon="['fas', 'trash']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.deleteProduct") }}
              </router-link>
            </li>
          </Collapse>
          <li
            @click="getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Clints' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'users']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Clints") }}
            </router-link>
          </li>
          <li
            @click="(isEmployees = !isEmployees), getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Employees' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'user-tie']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Employees") }}
            </router-link>
            <p class="length mb-0">
              <span class="circle d-block mb-0 text-center">{{
                EmployeesLength
              }}</span>
            </p>
            <FontAwesome
              :icon="['fas', 'arrow-down']"
              class="toggle me-3 fs-10"
              :class="{ 'ms-3': align === 'ar' }"
            />
          </li>
          <Collapse :when="isEmployees" class="v-collapse">
            <li
              :class="{ 'mb-3': isEmployees }"
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
            >
              <router-link :to="{ name: 'AddEmployee' }">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.addEmployee") }}
              </router-link>
            </li>
          </Collapse>
          <Collapse :when="isEmployees" class="v-collapse">
            <li
              :class="{ 'mb-3': isEmployees }"
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
            >
              <router-link :to="{ name: 'DeleteEmployee' }">
                <FontAwesome
                  :icon="['fas', 'trash']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.deleteEmployee") }}
              </router-link>
            </li>
          </Collapse>
          <li
            @click="getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Ordres' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'cart-flatbed-suitcase']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Ordres") }}
            </router-link>
          </li>
          <li
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Reportes' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'bug']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Reports") }}
            </router-link>
          </li>
          <li
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Messages' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'message']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Messages") }}
            </router-link>
          </li>
          <li
            @click="getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Settings' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'gear']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Settings") }}
            </router-link>
          </li>
          <li
            @click="(isPages = !isPages), getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Pages' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'file']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.Pages") }}
            </router-link>
            <p class="length mb-0">
              <span class="circle d-block mb-0 text-center">{{
                PagesLength
              }}</span>
            </p>
            <FontAwesome
              :icon="['fas', 'arrow-down']"
              class="toggle me-3 fs-10 "
              :class="{ 'ms-3': align === 'ar' }"
            />
          </li>
          <Collapse :when="isPages" class="v-collapse">
            <li
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
              :class="{ 'mb-3': isPages }"
            >
              <router-link :to="{ name: 'AddPage' }">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("endUser.addPage") }}
              </router-link>
            </li>
            <li
              @click="getActiveLink()"
              isPages
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
              :class="{ 'mb-3': isPages }"
            >
              <router-link :to="{ name: 'DeletePage' }">
                <FontAwesome
                  :icon="['fas', 'trash']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("endUser.deletePage") }}
              </router-link>
            </li>
          </Collapse>
          <li
            @click="(isOffer = !isOffer), getActiveLink()"
            class="text-start d-flex justify-content-between align-items-center mb-3 p-2 li-link"
          >
            <router-link
              :to="{ name: 'Offers' }"
              class="d-flex align-items-center"
            >
              <FontAwesome
                :icon="['fas', 'star']"
                class="toggle me-3"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("message.offers") }}
            </router-link>
            <p class="length mb-0">
              <span class="circle d-block mb-0 text-center">{{
                OffersLength
              }}</span>
            </p>
            <FontAwesome
              :icon="['fas', 'arrow-down']"
              class="toggle me-3 fs-10 text-color"
              :class="{ 'ms-3': align === 'ar' }"
            />
          </li>
          <Collapse :when="isOffer" class="v-collapse">
            <li
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
              :class="{ 'mb-3': isOffer }"
            >
              <router-link :to="{ name: 'AddOffer' }">
                <FontAwesome
                  :icon="['fas', 'plus']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.addOffer") }}
              </router-link>
            </li>
            <li
              @click="getActiveLink()"
              class="text-start d-flex justify-content-between align-items-center p-2 li-link"
            >
              <router-link :to="{ name: 'DeleteOffer' }">
                <FontAwesome
                  :icon="['fas', 'trash']"
                  class="toggle me-3"
                  :class="{ 'ms-3': align === 'ar' }"
                />

                {{ $t("message.deleteOffer") }}
              </router-link>
            </li>
          </Collapse>
        </ul>
        <div class="logout mt-3 mb-4">
          <div class="d-flex justify-content-between align-items-center p-2">
            <img
              :src="adminImg"
              class="img-fluid small-img h-100 user-img radius-5"
            />
            <div
              class="info ms-4 text-start"
              :class="{
                'text-end ': align === 'ar',
              }"
            >
              <h4 class="mb-0 text-color me-2">{{ adminName }}</h4>
              <h5 class="mb-0 d-flex align-items-center"></h5>
            </div>
            <FontAwesome
              @click="logOutAdmin"
              title="Log Out cursor-pointer"
              :icon="['fas', 'power-off']"
              class="toggle me-3 power-off"
              :class="{ 'ms-3': align === 'ar' }"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let allLis = "";
import { mapState } from "vuex";
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import axios from "axios";
const isExpanded = ref(false);
const isEmployees = ref(false);
const isCategories = ref(false);
const isOffer = ref(false);
const isPages = ref(false);
export default {
  name: "RoutresComponent",
  data() {
    return {
      allLis,
      active: false,
      isExpanded,
      isEmployees,
      isCategories,
      isOffer,
      isPages,
      CategoriesLength: "",
      ProductsLength: "",
      OffersLength: "",
      PagesLength: "",
      EmployeesLength: "",
      allLis: "",
      Links: "",
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      status: (state) => state.navbarStatus,
      adminImg: (state) => state.adminPhoto,
      adminName: (state) => state.adminName,
    }),
  },
  mounted() {
    allLis = document.querySelectorAll("li");
    this.getCategoriesLength();
    this.getProductsLength();
    this.getOffersLength();
    this.getPagesLength();
    this.getEmployeesLength();
  },
  components: { Collapse },
  methods: {
    getActiveLink() {
      allLis.forEach((ele) => {
        ele.onclick = function () {
          allLis.forEach((ele) => {
            ele.classList.remove("active");
          });
          ele.classList.add("active");
        };
      });
    },
    removeActiveLink() {},
    logOutAdmin() {
      window.localStorage.removeItem("admin-detail");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    getCategoriesLength() {
      axios.get(`Categories`).then((response) => {
        this.CategoriesLength = response.data.length;
      });
    },
    getProductsLength() {
      axios.get(`Products`).then((response) => {
        this.ProductsLength = response.data.length;
      });
    },
    getOffersLength() {
      axios.get(`Products?Offer=true`).then((response) => {
        this.OffersLength = response.data.length;
      });
    },
    getPagesLength() {
      axios.get(`Pages`).then((response) => {
        this.PagesLength = response.data.length;
      });
    },
    getEmployeesLength() {
      axios.get(`Employees`).then((response) => {
        this.EmployeesLength = response.data.length;
      });
    },
  },
};
</script>
<style scoped>
li.active a,
li.active a svg {
  color: var(--badge-text-Color);
}
.li-link {
  border-radius: 2px;
  transition: 0.5s;
  position: relative;
}
.li-link:hover:not(li.active) {
  background-color: var(--hover-link-Color);
}
a,
svg {
  color: var(--text-Color);
  font-size: 20px;
}
.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--secondary-Color);
  line-height: 30px;
  color: var(--badge-text-Color);
  position: absolute;
  left: 40%;
  top: 9px;
}

.parent {
  border-right: 1px solid #7d7d7d17;
  opacity: 0;
  transition: var(--main-transition);
  display: none;
  background-color: var(--section-bg-Color);
  height: 700px;
  overflow: auto;
}
.parent.active {
  opacity: 1;
  display: block;
}
.logout {
  border: 1px solid var(--border-Color);
  border-radius: 7px;
}
.power-off {
  color: var(--border-Color);
}
</style>
// :class="{ 'flex-row-reverse ': align === 'ar', }"
