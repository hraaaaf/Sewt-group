# SEWT Group — source recovery

This is the **private** working repository intended for the SEWT Group Next.js website.

## Recovery status (2026-10-25)

- Vercel project: `sewt-group` (`prj_pUaGTLjSNjG8Yt0bsWeHhNSABI0e`).
- Latest observed Vercel production deployment: `dpl_62ZvGusNAYWeJQbDciV4StcfJQ3X` (June 2026), from the Vercel CLI.
- Original source-tree metadata is visible on Vercel, but the connected Vercel file-content tool returns **truncated data**; it cannot be used to reconstruct valid full files.
- **No recovered application source has been accepted as complete.** A partial import was removed from `main`.
- **Vercel production was not changed or redeployed.**

## Required to continue

Recover the complete original source directory from the computer or backup used to deploy through the Vercel CLI, or provide a verified source archive. Once available, import the original files, review secrets (never commit `.env`), install dependencies and run checks before any deployment.

Do **not** assume `vercel pull` downloads application source; it downloads project settings and environment configuration.

## Safety

No Vercel deployment without the owner's explicit authorization.
