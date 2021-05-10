### midnabot

`midnabot` is a [telegram](https://telegram.org/) bot written in `JavaScript`
for the [`Node.js`](https://nodejs.org/en/) runtime version `>= 16`, it use the
[`telegraf`](https://github.com/telegraf/telegraf) framework and the
[`axios`](https://github.com/axios/axios) http client, both released under
the [MIT License](https://en.wikipedia.org/wiki/MIT_License). `midnabot`
is deployed on [`digitalocean`](https://www.digitalocean.com/)
[`app platform`](https://www.digitalocean.com/products/app-platform/) via
[`terraform`](https://www.terraform.io/) configuration files.

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

In the `infrastructures` directory is avaliable a `terraform` script for an
easy deployment on `digitalocean app`. Environment variables required are
listen in `infrastructures/main.tf` if you want to deploy on a different
service.

### Contribute

`midnabot` is an opensource project that runs on donations to pay the
cloud infrastructures where it runs. If you want to say thank you and/or
support the active development add a :star: to the project or donate a
:coffee:.

<a href="https://www.buymeacoffee.com/o0th"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=o0th&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>

