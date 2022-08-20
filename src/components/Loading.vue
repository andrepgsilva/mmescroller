<script setup>

</script>

<template>
  <div id="loading">
    <img
      class="img"
      src="/loading.gif"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<style scoped>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: white;
  height: 100vh;
  width: 100vw;
  text-align: center;
  line-height: 100vh;
}
.img {
  position: relative;
  margin: auto;
  margin-top: 20%;
}
</style>