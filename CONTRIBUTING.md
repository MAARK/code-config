# Contributing

Thank you for your interest in contributing to the project. Please follow
these guidelines to ensure your contribution is accepted.

## Pull Request Process

Anyone can propose changes to the project:

1. Fork the repository and create a new branch for the contribution.
2. Make the proposed changes.
3. Run `npm test` to ensure the changes do not break existing rules.
4. Update the README.md file if instructions changed with the new changes.
5. Create the pull request against the `main` branch.

## Release Process

Only members of this project can release new versions. Please follow these
steps to create one:

1. Create a new branch from `main` and name it `release/X.Y.Z`. This project
   adheres to [Semantic Versioning](http://semver.org/).
2. Update the CHANGELOG.md file to reflect the changes that made the new
   version.
3. Run `npm test` to ensure the changes do not break existing rules.
4. Increase version in all relevant files. e.g. package.json,
   package-lock.json, and README.md.
5. Commit the changes.
6. Tag the release using the format `vX.Y.Z` and push everything.
7. Create a pull request to merge `release/X.Y.Z` to the `main` branch.
8. Create the Github release.
