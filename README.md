# Mapcraft API

Develop your own plugin for Mapcraft with all the necessary tools.

- Access to all Mapcraft features
- Easy-to-use API

## Installation
1. Get the latest version of Mapcraft
```bash
git clone https://github.com/mapcraft-app/api.git
```

2. Install latest version of api
```bash
npm install mapcraft-api

or

yarn add mapcraft-api
```

## Usage

```js
const { Mapcraft, MCdatabase, MCeditor, MCfs, MCipc, MClink, MClog, MCplugin, MCshell, MCtemplate, MCutilities, MCwindow, MCworkInProgress } = require('mapcraft-api');
```

# CLI

Mapcraft has a cli that allows you to simplify the creation and packaging of your plugin
```sh
npm run mapcraft [create|package|version|help]
```

# Documentation

- [API documentation](https://documentation.mapcraft.app)

# License

[GPL-3.0](./LICENSE)
