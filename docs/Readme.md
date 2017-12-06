<h1 align="center">
  <img width="200px" src="/docs/images/midna.png_large"/>
  <br/>midna
</h1>

<p align="center">
  <a href="https://github.com/standard/standard"><img src="https://img.shields.io/badge/Code_style-Standard-green.svg?style=for-the-badge" alt="Standard"></a>
  <a href="#"><img src="https://img.shields.io/badge/Version-0.1.3-blue.svg?style=for-the-badge" alt="Version"></a>
  <a href="https://t.me/midnabot"><img src="https://img.shields.io/badge/Telegram-midnabot-blue.svg?style=for-the-badge" alt="Telegram"></a>
  <a href="https://www.gitcheese.com/donate/users/22490354/repos/113030252"><img src="https://img.shields.io/badge/Gitcheese-Donate-red.svg?style=for-the-badge" alt="Donate"></a>
</p>

<br/>

## Sandbox - [gf3/sandbox](https://github.com/gf3/sandbox)

Execute JavaScript code
```
/sandbox ```console.log('Hello world')```
```

## Roll - [troygoode/node-roll](https://github.com/troygoode/node-roll)

Roll dices
```
/roll 2d10
```

## Development

Clone the repository
```bash
$ git clone https://github.com/wsknorth/midna.git && cd midna
```

Install dependencies
```bash
$ npm install
```

Edit the configuration file
```bash
$ cp lib/configs/configs.sample.json lib/configs/configs.json
$ vi lib/configs/configs.json
```

Run
```bash
$ npm start
```

## Production

Copy `midna.service` in `/etc/systemd/system`
```bash
$ sudo cp midna.service /etc/systemd/system/midna.service
```

Create midna user
```bash
$ sudo useradd -r -s /bin/bash -G midna midna
```

Enable
```bash
$ sudo systemctl enable midna
```

Start
```bash
$ sudo systemctl start midna
```

Stop
```bash
$ sudo systemctl stop midna
```

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wsknorth/midna/tags).

## Author
Sabato Luca "[wsknorth](https://github.com/wsknorth)" Guadagno

## License
This project is licensed under the MIT License - see the [License](License.md) file for details
