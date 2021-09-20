# BlockChain-ML
This project aims to manage resources of a private blockchain network by minimizing and utilizing maximum resources needed for a service/container to run its nodes.
There are currently two tags for this project.
### V1.0.0
This release is used for running all the containers in a single pc.
### V2.0.0
This release is used for running all the containers in a single manager node and this release is compatible with docker swarm.

## Fresh Installation 
Run $ ./fresh-install-requirement.sh 

* if you dont have permission to execute the script try running $ chmod 755 fresh-install-requirement.sh 

## Already installed environment

check the go version by running

$ go version

If you see error after you have installed the requirement previously try adding the paths for the go

$ export GOROOT=/usr/local/go-1.13

$ export PATH=$GOROOT/bin:$PATH

## Bring up the network by running 

$ ./startFabric.sh

Wait for few moments as the network is bringing up with chaincode and channel. There may be error running the script. The error refers that the channel creation is failed or peer chaincode installation failed. The way to solve it to run the same script again if you face these errors.

navigate to express-app/myapp

$ cd express-app/myapp

$ npm install

$ npm start
