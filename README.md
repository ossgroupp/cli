# OSSPIM CLI

[![Build Status](https://travis-ci.org/ossgroupp/osspim-cli.svg?branch=master)](https://travis-ci.org/ossgroupp/osspim-cli)

Bootstrap an app or instance running on the [headless ecommerce][1] and GraphQL
based [Product Information Management][2] service [OSSPIM][3].

## Usage

You'll need the following installed to use OSSPIM CLI:

- [Node.js][7] (>=12)

To create a new app using OSSPIM, simply run the following command:

```sh
npx @osspim/cli <project-name>
```

This will walk you through creating a project, allowing you to choose which
template and preferences you want to use.

### Show help

```sh
npx @osspim/cli --help
```

### Bootstrapping an instance

```sh
npx @osspim/cli --bootstrap-instance
```

or

```sh
npx @osspim/cli -b
```

This will bootstrap an existing instance with example data

### Templates

The default mode of the OSSPIM CLI is to use a template. Each template has
different options that can be chosen to configure the initial project to suit
your needs.

Current templates include:

- Complete Ecommerce (Next.js + React)
- Content & Commerce (Next.js + React)
- Gatsby (React)
- Nuxt (Vue.js)
- Service API (Node.js)
- React Native (beta)

## Contributing

If you'd like to help improve our CLI tool, check out the [contributing
guidelines][9] for an overview of the codebase and structure.

[1]: https://ossgroup.com/product
[2]: https://ossgroup.com/product/product-information-management
[3]: https://ossgroup.com/
[4]: https://github.com/ossgroupp/osspim-nextjs-boilerplate
[5]: https://github.com/ossgroupp/osspim-react-native-boilerplate
[6]: https://github.com/ossgroupp/osspim-flutter-boilerplate
[7]: https://nodejs.org
[9]:
  https://github.com/ossgroupp/osspim-cli/blob/master/CONTRIBUTING.md
# cli
