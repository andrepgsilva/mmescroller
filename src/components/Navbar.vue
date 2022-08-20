<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useNavbarStore } from '@/stores/navbar';

const navbarStore = useNavbarStore();  
const store = useUserStore();
</script>

<template>
  <nav>
    <div>
      <p></p>
    </div>
    <div id="logo-wrapper">
      <a href="/">
        <img style="border-radius: 18px;" src='https://dummyimage.com/35x35/FF7D0D.png?text=My%20Logo' alt='' />
      </a>

    </div>
    <div id="navbar-user-actions">
      <div>
        <a @click.prevent="store.createMeme">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M29.3202 9.91821e-05C36.1202 9.91821e-05 40.0002 3.8401 40.0002 10.6601V29.3401C40.0002 36.1201 36.1402 40.0001 29.3402 40.0001H10.6602C3.84021 40.0001 0.000213623 36.1201 0.000213623 29.3401V10.6601C0.000213623 3.8401 3.84021 9.91821e-05 10.6602 9.91821e-05H29.3202ZM19.9802 11.0201C19.0602 11.0201 18.3202 11.7601 18.3202 12.6801V18.3201H12.6602C12.2202 18.3201 11.8002 18.5001 11.4802 18.8001C11.1802 19.1201 11.0002 19.5381 11.0002 19.9801C11.0002 20.9001 11.7402 21.6401 12.6602 21.6601H18.3202V27.3201C18.3202 28.2401 19.0602 28.9801 19.9802 28.9801C20.9002 28.9801 21.6402 28.2401 21.6402 27.3201V21.6601H27.3202C28.2402 21.6401 28.9802 20.9001 28.9802 19.9801C28.9802 19.0601 28.2402 18.3201 27.3202 18.3201H21.6402V12.6801C21.6402 11.7601 20.9002 11.0201 19.9802 11.0201Z"
              fill="#FF7D0D" />
          </svg>
          <span>Create</span>
        </a>
      </div>
      <div id="auth-block">
        <router-link to="">
          <div class="actions-box" v-if="! store.isUserLoggedIn && navbarStore.wasTheCredentialsOptionsCalled">
            <ul>
              <li><router-link to="/login" @click="navbarStore.toggleCredentialsOptions()">Login</router-link></li>
              <li><router-link to="/signup" @click="navbarStore.toggleCredentialsOptions()">Sign Up</router-link></li>
            </ul>
          </div>
          
          <div class="actions-box" id="actions-box-logout" v-if="store.isUserLoggedIn && navbarStore.wasTheAuthenticatedOptionsCalled">
            <ul>
              <li><a @click.stop.prevent="() => store.logout()">Logout</a> </li>
            </ul>
          </div>

          <svg width="22" height="22" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="! store.isUserLoggedIn" @click="navbarStore.toggleCredentialsOptions()">
            <path
              d="M16 26.8479C24.6773 26.8479 32 28.2579 32 33.6979C32 39.14 24.6292 40.5 16 40.5C7.32475 40.5 0 39.09 0 33.6499C0 28.2079 7.37076 26.8479 16 26.8479ZM16 0.5C21.8782 0.5 26.588 5.20805 26.588 11.0821C26.588 16.9562 21.8782 21.6662 16 21.6662C10.1238 21.6662 5.41203 16.9562 5.41203 11.0821C5.41203 5.20805 10.1238 0.5 16 0.5Z"
              fill="#FF7D0D" />
          </svg>
        </router-link>

        <img src='http://placeskull.com/15/15' alt='' v-if="store.isUserLoggedIn" @click="navbarStore.toggleAuthenticatedOptions()" />
      </div>
    </div>
  </nav>
</template>

<style scoped>
a {
  text-decoration: none;
}

/* Navbar */
nav {
  position: sticky;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  background-color: #F8F8F8;
  padding: 10px;
  z-index: 1;
}

nav>div {
  width: calc(100% / 3);
}

#logo-wrapper {
  display: flex;
  justify-content: center;
}

#logo-wrapper>a {
  display: flex;
}

#logo-wrapper img {
  max-height: 50px;
}

#navbar-user-actions {
  display: flex;
  justify-content: flex-end;
}

#navbar-user-actions>div {
  display: flex;
  align-items: center;

}

#navbar-user-actions>div:first-child {
  margin-right: 15px;
}


#navbar-user-actions>div>a {
  display: flex;
  color: #000000d4;
  font-weight: 400;
  cursor: pointer;
}

#navbar-user-actions>div>a>span {
  margin-left: 6px;
  font-weight: 700;
}

#auth-block img {
  width: 100%;
  object-fit: cover;
  border-radius: 20px;

  min-width: 35px;
  max-width: 40px;
}

.actions-box {
  position: absolute;
  top: 38px;
  background-color: #f8f8f8;
  min-width: 100px;
  min-height: 80px;
  border-radius: 10px;
  right: -10px;
  z-index: 2;
}

.actions-box > ul {
  list-style: none;
  padding: 10px;
}

.actions-box > ul > li:last-child {
  margin-top: 10px;
}

.actions-box a {
  text-decoration: none;
  color: #FF7D0D;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 10px;
}

#actions-box-logout {
  top: 27px;
  right: -45px;
}
/* End Navbar */
</style>