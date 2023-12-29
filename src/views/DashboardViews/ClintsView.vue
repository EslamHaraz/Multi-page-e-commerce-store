<template>
  <div class="parent">
    <div class="filter-clnts d-Flex mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          v-model="selectType"
          value="All"
        />
        <label class="form-check-label text-color" for="flexRadioDefault1">
          {{ $t("message.All") }}
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          value="Clints"
          v-model="selectType"
        />
        <label class="form-check-label text-color" for="flexRadioDefault2">
          {{ $t("message.Clints") }}
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault3"
          v-model="selectType"
          value="Sellers"
          checked
        />
        <label class="form-check-label text-color" for="flexRadioDefault3">
          {{ $t("message.Sellers") }}
        </label>
      </div>
    </div>
    <table
      v-if="clintsList.length > 0"
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
        <tr v-for="(clint, index) in filterClintByType" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="clint.Photo" class="img-fluid small-img" />
          </td>
          <td>
            {{ clint.Name }}
            <p class="mb-0" v-if="clint.Seller == true">
              <FontAwesome
                :icon="['fas', 'store']"
                style="margin: 0"
                class="text-color"
              />
            </p>
          </td>
          <td class="td-display">{{ clint.Email }}</td>
          <td>
            <button
              @click="getData(clint, index)"
              v-if="clint.Status == 'Good'"
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.block") }}
              <FontAwesome :icon="['fas', 'user-lock']" style="margin: 0" />
            </button>

            <button
              @click="getData(clint, index)"
              v-if="clint.Status == 'Block'"
              class="btn btn-show"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob2"
            >
              {{ $t("message.unblock") }}
              <FontAwesome :icon="['fas', 'unlock']" style="margin: 0" />
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
                      {{ $t("message.block") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="text-danger">
                          {{ $t("message.blockMessage") }}
                        </h4>
                        <textarea
                          type="text"
                          class="form-control mt-3 mb-3"
                          v-model="blockReason"
                          id="inputProduct"
                        />
                        <div
                          v-if="v$.blockReason.$error"
                          class="text-danger text-center w-100 mb-2 mt-2"
                        >
                          {{ $t("message.reasonLength") }}
                        </div>

                        <div
                          v-else-if="blockReason.length > 300"
                          class="text-danger text-center w-100 mb-2 mt-2"
                        >
                          {{ $t("message.reasonLong") }}
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
                      @click="blockUser()"
                      type="button"
                      class="btn btn-delete"
                    >
                      {{ $t("message.block") }}
                      <FontAwesome
                        :icon="['fas', 'user-lock']"
                        style="margin: 0"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="staticBackdrob2"
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
                      id="Closed"
                      class="btn-close m-0"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <h5 class="modal-title" id="staticBackdrob1Label">
                      {{ $t("message.unblock") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <h4 class="text-success">
                          {{ $t("message.unblockMessage") }}
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
                      @click="unBlockUser()"
                      type="button"
                      class="btn btn-show"
                    >
                      {{ $t("message.unblock") }}
                      <FontAwesome
                        :icon="['fas', 'user-lock']"
                        style="margin: 0"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="message-length" v-else>
      <h3>{{ $t("message.nothingClints") }}</h3>
    </div>
    <jw-pagination
      :items="clintsList"
      :pageSize="10"
      @changePage="onChangePage"
    >
    </jw-pagination>
  </div>
</template>
<script>
let admin = localStorage.getItem("admin-detail");
import axios from "axios";
import { mapState } from "vuex";
import JwPagination from "jw-vue-pagination";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import useVuelidate from "@vuelidate/core";
export default {
  name: "ClintsView",
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      admin,
      clintsList: [],
      pageOfItems: [],
      userId: "",
      clintIndex: "",
      clintData: [],
      isSeller: "",
      blockReason: "",
      admidId: "",
      selectType: "All",
    };
  },
  components: { JwPagination },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
    }),
    filterClintByType() {
      if (this.selectType == "All") {
        return this.pageOfItems;
      } else if (this.selectType == "Clints") {
        return this.pageOfItems.filter((ele) => {
          return ele.Seller == false;
        });
      } else {
        return this.pageOfItems.filter((ele) => {
          return ele.Seller == true;
        });
      }
    },
  },
  validations() {
    return {
      blockReason: {
        required,
        minLength: minLength(50),
        maxLength: maxLength(300),
      },
    };
  },
  mounted() {
    this.admidId = JSON.parse(admin).id;
    this.getAllClints();
  },
  methods: {
    getData(clint, index) {
      this.clintData = clint;
      this.clintIndex = index;
      this.userId = clint.id;
      this.isSeller = clint.Seller;
    },
    onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
    },
    getAllClints() {
      axios.get(`Users`).then((response) => {
        this.clintsList = response.data;
      });
    },
    blockUser() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .put(
            `Users/${this.clintData.id}`,
            this.clintData,
            (this.clintData.Status = "Block")
          )
          .then((response) => {
            this.$toast.success("The user has been successfully banned", {
              timeout: 1500,
            });
            this.sendMessageToUser();
            document.getElementById("closed").click();
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      }
    },
    unBlockUser() {
      axios
        .put(
          `Users/${this.clintData.id}`,
          this.clintData,
          (this.clintData.Status = "Good")
        )
        .then((response) => {
          this.$toast.success("The user has been successfully unblocked", {
            timeout: 1500,
          });
          document.getElementById("Closed").click();
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
    sendMessageToUser() {
      axios
        .post("BlockMessages", {
          adminId: this.admidId,
          userId: this.userId,
          blockReason: this.blockReason,
        })
        .catch((error) => {
          this.$toast.error("Error 404F");
        });
    },
  },
};
</script>
<style scoped>
.filter-clnts {
  justify-content: space-evenly !important;
}
</style>
