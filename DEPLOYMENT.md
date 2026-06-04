# LaunchLens Deployment

LaunchLens is a static app. Deploy the `launchlens/` folder as the site root.

## Netlify

1. Create a new Netlify site from the `launchlens/` folder.
2. Build command: leave empty.
3. Publish directory: `.`.
4. After deploy, open the generated URL and confirm the app loads.
5. Add the URL to `SUBMISSION.md` and Project Wall.

The included `netlify.toml` already sets the publish directory and fallback route.

## Vercel

1. Import the repo into Vercel.
2. Set project root to `launchlens`.
3. Framework preset: Other.
4. Build command: leave empty.
5. Output directory: `.`.
6. Add the production URL to `SUBMISSION.md` and Project Wall.

## GitHub Pages

1. Push the repo to GitHub.
2. In repository settings, enable Pages.
3. Select the branch and `/launchlens` folder if available, or copy the contents of `launchlens/` to a `docs/` folder.
4. Add the Pages URL to `SUBMISSION.md` and Project Wall.

## Local validation

```bash
cd launchlens
node tools/serve.mjs
```

Open:

```text
http://localhost:8080/launchlens/
```

Run tests:

```bash
node tests/scoring.test.mjs
```
