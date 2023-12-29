<template>
  <div class="parent">
    <table
      class="table table-striped"
      :class="{ 'table-dark': mode  === 'dark' }"
    >
      <tr>
        <th scope="col">#</th>
        <th scope="col" class="td-display">{{ $t("message.Product") }}</th>
        <th scope="col" class="td-display">{{ $t("message.Reporter") }}</th>
        <th scope="col">{{ $t("message.Reason") }}</th>
        <th scope="col">{{ $t("message.seller") }}</th>
        <th scope="col">{{ $t("message.action") }}</th>
      </tr>
      <tbody>
        <tr>
          <td>1</td>
          <td class="td-display">Gtx 3060 Ti</td>
          <td class="td-display">Islamharaz</td>
          <td>This Is Not The Best Quality</td>
          <td>Ali Ebrahiem</td>
          <td class="d-flex justify-content-evenly flex-wrap">
            <button
              class="btn btn-edit"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob1"
            >
              {{ $t("message.Reply") }}
              <FontAwesome :icon="['fas', 'reply']" style="margin: 0" />
            </button>
            <button
              class="btn btn-delete"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrob12"
            >
              {{ $t("message.block") }}
              <FontAwesome :icon="['fas', 'lock']" style="margin: 0" />
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
                      {{ $t("message.Reply") }}
                    </h5>
                  </div>
                  <div class="modal-body">
                    <div class="row g-3 align-items-center">
                      <div style="position: relative" class="d-block mx-auto">
                        <textarea
                          class="form-control resize-none"
                          id="textAreaExample1"
                          rows="4"
                          :placeholder="$t('message.ReplyToUser')"
                        ></textarea>
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
                    <button type="button" class="btn btn-edit">
                      <FontAwesome :icon="['fas', 'reply']" style="margin: 0" />
                      {{ $t("message.Reply") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="staticBackdrob12"
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
                        <h4 class="modal-text-color text-initial mb-3">
                          {{ $t("message.blockSeller") }}
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
                    <button type="button" class="btn btn-delete">
                      {{ $t("message.block") }}
                      <FontAwesome :icon="['fas', 'lock']" style="margin: 0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "ReportesView",
  computed: {
    ...mapState({
      mode: (state) => state.mode,
      align: (state) => state.lang,
    }),
  },
};
</script>
<style>
@media (max-width: 991px) {
  .btn-delete {
    margin: 5px 0px;
  }
}
</style>
