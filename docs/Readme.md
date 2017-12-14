<h1 align="center">
  <img width="250px" src="/docs/images/midna.png_large"/><br/>
</h1>

<p align="center">
  <a href="https://github.com/standard/standard"><img src="https://img.shields.io/badge/Code_style-Standard-green.svg?style=for-the-badge" alt="Standard"></a>
  <a href="https://github.com/wsknorth/midna/releases"><img src="https://img.shields.io/badge/Version-0.2.1-orange.svg?style=for-the-badge" alt="Version"></a>
  <a href="/docs/License.md"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License"></a>
  <a href="https://t.me/midnabot"><img src="https://img.shields.io/badge/Telegram-midnabot-blue.svg?style=for-the-badge" alt="Telegram"></a>
  <a href="https://www.gitcheese.com/donate/users/22490354/repos/113030252"><img src="https://img.shields.io/badge/Gitcheese-Donate-red.svg?style=for-the-badge" alt="Donate"></a>
</p>

<br/>

## Midnabot
[Midnabot](https://t.me/midnabot) is an open source telegram bot, written in [nodejs](https://nodejs.org/it/) and [telegraf](https://github.com/telegraf/telegraf). You can start using it by searching `Midnabot` on telegram or following the link on the telegram budge above. If you want to contribute or just run your own instance you can follow the [contributing](/docs/Contributing.md) guide.

## Commands

### Start
```
/start
```
Enable bot

### Stop
```
/stop
```
Disable bot

### Sandbox
```
/sandbox ```console.log('Hello world')```
```
Execute javascript code.
The `/sandbox` command use [gf3/sandbox](https://github.com/gf3/sandbox) to work.

### Roll
```
/roll 2d10
```
Roll dices.
The `/roll` command use [troygoode/node-roll](https://github.com/troygoode/node-roll) to work.

### About
```
/about
```
Show information about midnabot
