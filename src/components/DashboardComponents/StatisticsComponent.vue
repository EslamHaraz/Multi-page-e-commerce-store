<template>
  <div class="parent">
    <div class="box text-white p-4">
      <h5 class="text-end mb-4 fw-bold">اجمالي المستخدمين</h5>
      <div class="d-flex align-items-center justify-content-between">
        <vue-ellipse-progress
          :progress="10"
          color="#fe89cb"
          :size="100"
          emptyColor="#5a495f"
          fontSize="1.5rem"
        />
        <h3 class="me-3">
          {{ usersList }}
          <h5>المستخدمين</h5>
        </h3>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { VueEllipseProgress } from "vue-ellipse-progress";
export default {
  name: "StatisticsComponent",
  components: { VueEllipseProgress },
};
</script>
