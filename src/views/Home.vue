<template>
  <v-app id="Home">

    <div v-if="loggedIn">
      <v-app-bar app fixed class="white bars lighten-1">
        <v-toolbar-title
          >TokenTruth
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="error" v-on:click="logout">logout</v-btn>
      </v-app-bar>

      <v-main relative >
        <!--  -->
        <div v-if="isloaded">
        <v-container >hello<v-btn @click="getProposedTokenList()">hello</v-btn> </v-container>
        <v-container>
          <v-row>
          <div v-for="items in propTokens" v-bind:key="items.key"> <v-col cols="4" md="40" sm="4">{{items.name}}    </v-col></div>
</v-row>
          <v-card >
           
          <v-card> 

          {{items}}</v-card>

        </v-card></v-container>
    
        </div>
      </v-main>
    </div>

    <v-container class="logincard" v-if="!loggedIn">
      <v-container>
        <v-row align="center" justify="center" style="height:95vh">
          <v-col
            cols="12"
            lg="4"
            md="4"
            class="white lighten-2 fill-height d-flex flex-column justify-center align-center"
          >
            <v-card class="elevation-6 rounded-xl" height="500">
              <v-card-text>
                <center>
                  <h1>TokenTruth</h1>
                  <br /><br /><br /><br /><br /><br />
                </center>
                <v-divider
                  class=" d-flex fill-height justify-center align-center"
                ></v-divider>
                <br /><br />
                <center><Login /></center>
                <br /><br />
                <v-divider
                  class=" d-flex fill-height justify-center align-center"
                ></v-divider>
               
                <br />
               
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-app>
</template>

<script>
import Login from "../components/login.vue";
import store from "../store";
import TokenTruthContract from "../../build/contracts/TokenTruth.json";
import TokenProposalContract from "../../build/contracts/ProposeToken.json";
import OneWallet from "../javascript/OneWallet.js";
import hmy from "../javascript/hmy"
//import MoonDust from "../../../../build/contracts/MoonDust.json";
//const { fromBech32 } = require("@harmony-js/crypto");

export default {
  name: "Home",

  components: {
    Login,
  },
  props: {},
  methods: {
    logout: async function() {
      await window.onewallet.forgetIdentity();
      store.commit("hasSignedIn", false);
    },
    getProposedTokenList: async function(){
     // const zeroxAddr = fromBech32(store.state.address);
     const wallet = new OneWallet();
     await wallet.signin();
      const unattachedContract = await this.initializeContract(
        TokenTruthContract,
        store.state.TokenTruthAddress
      );

      const contract = wallet.attachToContract(unattachedContract);
      const TokenProposals = await contract.methods
        .get_all_proposals()
        .call();
      console.log(TokenProposals);

      var i = 0;

      while (i < TokenProposals.length){
        const unattachedContracts = await this.initializeContract(
          TokenProposalContract,
          TokenProposals[i]
        );

        const contracts = wallet.attachToContract(unattachedContracts);
        const TokenProposalss = await contracts.methods
          .getTokenDetails()
          .call();
        console.log(TokenProposalss);
        this.propTokens.push({
          address: TokenProposalss[0],
          name: TokenProposalss[1],
          symbol: TokenProposalss[2],
          decimal: TokenProposalss[3],
          image : TokenProposalss[4]
        })


        i++
      }
      console.log(i);

      this.isLoaded = true;
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
  },

  data() {
    return {
      propTokens: [],
      isloaded: false,
    };
  },
    created: async function() {
  this.getProposedTokenList();


  },
  computed: {
    // a computed getter
    loggedIn: function() {
      // `this` points to the vm instance
      return store.state.signedIn;
    }
  }
};
</script>

<style type="text/css"></style>