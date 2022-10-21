
# Install npm and global dependencies

**Node.js v19.x**:

##### Using Ubuntu
```sh
curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
sudo npm i -g typescript
npm completion | sudo tee /etc/bash_completion.d/npm

```

## Setup a new project

```sh
mkdir node-tutorial && cd node-tutorial
npm --init
tsc --init

npm i -D @types/node
```

....Coding....

## Building a project
tsc -b

## Running a project

node app.js