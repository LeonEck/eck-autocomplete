# Publish

Publishing takes place on `main` branch.

1. Increase version in `package.json` and run `npm install` to update the lock file as well.
2. Update version number in the `/README.md` CDN code snippet and in the `/showcase/docs/index.md` CDN code snippet and in the stackblitz examples at: https://stackblitz.com/edit/eck-autocomplete?file=index.html.
3. Update version number and potentially any API changes in `web-types.json`.
4. Sync any README changes manually to the `/showcase/docs/index.md` file.
5. Update `CHANGELOG.md` file.
6. Commit: `chore: release vX.Y.Z`
7. Create a tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`
8. Push `main` branch and the newly created tag.
9. An action will run that creates a new release. Afterward another action will run that publishes to npmjs.
10. Merge `main` to `production` branch and push `production` so that cloudflare builds the showcase based on the contents of the `production` branch.
