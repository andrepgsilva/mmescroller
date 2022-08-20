<script setup>
  import { useUserStore } from '@/stores/user';
  import { useNavbarStore } from '@/stores/navbar';

  const store = useUserStore();
  const navbarStore = useNavbarStore();
</script>

<template>
  <div id="navbar-bottom">
    <div>
      <div id="navbar-bottom-user-actions">
        <router-link to="/">
          <svg width="15" height="15" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.2696 37.5467V31.4312C13.2696 29.8701 14.5443 28.6046 16.1169 28.6046H21.8652C22.6204 28.6046 23.3446 28.9024 23.8786 29.4325C24.4126 29.9626 24.7125 30.6816 24.7125 31.4312V37.5467C24.7078 38.1957 24.9641 38.8198 25.4247 39.2804C25.8854 39.741 26.5121 40 27.1659 40H31.0877C32.9193 40.0047 34.6775 39.2857 35.9743 38.0016C37.2712 36.7175 38 34.974 38 33.1556V15.7337C38 14.2649 37.3441 12.8717 36.2092 11.9293L22.868 1.35174C20.5473 -0.502877 17.2222 -0.442996 14.9708 1.49396L1.93402 11.9293C0.745481 12.8439 0.0351046 14.2413 0 15.7337V33.1379C0 36.9277 3.09476 40 6.91235 40H10.7446C12.1025 40 13.206 38.9124 13.2158 37.5645L13.2696 37.5467Z"
              fill="#AAAAAA" />
          </svg>
        </router-link>
        <router-link to="/create-post">
          <svg width="15" height="15" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M29.3202 9.91821e-05C36.1202 9.91821e-05 40.0002 3.8401 40.0002 10.6601V29.3401C40.0002 36.1201 36.1402 40.0001 29.3402 40.0001H10.6602C3.84021 40.0001 0.000213623 36.1201 0.000213623 29.3401V10.6601C0.000213623 3.8401 3.84021 9.91821e-05 10.6602 9.91821e-05H29.3202ZM19.9802 11.0201C19.0602 11.0201 18.3202 11.7601 18.3202 12.6801V18.3201H12.6602C12.2202 18.3201 11.8002 18.5001 11.4802 18.8001C11.1802 19.1201 11.0002 19.5381 11.0002 19.9801C11.0002 20.9001 11.7402 21.6401 12.6602 21.6601H18.3202V27.3201C18.3202 28.2401 19.0602 28.9801 19.9802 28.9801C20.9002 28.9801 21.6402 28.2401 21.6402 27.3201V21.6601H27.3202C28.2402 21.6401 28.9802 20.9001 28.9802 19.9801C28.9802 19.0601 28.2402 18.3201 27.3202 18.3201H21.6402V12.6801C21.6402 11.7601 20.9002 11.0201 19.9802 11.0201Z"
              fill="#FF7D0D" />
          </svg>
        </router-link>

        <router-link to="/">
          <div class="actions-box" v-if="navbarStore.wasTheCredentialsOptionsCalled">
            <ul>
              <li><router-link to="/login" @click="navbarStore.toggleCredentialsOptions()">Login</router-link></li>
              <li><router-link to="/signup" @click="navbarStore.toggleCredentialsOptions()">Sign Up</router-link></li>
            </ul>
          </div>

          <div class="actions-box" v-if="store.isUserLoggedIn && navbarStore.wasTheAuthenticatedOptionsCalled">
            <ul>
              <li><a @click.stop.prevent="() => store.logout()">Logout</a> </li>
            </ul>
          </div>

          <img src='http://placeskull.com/15/15' alt='' v-if="store.isUserLoggedIn" @click="navbarStore.toggleAuthenticatedOptions()" />

          <svg width="15" height="15" viewBox="0 0 32 41" fill="none" xmlns="http://www.w3.org/2000/svg" @click="navbarStore.toggleCredentialsOptions()" v-else>
            <path
              d="M16 26.8479C24.6773 26.8479 32 28.2579 32 33.6979C32 39.14 24.6292 40.5 16 40.5C7.32475 40.5 0 39.09 0 33.6499C0 28.2079 7.37076 26.8479 16 26.8479ZM16 0.5C21.8782 0.5 26.588 5.20805 26.588 11.0821C26.588 16.9562 21.8782 21.6662 16 21.6662C10.1238 21.6662 5.41203 16.9562 5.41203 11.0821C5.41203 5.20805 10.1238 0.5 16 0.5Z"
              fill="#AAAAAA" />
          </svg>
        </router-link>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#F8F8F8" fill-opacity="1"
          d="M0,160L40,165.3C80,171,160,181,240,165.3C320,149,400,107,480,80C560,53,640,43,720,58.7C800,75,880,117,960,122.7C1040,128,1120,96,1200,69.3C1280,43,1360,21,1400,10.7L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
        </path>
      </svg>
    </div>
  </div>
</template>

<style scoped>
a {
  display: block;
}

#navbar-bottom {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  min-width: 100%;
}

#navbar-bottom>div {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

#navbar-bottom>div svg {
  transform: scale(2);
}

#navbar-bottom-user-actions {
  margin-bottom: -16%;
  z-index: 1;

  display: flex;
  width: 100%;
  justify-content: space-between;
}

#navbar-bottom-user-actions>a {
  display: flex;
  width: calc(100%/3);
  align-items: center;
  justify-content: center;
  position: relative;
  text-decoration: none;
}

#navbar-bottom-user-actions > a > img {
  width: 30px;
  border-radius: 14px;
}

#navbar-bottom-user-actions>a>span {
  display: block;
  width: 32px;
  font-size: 32px;
  color: #AAAAAA;
}

.actions-box {
  position: absolute;
  bottom: 30px;
  background-color: #f8f8f8;
  min-width: 100px;
  min-height: 80px;
  border-radius: 10px;
  right: 0;
  z-index: 3;
}

.actions-box > ul {
  list-style: none;
  padding: 10px;
}

.actions-box a {
  text-decoration: none;
  color: #FF7D0D;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 10px;
}
</style>
