import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { LogSnag, PublishOptions } from 'logsnag';

import config from "./config";
import { InsightOptions } from "logsnag/dist/types/insight";

let initialized = false;

/**
 * Initializes Admin SDK if not already initialized.
 */
async function initialize() {
    if (initialized === true) return;
    initialized = true;
    admin.initializeApp();
}

exports.processEvent = functions.handler.firestore.document
    .onCreate(async (snap, context) => {

        await initialize();

        const logsnag = new LogSnag({
            token: config.apiToken,
            project: config.project
        });

        const eventData = snap.data() as PublishOptions;

        return logsnag.publish(eventData)
            .then((response) => admin.firestore().collection(config.eventCollection).doc(snap.id).update({
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                response: response,
                status: 'success'
            })
            )
            .catch(error => admin.firestore().collection(config.eventCollection).doc(snap.id).update({
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                response: error,
                status: 'error'
            }))
    })

exports.processInsight = functions.handler.firestore.document
    .onCreate(async (snap, context) => {

        await initialize();

        const logsnag = new LogSnag({
            token: config.apiToken,
            project: config.project
        });

        const insightData = snap.data() as InsightOptions;

        return logsnag.insight(insightData)
            .then((response) => admin.firestore().collection(config.insightCollection).doc(snap.id).update({
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                response: response,
                status: 'success'
            })
            )
            .catch(error => admin.firestore().collection(config.insightCollection).doc(snap.id).update({
                updatedOn: admin.firestore.FieldValue.serverTimestamp(),
                response: error,
                status: 'error'
            }))
    })

