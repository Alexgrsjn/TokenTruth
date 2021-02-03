import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	 signedIn: false,
  	     address: null,
  	         wallet: null,
  	         TokenTruthAddress : "0x2716Cec38a7eB5d119F7F17cE97b598810F12a8f",
  },
  mutations: {
  	    hasSignedIn(state, hasSignedIn) {
      state.signedIn = hasSignedIn;
    },
        setUserAddress(state, address) {
      state.address = address;
    },
        setUserWallet(state, wallet) {
      state.wallet = wallet;
    },

  },
  actions: {},
  modules: {}
});
