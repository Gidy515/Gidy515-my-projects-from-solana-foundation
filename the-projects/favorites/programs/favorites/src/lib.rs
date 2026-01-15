use anchor_lang::prelude::*;

declare_id!("GqynwMx1iFYPxbLKKLa5geYah1tkj5EHDRw7Ynq8ZAn5");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
