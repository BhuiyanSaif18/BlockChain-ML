
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

// const ccpPath = path.resolve(__dirname, '..','..','..', 'connection.json');
// const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
// const ccp = JSON.parse(ccpJSON);

// 'use strict';
// //

// var Fabric_Client = require('fabric-client');
// var path = require('path');
// var util = require('util');
// var os = require('os');
// var qs = require('querystring');
// var bcrypt = require('bcryptjs');
// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// var session = require('express-session');
// //var TransactionJS = require('./public/js/transaction.js')
// const saltRounds = 10;
// //
// var fabric_client = new Fabric_Client();

// // setup the fabric network
// var channel = fabric_client.newChannel('mychannel');
// var peer = fabric_client.newPeer('grpc://localhost:7051');
// var order = fabric_client.newOrderer('grpc://localhost:7050');
// //
// var member_user = null;
// var store_path = path.join(__dirname, '/../../hfc-key-store');
// console.log('Store path:'+store_path);
// var tx_id = null;

init();

function init() {
// 	channel.addPeer(peer);
//   channel.addOrderer(order);
}
var reciverUser = null;
var money = null;
var  responseChat;
var transactiondata;
var startbalance;
var endbalance;
var starttransaction;
var endtransaction;
module.exports.queryCar = async function(res){

    try {
        // load the network configuration
        //const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        //const ccpPath = path.resolve(__dirname,'..','..','..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath = path.resolve(__dirname, '..','..','..', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
	debugger;
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        res.send(200);
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
module.exports.createCar = async function(res){

    try {
        // load the network configuration
        //const ccpPath = path.resolve(__dirname,'..','..','..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccpPath = path.resolve(__dirname, '..','..','..', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        console.log(ccpPath);
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        console.log(walletPath);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        for(var i = 0 ; i< 5; i++){
            await contract.submitTransaction('createCar', 'CAR'+getRandomInt(1000), 'Saif'+getRandomInt(1000), 'Lesnar', 'Green', 'Liza');
            console.log('Transaction has been submitted');
        }
        // Disconnect from the gateway.
        await gateway.disconnect();
        module.exports.queryCar(res);

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
