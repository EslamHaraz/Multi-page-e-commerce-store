<template>
  <div class="container">
    <div class="language-select">
      <select
        v-model="lang"
        @change="changeLanguage()"
        class="select-lang form-select"
      >
        <option selected value="en">English</option>
        <option value="ar">Arabic</option>
      </select>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "authentication",
  data() {
    return {
      lang: null,
    };
  },
  methods: {
    ...mapActions(["redirectTo"]),
    changeLanguage() {
      window.localStorage.setItem("lang", this.lang);
      window.location.reload();
    },
  },
};
</script>
<style scoped>
.select-lang {
  width: 150px;
}
.language-select {
  background-color: #eef3fd;
  padding: 5px;
}
</style>
