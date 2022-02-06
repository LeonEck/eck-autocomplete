# Publish

Publishing takes place on `main` branch.

1. Increase version in `package.json` and run `npm install` to update the lock file as well.
2. Update version number in README code snippet.
3. Update `CHANGELOG.md` file.
4. Commit: `chore: release vX.Y.Z`
5. Run: `npm run publish:library`
6. Create a tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`
7. Push `main` branch and the newly created tag.
8. Merge `main` to `production` branch and push `production` so that cloudflare builds the showcase based on the contents of the `production` branch.
