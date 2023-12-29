<template>
  <div class="parent">
    <table
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Name") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody>
        <tr v-for="(page, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td v-if="language == 'ar'">{{ page.PageName.PageNameAr }}</td>
          <td v-else>{{ page.PageName.PageNameEn }}</td>
          <td>
            <button
              @click="getPageData(page, index)"
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.delete") }}
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
                      {{ $t("message.delete") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <h4 class="text-danger text-initial">
                      {{ $t("message.deletePageMessage") }}
                    </h4>
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
                      @click="deletePage()"
                      type="button"
                      class="btn btn-delete"
                    >
                      {{ $t("message.delete") }}
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
    <jw-pagination :items="pagesList" :pageSize="10" @changePage="onChangePage">
    </jw-pagination>
  </div>
</template>
<script>
import axios from "axios";
import JwPagination from "jw-vue-pagination";
import { mapState } from "vuex";
export default {
  name: "DeletePageComponent",
  data() {
    return {
      pagesList: [],
      pageOfItems: [],
      pageId: "",
      pageIndex: "",
    };
  },
  components: { JwPagination },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      language: (state) => state.lang,
    }),
  },
  mounted() {
    this.getAllPages();
  },
  methods: {
    getPageData(page, index) {
      this.pageId = page.id;
      this.pageIndex = index;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllPages() {
      axios.get(`Pages`).then((response) => {
        this.pagesList = response.data;
      });
    },
    deletePage() {
      axios
        .delete(`Pages/${this.pageId}`)
        .then((response) => {
          this.$toast.success("The page has been deleted successfully");
          document.getElementById("closed").click();
          this.pageOfItems.splice(this.pageIndex, 1);
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
  },
};
</script>
<style scoped>
.ql-editor {
  text-align: initial !important;
}
</style>
