---
title: "Install nodejs"
description: "How to install nodejs (v22)"
date: 2025-01-06 # YYYY-MM-DD
tags: ["markdown", "nodejs","nvm", "nodejs-22", "node"]
cover: "/images/nodejs.jpg" # make an actual header for this
---

# Install nodejs
Well installing nodejs is pretty simple. i think.
i will be going over 2 ways on how to install node and `nvm` install!

## Nvm install
NVM the prefered way to install node as its a version manager.
to start for all unix platforms (macos, linux, etc) run:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```
or
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
``` incase u dont have curl for some reason..
then you get to run this command to make sure you can add it to your path so you can _use it_
```
once your done the output should be something like this:
<!-- preview here -->
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```
Now then nvm is installed make sure you can actually use it by running `nvm --version` and you should see something like this:
```
#.#.#
```
_(the #'s are numbers)_
<!-- img preview here -->
Now to install node run `nvm install 22` and you should see something like this:
<!-- preview here -->

Tada! once you re-open shell you should have node & npm installed!

## Node install
if you just want to install it, no manager for some reason, you can run one of these commands:
```
brew install nodejs@22
```

```
sudo apt update
sudo apt install curl gnupg2 ca-certificates lsb-release
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs
```
```
sudo yum install curl gcc-c++ make
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install nodejs
```
(temp for this one)
```
docker pull node:22
docker run -it node:22
```
```
sudo pacman -S nodejs
```
should work on like _everything_ 
```
wget <magical url here>
tar -xvf node-v22.x.x-linux-x64.tar.xz
sudo cp -r node-v22.x.x-linux-x64/* /usr/local/
```

and then you should be able to run `node --version`.

## Conclusion
You have nodejs yipee!
Hope this helped you out!