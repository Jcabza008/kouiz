# KouizMe
[![build and test](https://github.com/Jcabza008/kouizme/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/Jcabza008/kouizme/actions/workflows/build_and_test.yml)
## How to run KouizMe in Dev Mode
### Dependencies
#### Backend and DB
The backend and database for KouizMe run with docker compose, thus it is required that Docker be installed on the host computer.

#### Frontend
The frontend runs with NodeJS, thus it must be installed on the host computer.
The mobile device where the app will be run needs to have Expo Go installed.
### Start backend and databsae
Run the following command from the project root folder:

`docker-compose up -d`

Now the server and the database should be running.

### Start frontend in Dev Mode
In order for the front end to work properly, you need to go to file `front_end/src/services/KMServerClient.js` and modify line:

`const hostAddress = "<ip-address>";`

to:

`const hostAddress = "<your-ip-address>";`

Then to run the frontend, go to folder `front_end/`, and run:

`npm install & npm start`

After expo loads, it's going to display a QR code, scan the QR code with your camera (iOS) or in the Expo Go App (Android).
The app should load on your phone at this moment.

### Other
The most common problem is the firewall blocking our connection. Make sure to open ports `5000/tcp` and `19000/tcp`.

## Development
### Branches
All branches should be in the format `<name-of-owner>/<brief-description-of-work-to-be-completed>`.
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
