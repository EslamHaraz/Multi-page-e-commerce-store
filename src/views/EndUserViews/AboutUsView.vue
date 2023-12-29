<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 ">
        <h2 class="">Ask how we can help you:</h2>
      </div>
      <div class="col-12 col-lg-8">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUsView",
};
</script>
