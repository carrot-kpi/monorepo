use ethers::types::Address;

pub fn get_address_from_str(address: &str, error_message: Option<&str>) -> Address {
    address
        .parse::<Address>()
        .expect(error_message.unwrap_or("couldn't parse address"))
}
