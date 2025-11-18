import { describe, it } from 'mocha';
import { assertSucceeds, assertFails, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import fs from 'fs';

const projectId = 'replace-with-project-id';

describe('Firestore Rules', () => {
  before('Re-load data', async () => {
       const testEnv = await initializeTestEnvironment({
           projectId: projectId,
           firestore: {
               rules: fs.readFileSync('../firestore.rules', 'utf8'),
               host: 'localhost',
               port: 8080
           },
       });
       await testEnv.withSecurityRulesDisabled(async (context) => {
            await context.firestore().collection('messages').doc('1').set({
               content: "I'm a message!",
               recipients: ['my_user'],
               sender: ''
           });       
       });
   });

  it('should NOT allow unauthenticated users to read messages', async () => {
    const testEnv = await initializeTestEnvironment({
        projectId: projectId,
        firestore: {
            rules: fs.readFileSync('../firestore.rules', 'utf8'),
            host: 'localhost',
            port: 8080
        },
    });
    const publicUser = testEnv.unauthenticatedContext();
      await assertFails(publicUser.firestore()
        .collection('messages')
        .doc('1').get());
  });

  it('should allow authenticated users to read their received messages', async () => {
    const testEnv = await initializeTestEnvironment({
        projectId: projectId,
        firestore: {
            rules: fs.readFileSync('../firestore.rules', 'utf8'),
            host: 'localhost',
            port: 8080
        },
    });
    const myUser = testEnv.authenticatedContext('my_user');
      await assertSucceeds(myUser.firestore()
        .collection('messages')
        .doc('1').get());
  });
});