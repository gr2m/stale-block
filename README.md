# Stale Block

> A [GitHub Block](https://blocks.githubnext.com/) for the [Stale Action](https://github.com/actions/stale).

## Usage

1. Create a stale workflow in your repository if you haven't yet. The workflow file name should include the word `stale`, e.g. `.github/workflows.stale.yml`.
2. Open the stale workflow file in your browser, e.g. `https://github.com/gr2m/stale-block/blob/main/.github/workflows/stale.yml`
3. Replace `github.com` with `https://blocks.githubnext.com`, e.g. `https://blocks.githubnext.com/gr2m/stale-block/blob/main/.github/workflows/stale.yml`
4. Click on the `Stale` block in the block picker

## Preview

<img width="840" alt="image" src="https://user-images.githubusercontent.com/39992/227629715-1e739a60-797e-4eee-b255-5e09a1023f44.png">

## Status

This Block is work in progress. Here is the status of [stale option](https://github.com/actions/stale#all-options) that are implemented

- [x] schedule
- [x] repo-token
- [x] stale-issue-message
- [x] stale-pr-message
- [x] close-issue-message
- [x] close-pr-message
- [x] days-before-stale
- [ ] days-before-issue-stale
- [ ] days-before-pr-stale
- [x] days-before-close
- [ ] days-before-issue-close
- [ ] days-before-pr-close
- [ ] stale-issue-label
- [ ] close-issue-label
- [ ] exempt-issue-labels
- [ ] close-issue-reason
- [ ] stale-pr-label
- [ ] close-pr-label
- [ ] exempt-pr-labels
- [ ] exempt-milestones
- [ ] exempt-issue-milestones
- [ ] exempt-pr-milestones
- [ ] exempt-all-milestones
- [ ] exempt-all-issue-milestones
- [ ] exempt-all-pr-milestones
- [ ] only-labels
- [ ] any-of-labels
- [ ] any-of-issue-labels
- [ ] any-of-pr-labels
- [ ] only-issue-labels
- [ ] only-pr-labels
- [ ] operations-per-run
- [ ] remove-stale-when-updated
- [ ] remove-issue-stale-when-updated
- [ ] remove-pr-stale-when-updated
- [ ] debug-only
- [ ] delete-branch
- [ ] start-date
- [ ] exempt-assignees
- [ ] exempt-issue-assignees
- [ ] exempt-pr-assignees
- [ ] exempt-all-assignees
- [ ] exempt-all-issue-assignees
- [ ] exempt-all-pr-assignees
- [ ] exempt-draft-pr
- [ ] enable-statistics
- [ ] labels-to-add-when-unstale
- [ ] labels-to-remove-when-stale
- [ ] labels-to-remove-when-unstale
- [ ] ignore-updates
- [ ] ignore-issue-updates
- [ ] ignore-pr-updates
- [ ] include-only-assigned

## Local Development

> 🛑 Currently, you must be flagged into the [GitHub Blocks Technical Preview](https://blocks.githubnext.com) in order to develop blocks. There is no "offline" development mode at this time.

```bash
npm install
npm start # start the dev server
```

When you visit [localhost:4000](https://localhost:4000) in your browser, you'll be
redirected to the Blocks app, but your locally-developed blocks will appear in the block picker:

<img alt="Block picker" src="https://user-images.githubusercontent.com/56439/181648955-101b6567-3f9b-44b3-af99-7ef3ca6161b9.png" width="418" />

(if you're using Safari (or another browser that doesn't permit calling `http` URLs from an `https` page), run `npm run start-https` and visit [https://localhost:4000](https://localhost:4000) instead.)

## Under the hood

[GitHub Blocks](https://blocks.githubnext.com/) are [React](https://reactjs.org/) components. They have a well-defined contract with their surroundings, and receive a [fixed set of props](https://github.com/githubnext/blocks/blob/main/docs/Developing%20blocks/4%20API%20reference%20and%20types.md) when they are instantiated. They are developed in [TypeScript](https://www.typescriptlang.org/), and bundled with [Vite](https://vitejs.dev/).

## License

[ISC](LICENSE.md)
