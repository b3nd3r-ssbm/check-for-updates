# check-for-updates
 An NPM module to easily check a project's github page for new releases!
## Installation
 `npm install check-for-updates`
## Usage
 `const check-for-updates = require('check-for-updates');`<br><br>
 `check-for-updates.check()` returns a promise that resolves with a JS object containing two fields. `isNew` is a boolean that states whether the newest non-draft, non-prerelease version of the app is greater than the one listed in package.json.
 `url` is a String containing the URL of the latest release, regardless of the value of `isNew` 
## Contributing
 Contributing is welcome