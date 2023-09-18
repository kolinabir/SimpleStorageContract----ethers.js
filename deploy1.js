const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("deplpyingggg waittttt");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Adress  :${contract.address} `);
  const currentFavNum = await contract.retrive();
  console.log(currentFavNum.toString());
  const storeFavNum = await contract.store("20");
  const transectionReceipt = await storeFavNum.wait(1);
  const currentFavNum1 = await contract.retrive();
  console.log(currentFavNum1.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
