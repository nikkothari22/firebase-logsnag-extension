export default {
    location: process.env.LOCATION,
    project: process.env.LOGSNAG_PROJECT_NAME ?? "",
    apiToken: process.env.LOGSNAG_API_TOKEN ?? "",
    eventCollection: process.env.LOGSNAG_EVENT_COLLECTION ?? "",
    insightCollection: process.env.LOGSNAG_INSIGHT_COLLECTION ?? "",
};