use anchor_lang::prelude::*;

declare_id!("GqynwMx1iFYPxbLKKLa5geYah1tkj5EHDRw7Ynq8ZAn5");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[program]
pub mod favorites {
    use super::*;
    pub fn set_favorites(
        context: Context<SetFavorites>, 
        number: u64, 
        fruit: String, 
        hobbies: Vec<String>
    ) -> Result<()> {
        msg!("Greetings from {}", context.program_id);

        let user_public_key = context.accounts.user.key();

        msg!("User {user_public_key}'s favorite number is {number}, his favorite fruit is {fruit} and hobbies are {hobbies:?}");

        context.accounts.favorites.set_inner( Favorites {
            number,
            fruit,
            hobbies,
        });
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Favorites {
    pub number: u64,

    #[max_len(50)]
    pub fruit: String,

    #[max_len(5, 50)] // Max 5 hobbies, each max 50 characters
    pub hobbies: Vec<String>,
}

#[derive(Accounts)]
pub struct SetFavorites <'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump
    )]
    pub favorites: Account<'info, Favorites>,

    pub system_program: Program<'info, System>,
}
