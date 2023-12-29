<template>
  <div class="parent">
    <table
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Categories") }}</th>
        <th scope="col">{{ $t("message.productDescription") }}</th>
        <th scope="col">{{ $t("message.remove") }}</th>
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
              @click="getData(cat.id, index)"
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.remove") }}
              <FontAwesome :icon="['fas', 'trash']" style="margin: 0" />
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
                      {{ $t("message.remove") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="text-danger">
                          {{ $t("message.DeleteCategoryMessage") }}
                        </h4>
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
                      @click="deleteCategory()"
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
          </td>
        </tr>
      </tbody>
    </table>
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
import axios from "axios";
export default {
  name: "DeleteCategoryComponent",
  data() {
    return {
      pageOfItems: [],
      categoriesList: [],
      categoryId: "",
      categoryIndex: "",
    };
  },
  components: { JwPagination },
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
    getData(id, index) {
      (this.categoryId = id), (this.categoryIndex = index);
    },
    deleteCategory() {
      axios.delete(`Categories/${this.categoryId}`).then((response) => {
        this.$toast.success("The category has been cleared successfully", {
          timeout: 1500,
        });
        this.pageOfItems.splice(this.categoryIndex, 1);
        document.getElementById("closed").click();
      });
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
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
