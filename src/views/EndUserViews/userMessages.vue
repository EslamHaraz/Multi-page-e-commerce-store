<template>
  <div class="parent">
    <div class="container">
      <h3 class="text-color text-initial">Message</h3>
      <table
        class="table table-striped"
        :class="{ 'table-dark': mode === 'dark' }"
      >
        <thead>
          <tr>
            <th scope="col">Admin</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Eslam Haraz</td>
            <td>لقد تم حظرك لسبب امني</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "userMessages",
  computed: {
    ...mapState({
      mode: (state) => state.mode,
    }),
  },
};
</script>
