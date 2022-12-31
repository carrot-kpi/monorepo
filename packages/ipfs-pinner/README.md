# Carrot KPI IPFS pinner

This package implements a daemon in Rust that listens for template
creation/specification update/upgrade events from template managers and KPI
token creation events from the factory contract, extracts the specifications
CIDs, and pins them to a local IPFS node.

The package has been developed with a double utility in mind: it can either be
used "standalone" with a local IPFS node set up to serve files to the internet
in order to have an "official" Carrot IPFS node where high availability for
Carrot-related files is guaranteed, or it can be used by people wishing to make
Carrot more resilient, simply running the program on their Dappnode (by simply
installing the Dappnode package), helping to pin files in a more decentralized
way.

## Getting started

The package is developed using Rust, so in order to do anything it's necessary
to install the Rust toolchain on your machine.

In order to simply run the pinner in a sort of "dev" environment locally you
need a `.env` file at the root of the package in the format of `.env.example`.
These are the required envs:

- `WS_RPC_ENDPOINT`: as the name says, a websocket RPC endpoint to a chain that
  is supported by Carrot. The currently supported chains at the time of writing
  are _Sepolia_ and _Goerli_, but the daemon performs a chain id check before
  starting up, so you can be sure you're not pinning CIDs on an unsupported
  chain.
- `IPFS_API_ENDPOINT`: an endpoint to an IPFS API where the CIDs indexed from
  events will be pinned.

After you have the `.env` file you can just compile (if needed) and start up the
daemon by executing:

```
cargo run --features dotenv
```

If the envs were set correctly, at this point you should see the daemon running.

## Building a release binary

Building a release (i.e. optimized) binary is simple, simply run:

```
cargo build --release
```

By default, the binary is placed under `/target/release/ipfs-pinner` at the root
of the monorepo. You can run this program as a standalone binary provided you
have set the env variables described in the getting started section.

## Building the Dappnode package

TODO
