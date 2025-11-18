# Firestore Security Rules Testing Demo

This project is a demo on how to set up tests for developing and verifying your Firestore security rules. This repo was written as a companion to the [Testing Firestore security rules without touching production](https://allthingsopen.org/articles/testing-firestore-security-rules-without-production) article I contributed to We ❤️ Open Source.

The main point of interest here is the `rules_testing\tests\messages.spec.js`, which shows how the (@firebase/rules-unit-testing)[https://www.npmjs.com/package/@firebase/rules-unit-testing] npm module can be used to verify and develop Firestore security rules. This test file shows how to:
- Set up the testing environment
- Add data
- Run tests as authenticated or unauthenticated users

These pieces can build the basis for more complex tests and allow you to verify rules locally as you develop your projects. If you have thoughts or questions, please feel free to drop me a line at mail2chrisb@gmail.com.

# Using this Project

If you want to try this project out, please feel free to. You'll need: 
- An existing firebase project
- Node & NPM
- Java
- the [Firebase tools npm package](https://www.npmjs.com/package/firebase-tools)

From the root directory, run

```
> firebase login
> firebase init
```

Select Emulators, Firestore Emulators and then use the default settings. Let it download the emulators. Once downloaded, you can start the emulators with:

```
> firebase emulators:start
```

Then from the rules_testing directory, run

```
> npm i
> npm test
```

And you should see two passing tests. Open `localhost:4000` and click on 'Firestore' and you should see the test data in the database.

# Troubleshooting

If you do run into problems, please feel to create a github issue for it.
