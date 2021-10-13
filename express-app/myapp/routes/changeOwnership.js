
'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

module.exports.changeOwnership = async function(res){

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
        //console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            //console.log('Run the registerUser.js application before retrying');
            identity = await registerUser.registerUser1();
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
        await contract.submitTransaction('ChangeCarOwner', 'CAR1', 'Saif'+getRandomInt(100000));
        console.log('Transaction has been submitted');
        // Disconnect from the gateway.
        await gateway.disconnect();
        res.send(200);

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.send(500);
    }
}
