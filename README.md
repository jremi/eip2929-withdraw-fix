# Smart Contract Withdraw Fix

## Fix eip 2929 with eip 2930

After the berlin hardfork [eip 2929](https://eips.ethereum.org/EIPS/eip-2929) was added which increased the cost for state access opcodes. This broke any contract which used `address.transfer(eth)` to gnosis safes because the hard-coded `2300 gas` was no longer enough to execute the transaction. In order to help contracts that were affected they made [eip 2930](https://eips.ethereum.org/EIPS/eip-2930) which adds an access list to the transaction. Any address added to this access list has gas prepaid on their behalf as part of the total gas calculation. This reduces the gas required when interacting with them which allows the original `2300 gas` to succeed.

> Note: Apparently this only works with [ethers](https://docs.ethers.io/) at the moment.

For our situation we needed to run `withdraw()` on our smart contract that would allow the transfer to several external payable accounts and one gnosis safe account.

Look at [./src/withdraw.js](./src/withdraw.js) for a complete example.

**NOTE:** You must set `./src/wallet.txt` with your projects smart contract owner account 12 word seed phrase mnemonic to make the `withdraw.js` script authorize the transaction.

> Original source was taken from https://github.com/folia-app/eip-2929


# More Setup Info


Step 1: 
> Modify the `src/wallet.txt` with your 12 word seed phrase for the smart contract owner account.

Step 2: 
> Modify the `src/YourSmartContractAbi.json` example file and replace the `abi` array with your smart contracts abi array data.

Step 3:
> Modify the `src/withdraw.js` line 12 `<YOUR_INFURA_PROJECT_ID>` with your Infura project id.

Step 4:
> Modify the `src/withdraw.js` line 17 `<YOUR_SMART_CONTRACT_ADDRESS>` with your smart contract address.

Step 5:
> Go to the main root of the project folder `/` and run `npm i` to install dependenices.

Step 6:
> Inside main root of project folder `/` run `npm run` this will run the `node src/withdraw.js` and attempt to perform a withdrawal from your smart contract.

NOTE: Line 39 is assuming your smart contract has a method called `withdraw()`. This is usually standard, but if your smart contract has a different name for this withdraw method then you must also change the name on this line.

When the above steps are done this will attempt to utilize the overrides object. This uses an updated `accessList` which is needed to properly handle the gas limit when dealing with Gnosis safe wallets.