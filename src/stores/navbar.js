import { defineStore } from "pinia";

export const useNavbarStore = defineStore({
  id: "navbar",
  state: () => ({
    wasTheCredentialsOptionsCalled: false,
    wasTheAuthenticatedOptionsCalled: false,
  }),
  getters: {},
  actions: {
    toggleCredentialsOptions() {
      this.wasTheCredentialsOptionsCalled = ! this.wasTheCredentialsOptionsCalled;
    },

    setCredentialsOptionsAsCalled() {
      this.wasTheCredentialsOptionsCalled = true;
    },

    setCredentialsOptionsAsNotCalled() {
      this.wasTheCredentialsOptionsCalled = false;
    },

    toggleAuthenticatedOptions() {
      this.wasTheAuthenticatedOptionsCalled = ! this.wasTheAuthenticatedOptionsCalled;
    },

    setAuthenticatedOptionsAsCalled() {
      this.wasTheAuthenticatedOptionsCalled = true;
    },

    setAuthenticatedOptionsAsNotCalled() {
      this.wasTheAuthenticatedOptionsCalled = false;
    },
  },
});
