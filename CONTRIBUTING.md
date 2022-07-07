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
6. Tag the release using the format `vX.Y.Z` and push everything. At this point
   CircleCI will build the release and publish it to NPM automatically.
7. Create a pull request to merge `release/X.Y.Z` to the `main` branch.
8. Create the GitHub release.

## Gitflow

Type of branches depending on the task at hand:

- Feature branches: `feature/<name>`
- Bugfix branches: `bugfix/<name>`
- Hotfix branches: `hotfix/<name>`
- Release branches: `release/<version>`

All branches except `main` are temporary and should be deleted after they're
merged. There's no need for extra permanent branches like `develop`.

If you don't see the diagram below open it in [Mermaid's live editor][diagram].

```mermaid
%%{init: {'theme':'base', 'gitGraph': {'rotateCommitLabel': true} }}%%
gitGraph
  commit id: "Initial commit"
  branch feature/1
  checkout feature/1
  commit
  commit
  checkout main
  branch feature/2
  checkout feature/2
  commit
  checkout main
  branch bugfix/1
  checkout bugfix/1
  commit
  commit
  checkout main
  merge feature/1
  merge bugfix/1
  branch release/v1.0.0
  checkout release/v1.0.0
  commit id: "Update CHANGELOG"
  commit id: "Bump version 1.0.0" type: HIGHLIGHT tag: "v1.0.0"
  checkout main
  merge release/v1.0.0
  checkout release/v1.0.0 # it should be checkout v1.0.0 but mermaid does not support it
  branch hotfix
  commit
  commit id: "Bump version 1.0.1" type: HIGHLIGHT tag: "v1.0.1"
  checkout main
  merge hotfix
  checkout feature/2
  commit id: "Spill over"
```

[diagram]: https://mermaid.live/edit#pako:eNqNk0tvgkAUhf_Kze3WqLhk14dBE9MubHdsBrjCpMwjw4ypMf73DjKmYKi6ICF3Ps655wBHzFVBGGPJbWKYrlIJkCshuAVexJDiWnLLWR2GKbZAZpjMK9gRs87QLDo_VFH-rZy9mnZPDe8upGBcjsgtRuUWj4lkrtzxn6uVBsNHNhJkShom6UZ9peBoqCbW0GwfTefT-UBu5Khf7ZcumCV4XT2_J8vNR9KVO0BenNCwJ9NwJaFTQbAHTTGs1slq469PsKxs2eCCNxI9vCs8gd-hqZSrC8joDwvHWStNxqsXUChqQCqPO62V8avbXj2Vsr6xseb_ixjdiRjdjNjzu_EJBe-t5nUNyruniBMMifzvcGzRFG1FglJs0cyX0xqfPOfOL25ZcKsMxjtWNzRB5qzaHmSOsTWOLtAbZ6VhIlCnXyJdKJI
