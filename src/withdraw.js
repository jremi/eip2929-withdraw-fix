async function run() {
  try {
    const { readFileSync } = require("fs");
    const MAINNET_MNEMONIC = readFileSync(`${__dirname}/wallet.txt`, "utf-8");
    const { ethers } = require("ethers");
    const SmartContract = require(`${__dirname}/YourSmartContractAbi.json`);

    let contract = SmartContract.abi;

    const network = "homestead";
    const provider = ethers.getDefaultProvider(network, {
      infura: "<YOUR_INFURA_PROJECT_ID>", // e.g: 3bac4b7e5b78418088b4ab8f6a01f5e2
    });
    wallet = new ethers.Wallet.fromMnemonic(MAINNET_MNEMONIC);
    wallet = wallet.connect(provider);
    contract = new ethers.Contract(
      "<YOUR_SMART_CONTRACT_ADDRESS>", // e.g:  0xEC93B82dFe6e21B2f309c926FEC865a66bF6DB51
      contract,
      wallet
    );

    overrides = {
      gasLimit: 1500000,
      gasPrice: ethers.utils.parseUnits("250", "gwei").toString(),
      type: 1,
      accessList: [
        {
          address: "0x915FD7751dBbD3d4E8b359D5b99486941636c12f", // safe proxy
          storageKeys: [
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          ],
        },
        {
          address: "0xd9Db270c1B5E3Bd161E8c8503c55cEABeE709552", // gnosis safe master address
          storageKeys: [],
        },
      ],
    };
    const endWithdrawTx = await contract.withdraw(overrides);
    const resolved = await endWithdrawTx.wait();
    console.log(resolved);
    process.exit();
  } catch (e) {
    console.log(e.message);
  }
}

run();
