# Firebase LogSnag Extension (Unofficial)

[**Install the extension using this link**](https://console.firebase.google.com/project/_/extensions/install?ref=nikkothari22/firebase-logsnag-extension)

**Author**: Nikhil Kothari (**[https://github.com/nikkothari22](https://github.com/nikkothari22)**)

**Description**: Functions to send events and insights to LogSnag. (Not an official extension)

**This is not an official Logsnag extension and the author is not associated with LogSnag or Firebase in any manner whatsoever. All trademarks and copyrights belong to the respective companies.**

**Details**: Use this extension to publish events and insights to your LogSnag channel. The extension uses the official [LogSnag Node.js library](https://docs.logsnag.com/official-libraries/node.js).

You need to have a LogSnag account and get the authentication (Access) token and the project name (refer to the LogSnag documentation for this). When you need to publish an event or insight, simply create a new document in Firestore.

The extension has a cloud function that's triggered whenever a new document is created in the collections specified during installation.

Here's a basic example document write that would trigger this extension to publish an event in LogSnag:

```js
admin.firestore().collection('logsnagEvents').add({
    channel: "waitlist",
    event: "User Joined",
    description: "Email: john@example.com",
    icon: "🎉",
    tags: {
      name: "john doe",
      email: "john@example.com",
    },
    notify: true
})
```

To publish an insight, you would need to write a document in another collection:

```js
admin.firestore().collection('logsnagInsights').add({
    title: "User Count",
    value: "100",
    icon: "👨"
})
```


#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing
To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 16 runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))


**Cloud Functions:**

* **processEvent:** Runs when a document is created in the specified Cloud Firestore collection for events, publishes the event in LogSnag, and updates the document with delivery status information.

* **processInsight:** Runs when a document is created in the specified Cloud Firestore collection for insights, publishes the insight in LogSnag, and updates the document with delivery status information.


**Access Required**:

This extension will operate with the following project IAM roles:

* datastore.user (Reason: Allows this extension to access Cloud Firestore to read and process added email documents.)


**Configuration Parameters:**

* Cloud Functions location: Where do you want to deploy the functions created for this extension? You usually want a location close to your customers. For help selecting a location, refer to the [location selection guide](https://firebase.google.com/docs/functions/locations).

* Events Collection path: The path to the collection where documents will be created to publish events in LogSnag.
* Insights Collection path: The path to the collection where documents will be created to publish insights in LogSnag.
