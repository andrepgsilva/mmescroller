<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import NavbarBottom from './components/NavbarBottom.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

userStore.authenticateUserOnClient();

</script>

<template>
  <Navbar />
  
  <RouterView />
  
  <NavbarBottom />
</template>

<style>
@import "@/assets/base.css";

@media only screen and (min-width: 768px) {
  #navbar-bottom {
    display: none !important;
  }
}

@media only screen and (max-width: 768px) {
  #navbar-user-actions {
    visibility: hidden !important;
  }
}
</style>
