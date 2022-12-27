use std::fs::remove_dir_all;
use std::path::Path;

use ethers::prelude::MultiAbigen;

const GENERATED_CONTRACTS_PATH: &str = "./src/contracts";

fn main() -> eyre::Result<()> {
    println!("cargo:rerun-if-changed=./abis");
    println!("cargo:rerun-if-changed=./src/contracts");

    if Path::new(GENERATED_CONTRACTS_PATH)
        .try_exists()
        .expect("could not check if generated contract directory exists")
    {
        remove_dir_all(GENERATED_CONTRACTS_PATH)
            .expect("could not delete generated contracts directory");
    }

    MultiAbigen::from_json_files("./abis")
        .expect("nope")
        .build()
        .expect("yes")
        .write_to_module(GENERATED_CONTRACTS_PATH, false)
        .expect("could not write to module");

    Ok(())
}
