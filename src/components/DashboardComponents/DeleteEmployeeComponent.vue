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
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>

      <tbody>
        <tr v-for="(employee, index) in pageOfItems" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="employee.Photo" class="img-fluid small-img" />
          </td>
          <td>{{ employee.Name }}</td>
          <td class="td-display">{{ employee.Email }}</td>
          <td>
            <button
              @click="getData(employee, index)"
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
                          {{ $t("message.deleteMessage") }}
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
                      @click="deleteEmployee()"
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
  name: "DeleteEmployeeComponent",
  data() {
    return {
      employeesList: [],
      employeeId: "",
      employeeIndex: "",
      pageOfItems: [],
    };
  },
  computed: {
    ...mapState({
      align: (state) => state.lang,
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
    getData(employee, index) {
      (this.employeeId = employee.id), (this.employeeIndex = index);
    },
    getAllEmoloyees() {
      axios.get(`Employees`).then((response) => {
        this.employeesList = response.data;
      });
    },
    deleteEmployee() {
      axios
        .delete(`Employees/${this.employeeId}`)
        .then((response) => {
          this.$toast.success("The Employee has been cleared successfully", {
            timeout: 1500,
          });
          this.pageOfItems.splice(this.employeeIndex, 1);
          document.getElementById("closed").click();
        })
        .catch((reject) => {
          this.$toast.error("Error 404", {
            timeout: 1500,
          });
        });
    },
  },
};
</script>
<style>
table {
  position: relative;
  vertical-align: middle;
}
</style>
