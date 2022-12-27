FROM rust:bullseye AS base

WORKDIR /ipfs-pinner
RUN cargo init
COPY Cargo.toml Cargo.toml
RUN cargo fetch
COPY src src
COPY abis abis
COPY build.rs build.rs
RUN cargo build --release --offline

FROM debian:bullseye-slim AS runner
COPY --from=base /ipfs-pinner/target/release/ipfs-pinner /ipfs-pinner

ENV IPFS_API_ENDPOINT=
ENV WS_RPC_ENDPOINT=

CMD ["/ipfs-pinner"]