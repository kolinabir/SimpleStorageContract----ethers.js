const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "0x103363ca4d48a8759409a1899af1315a2ed52fdaa38df42403fd53d6ab2502d8",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deplpoyingh, wait ....");
  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deployTransaction.wait(1);

  const currentFavNum = await contract.retrive();
  console.log("current fav no: " + currentFavNum.toString());
  const transectionResponse = await contract.store("7");
  const transectionReceipt = await transectionResponse.wait(1);
  const updatedFavNum = await contract.retrive();
  console.log("Updated fav no: " + updatedFavNum.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
