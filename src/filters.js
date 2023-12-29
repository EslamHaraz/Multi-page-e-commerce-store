import Vue from "vue";
Vue.filter("descriptionLetters", function (value) {
  return value.slice(0, 80) + "...";
});
Vue.filter("namesLitters", function (value) {
  return value.slice(0, 50) + "...";
});
Vue.filter("filter", function (value, number) {
  return value.slice(0, number) + "....";
});
