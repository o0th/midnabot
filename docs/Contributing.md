# Contributing
This guide is for everyone who want to contribute (see [development](#development)) or who want to run a personal instance of Midnabot (see [production](#production)). If you need help or you want to report a bug, just open an [issue](https://github.com/wsknorth/midnabot/issues).

## Code Style
[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency,
and to avoid style arguments. `npm test` runs `standard` automatically, so you don't have
to!

[standard-image]: https://cdn.rawgit.com/standard/standard/master/badge.svg
[standard-url]: https://github.com/standard/standard


## Installation
Clone the repository
```bash
$ git clone https://github.com/wsknorth/midnabot.git
```
Install the dependencies
```bash
$ cd midnabot && npm install
```
Edit the configuration file
```bash
$ cp lib/configs/configs.sample.json lib/configs/configs.json
$ vi lib/configs/configs.json
```
As you can see in the `lib/configs/configs.sample.json` there are two main section: `development` and `production` where you can configure two different bot. In this way you can have your main bot in production always running and during the development you can use a different one. Another reason between the two is that the `development` bot will use the polling mode meanwhile the `production` bot will use the webhook mode.

## Development
Before we run the bot we need to check the `.env` file. For the `development` mode it will be
```
NODE_ENV=development
DEBUG=Midnabot:*
```

Run
```bash
$ npm start
```

## Production
Before we run the bot we need to check the `.env` file. For the `production` mode it will be
```
NODE_ENV=production
DEBUG=midnabot*
DEBUG_COLORS=false
DEBUG_HIDE_DATE=true
```

Since I've an arch based server i wrote a `midnabot.service` file so we can manage the bot with `systemctl`. We just need to copy this file in `/etc/systemd/system`.
```bash
$ sudo cp midnabot.service /etc/systemd/system/midnabot.service
```

Usually for each application I've a user and a group named as the app, you can skip this modifying `midnabot.service`
```bash
$ sudo useradd -r -s /bin/bash -G midnabot midnabot
```

Enable our service.
```bash
$ sudo systemctl enable midnabot
```

Possible commands: `start`, `stop`, `restart`
```bash
$ sudo systemctl <command> midnabot
```

Logs
```bash
$ sudo journalctl -u midnabot
```
