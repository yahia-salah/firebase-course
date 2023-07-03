import * as functions from "firebase-functions";

/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const onAddCourseUpdatePromoCounter = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "128MB",
  })
  .firestore.document("courses/{courseId}")
  .onCreate(async (snap, context) => {
    await (
      await import("./promotions-counter/on-add-course")
    ).default(snap, context);
  });

export const onCourseUpdatedUpdatePromoCounter = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "128MB",
  })
  .firestore.document("courses/{courseId}")
  .onUpdate(async (change, context) => {
    await (
      await import("./promotions-counter/on-course-updated")
    ).default(change, context);
  });

export const onDeleteCourseUpdatePromoCounter = functions
  .runWith({
    timeoutSeconds: 300,
    memory: "128MB",
  })
  .firestore.document("courses/{courseId}")
  .onDelete(async (snap, context) => {
    await (
      await import("./promotions-counter/on-delete-course")
    ).default(snap, context);
  });
