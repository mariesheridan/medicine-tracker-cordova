# README

------
### Setup ###

1. Install node.js
   To check if node.js is installed successfully: `node -v`

2. Install cordova
   `npm install -g cordova`

3. Install Android Studio

4. Add a simulator in Android Studio via Tools > AVD Manager.
   Choose API Level 26 (Android 8.0).

------
### Run the App ###

To set the URL to be used:

1. Change the value of baseURL in www/js/state.js. Make sure to keep the slash at the end.

2. Add the URL in this line in www/index.html, before the semicolon. Those are the only URLs that the app can access.

    >\<meta http-equiv="Content-Security-Policy"
    >      content="default-src 'self' data: gap: https://ssl.gstatic.com https://polar-reaches-96790.herokuapp.com/ http://192.168.56.1:3000/ 'unsafe-eval';


------
#### android ####
1. `cd medicinetracker`

2. `npm install`

3. `cordova platform add android`

4. `cordova prepare android`

5. Open project in Android Studio (medicine-tracker-cordova\medicinetracker\platforms\android). Accept the license agreement.

6. `cordova emulate android`

------

### Debug Emulator's JS, HTML, CSS ###

------
#### android ####
1. Open Google Chrome

2. Go to `chrome://inspect/#devices`
------

### Generate signed APK for android

Steps 1-4 are run only once. When the keystore is generated, you can skip to step 5.

1. Install keytool

2. `keytool -genkey -v -keystore MedicineTracker.keystore -keyalg RSA -keysize 2048 -validity 20000 -alias medicinetracker`

3. `move MedicineTracker.keystore platforms\android\.`

4. Create a file in your `platforms/android/` directory with the name `release-signing.properties` and put these there.

    ```
    storeFile=MedicineTracker.keystore
    storeType=jks
    keyAlias=medicinetracker
    keyPassword=password123
    storePassword=password123
    ```

5. cordova build android --release

To debug build:  
    `cd platform\android`
    `gradlew.bat assemble --stacktrace`

References:
    (https://developer.android.com/studio/publish/app-signing)
    (https://haensel.pro/apache-cordova/cordova-create-a-signed-release-apk-easy-howto)

------

### Problems Encountered ###

1. Problem:
    ```
    (node:11224) UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'semver' of null
    ```

   Solution: Remove Android API Level 27 from AVD Manager.

2. Problem:
    ```
    error: device unauthorized.
    This adb server's $ADB_VENDOR_KEYS is not set
    Try 'adb kill-server' if that seems wrong.
    ```

   Solution:
   In emulator, tick on "Allow USB Debugging."

3. Problem:  
    `cordova emulate android` takes a long time to finish. It seems stuck after "Built the following apk(s):"

    Solution:
    In emulator, uninstall the app, then run `cordova emulate android` again.

4. Problem:
    ```
    * What went wrong:
    Execution failed for task ':app:packageRelease'.
    > Failed to generate v1 signature
    ```

    After running `gradlew.bat assemble --stacktrace`:
    ```
    Information:Gradle tasks [:app:assembleDebug]

    Error:org.gradle.tooling.BuildException: Failed to generate v1 signature

    Error:java.io.IOException: Failed to generate v1 signature

    Error:java.security.InvalidKeyException: Failed to sign using signer "CERT"

    Error:java.security.InvalidKeyException: Failed to sign using SHA1withDSA

    Error:java.security.InvalidKeyException: The security strength of SHA-1 digest algorithm is not sufficient for this key size

    Information:BUILD FAILED in 1s

    5 errors 0 warnings
    ```

    Solution:
    Change the key generation to:
    `keytool -genkey -v -keystore MedicineTracker.keystore -keyalg RSA -keysize 2048 -validity 20000 -alias medicinetracker`

    because the default has changed from RSA to DSA.
