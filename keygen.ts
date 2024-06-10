import { Keypair } from "@solana/web3.js";


const keypair = Keypair.generate();


console.log(`generated wallet: ${keypair.publicKey.toBase58()} \nsave what follows in a json file: [${keypair.secretKey}]`);

