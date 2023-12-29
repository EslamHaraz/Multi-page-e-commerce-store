<template>
  <div class="col-12 parent">
    <div class="container options d-Flex">
      <div class="logo d-Flex">
        <h3 class="text-color mb-0" v-if="language == 'ar'">
          {{ SiteNameAr }}
        </h3>
        <h3 class="text-color mb-0" v-else>{{ SiteNameEn }}</h3>
        <img :src="SiteLogo" class="img-fluid site-logo me-3" />
      </div>
      <div class="input-group w-70 search-parent">
        <input
          type="text"
          class="form-control"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button data-v-c2d7e0ac="" type="submit" class="btn btn-search">
            {{ $t("endUser.Search") }}
          </button>
        </div>
      </div>
      <ul class="ul-links d-Flex mb-0">
        <li class="text-start p-2 li-link cursor-pointer m-2">
          <router-link
            :to="{ name: 'MyAccount' }"
            class="d-Flex flex-column-reverse"
          >
            {{ $t("endUser.myAccount") }}
            <FontAwesome :icon="['fas', 'user']" class="toggle mb-2" />
          </router-link>
        </li>
        <li
          @click="editcartBarStatus()"
          class="text-start p-2 li-link cursor-pointer m-2 text-color d-Flex flex-column-reverse position-relative"
        >
          {{ $t("endUser.myCart") }}
          <FontAwesome :icon="['fas', 'cart-shopping']" class="toggle mb-2" />
          <span
            v-if="ordersLength.length > 0"
            class="circle d-block text-center"
            >{{ ordersLength.length }}</span
          >
        </li>
        <li
          @click="logOutUser()"
          class="text-start p-2 li-link cursor-pointer m-2 d-Flex flex-column-reverse text-color"
        >
          {{ $t("endUser.logOut") }}
          <FontAwesome
            :icon="['fas', 'right-from-bracket']"
            class="toggle mb-2"
          />
        </li>
      </ul>
    </div>
    <div class="container links">
      <ul class="m-0 d-Flex justify-content-start position-relative">
        <li
          @click="isExpanded = !isExpanded"
          class="text-start li-link cursor-pointer text-white categories d-Flex"
        >
          <FontAwesome :icon="['fas', 'bars']" class="toggle me-2" />
          {{ $t("endUser.shopbyCategories") }}
          <FontAwesome
            :icon="['fas', 'arrow-down']"
            class="toggle fs-20 text-white"
            :class="{ 'ms-3': align === 'ar' }"
          />
        </li>
        <div class="collapse-container">
          <Collapse :when="isExpanded" class="v-collapse">
            <li
              class="text-start d-flex justify-content-between cursor-pointer align-items-center p-3 li-link border-bottom text-white"
              @click="showAllCategories(), scrollToBottom()"
              value="All"
            >
              {{$t('endUser.allCategories')}}
            </li>
            <li
              v-for="(cat, index) in categoriesList"
              :key="index"
              :value="cat.id"
              :ref="cat.category.NameEn"
              class="text-start d=Flex p-3 li-link cursor-pointer border-bottom text-white"
              v-if="language == 'en'"
              @click="getCategoryId(cat.id), shopPyCategory(), scrollToBottom()"
            >
              {{ cat.category.NameEn }}
            </li>
            <li
              :ref="cat.category.NameEn"
              v-else
              class="text-start d-flex justify-content-between cursor-pointer align-items-center p-3 li-link border-bottom text-white"
              @click="getCategoryId(cat.id), shopPyCategory(), scrollToBottom()"
            >
              {{ cat.category.NameAr }}
            </li>
          </Collapse>
        </div>

        <div class="d-Flex toggle-menu" :class="{ active: menuStatus == true }">
          <li
            class="text-start p-2 ms-3 li-link cursor-pointer text-color d-Flex"
          >
            <router-link
              :to="{ name: 'HomeView' }"
              class="d-flex align-items-center"
              :class="{ 'flex-row-reverse': language === 'ar' }"
            >
              <FontAwesome
                :icon="['fas', 'home']"
                class="toggle me-2"
                :class="{ 'ms-3': align === 'ar' }"
              />

              {{ $t("endUser.Home") }}
            </router-link>
          </li>

          <li
            class="text-start p-2 ms-3 li-link cursor-pointer text-color d-Flex"
          >
            <router-link
              :to="{ name: 'ContactUsView' }"
              class="d-flex align-items-center"
              :class="{ 'flex-row-reverse': language === 'ar' }"
            >
              <FontAwesome
                :icon="['fas', 'phone']"
                class="toggle me-2"
                :class="{ 'ms-3': align === 'ar' }"
              />
              {{ $t("endUser.contactUs") }}
            </router-link>
          </li>
          <li
            v-for="(page, index) in pagesList"
            :key="index"
            class="text-start p-2 ms-3 li-link cursor-pointer text-color d-Flex"
      
            
          >
            <router-link
              v-if="language == 'ar'"
              :to="{ name: 'Page', params: { pageId: page.id } }"
              class="d-flex align-items-center"
              :class="{ 'flex-row-reverse': language === 'ar' }"
              target="_blank"
            >
              {{ page.PageName.PageNameAr }}
            </router-link>
            <router-link
              v-else
              :to="{ name: 'Page', params: { pageId: page.id } }"
              class="d-flex align-items-center"
              :class="{ 'flex-row-reverse': language === 'ar' }"
            >
              {{ page.PageName.PageNameEn }}
            </router-link>
          </li>
        </div>
        <FontAwesome
          @click="menuStatus = !menuStatus"
          :icon="['fas', 'bars']"
          class="bars-icon fs-20 text-dark d-none cursor-pointer text-color"
          :class="{ 'en-mode': language == 'en', 'ar-mode': language == 'ar' }"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
const isExpanded = ref(false);
import { mapState } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      isExpanded,
      categoriesList: [],
      menuStatus: false,
      categoryId: "",
      pagesList: [],
      user: window.localStorage.getItem("user-detail"),
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      cartBar: (state) => state.cartBar,
      language: (state) => state.lang,
      SiteNameAr: (state) => state.siteNameAr,
      SiteNameEn: (state) => state.siteNameEn,
      SiteLogo: (state) => state.siteLogo,
      ordersLength: (state) => state.ordresList,
    }),
  },
  components: { Collapse },
  mounted() {
    this.getAllCategories();
    this.getAllPages();
  },
  methods: {
    getAllPages() {
      axios.get(`Pages`).then((response) => {
        this.pagesList = response.data;
      });
    },
    getCategoryId(id) {
      this.categoryId = id;
    },
    showAllCategories() {
      this.$store.commit("shopPyCategory", { id: "" });
    },
    shopPyCategory() {
      this.$store.commit("shopPyCategory", { id: this.categoryId });
    },
    editcartBarStatus() {
      this.$store.commit("editCartBarStatus");
    },
    getAllCategories() {
      axios.get(`Categories`).then((response) => {
        this.categoriesList = response.data;
      });
    },
    logOutUser() {
      if (this.user) {
        window.localStorage.removeItem("user-detail");
        window.localStorage.removeItem("Product-list");
        window.localStorage.removeItem("Total");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    scrollToBottom() {
      window.scrollBy(0, 1500, {
        behavior: "smoth",
      });
    },
  },
};
</script>

<style scoped>
.container.options {
  border-bottom: 1px solid #a7a6a6;
  padding: 15px;
}
.container.links {
  padding: 0;
  background-color: var(--body-Color);
}
a,
li {
  color: var(--text-Color);
  font-size: 20px;
}
li.active {
  border-bottom: 3px solid var(--bs-black);
  background-color: transparent !important;
}
.ul-links li {
  text-align: center !important;
}
@media (max-width: 767px) {
  a,
  li {
    font-size: 15px;
  }
}
.search-parent input {
  border-radius: 0 !important;
}
.btn-search {
  border-radius: 0;
  width: 100px;
  background-color: var(--link-active-bg);
  color: white;
}
.btn-search:hover {
  background-color: var(--link-active-bg);
  color: white;
}
.categories {
  background-color: var(--link-active-bg);
  color: white;
  padding: 10px;
  border-top-right-radius: 5px;
  width: 290px;
}
.collapse-container {
  position: absolute;
  top: 50px;
  background-color: var(--link-active-bg);
  width: 290px;
  z-index: 200;
}
.border-bottom {
  border-bottom: 1px solid #b3b3b3 !important;
}
@media (max-width: 1199px) {
  .bars-icon {
    display: block !important;
    position: absolute;
    font-size: 25px;
  }
  .bars-icon.en-mode {
    right: 5px !important;
  }
  .bars-icon.ar-mode {
    left: 5px !important;
  }
  .toggle-menu {
    position: absolute;
    left: -100%;
    display: block;
    background-color: var(--menu-bg-Color);
    padding: 20px;
    top: 50px;
    transition: var(--main-transition);
    z-index: 500;
  }
  .toggle-menu.active {
    left: 0;
  }
  .toggle-menu li {
    margin: 0px 0px 15px 0px !important ;
  }
}
.site-logo {
  width: 90px;
}

@media (max-width: 1199px) {
  .search-parent {
    display: none;
  }
}
.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: var(--secondary-Color);
  line-height: 27px;
  color: var(--badge-text-Color);
  font-size: 13px;
  position: absolute;
  top: -13px;
  left: 6px;
}
</style>
