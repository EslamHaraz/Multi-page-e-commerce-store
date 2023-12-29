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
                        <div class="ar-content mb-4">
                          <h5 class="text-color mb-3 text-initial">
                            {{ $t("endUser.pageContentAr") }}
                          </h5>
                          <vue-editor
                            v-model.trim="arContent"
                            class="edit"
                          ></vue-editor>
                          <div
                            v-if="arContent == '' && v$.arContent.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.requiredContentAr") }}
                          </div>
                          <div
                            v-if="arContent != '' && arContent.lenngth < 150"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.contentMinLength") }}
                          </div>
                          <div
                            v-if="arContent.lenngth > 1000"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.contentMaxLength") }}
                          </div>
                        </div>
                        <div class="en-content">
                          <h5 class="text-color mb-3 text-initial">
                            {{ $t("endUser.pageContentEn") }}
                          </h5>
                          <vue-editor
                            v-model.trim="enContent"
                            class="edit"
                          ></vue-editor>
                          <div
                            v-if="enContent == '' && v$.enContent.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.requiredContentEn") }}
                          </div>
                          <div
                            v-if="enContent != '' && enContent.lenngth < 150"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.contentMinLength") }}
                          </div>
                          <div
                            v-if="enContent.lenngth > 1000"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.contentMaxLength") }}
                          </div>
                        </div>
                        <div class="form-group mt-3">
                          <label
                            for="inputProduct"
                            class="w-100 text-initial mb-2 text-color"
                          >
                            {{ $t("endUser.pageNameAr") }}
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2"
                            id="inputProduct"
                            :placeholder="$t('endUser.pageNameAr')"
                            v-model.trim="pageNameAr"
                          />
                          <div
                            v-if="pageNameAr == '' && v$.pageNameAr.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameArRequired") }}
                          </div>
                          <div
                            v-if="pageNameAr != '' && pageNameAr.length < 10"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameMinLength") }}
                          </div>
                          <div
                            v-if="pageNameAr.length > 20"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameMaxLength") }}
                          </div>
                        </div>
                        <div class="form-group mt-3">
                          <label
                            for="inputProduct"
                            class="w-100 text-initial mb-2 text-color"
                          >
                            {{ $t("endUser.pageNameEn") }}
                          </label>
                          <input
                            type="text"
                            class="form-control mb-2"
                            id="inputProduct"
                            :placeholder="$t('endUser.pageNameEn')"
                            v-model.trim="pageNameEn"
                          />
                          <div
                            v-if="pageNameEn == '' && v$.pageNameEn.$error"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameEnRequired") }}
                          </div>
                          <div
                            v-if="pageNameEn != '' && pageNameEn.length < 10"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameMinLength") }}
                          </div>
                          <div
                            v-if="pageNameEn.length > 20"
                            class="text-danger text-initial w-100 mb-2 mt-2"
                          >
                            {{ $t("endUser.pageNameMaxLength") }}
                          </div>
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
                    <button
                      @click="editPage()"
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
import { VueEditor, Quill } from "vue2-editor";
import useVuelidate from "@vuelidate/core";
import { minLength, maxLength, required } from "vuelidate/lib/validators";
export default {
  name: "PagesView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      pagesList: [],
      pageOfItems: [],
      arContent: "",
      enContent: "",
      pageNameAr: "",
      pageNameEn: "",
      pageId: "",
      pageIndex: "",
    };
  },
  components: { JwPagination, VueEditor, Quill },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      language: (state) => state.lang,
    }),
  },
  mounted() {
    this.getAllPages();
  },
  validations() {
    return {
      arContent: {
        required,
        minLength: minLength(150),
        maxLength: maxLength(1000),
      },
      enContent: {
        required,
        minLength: minLength(150),
        maxLength: maxLength(1000),
      },
      pageNameAr: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
      pageNameEn: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
    };
  },
  methods: {
    getPageData(page, index) {
      this.pageId = page.id;
      this.pageIndex = index;
      this.arContent = page.PageContent.ContentAr;
      this.enContent = page.PageContent.ContentEn;
      this.pageNameAr = page.PageName.PageNameAr;
      this.pageNameEn = page.PageName.PageNameEn;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllPages() {
      axios.get(`Pages`).then((response) => {
        this.pagesList = response.data;
      });
    },
    editPage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(`Pages/${this.pageId}`, {
            PageContent: {
              ContentAr: this.arContent,
              ContentEn: this.enContent,
            },
            PageName: {
              PageNameAr: this.pageNameAr,
              PageNameEn: this.pageNameEn,
            },
          })
          .then((response) => {
            document.getElementById("closed").click();
            this.$toast.success("The page has been modified successfully", {
              timeout: 1500,
            });
            this.pageOfItems[this.pageIndex].PageContent.ContentAr =
              this.arContent;
            this.pageOfItems[this.pageIndex].PageContent.ContentEn =
              this.enContent;
            this.pageOfItems[this.pageIndex].PageName.PageNameAr =
              this.pageNameAr;
            this.pageOfItems[this.pageIndex].PageName.PageNameEn =
              this.pageNameEn;
          });
      } else this.$toast.error("There is an error in the data");
    },
  },
};
</script>
<style scoped>
.ql-editor {
  text-align: initial !important;
}
</style>
