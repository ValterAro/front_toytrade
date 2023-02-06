<template>
  <div class="row justify-content-center">
    <div class="col-2">
      <form>
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input type="password" class="form-control" placeholder="Parool">
        </div>
        <button type="submit" class="btn btn-primary">Logi sisse</button>
      </form>
    </div>
  </div>


</template>

<script>
export default {
  name: "LoginView"
}
</script>