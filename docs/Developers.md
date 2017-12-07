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
