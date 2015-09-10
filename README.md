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



