<template>
  <div class="container mt-3">
    <div class="row height-6">
      <div class="col-12 bg-section">
        <div class="content">
          <h1 v-if="language == 'ar'" class="text-color text-initial mb-2">
            {{ this.nameAr }}
          </h1>
          <h1 v-else class="text-color text-initial mb-2">
            {{ this.nameEn }}
          </h1>
          <div
            class="text-color text-initial "
            v-if="language == 'ar'"
            v-html="this.contentAr"
          ></div>
          <div
            class="text-color text-initial "
            v-else
            v-html="this.contentEn"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "PageView",
  data() {
    return {
      pageId: this.$route.params.pageId,
      nameAr: "",
      nameEn: "",
      contentAr: "",
      contentEn: "",
      page: [],
    };
  },
  mounted() {
    this.getPage();
  },
  computed: {
    ...mapState({
      language: (state) => state.lang,
    }),
  },
  methods: {
    getPage() {
      axios.get(`Pages/${this.pageId}`).then((response) => {
        this.nameAr = response.data.PageName.PageNameAr;
        this.nameEn = response.data.PageName.PageNameEn;
        this.contentAr = response.data.PageContent.ContentAr;
        this.contentEn = response.data.PageContent.ContentEn;
      });
    },
  },
};
</script>
<style scoped>
.height-6 {
  min-height: 66vh;
}
.bg-section {
  background-color: var(--section-bg-Color);
}
</style>
