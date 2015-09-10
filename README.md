# JOIN 2015 Meteor
Meteor demo application for Ordina's JOIN Event 2015.

Below you can find the steps performed during the demo.

## Install Meteor

```
curl https://install.meteor.com/ | sh
```

This also installs all dependencies like Mongo, NodeJS, ...

## Create the project

```
meteor create join-2015-meteor
```

You can already try to run the default application by typing ```meteor```.

Import project in your favorite IDE. We'll create an application which lists today's talks with the number of upvotes.

Actually, best practices say that we need to put our client code into a ```client``` folder. So create the folder and move the HTML and JavaScript file to that folder.

Replace the HTML code with the following:

```html
<head>
    <title>JOIN 2015</title>
</head>

<body>
<div class="container">
    <header>
        <h1>JOIN 2015</h1>
        <span>{{talkCount}} lightning talks</span>
    </header>

    <ul>
      {{#each talks}}
        {{> talk}}
      {{/each}}
    </ul>
</div>
</body>

<template name="talk">
    <li>
        {{title}}

        {{#if votes}}
            <span>{{votes}} votes</span>
        {{/if}}
    </li>
</template>
```
Replace the JavaScript content with the following content. It adds a ```talks``` helper to the ```body``` template with a static array of today's JOIN talks.

```javascript
if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    talks: [
      {
        title: "Netflix",
        votes: 0
      },
      {
        title: "IoT",
        votes: 0
      },
      {
        title: "Polymer",
        votes: 5
      },
      {
        title: "Ionic",
        votes: 0
      },
      {
        title: "Meteor",
        votes: 3
      },
      {
        title: "WeatherGenie",
        votes: 0
      },
      {
        title: "App Performance Monitor",
        votes: 0
      },
      {
        title: "Dokku",
        votes: 0
      },
      {
        title: "Digital Media Integration",
        votes: 0
      },
      {
        title: "Dokker",
        votes: 1
      }
    ]
  });
}
```

Add some CSS to make everything look prettier. Meteor picks up any CSS file, and automatically adds it to the resulting page.

```css
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);

body {
    font-family: 'Roboto Condensed', sans-serif;
    background-color: #e78221;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    min-height: 100%;
    background: white;
}

header {
    background: #333333;
    color: white;
    padding: 20px 15px 15px 15px;
    position: relative;
}

header span {
    float: right;
    font-size: 1.7rem;
}

h1 {
    font-size: 1.5em;
    margin: 0;
    margin-bottom: 10px;
    display: inline-block;
    margin-right: 1em;
}

ul {
    margin: 0;
    padding: 0;
    background: white;
}

li {
    position: relative;
    list-style: none;
    padding: 15px;
    border-bottom: #eee solid 1px;
}

li:hover {
    background-color: lightgray;
    cursor: pointer;
}

li span {
    margin-left: 10px;
    color: white;
    background-color: #333333;
    padding: 3px 8px;
    border-radius: 2px;
}

@media (max-width: 600px) {
    li {
        padding: 12px 15px;
    }
}
```

Now run your application. You can see that the talks are loaded asynchronously into the template.

You can now try to change something in your code. You will see that the page automatically refreshes. This really improves developer productivity.

## Retrieve the talks from a database

Add talks collection to retrieve talks from MongoDB. Create a ```collection.js``` file in the ```lib/collections``` folder. Scripts in the ```lib``` folder are loaded before any other script. This file has the following content.

```javascript
Talks = new Mongo.Collection("talks");
```

The talks array in our client JS is replaced by a function which queries the database and returns a sorted list of talks.

```javascript
...
function () {
  return Talks.find({}, {sort: {votes: -1}});
}
...
```

## Access the database instance via ```meteor mongo```

Talks are now empty, we can add one via the Meteor Tool (leave the UI open). Open a new terminal window and type in the following to connect to the MongoDB instance.

```
meteor mongo
```

Now try to insert and remove talks with the following commands and see how the UI updates itself immediately!

```
db.talks.insert({ title: “Meteor”, votes: 0});
db.talks.remove({});
```
## Load talks on startup

We’re now going to load the talks when the server boots. We do this by creating a JavaScript file in the ```server``` folder. The name is not important. I called it ```fixtures.js```. Give it the following content:

```
if (Talks.find({}).count() < 1) {
    Talks.insert({ title: 'Netflix', votes: 0});
    Talks.insert({ title: 'IoT', votes: 0});
    Talks.insert({ title: 'Polymer', votes: 0});
    Talks.insert({ title: 'Ionic', votes: 0});
    Talks.insert({ title: 'Meteor', votes: 0});
    Talks.insert({ title: 'WeatherGenie', votes: 0});
    Talks.insert({ title: 'App Performance Monitor', votes: 0});
    Talks.insert({ title: 'Dokku', votes: 0});
    Talks.insert({ title: 'Digital Media Integration', votes: 0});
    Talks.insert({ title: 'Dokker', votes: 0});
}
```

When we execute a ```db.talks.remove({});``` through the mongo terminal, the talks are removed and they remain empty. When we restart the application and the server starts, the talks are created again.

## Upvoting a talk

We now want a user to be able to upvote the talk that he/she is attending. We’ll make the list item clickable and increment the talk's ```votes``` attribute in the database.

Add the following event to the talk template.

```javascript
Template.talk.events({
    "click li": function () {
        if (Session.get('voted') == null) {
            Talks.update(this._id, {
                $set: {votes: this.votes + 1}
            });
            Session.set('voted', true);
        } else {
            alert('Already voted!');
        }
    }
});
```

## Deploying the application

Now we're ready to deploy our application to ```meteor.com```.

```
meteor deploy join-2015.meteor.com
```
