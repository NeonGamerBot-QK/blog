---
title: "The one and only: Tor"
description: "Host your own onion site!"
date: 2025-01-05 # YYYY-MM-DD
tags: ["markdown", "tor", "onion", "no-cenosrship"]
cover: "/images/tor.jpg" # make an actual header for this
---

Welcome to one of my first _actual_ blog posts. So lets get to the point of this blog:
What is tor? why tor? what is onion? why onion?

## What is Tor?

If you didnt know what tor is already, its to complicated for me to explain tbh. So i recommend reading [What is Tor](https://support.torproject.org/about/what-is-tor/). to understand it better.

## Why Tor?

Tor being 100% anon means its safer and some people prefer onionsites over clearnet sites (non onion sites). See the diagram below for how onion sites actually work.
![diagram](/images/tor/diagram-onion.png)
_take from [this](https://medium.com/void-security/an-intro-to-the-onion-routing-tor-1482a44bfe8e) blog post_
ive also ran tests of my own to make sure onionsites cant get ip's as my tests return `127.0.0.1` for my onion site.

## What is an Onion Site?

oh yea i forgot to explain that.
An onion site also know as hidden service is pretty much hidding your site/services/ports behind an onion address.
With or without an outbound connection you can setup on anion site.

```
my-ip-here -> 8g7uthudtdiygnuyjgbeujfyrgbeujyfvrsujbf.onion
[i dont have an ip but im on the internet] -> hsuyjbfc8e7fyhe8urygfhyuzkjygfsbuskfr.onion
```

_fyi those are not real onion addresses_

Onion sites dont use ssl as the tor protocol encrypts the traffic!

### But ive heard onion sites are bad !!1!

Yeah there may be some _super shady_ parts to it such as "darkweb" but in countries with heavy censorship like china, iran etc. You can use tor bridges to get around the censorship.
There are also good onion sites for free and good access such as.

- [Dutch national police](http://tcecdnp2fhyxlcrjoyc2eimdjosr65hweut6y7r2u6b5y75yuvbkvfyd.onion/)
- [Duck Duck go](http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion)
- [CIA](http://ciadotgov4sjwlzihbbgxnqg3xiyrg7so2r2o3lt5wz5ypk4sxyjstad.onion)
- [Archive.is](http://archiveiya74codqgiixo33q62qlrqtkgmcitqx5u2oeqnmn5bpcbiyd.onion/)
- [new york times](https://www.nytimesn7cgmftshazwhfgzm37qxb44r64ytbb2dj3x62d2lljsciiyd.onion/)
- [bbc news](https://www.bbcnewsd73hkzno2ini43t4gblxvycyac5aw4gnv7t2rccijh7745uqd.onion/)

an1d many more.

## Setup your own onion site

well you should have your own! there are many benifits from it obviously.
you dont have an outbound ip and are hosting from a raspberry pi, setup your onion site and people with tor can easily access your site.
You want to host a site in general, giving it a .onion address is like a free domain (and secure)

### Server setup

Assuming you have some vps, device in ur basement, raspberry pi, or just your personal device you should most likely be able to install tor on it!
I would also recommend looking at [this](https://community.torproject.org/relay/community-resources/good-bad-isps/) list which contains some ISP's which dont like tor.. or just if your internet connection just blocks tor overall there may be some issues.

### Installing tor

anyways to install tor on ubuntu at least its:

```
apt install -y tor
```

you may find otherways to install tor for other distros [here](https://www.torproject.org/download/tor)
and wow tor is installed! now time to configure tor to run an onion site.
run `nano /etc/tor/torrc` and find the commented lines which have `HiddenServiceDir` and modify the content to:

```
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:80
```

this will make tor create a hidden service directory in `/var/lib/tor/hidden_service/` and will run a hidden service on port 80 on your local machine.
to get your onion address run `cat /var/lib/tor/hidden_service/hostname` and you should see something like:

```
8g7uthudtdiygnuyjgbeujfyrgbeujyfvrsujbf.onion
```

Now restart tor by running `systemctl restart tor`.
And now i should be abl- oh wait there is no site..

### Build the site w/ nginx + html

Well if you didnt know you will need nginx to handle the html because nginx is peak:P
nginx is a web server which can handle html and serve it to the internet.

to install nginx on ubuntu run:

```
sudo apt install nginx
```

installing on other distors is prob just `<pkg manager> <install> nginx`

Here is a config which should work.

```nginx
server {
  listen      80;
  server_name <your-onion-address>.onion;

  location / {
    html  /var/www/html;
    index index.html;
  }
}
```

once you have setup make sure you nginx works by checking its status with `sudo systemctl status nginx`

Then... check your onion site on tor and then tada! it works yayyy

## Conclusion

Tor and onion sites empower individuals to bypass censorship and protect their privacy. By hosting your own onion site, you contribute to a free and open internet for everyone.
Keep your site public, accessible, and censorship-resistant!
