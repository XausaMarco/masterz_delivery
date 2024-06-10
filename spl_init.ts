import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");


(async () => {

    const mint = await createMint(
        connection,
        keypair, //payer
        keypair.publicKey, //mintAuthority
        null, //no freezeAuthority
        6, //decimals -> when token is transferd remember this
    );


    //createds the token, not minted yet. To give a name need to use metadata on chain with metaplex or token2022

    console.log("Mint Address:", mint.toBase58());
})()