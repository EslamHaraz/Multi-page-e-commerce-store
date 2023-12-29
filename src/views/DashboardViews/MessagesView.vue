<template>
  <div class="parent">
    <table
      v-if="messagesList.length > 0"
      class="table table-striped"
      :class="{ 'table-dark': mode === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col">{{ $t("message.Name") }}</th>
        <th scope="col">{{ $t("message.Email") }}</th>
        <th scope="col">{{ $t("message.Message") }}</th>
      </tr>
      <tbody>
        <tr v-for="(message, index) in messagesList" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ message.Name }}</td>
          <td>{{ message.Email }}</td>
          <td>
            {{ message.messageContent | filter(30) }}
            <button
              @click="getMessage(message.messageContent)"
              class="btn btn-link"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("endUser.showMore") }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="message-length" v-else>
      <h3>{{ $t("message.nothingMessages") }}</h3>
    </div>
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
              {{ $t("endUser.message") }}
            </h5>
          </div>
          <div class="modal-body">
            <h4 class="text-color text-center">{{ message }}</h4>
          </div>
          <div class="modal-footer flex-row-reverse">
            <button
              type="button"
              class="btn btn-secondary close"
              data-bs-dismiss="modal"
            >
              {{ $t("endUser.lock") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "MessagesView",
  data() {
    return {
      messagesList: [],
      message: "",
    };
  },
  computed: {
    ...mapState({
      mode: (state) => state.mode,
    }),
  },
  mounted() {
    this.getMessages();
  },
  methods: {
    getMessages() {
      axios
        .get("Messages")
        .then((response) => {
          this.messagesList = response.data;
        })
        .catch((reject) => {
          this.$toast.error("Error 404");
        });
    },
    getMessage(value) {
      this.message = value;
    },
  },
};
</script>
