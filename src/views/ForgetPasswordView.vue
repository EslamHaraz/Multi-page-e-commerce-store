<template>
  <div class="parent">
    <div class="container position-relative">
      <div class="row">
        <div class="col-lg-5 col-md-12 edit-col">
          <form
            @submit.prevent
            class="text-start w-100 form"
            :class="{ 'text-end': ar }"
          >
            <h3 class="font-weight mb-2 text-color text-initial w-100">
              {{ $t("message.ResetPawwordMessage") }}
            </h3>
            <Transition name="fade">
              <div class="mb-3" v-if="answerStatus">
                <label class="label-weight mb-2 text-color text-initial w-100">{{
                  $t("message.Email")
                }}</label>
                <input
                  type="email"
                  :class="{ 'text-end': ar }"
                  autocomplete
                  class="form-control"

                  v-model="Email"
                />
                <span v-if="this.v$.Email.$error" class="text-danger">
                  {{ $t("message.EmailRequired") }}</span
                >
                <button
                  @click="getQuestion()"
                  type="submit"
                  class="submit-button w-100 p-2 mt-3"
                >
                  {{ $t("message.Get") }}
                </button>
              </div>
            </Transition>

            <Transition name="bounce">
              <div class="inputs mt-4" v-if="questionStatus">
                <div class="mb-3">
                  <label class="label-weight mb-2 text-color text-initial w-100">{{
                    $t("message.ResetCondation")
                  }}</label>

                  <input
                    type="text"
                    :class="{ 'text-end': ar }"
                    autocomplete
                    class="form-control"
                    v-model="question"
                    disabled
                  />
                </div>
                <div class="mb-3">
                  <label class="label-weight mb-2 text-color text-initial w-100" >{{
                    $t("message.Answer")
                  }}</label>
                  <input
                    type="text"
                    :class="{ 'text-end': ar }"
                    autocomplete
                    class="form-control"

                    v-model="answer"
                  />
                </div>
                <button
                  @click="checkAnswer()"
                  type="submit"
                  class="submit-button w-100 p-2"
                >
                  {{ $t("message.check") }}
                </button>
              </div>
            </Transition>
            <Transition name="bounce">
              <div class="inputs mt-4" v-if="check">
                <div class="mb-3">
                  <label class="label-weight mb-2 text-color text-initial w-100">{{
                    $t("message.Password")
                  }}</label>
                  <input
                    type="password"
                    v-model="Password"
                    :class="{ 'text-end': ar }"
                    autocomplete
                    class="form-control"
 
                  />
                </div>
                <div class="mb-3">
                  <label class="label-weight mb-2 text-color text-initial w-100">{{
                    $t("message.confirmPassword")
                  }}</label>
                  <input
                    type="password"
                    v-model="ConfirmPassword"
                    :class="{ 'text-end': ar }"
                    autocomplete
                    class="form-control"
           
                  />
                </div>
                <button
                  @click="changePassword()"
                  type="submit"
                  class="submit-button w-100 p-2"
                >
                  {{ $t("message.ChangeNow") }}
                </button>
              </div>
            </Transition>
          </form>
        </div>
        <div class="col-7 edit-col bg-login">
          <img src="@/assets/login-bg-8f9a4137.svg" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "ForgetPasswordView",
  setup: () => ({ v$: useValidate() }),
  data() {
    return {
      questionStatus: false,
      answerStatus: true,
      check: false,
      answer: "",
      question: "",
      Email: "",
      UserData: "",
      Password: "",
      ConfirmPassword: "",
    };
  },
  validations() {
    return {
      Email: { email, required },
    };
  },
  computed: {
    ...mapState({
      ar: (state) => state.ar,
      en: (state) => state.en,
    }),
  },
  methods: {
    getQuestion() {
      this.v$.$validate();
      if (!this.v$.$error) {
        axios.get(`Users?Email=${this.Email}`).then((response) => {
          if (response.data.length > 0) {
            this.answerStatus = false;
            setTimeout(() => {
              this.questionStatus = true;
            }, 1000);
            this.question = response.data[0].SecurityQuestion;
          } else this.$toast.error("Email Is wrong");
        });
      }
    },
    checkAnswer() {
      if (this.answer !== "") {
        axios
          .get(`Users?Email=${this.Email}&Answer=${this.answer}`)
          .then((response) => {
            if (response.data.length > 0) {
              this.$toast.success("The answer is correct");
              this.questionStatus = false;
              this.UserData = response.data;
              setTimeout(() => {
                this.check = true;
              }, 1000);
            } else this.$toast.error("The answer is wrong");
          });
      }
    },
    changePassword() {
      if (
        this.Password === this.ConfirmPassword &&
        this.Password.length > 8 &&
        this.Password.length < 15
      ) {
        axios
          .put(
            `Users/${this.UserData[0].id}`,
            this.UserData[0],
            (this.UserData[0].Password = this.Password)
          )
          .then((response) => {
            this.$toast.success("Password has been modified successfully");
            setTimeout(() => {
              this.$router.push({ path: "SigninUser" });
            }, 2500);
          })
          .catch((reject) => {
            this.$toast.error("Error 404");
          });
      } else this.$toast.error("The Password Does Not Match");
    },
  },
};
</script>
<style></style>
