<template>
  <div class="Login">
    <v-container class="login">
      <v-row class="login">
        <v-col>
          <v-btn
            class="login"
            fab
            text
            large
            color="white"
            v-on:click="Login()"
          >
            <v-img
              src="../assets/one.png"
              alt=""
              contain
              height="60px"
              width="60px"
            >
            </v-img>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import hmy from "../javascript/hmy";

import OneWallet from "../javascript/OneWallet.js";
import store from "../store";
import hmy from "../javascript/hmy";
//import contractUserFactory from "../../build/contracts/UserFactory.json";
//import contractUserManager from "../../build/contracts/UserManager.json";
//const {tokens} = require("../javascript/BridgeTokenTruth.js");
//import UserTokenContract from "../../../../build/contracts/UserTokenContract.json";
//import UserWalletContract from "../../../../build/contracts/UserWalletContract.json";
//import UserBudgetContract from "../../../../build/contracts/UserBudgetContract.json";
//const { fromBech32 } = require("@harmony-js/crypto");

//var fs = require("fs");
export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      
    };
  },
  methods: {
    Login: async function() {
        const wallet = new OneWallet();
        await wallet.signin();
        await store.commit("setUserAddress", wallet.address);
        await store.commit("setUserWallet", wallet);
        store.commit("hasSignedIn", true);
        //await this.getUserContracts(wallet);
    },
    getUserContracts: async function() {
      
    },
    initializeContract: async function(contract, address) {
      const abi = contract.abi;
      const contractAddress = address;
      const contractInstance = hmy.contracts.createContract(
        abi,
        contractAddress
      );
      return contractInstance;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin-left: auto;
  margin-right: auto;
}
</style>
