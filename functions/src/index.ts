import * as functions from "firebase-functions";
import { db } from "./init";
import { FieldValue } from "firebase-admin/firestore";

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
    functions.logger.debug(
      `Running add course trigger for courseId ${context.params.courseId}`
    );

    const course = snap.data();

    if (course.promo) {
      return db.doc("/course/stats").update({
        totalPromo: FieldValue.increment(1),
      });
    }
  });
