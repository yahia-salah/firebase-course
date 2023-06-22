// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: false,
  firebase: {
    apiKey: "AIzaSyDvmGYamCC9wEVn_G7WvjsuRLoPi41rBlc",
    authDomain: "fir-course-recording-8def4.firebaseapp.com",
    projectId: "fir-course-recording-8def4",
    storageBucket: "fir-course-recording-8def4.appspot.com",
    messagingSenderId: "951268590108",
    appId: "1:951268590108:web:51e68d54040e93710a15d9",
  },
  api: {},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import "zone.js/plugins/zone-error"; // Included with Angular CLI.
