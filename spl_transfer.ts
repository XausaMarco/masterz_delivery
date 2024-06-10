import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
 } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("3xR1xHXVjtKeMEuUxv7ZtTpEBPEj361DovpTGBZTpAsY"); //mint address
const fromAta = new PublicKey("3khcJaDMxQ2nbkcedyZxT2eg8MdivrehSNXaqSbpgyeR"); //tokenAccount where the tokens have been minted

const to = Keypair.generate(); //generate a new wallet where the tokens will be sent
console.log("To: ", to.publicKey.toBase58());

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    ); //get the tokenAccount related to that mint or create one if it doesn't exists
    //there can be multiple token accounts related to a wallet, each one is associated to a specific token

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amountToAta = tokenAccount.amount;
    console.log("Amount in ATA: ", amountToAta.toString());

    const amount = 10e5;

    await transfer(
        connection,
        keypair, //who pays the transaction
        fromAta, //from
        toAta, //to
        keypair, //from owner
        amount //how many tokens
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})()