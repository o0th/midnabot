# Contributing

This guide is for everyone who want to contribute or who want to run a personal
instance of Midnabot. If you need help or you want to report a bug, just open
an issue.

## Code Style

[![standard][standard-image]][standard-url]

This repository uses [`standard`][standard-url] to maintain code style and consistency,
and to avoid style arguments. `npm test` runs `standard` automatically, so you don't have
to!

[standard-image]: https://cdn.rawgit.com/standard/standard/master/badge.svg
[standard-url]: https://github.com/standard/standard


### Development

Install dependencies
```bash
npm install
```

Create a `.env` file
```bash
PORT=<local port for the service>
TELEGRAM=<your telegram bot token>
```

Start
```bash
npm run dev
```

### Deployment

**Digitalocean app**

In the `infrastructures` directory is avaliable a `terraform` script for an
easy deployment on `digitalocean app`. Environment variables required are
listen in `infrastructures/main.tf` if you want to deploy on a different
service.

**Systemd**

First create a user and a group

```bash
sudo useradd -r -s /bin/bash -G midnabot midnabot
```

Copy the configuration file

```bash
sudo cp midnabot.service /etc/systemd/system/midnabot.service
```

Enable the service

```bash
sudo systemctl enable midnabot
```

Start the service

```bash
sudo systemctl start midnabot
```

Check logs

```bash
sudo journalctl -u midnabot
```

