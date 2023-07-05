import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");
import * as functions from "firebase-functions";
import { auth, db } from "./init";
import { getUserCredentialsMiddleware } from "./auth.middleware";

export const createUserApp = express();
createUserApp.use(bodyParser.json());
createUserApp.use(cors({origin:true}));
createUserApp.use(getUserCredentialsMiddleware);

createUserApp.post("/", async (req, res) => {
  functions.logger.debug(`Calling create user function.`);

  try {
    if(!req["uid"] || !req["admin"]){
      const message = "Denied access to user creation service!";
      functions.logger.debug(message);
      res.status(403).json({message});
      return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const admin = req.body.admin;

    const user = await auth.createUser({
      email,
      password
    })

    await auth.setCustomUserClaims(user.uid,{
      admin
    });

    await db.doc(`users/${user.uid}`).set({});

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    functions.logger.error(`Couldn't create user.`);
    res.status(500).json({ message: "Couldn't create user." });
  }
});
