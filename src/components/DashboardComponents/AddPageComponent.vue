<template>
  <div class="parent">
    <div class="container">
      <form @submit.prevent>
        <div class="row">
          <div class="col-8">
            <div class="ar-content mb-4">
              <h5 class="text-color mb-3 text-initial">
                {{ $t("endUser.pageContentAr") }}
              </h5>
              <vue-editor v-model.trim="arContent" class="edit"></vue-editor>
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
              <vue-editor v-model.trim="enContent" class="edit"></vue-editor>
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
          </div>
          <div class="col-4">
            <div class="form-group mb-3">
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
            <div class="form-group mb-3">
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

          <button
            ref="submit"
            @click="addPage()"
            type="submit"
            class="btn btn-add mt-3"
          >
            {{ $t("endUser.addPage") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { VueEditor, Quill } from "vue2-editor";
import useVuelidate from "@vuelidate/core";
import { minLength, maxLength, required } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "AddPageComponent",
  components: {
    VueEditor,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      arContent: "",
      enContent: "",
      pageNameAr: "",
      pageNameEn: "",
    };
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
    addPage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post(`pages`, {
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
            this.$toast.success("The page has been added successfully", {
              timeout: 1500,
            });
            setTimeout(() => {
              this.$router.push({ path: "Pages" });
            }, 1500);
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else {
        this.$toast.error("There is an error in the data");
      }
    },
  },
};
</script>
<style scoped>
.ql-editor {
  text-align: initial !important;
}
.ql-toolbar span {
  color: white;
}
</style>
