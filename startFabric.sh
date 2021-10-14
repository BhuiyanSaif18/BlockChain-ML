#!/bin/bash
#
# Copyright IBM Corp All Rights Reserved
#
# SPDX-License-Identifier: Apache-2.0
#
# Exit on first error
set -e

# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
starttime=$(date +%s)
CC_SRC_LANGUAGE=${1:-"go"}
CC_SRC_LANGUAGE=`echo "$CC_SRC_LANGUAGE" | tr [:upper:] [:lower:]`

if [ "$CC_SRC_LANGUAGE" = "go" -o "$CC_SRC_LANGUAGE" = "golang" ] ; then
	CC_SRC_PATH="chaincode/fabcar/go/"
else
	echo The chaincode language ${CC_SRC_LANGUAGE} is not supported by this script
	echo Supported chaincode languages are: go, java, javascript, and typescript
	exit 1
fi

# clean out any old identites in the wallets
rm -rf express-app/myapp/wallet/*
rm -rf express-app/myapp/wallet2/*

# launch network; create channel and join peer to channel
# pushd ../test-network
./network.sh down
./network.sh up createChannel -ca -s couchdb
# ./network.sh up createChannel -ca -s couchdb
sleep 10
# ./network.sh createChannel
sleep 10
./network.sh deployCC -ccn fabcar -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}

sleep 10

adminPrivateKeyOrg1MSP=$(ls organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/)
adminPrivateKeyOrg2MSP=$(ls organizations/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/)

adminPrivateKeyOrg1MSPPath='asdasd'
adminPrivateKeyOrg2MSPPath=$"/tmp/crypto/peerOrganizations/org2.example.com/users/User1@org2.example.com/msp/keystore/$adminPrivateKeyOrg2MSP"


mv connection-profile/test-network.json connection-profile/temp.json
jq -r ".organizations.Org1MSP.adminPrivateKey.path |= '$adminPrivateKeyOrg1MSPPath'" connection-profile/temp.json > connection-profile/test-network.json
rm connection-profile/temp.json


jq .organizations.Org1MSP.adminPrivateKey.path = adminPrivateKeyOrg1MSPPath connection-profile/test-network.json 
jq .organizations.Org2MSP.adminPrivateKey.path = adminPrivateKeyOrg2MSPPath connection-profile/test-network.json 
# jq '.key1 = "new-value1"'
# jq '.key1 = "new-value1"'
# docker stack deploy --compose-file docker/docker-compose-test-net.yaml ml
# popd test-network

cat <<EOF

EOF
