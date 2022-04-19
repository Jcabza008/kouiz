# KouizMe
[![build and test](https://github.com/Jcabza008/kouizme/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/Jcabza008/kouizme/actions/workflows/build_and_test.yml)
## Development
### Versioning
Versions are increased when a pull request is merged into `development` or `master`. The correct new version is determined by the prefix in the name of the pull request.
#### Prefixes
- `patch/`: the patch version will be increased.
- `feature/`: the minor version will be increased.
- `major/`: the major version will be increased.
- `release/`: will remove the tag to indicate production readiness.
- Anything else: nothing will occur.
#### Pull requests where a version increase is not desired:
There are situations where changes don't affect the code of the VM Controller and thus shouldn't generate version changes. This can be acomplished by not using one of the prefixes above. As a best practice, we still want to prefix some of the most common cases of these.
##### Some non-versioning prefixes
- `devops/`: used when changes are made to the Makefile, the CI/CD pipeline, or any other items that contitute part of the building, signing, packing or testing procedure (this list is not exhaustive).
- `testing/`: used when changes only include writing, deletion, or editing of tests; if this required any change in a source code file, then this prefix must NOT be used and a versioning prefix should be used instead.
