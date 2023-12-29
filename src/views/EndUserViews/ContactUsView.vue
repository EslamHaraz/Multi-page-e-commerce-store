<template>
  <div class="container pt-5 pb-5">
    <div class="row">
      <div class="col-12 bg-image"></div>
      <div class="col-lg-6 mt-5">
        <h2 class="mb-4 text-initial text-color">
          {{ $t("endUser.askHowWeCan") }}
        </h2>
        <h4 class="mb-3 text-color text-initial lh-6">
          {{ $t("endUser.messageOne") }}
        </h4>
        <h5 class="mb-0 text-colot text-initial lh-6">
          {{ $t("endUser.avillableConsoles") }}
          <Div class="platforms-container d-Flex mt-3">
            <h5 class="mb-3">
              <router-link :to="{}" class="text-color platform-link">
                {{ $t("endUser.FaceBook") }}
                <img
                  src="@/assets/Facebook_f_logo_(2021).svg.png"
                  class="pad-logo img-fluid ms-2"
                />
              </router-link>
            </h5>
            <h5 class="mb-3">
              <router-link :to="{}" class="text-color platform-link">
                {{ $t("endUser.instagram") }}
                <img
                  src="@/assets/Instagram_logo_2016.svg.webp"
                  class="pad-logo img-fluid ms-2"
                />
              </router-link>
            </h5>
            <h5 class="mb-3">
              <router-link :to="{}" class="text-color platform-link">
                {{ $t("endUser.WhatsApp") }}
                <img
                  src="@/assets/WhatsApp.svg.png"
                  class="pad-logo img-fluid ms-2"
                />
              </router-link>
            </h5>
            <h5 class="mb-3">
              <router-link :to="{}" class="text-color platform-link">
                {{ $t("endUser.Twitter") }}
                <img
                  src="@/assets/Logo_of_Twitter.svg.png"
                  class="pad-logo img-fluid ms-2"
                />
              </router-link>
            </h5>
          </Div>
        </h5>
        <h5 class="text-color mt-3 text-initial">
          {{ $t("endUser.messageTwo") }}

          <h5 class="text-color mt-3 text-initial">
            {{ $t("endUser.messageThree") }}
          </h5>
        </h5>
      </div>
      <div class="col-12 col-lg-6 mt-5">
        <form @submit.prevent>
          <div class="form-group text-initial mb-4">
            <label class="text-color mb-2 fs-18" for="exampleInputName ">
              {{ $t("message.Name") }}
            </label>
            <input
              type="text"
              class="form-control"
              v-model.trim="Name"
              id="exampleInputName"
              aria-describedby="emailHelp"
              :placeholder="$t('message.Name')"
            />
            <div
              v-if="v$.Name.$error"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("message.NameRequired") }}
            </div>
            <div
              v-if="Name.length < 8 && Name != ''"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.nameMinLength") }}
            </div>
            <div
              v-if="Name.length > 20"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.nameMaxLength") }}
            </div>
          </div>
          <div class="form-group text-initial mb-4">
            <label class="text-color mb-2 fs-18" for="exampleInputEmail1 ">
              {{ $t("message.Email") }}
            </label>
            <input
              type="email"
              class="form-control text-start"
              v-model="Email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              :placeholder="$t('message.Email')"
            />
            <div
              v-if="v$.Email.$error"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("message.EmailRequired") }}
            </div>
            <div
              v-if="Email.length < 5 && Email != ''"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.notValidEmail") }}
            </div>
          </div>
          <div class="form-group text-initial mb-4">
            <label
              class="text-color mb-2 fs-18"
              for="exampleInputMessageAddress "
            >
              {{ $t("endUser.messageAdress") }}</label
            >
            <textarea
              id="MessageAddress"
              class="form-control resize-none"
              v-model="messageAddress"
              rows="4"
              :placeholder="$t('endUser.messageAdress')"
              :class="{ 'text-start': lang == 'en' }"
            ></textarea>
            <div
              v-if="messageAddress.length < 30 && messageAddress != ''"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.addressMinLength") }}
            </div>
            <div
              v-if="messageAddress.length > 100"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.addressMaxLength") }}
            </div>
            <div
              v-if="v$.messageAddress.$error"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.messageAddressRequired") }}
            </div>
          </div>
          <div class="form-group text-initial mb-4">
            <label
              class="text-color mb-2 fs-18"
              for="exampleInputMessageContent   "
            >
              {{ $t("endUser.MessageContent") }}</label
            >
            <textarea
              class="form-control resize-none"
              v-model="messageContent"
              id="MessageContent"
              rows="4"
              :placeholder="$t('endUser.MessageContent')"
              :class="{ 'text-start': lang == 'en' }"
            ></textarea>
            <div
              v-if="v$.messageContent.$error"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.messageContentRequired") }}
            </div>
            <div
              v-if="messageContent.length < 80 && messageContent != ''"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.messageMinLength") }}
            </div>
            <div
              v-if="messageContent.length > 400 && messageContent != ''"
              class="text-danger text-initial w-100 mb-2 mt-2"
            >
              {{ $t("endUser.messageMaxLength") }}
            </div>
          </div>
          <button @click="sendMessage()" class="btn btn-edit mt-3 btn-proceed">
            {{ $t("endUser.SendMessage") }}
            <FontAwesome :icon="['fas', 'message']" style="margin: 0" />
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import useValidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import axios from "axios";
import { set } from "vue";
export default {
  name: "ContactUsView",
  setup: () => ({ v$: useValidate() }),
  computed: {
    ...mapState({
      lang: (state) => state.lang,
    }),
  },
  data() {
    return {
      Name: "",
      Email: "",
      messageAddress: "",
      messageContent: "",
    };
  },
  validations() {
    return {
      Name: { required, minLength: minLength(8), maxLength: maxLength(20) },
      Email: { required, email },
      messageAddress: {
        required,
        minLength: minLength(30),
        maxLength: maxLength(100),
      },
      messageContent: {
        required,
        minLength: minLength(80),
        maxLength: maxLength(400),
      },
    };
  },
  methods: {
    sendMessage() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios
          .post(`Messages`, {
            Name: this.Name,
            Email: this.Email,
            messageAddress: this.messageAddress,
            messageContent: this.messageContent,
          })
          .then((response) => {
            this.$toast.success("The message has been sent successfully");
            setTimeout(() => {
              this.$router.push({ path: "/home" });
            }, 1400);
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("Error In Data");
    },
  },
};
</script>
<style scoped>
.fs-18 {
  font-size: 18px !important;
}
.lh-6 {
  line-height: 1.6;
  text-transform: capitalize;
}
.bg-image {
  background-image: url(@/assets/hero-contact-us.jpg);
  height: 50vh;
  background-size: cover;
  opacity: 0.9;
  border-radius: 11px;
}
.btn-edit:hover {
  color: var(--text-Color);
  background-color: var(--bg-primary-Color);
}
.pad-logo {
  width: 25px;
}
@media (max-width: 767px) {
  .pad-logo {
    margin-left: 25px !important;
    margin-top: 10px;
  }
}
.container {
  background-color: var(--section-bg-Color);
  padding-right: 40px;
  padding-left: 40px;
}
</style>
