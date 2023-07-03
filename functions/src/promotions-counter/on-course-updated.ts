import * as functions from "firebase-functions";
import { db } from "./../init";
import { FieldValue } from "firebase-admin/firestore";

export default async (change, context) => {
  if (context.params.courseId == "stats") {
    return;
  }
  functions.logger.debug(
    `Running course updated trigger for courseId ${context.params.courseId}`
  );

  const newData = change.after.data();
  const oldData = change.before.data();

  let increment = 0;

  if (!oldData.promo && newData.promo) {
    increment = 1;
  } else if (oldData.promo && !newData.promo) {
    increment = -1;
  }

  if (increment == 0) {
    return;
  }

  return db.doc(`courses/stats`).update({
    totalPromo: FieldValue.increment(increment),
  });
};
