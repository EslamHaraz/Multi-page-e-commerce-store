<template>
  <div class="parent">
    <table
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Photo") }}</th>
        <th scope="col">{{ $t("message.Name") }}</th>
        <th scope="col" class="td-display">{{ $t("message.Email") }}</th>
      </tr>
      <tbody>
        <tr v-for="(employee, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="employee.Photo" class="img-fluid small-img" />
          </td>
          <td>{{ employee.Name }}</td>
          <td class="td-display">{{ employee.Email }}</td>
        </tr>
      </tbody>
    </table>
    <jw-pagination
      class="pagination"
      :pageSize="5"
      :items="employeesList"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import JwPagination from "jw-vue-pagination";
export default {
  name: "ClintsView",
  data() {
    return {
      employeesList: [],
      pageOfItems: [],
    };
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
    }),
  },
  components: { JwPagination },
  mounted() {
    this.getAllEmoloyees();
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getAllEmoloyees() {
      axios.get(`Employees`).then((response) => {
        this.employeesList = response.data;
      });
    },
  },
};
</script>
