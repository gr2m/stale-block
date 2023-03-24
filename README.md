# Stale Block

> A [GitHub Block](https://blocks.githubnext.com/) for the [Stale Action](https://github.com/actions/stale).

## Usage

1. Create a stale workflow in your repository if you haven't yet. The workflow file name should include the word `stale`, e.g. `.github/workflows.stale.yml`.
2. Open the stale workflow file in your browser, e.g. `https://github.com/gr2m/stale-block/blob/main/.github/workflows/stale.yml`
3. Replace `github.com` with `https://blocks.githubnext.com`, e.g. `https://blocks.githubnext.com/gr2m/stale-block/blob/main/.github/workflows/stale.yml`
4. Click on the `Stale` block in the block picker

## Preview

<img width="840" alt="image" src="https://user-images.githubusercontent.com/39992/227629715-1e739a60-797e-4eee-b255-5e09a1023f44.png">

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
