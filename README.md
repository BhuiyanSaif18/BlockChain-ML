# BlockChain-ML

## Fresh Installation 
Run $ ./fresh-install-requirement.sh 

* if you dont have permission to execute the script try running $ chmod 777 fresh-install-requirement.sh 

## Already installed environment

check the go version by running

$ go version

If you see error after you have installed the requirement previously try adding the paths for the go

$ export GOROOT=/usr/local/go-1.13
$ export PATH=$GOROOT/bin:$PATH

## Bring up the network by running 

$ ./startFabric.sh

Wait for few moments as the network is bringing up with chaincode and channel.

navigate to express-app/myapp

$ cd express-app/myapp

$ npm install

$ npm start
