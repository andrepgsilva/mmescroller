<script setup>
  import { useUserStore } from '@/stores/user';
  import Loading from "@/components/Loading.vue";

  const store = useUserStore();
</script>

<template>
  <div id="main">
    <Loading v-if="store.isLoading"></Loading>

    <form>
      <p>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Your email" v-model="store.authform.user.email">
      </p>
      <p>
        <label for="password">Password</label>
        <input type="password" name="password" v-model="store.authform.user.password">
      </p>

      <div id="login-button-wrapper">
        <button type="button" @click="store.login">
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%
    ;
  }

  form {
    width: 80%;
    /* margin: 0 auto; */
  }

  form > p {
    display: flex;
    flex-direction: column;
  }

  #login-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
