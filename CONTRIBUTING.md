# Contributing

This document contains information on how to get started contributing on the
Carrot KPI monorepo.

## Changesets

To streamline the process of releasing new packages versions, the toolset
offered by `changeset` can be used. For more information about `changeset`, you
can visit their GitHub page [here](https://github.com/changesets/changesets).

The following operations should be done:

1. Create a new branch from `develop`
2. Run `yarn changeset` and follow the intructions in the cli (the command
   should be run on one package at a time, this way we'll have a `CHANGELOG.md`
   file dedicated to each package).
3. Open a new PR from `develop` targeting `main`, containing the files generated
   by the changeset commands

At this point the [changeset bot](https://github.com/apps/changeset-bot)
configured on the Github repository will comment the PR adding details about the
provided changesets. Once the PR gets merged the GitHub workflow will consume
all changesets, and update to the most appropriate semver version based on those
changesets. It also writes changelog entries for each consumed changeset and
publish any new version to npm.
