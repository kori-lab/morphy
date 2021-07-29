# Creating a event

**First of all, you need to create a file in the folder `src/events/`**

1° Copy the base code:

```js
const Morphy = require('../Morphy');
const { Event } = require('../');

module.exports = class MainEvents extends Event {
  /**
   * @param {Morphy} client
   */
  constructor(client) {
    super(client, {
      events: ['ready'],
    });
  }

  async onReady() {
    console.log('Yep! This is a ready event!');
    console.log('The client username is:', this.client.user.username);
  }
};
```

2° to add new event you need to add first the event name to the "events" field in the constructor, like this:

```js
constructor(client) {
  super(client, {
    events: ['ready', 'message'], // <- message is my new event
  });
}
```

3° create a function to executes when this event is emitted by the client

```js
// function name needs to be: on + event name with the first char to upper case
// like: onMessage (on + 'message' -> 'Message')
// the paramteres will be pass to the function is the same parameters that the client give for you
async onMessage(message) {
  // My code when message event is emited here!
}
```
