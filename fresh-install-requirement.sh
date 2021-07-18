sudo apt-get update


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt-get update

sudo apt-get install docker-ce

sudo apt-get update

sudo curl -L https://github.com/docker/compose/releases/download/1.20.1/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker $USER

docker version

docker-compose version

wget https://dl.google.com/go/go1.13.9.linux-amd64.tar.gz

tar xf go1.13.9.linux-amd64.tar.gz

sudo mv go /usr/local/go-1.13

export GOROOT=/usr/local/go-1.13
export PATH=$GOROOT/bin:$PATH

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"    
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

nvm --version

nvm install 10.15.3

logout

curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.3 1.5.0


# In case of make fail
# apt-get install -y build-essential