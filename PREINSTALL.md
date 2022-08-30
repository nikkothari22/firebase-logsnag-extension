Use this extension to publish events and insights to your LogSnag channels that contain the information from documents added to the specified Cloud Firestore collections.

Adding a document triggers this extension to publish an event or insight using the data in document's fields. The extension uses the official [LogSnag Node.js library](https://docs.logsnag.com/official-libraries/node.js).

To get started, create your LogSnag account [here](https://logsnag.com).

The document's fields for the Event collection to log an event are available [here] (https://docs.logsnag.com/endpoints/log).

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

To publish an insight, you would need to write a document in the Insights collection mentioned during installation:

```js
admin.firestore().collection('logsnagInsights').add({
    title: "User Count",
    value: "100",
    icon: "👨"
})
```

The document's fields for the Insights collection to publish an insight are available [here] (https://docs.logsnag.com/endpoints/insight).

Note that this extension can be used only if you have a LogSnag account.

#### Additional setup

Before installing this extension, make sure that you've [set up a Cloud Firestore database](https://firebase.google.com/docs/firestore/quickstart) in your Firebase project.

#### Billing
To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- You will be charged a small amount (typically around $0.01/month) for the Firebase resources required by this extension (even if it is not used).
- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s free tier:
  - Cloud Firestore
  - Cloud Functions (Node.js 12+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))