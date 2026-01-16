import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { SystemProgram } from "@solana/web3.js";

describe("favorites", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.favorites as Program<Favorites>;

  const user = provider.wallet; // main use of provider?

  let favoritesPda: anchor.web3.PublicKey; // what is the use of before(() => {}), why declare the variable before actually creating the account

  before(() => {
    [favoritesPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Successfully strores user's favorite things onchain", async () => {
    // Add your test here.
    const number = new anchor.BN(7);
    const fruit = "Apple";
    const hobbies = ["coding", "reading", "nature"];

    const tx = await program.methods
      .setFavorites(number, fruit, hobbies)
      .accountsPartial({
        user: user.publicKey,
        favorites: favoritesPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
  });
});

/*import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import { assert } from "chai";

describe("favorites", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Favorites as Program<Favorites>;
  const user = provider.wallet;

  let favoritesPda: anchor.web3.PublicKey;

  before(() => {
    [favoritesPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("favorites"), user.publicKey.toBuffer()],
      program.programId
    );
  });

  it("Stores user favorites on-chain", async () => {
    const number = new anchor.BN(7);
    const fruit = "Mango";
    const hobbies = ["coding", "reading", "gaming"];

    await program.methods
      .setFavorites(number, fruit, hobbies)
      .accountsPartial({
        user: user.publicKey,
        favorites: favoritesPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const favoritesAccount = await program.account.favorites.fetch(
      favoritesPda
    );

    assert.equal(favoritesAccount.number.toNumber(), 7);
    assert.equal(favoritesAccount.fruit, "Mango");
    assert.deepEqual(favoritesAccount.hobbies, hobbies);
  });
});*/
