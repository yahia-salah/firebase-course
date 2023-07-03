import * as functions from "firebase-functions";
import { db } from "./../init";
import { FieldValue } from "firebase-admin/firestore";

export default async (snap, context) => {
  functions.logger.debug(
    `Running add course trigger for courseId ${context.params.courseId}`
  );

  const course = snap.data();

  if (course.promo) {
    return db.doc("/courses/stats").update({
      totalPromo: FieldValue.increment(1),
    });
  } else {
    return;
  }
};
