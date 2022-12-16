# Contributing

Carrot v1 contracts are developed using Foundry, so in order to contribute you
need to first install Foundry locally. Check out
[this link](https://getfoundry.sh/) to easily install Foundry on your machine.
Make sure you periodically update Foundry to the latest version.

Foundry manages dependencies using git submodules, so it's advised to use
`git clone --recurse-submodules` when cloning the repo in order to have a
ready-to-go environment. If `git clone` was used without the
`--recurse-submodules` flag, you can just run
`git submodule update --init --recursive` in the cloned repo in order to easily
install the dependencies.

After having done the above, the environment should be ready to work with.

## Profiles

Profiles can be used in Foundry to specify different build configurations to
fine-tune the development process. Here we use 2 profiles:

- `test`: This profile pretty much skips all the optimizations and focuses on
  raw speed. As the name suggests, this is used to run all the available tests
  in a quick way, and without useless optimization.
- `production`: The production profile must be used when deploying contracts in
  production. This profile avhieves maximum optimization leveraging the new Yul
  IR optimizer made production-ready in solc version `0.8.13`, and also focuses
  on the production contracts, skipping compilation of the tests entirely.
  Depending on your machine, building with this profile can take some time.

All the profiles above are specified in the `foundry.toml` file at the root of
the project.

## Testing

Tests are written in Solidity and you can find them in the `tests` folder. Both
property-based fuzzing and standard unit tests are easily supported through the
use of Foundry.

In order to launch tests you can both use Forge commands directly or npm
scripts. For example, these are the available npm scripts:

- `test`: self explanatory, simply runs the tests.
- `test:gasreport`: runs the tests giving out a gas consumption report at the
  end.
- `test:coverage`: runs the tests giving out a coverage report at the end.

## Github Actions

The repository uses GH actions to setup CI to automatically run all the
available
[tests](https://github.com/carrot-kpi/contracts/blob/feature/v1-no-automation/.github/workflows/ci.yaml)
on each push.

## Pre-commit hooks

In order to reduce the ability to make mistakes to the minimum, pre-commit hooks
are enabled to both run all the available tests (through the same command used
in the GH actions) and to lint the commit message through `husky` and
`@commitlint/config-conventional`. Please have a look at the supported formats
by checking
[this](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
out.

### Deploying

In order to deploy the whole platform to a given network you can go ahead and
create a .env.<NETWORK_NAME> file exporting 3 env variables:

```
export PRIVATE_KEY=""
export RPC_ENDPOINT=""
export FEE_RECEIVER=""
```

brief explainer of the env variables:

- `PRIVATE_KEY`: the private key related to the account that will perform the
  deployment.
- `RPC_ENDPOINT`: the RPC endpoint that will be used to broadcast transactions.
  This will also determine the network where the deployment will happen.
- `FEE_RECEIVER`: the address of the fee receiver. This address will collect all
  the protocol fees.

Once you have one instance of this file for each network you're interested in
(e.g. .`env.goerli`, `.env.gnosis`, `env.mainnet` etc etc), you can go ahead and
locally load the env variables by executing `source .env.<NETWORK_NAME>`. After
doing that, you can finally execute the following command to initiate the
deployment:

```
forge script --broadcast --slow --private-key $PRIVATE_KEY --fork-url $RPC_ENDPOINT --sig 'run(address)' ./scripts/Deploy.sol $FEE_RECEIVER
```

Two alternative forms of the command can be used in order for the deployment to
be completed with either Trezor or Ledger hardware wallets (all the arguments
remain the same as above):

```
forge script --broadcast --slow --ledger --fork-url $RPC_ENDPOINT --sig 'run(address)' ./scripts/Deploy.sol $FEE_RECEIVER
forge script --broadcast --slow --trezor --fork-url $RPC_ENDPOINT --sig 'run(address)' ./scripts/Deploy.sol $FEE_RECEIVER
```

### Adding a template

In order to add a template on a given network create a .env.<NETWORK_NAME> file
exporting the following env variables:

```
export PRIVATE_KEY=""
export RPC_ENDPOINT=""
export TEMPLATES_MANAGER=""
export TEMPLATE=""
export SPECIFICATION=""
```

brief explainer of the env variables:

- `PRIVATE_KEY`: the private key related to the account that will perform the
  addition (must be the owner of the templates manager).
- `RPC_ENDPOINT`: the RPC endpoint that will be used to broadcast transactions.
  This will also determine the network where the deployment will happen.
- `TEMPLATES_MANAGER`: the address of the templates manager on the target
  network.
- `TEMPLATE`: the address of the template to be added.
- `SPECIFICATION`: cid of the template specification.

Once you have one instance of this file for each network you're interested in
(e.g. .`env.goerli`, `.env.gnosis`, `env.mainnet` etc etc), you can go ahead and
locally load the env variables by executing `source .env.<NETWORK_NAME>`. After
doing that, you can finally execute the following command to initiate the
deployment:

```
forge script --broadcast --slow --private-key $PRIVATE_KEY --fork-url $RPC_ENDPOINT --sig 'run(address,address,string)' ./scripts/AddTemplate.sol $TEMPLATES_MANAGER $TEMPLATE $SPECIFICATION
```

### Removing a template

In order to remove a template on a given network create a .env.<NETWORK_NAME>
file exporting the following env variables:

```
export PRIVATE_KEY=""
export RPC_ENDPOINT=""
export TEMPLATES_MANAGER=""
export REMOVED_TEMPLATE_ID=""
```

brief explainer of the env variables:

- `PRIVATE_KEY`: the private key related to the account that will perform the
  addition (must be the owner of the templates manager).
- `RPC_ENDPOINT`: the RPC endpoint that will be used to broadcast transactions.
  This will also determine the network where the deployment will happen.
- `TEMPLATES_MANAGER`: the address of the templates manager on the target
  network.
- `REMOVED_TEMPLATE_ID`: the id of the template to be removed.

Once you have one instance of this file for each network you're interested in
(e.g. .`env.goerli`, `.env.gnosis`, `env.mainnet` etc etc), you can go ahead and
locally load the env variables by executing `source .env.<NETWORK_NAME>`. After
doing that, you can finally execute the following command to initiate the
deployment:

```
forge script --broadcast --slow --private-key $PRIVATE_KEY --fork-url $RPC_ENDPOINT --sig 'run(address,uint256)' ./scripts/RemoveTemplate.sol $TEMPLATES_MANAGER $REMOVED_TEMPLATE_ID
```

### Updating a template specification

In order to update a template specification on a given network create a
.env.<NETWORK_NAME> file exporting the following env variables:

```
export PRIVATE_KEY=""
export RPC_ENDPOINT=""
export TEMPLATES_MANAGER=""
export TEMPLATE_ID=""
export NEW_SPECIFICATION=""
```

brief explainer of the env variables:

- `PRIVATE_KEY`: the private key related to the account that will perform the
  addition (must be the owner of the templates manager).
- `RPC_ENDPOINT`: the RPC endpoint that will be used to broadcast transactions.
  This will also determine the network where the deployment will happen.
- `TEMPLATES_MANAGER`: the address of the templates manager on the target
  network.
- `TEMPLATE_ID`: the id of the template to be updated.
- `NEW_SPECIFICATION`: cid of the new template specification.

Once you have one instance of this file for each network you're interested in
(e.g. .`env.goerli`, `.env.gnosis`, `env.mainnet` etc etc), you can go ahead and
locally load the env variables by executing `source .env.<NETWORK_NAME>`. After
doing that, you can finally execute the following command to initiate the
update:

```
forge script --broadcast --slow --private-key $PRIVATE_KEY --fork-url $RPC_ENDPOINT --sig 'run(address,uint256,string)' ./scripts/UpdateTemplateSpecification.sol $TEMPLATES_MANAGER $TEMPLATE_ID $NEW_SPECIFICATION
```

### Upgrading a template specification

In order to upgrade a template on a given network create a .env.<NETWORK_NAME>
file exporting the following env variables:

```
export PRIVATE_KEY=""
export RPC_ENDPOINT=""
export TEMPLATES_MANAGER=""
export UPGRADED_TEMPLATE_ID=""
export UPGRADED_TEMPLATE_ADDRESS=""
export UPGRADED_TEMPLATE_SPECIFICATION=""
```

brief explainer of the env variables:

- `PRIVATE_KEY`: the private key related to the account that will perform the
  addition (must be the owner of the templates manager).
- `RPC_ENDPOINT`: the RPC endpoint that will be used to broadcast transactions.
  This will also determine the network where the deployment will happen.
- `TEMPLATES_MANAGER`: the address of the templates manager on the target
  network.
- `UPGRADED_TEMPLATE_ID`: the id of the template to be upgraded.
- `UPGRADED_TEMPLATE_ADDRESS`: address of the new template contract.
- `UPGRADED_TEMPLATE_SPECIFICATION`: cid of the new template specification or
  the upgrade.

Once you have one instance of this file for each network you're interested in
(e.g. .`env.goerli`, `.env.gnosis`, `env.mainnet` etc etc), you can go ahead and
locally load the env variables by executing `source .env.<NETWORK_NAME>`. After
doing that, you can finally execute the following command to initiate the
upgrade:

```
forge script --broadcast --slow --private-key $PRIVATE_KEY --fork-url $RPC_ENDPOINT --sig 'run(address,uint256,address,string)' ./scripts/UpgradeTemplateSpecification.sol $TEMPLATES_MANAGER $UPGRADED_TEMPLATE_ID $UPGRADED_TEMPLATE_ADDRESS $UPGRADED_TEMPLATE_SPECIFICATION
```

### Addresses

"Official" deployments and addresses are generally tracked in the
`.addresses.json` file, even though it might be unreliable for testnets.
