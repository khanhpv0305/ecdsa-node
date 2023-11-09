const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { secp256k1 } = require('ethereum-cryptography/secp256k1');
const { utf8ToBytes } = require('ethereum-cryptography/utils');
const { sha256 } = require('ethereum-cryptography/sha256');

app.use(cors());
app.use(express.json());


const balances = {
  "0271f71f626aa96b75aca9ed9ae44dc8eba6409d54a8e16b4cd08a15066b419d1b": 100,
  "037de7befad2e7939b2995b2ded3e32ab0c0feb1c6e45302f8302a377ac22e0d06": 50,
  "028bf14b14bffbc1376380687bee2fa439e387a6cdf3dba81229bc4f4557e406f0": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {
    txData,
    signatureHex,
    recoveryBit,
  } = req.body;
  const { sender, recipient, amount } = txData
  const messageBytes = utf8ToBytes(JSON.stringify(txData))
  const messageHash = sha256(messageBytes)
  const isValidSender = validateSender(sender, signatureHex, recoveryBit, messageHash)

  if (!isValidSender) {
    res.status(400).send({ message: 'Invalid sender' })
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function validateSender(senderAddress, signatureHex, recoveryBit, messageHash) {
  const signature = secp256k1.Signature.fromCompact(signatureHex).addRecoveryBit(recoveryBit)
  const recoveredPublicKey = signature.recoverPublicKey(messageHash).toHex()

  return senderAddress === recoveredPublicKey
}

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
