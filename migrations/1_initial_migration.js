const Migrations = artifacts.require("Migrations");
const TokenTruth = artifacts.require("TokenTruth");
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(TokenTruth);
};
