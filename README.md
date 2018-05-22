# README

======
### Setup ###

1. Install node.js
   To check if node.js is installed successfully: `node -v`

2. Install cordova
   `npm install -g cordova`

3. Install Android Studio

4. Add a simulator in Android Studio via Tools > AVD Manager.
   Choose API Level 26 (Android 8.0).

======
### Run the App ###

------
#### android ####
1. `cd medicinetracker`

2. `npm install`

3. `cordova add platform android`

4. `cordova prepare android`

5. Open project in Android Studio (medicine-tracker-cordova\medicinetracker\platforms\android). Accept the license agreement.

6. `cordova emulate android`

------

======
### Debug Emulator's JS, HTML, CSS ###

------
#### android ####
1. Open Google Chrome

2. Go to `chrome://inspect/#devices`
------

======

### Problems Encountered ###

1. Problem: `(node:11224) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'semver' of null`

   Solution: Remove Android API Level 27 from AVD Manager.

2. Problem:
   `error: device unauthorized.
    This adb server's $ADB_VENDOR_KEYS is not set
    Try 'adb kill-server' if that seems wrong.`

   Solution:
   In emulator, tick on "Allow USB Debugging."

3. Problem:
    `cordova emulate android` takes a long time to finish. It seems stuck after "Built the following apk(s):"

    Solution:
    In emulator, uninstall the app, then run `cordova emulate android` again.
