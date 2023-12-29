<template>
  <div class="parent">
    <table
      v-if="categoriesList.length > 0"
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Categories") }}</th>
        <th scope="col">{{ $t("message.Photo") }}</th>
        <th class="td-display" scope="col">
          {{ $t("message.productDescription") }}
        </th>
        <th scope="col">{{ $t("message.edit") }}</th>
      </tr>
      <tbody>
        <tr v-for="(cat, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="lang == 'ar'">{{ cat.category.NameAr }}</td>
          <td v-else>{{ cat.category.NameEn }}</td>
          <td><img :src="cat.Photo" class="img-fluid small-img" /></td>
          <td v-if="lang == 'ar'" class="td-display">
            {{ cat.Description.DescriptionAr }}
          </td>
          <td v-else class="td-display">{{ cat.Description.DescriptionEn }}</td>
          <td>
            <button
              @click="getData(cat, index)"
              class="btn btn-edit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.edit") }}
              <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
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
                      id="closed"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <h5 class="modal-title" id="staticBackdrob1Label">
                      {{ $t("message.edit") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <form @submit.prevent>
                          <div class="form-group mb-3">
                            <label
                              for="inputProduct"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.categoryNameEnglish") }}
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              v-model.trim="NameEn"
                              :class="{ 'text-start': lang == 'ar' }"
                            />
                          </div>
                          <div
                            v-if="v$.NameEn.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.NameRequired") }}
                          </div>
                          <div
                            v-if="NameEn.length < 5 && NameEn != ''"
                            class="text-danger text-initial w-100 mb-2"
                          >
                            {{ $t("message.shortName") }}
                          </div>
                          <div
                            v-if="NameEn.length > 15"
                            class="text-danger text-initial w-100 mb-2"
                          >
                            {{ $t("message.longName") }}
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="inputProduct"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.categoryNameArabic") }}
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              :class="{ 'text-end': lang == 'en' }"
                              v-model.trim="NameAr"
                            />
                          </div>
                          <div
                            v-if="v$.NameAr.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.NameRequired") }}
                          </div>
                          <div
                            v-if="NameAr.length < 8 && NameAr != ''"
                            class="text-danger text-initial w-100 mb-2"
                          >
                            {{ $t("message.shortName") }}
                          </div>
                          <div
                            v-if="NameAr.length > 15"
                            class="text-danger text-initial w-100 mb-2"
                          >
                            {{ $t("message.longName") }}
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Description"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.CategoryDescriptionEnglish") }}</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              :class="{ 'text-start': lang == 'ar' }"
                              v-model.trim="DescriptionEn"
                            />
                          </div>
                          <div
                            v-if="v$.DescriptionEn.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionRequired") }}
                          </div>
                          <div
                            v-if="DescriptionEn.length < 30 && DescriptionEn !== ''"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionShort") }}
                          </div>
                          <div
                            v-if="DescriptionEn.length > 500 && DescriptionEn !== ''"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionLong") }}
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Description"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.CategoryDescriptionArabic") }}</label
                            >

                            <input
                              type="text"
                              class="form-control"
                              :class="{ 'text-end': lang == 'en' }"
                              v-model.trim="DescriptionAr"
                            />
                          </div>
                          <div
                            v-if="v$.DescriptionAr.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionRequired") }}
                          </div>
                          <div
                            v-if="DescriptionAr.length < 30 && DescriptionAr !== ''"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionShort") }}
                          </div>
                          <div
                            v-if="DescriptionAr.length > 500 && DescriptionAr !== ''"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.DescriptionLong") }}
                          </div>
                          <div class="form-group mb-3">
                            <label
                              for="Photo"
                              class="w-100 text-initial mb-2 modal-text-color"
                            >
                              {{ $t("message.productPhoto") }}</label
                            >

                            <input type="url" class="form-control" v-model.trim="Photo" />
                          </div>
                          <div
                            v-if="v$.Photo.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("message.PhotoRequired") }}
                          </div>
                        </form>
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
                    <button @click="editCategory()" type="button" class="btn btn-edit">
                      {{ $t("message.edit") }}
                      <FontAwesome :icon="['fas', 'edit']" style="margin: 0" />
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
      <h3>{{ $t("message.nothingCategories") }}</h3>
    </div>
    <jw-pagination
      class="pagination"
      :pageSize="5"
      :items="categoriesList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import JwPagination from "jw-vue-pagination";
import useValidate from "@vuelidate/core";
import axios from "axios";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
export default {
  name: "CategoriesView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      NameAr: "".trim(),
      NameEn: "".trim(),
      DescriptionAr: "".trim(),
      DescriptionEn: "".trim(),
      pageOfItems: [],
      categoriesList: [],
      categoriesNames: [],
      Photo: "",
      categoryId: "",
      categoryIndex: "",
    };
  },
  components: { JwPagination },
  validations() {
    return {
      NameAr: { required, minLength: minLength(7), maxLength: maxLength(15) },
      NameEn: { required, minLength: minLength(7), maxLength: maxLength(15) },
      DescriptionAr: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(500),
      },
      DescriptionEn: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(500),
      },
      Photo: { required, url },
    };
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      lang: (state) => state.lang,
    }),
  },
  mounted() {
    this.getAllCategories();
  },
  methods: {
    getData(cat, index) {
      (this.categoryId = cat.id), (this.categoryIndex = index);
      this.NameAr = cat.category.NameAr;
      this.NameEn = cat.category.NameEn;
      this.DescriptionAr = cat.Description.DescriptionAr;
      this.DescriptionEn = cat.Description.DescriptionEn;
      this.Photo = cat.Photo;
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getAllCategories() {
      axios
        .get("Categories")
        .then((response) => {
          this.categoriesList = response.data;
          response.data.filter((ele) => {
            this.categoriesNames.push(ele.category.NameEn);
          });
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
    editCategory() {
      this.v$.$validate();
      if (!this.categoriesNames.includes(this.NameEn)) {
        if (!this.v$.$error) {
          axios
            .put(`Categories/${this.categoryId}`, {
              category: {
                NameAr: this.NameAr,
                NameEn: this.NameEn,
              },
              Description: {
                DescriptionAr: this.DescriptionAr,
                DescriptionEn: this.DescriptionEn,
              },
              Photo: this.Photo,
            })
            .then((response) => {
              document.getElementById("closed").click();
              this.$toast.success("The category has been Edited successfully", {
                timeout: 1500,
              });
              setTimeout(() => {
                window.location.reload();
              }, 1600);
            });
        } else this.$toast.error("Error 404");
      } else this.$toast.error("This category already exists");
    },
  },
};
</script>
