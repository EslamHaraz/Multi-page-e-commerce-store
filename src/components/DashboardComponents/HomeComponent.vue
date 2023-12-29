<template>
  <div class="parent">
    <div class="container container-statis">
      <div class="box-progress primary">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="">
            <FontAwesome :icon="['fas', 'user-tie']" class="me-2" />
            {{ EmployeeLength }}
            <h5 class="mt-2">{{ $t("message.employeesLength") }}</h5>
          </h3>
          <vue-ellipse-progress
            :progress="16"
            color="var(--primary-Color)"
            :size="100"
            emptyColor="#5a495f"
            fontSize="1.5rem"
            fontColor="var(--primary-Color)"
          />
        </div>
      </div>
      <div class="box-progress warning">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h3 class="">
              <FontAwesome :icon="['fas', 'list']" class="me-2" />
              {{ CategoriesLength }}
            </h3>
            <h5 class="mt-2">{{ $t("message.categoriesLength") }}</h5>
          </div>
          <vue-ellipse-progress
            :progress="6"
            color="var(--warning-Color)"
            :size="100"
            emptyColor="#5a495f"
            fontSize="1.5rem"
            fontColor="var(--warning-Color)"
          />
        </div>
      </div>
      <div class="box-progress danger">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="">
            <FontAwesome :icon="['fas', 'users']" class="me-2" />

            {{ ClintsLength }}
            <h5 class="mt-2">{{ $t("message.clintsLength") }}</h5>
          </h3>
          <vue-ellipse-progress
            :progress="3"
            color="var(--danger-Color)"
            :size="100"
            emptyColor="#5a495f"
            fontSize="1.5rem"
            fontColor="var(--danger-Color)"
          />
        </div>
      </div>
      <div class="box-progress success">
        <div class="d-flex align-items-center justify-content-between">
          <h3 class="">
            <FontAwesome :icon="['fas', 'bars-progress']" class="me-2" />
            {{ ProductsLength }}
            <h5 class="mt-2">{{ $t("message.ProducstLength") }}</h5>
          </h3>
          <vue-ellipse-progress
            :progress="17"
            color="var(--success-Color)"
            :size="100"
            emptyColor="#5a495f"
            fontSize="1.5rem"
            fontColor="var(--success-Color)"
          />
        </div>
      </div>
    </div>
    <div
      class="charts align-items-center mt-5"
      :class="{ 'd-flex justify-content-evenly flex-wrap': status == false }"
    >
      <div>
        <canvas id="myChart" class=""></canvas>
      </div>
      <div>
        <canvas id="myChart2" class="myChart2"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import Chart from "chart.js/auto";
import { VueEllipseProgress } from "vue-ellipse-progress";
import { mapState } from "vuex";
import { Bar } from "vue-chartjs";
import axios from "axios";
export default {
  name: "HomeComponent",
  components: { VueEllipseProgress, Bar },
  data() {
    return {
      chartData: {
        label: "asdsad",
        labels: ["January", "February", "March"],
        datasets: [{ data: [40, 20, 12] }],
      },
      chartOptions: {
        responsive: true,
      },
      CategoriesLength: "",
      ProductsLength: "",
      ClintsLength: "",
      EmployeeLength: "",
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
      status: (state) => state.navbarStatus,
    }),
  },
  mounted() {
    this.getCategoriesLength();
    this.getProductsLength();
    this.getEmployeesLength();
    this.getClintsLength();
    const ctx = document.getElementById("myChart");
    const chart = document.getElementById("myChart2");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Employees", "Products", "Categories", "Clints"],
        datasets: [
          {
            label: "Statistics",
            data: [45, 6, 30, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        backgroundColor: ["#5d87ff", "#13deb9", "#ffae1f", "#fa9075"],
      },
    });
    const data = {
      datasets: [
        {
          label: "Statistics",
          labels: ["Employees", "Products", "Categories", "Clints"],
          data: [300, 50, 100, 50],
          backgroundColor: ["#5d87ff", "#13deb9", "#ffae1f", "#fa9075"],
          hoverOffset: 4,
        },
      ],
    };
    new Chart(chart, {
      type: "doughnut",
      data: data,
    });
  },
  methods: {
    getCategoriesLength() {
      axios.get(`Categories`).then((response) => {
        this.CategoriesLength = response.data.length;
        console.log(this.CategoriesLength)
      });
    },
    getProductsLength() {
      axios.get(`Products`).then((response) => {
        this.ProductsLength = response.data.length;
      });
    },
    getEmployeesLength() {
      axios.get(`Employees`).then((response) => {
        this.EmployeesLength = response.data.length;
      });
    },
    getClintsLength() {
      axios.get(`Users`).then((response) => {
        this.ClintsLength = response.data.length;
      });
    },
  },
};
</script>
<style scoped>
.container-statis {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
.box-progress {
  padding: 15px;
  border-radius: 10px;
}
.charts {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
@media (max-width: 991px) {
  .charts canvas {
    margin: auto;
  }
}
</style>
