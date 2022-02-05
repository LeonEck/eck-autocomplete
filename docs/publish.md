# Publish

Publishing takes place on `main` branch.

1. Increase version in `package.json` and run `npm install` to update the lock file as well.
2. Update version number in README code snippet.
3. Commit: `chore: relase vX.Y.Z`
4. Run: `npm run publish:library`
5. Create a tag: `git tag -a vX.Y.Z -m "vX.Y.Z"`
6. Push `main` branch and the newly created tag.
7. On github run the `GH Pages` workflow.
