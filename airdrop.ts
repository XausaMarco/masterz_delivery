import { 
    Keypair, 
    Connection, 
    LAMPORTS_PER_SOL 
} from "@solana/web3.js";

import wallet from "./wallet.json";


const keypair = Keypair.fromSecretKey(new Uint8Array(wallet)); //importing the wallet
const connection = new Connection("https://api.devnet.solana.com", "finalized"); //creating the connection to devnet 

(async () => {
    try {
        
        const airdropSignature = await connection.requestAirdrop(
            keypair.publicKey,      // address where the solana will be sent
            1 * LAMPORTS_PER_SOL    // SOL amount (1 SOL = 1_000_000_000 LAMPORTS)
        );

        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();
