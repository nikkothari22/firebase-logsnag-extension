### See it in action

You can test out this extension right away!

1.  Go to your [Cloud Firestore dashboard](https://console.firebase.google.com/project/${param:PROJECT_ID}/firestore/data) in the Firebase console.

2.  If it doesn't already exist, create the collection you specified during installation: `${param:LOGSNAG_EVENT_COLLECTION}`.

3.  Add a document with the following content:

    ```js
    channel: "waitlist",
    event: "User Joined",
    description: "Email: john@example.com",
    icon: "🎉",
    tags: {
      name: "john doe",
      email: "john@example.com",
    },
    notify: true
    ```

4.  In a few seconds, you'll see a `response` field appear in the document. The field will update after the extension gets the response from the LogSnag API. It contain the response from the LogSnag API. Additionally, a field `status` will also be created with the values `success` or `error`.

You can use the [Firebase Admin SDK][admin_sdk] to add a document in the collection:

```js
admin
  .firestore()
  .collection("${param:LOGSNAG_EVENT_COLLECTION}")
  .add({
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
  .then(() => console.log("Event published!"));
```

5. Similarly, you can publish insights by adding a document in the `${param:LOGSNAG_INSIGHT_COLLECTION}`:

    ```js
    title: "User Count",
    value: "100",
    icon: "👨"
    ```

### Using this extension

After its installation, this extension monitors all documents created in the `${param:LOGSNAG_EVENT_COLLECTION}` and `${param:LOGSNAG_INSIGHT_COLLECTION}` collections. Events and insights are published based on the contents of the document's fields.


#### Security rules and logging events

This extension can be used to publish events and insights directly from client applications. However, you should carefully control client access to the `${param:LOGSNAG_EVENT_COLLECTION}` and `${param:LOGSNAG_INSIGHT_COLLECTION}` collections to avoid potential abuse (you don't want users to be able to send arbitrary notifications!). Hence we recommend using Cloud Functions to trigger these notifications and insights.


### Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.

[admin_sdk]: https://firebase.google.com/docs/admin/setup