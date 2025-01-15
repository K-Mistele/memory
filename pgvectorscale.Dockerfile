FROM pgvector/pgvector:pg16

# install prerequisites
## rust
RUN apt-get update
RUN apt-get install -y build-essential curl git jq make gcc pkg-config clang postgresql-server-dev-16 libssl-dev
RUN apt-get update

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

RUN echo 'source $HOME/.cargo/env' >> $HOME/.bashrc

SHELL ["/bin/bash", "-l", "-c"]

#download, build and install pgvectorscale
WORKDIR /opt
RUN git clone https://github.com/timescale/pgvectorscale
WORKDIR /opt/pgvectorscale/pgvectorscale

# this will also install it into postgres
RUN bash -c "cargo install --locked cargo-pgrx --version $(cargo metadata --format-version 1 | jq -r '.packages[] | select(.name == "pgrx") | .version') && \
    cargo pgrx init --pg16 pg_config && \
    cargo pgrx install --release"
