# Smart Contract Withdraw Fix

## Fix eip 2929 with eip 2930

After the berlin hardfork [eip 2929](https://eips.ethereum.org/EIPS/eip-2929) was added which increased the cost for state access opcodes. This broke any contract which used `address.transfer(eth)` to gnosis safes because the hard-coded `2300 gas` was no longer enough to execute the transaction. In order to help contracts that were affected they made [eip 2930](https://eips.ethereum.org/EIPS/eip-2930) which adds an access list to the transaction. Any address added to this access list has gas prepaid on their behalf as part of the total gas calculation. This reduces the gas required when interacting with them which allows the original `2300 gas` to succeed.

> Note: Apparently this only works with [ethers](https://docs.ethers.io/) at the moment.

For our situation we needed to run `withdraw()` on our smart contract that would allow the transfer to several external payable accounts and one gnosis safe account.

Look at [./src/withdraw.js](./src/withdraw.js) for a complete example.

**NOTE:** You must set `./src/wallet.txt` with your projects smart contract owner account For example: `0xc61088C04186e68eA3E61D60F13DF15A2b2eC599` 12 word seed phrase mnemonic to make the `withdraw.js` script authorize the transaction.

> Original source was taken from https://github.com/folia-app/eip-2929
