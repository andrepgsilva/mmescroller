<script setup>
  import { useUserStore } from '@/stores/user';
  import { useNavbarStore } from '@/stores/navbar';
  import Loading from "@/components/Loading.vue";

  const store = useUserStore();

</script>

<template>
  <div id="main">
    <Loading v-if="store.isLoading"></Loading>
    <form>
      <p>
        <label for="user_name">Name</label>
        <input type="text" name="user_name" placeholder="Your name" v-model="store.authform.user.name">
      </p>
      <p>
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Your email" v-model="store.authform.user.email">
      </p>
      <p>
        <label for="password">Password</label>
        <input type="password" name="password" v-model="store.authform.user.password">
      </p>

      <div id="signup-button-wrapper">
        <button type="button" @click="store.signUp()">
          Sign Up
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

  #signup-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
