---
title: Vue.js 3 - Part Two
description: Introduction to building applications in Vue.js 3
date: 2021-04-27
draft: false
tags:
    - vue router
---
## Vue Router Essentials
In this lesson we’re going to introduce you to the tools that Vue uses to navigate between pages (or views) in our application. We’ll cover:

* What is Client-Side Routing?
* What is a single page application?
* How is Vue Router setup in a Vue application?
* Then we’ll customize the routes in our example app
* Server-Side vs Client-Side Routing

When it comes to websites, typically we connect our page together with links. A link gets clicked, it calls back to the server for the next page, and that page gets loaded. We call this “Server-Side Routing” because the client is making a request to the server on every URL change.

When it comes to Vue, many choose client-side routing, meaning that the routing happens in the browser itself using JavaScript.

In many cases, the view of our app that we need to show has already been loaded into the browser, so we don’t need to reach out to the server for it. Vue Router simply updates what part of the app that is currently being displayed.

In fact, with routing like this, our app is functioning as a Single Page Application. So what exactly does that mean?

### Single Page Applications

A Single Page Application (SPA) is a web app that loads from a single page and dynamically updates that page as the user interacts with the app. In our case, everything is being loaded from the index.html file of our project. In lesson 2, we looked at that file and saw that it contained this div with the id of #app.

```html
<!-- public/index.html -->

<div id="app"></div>
```

We also took a look at main.js and learned that when our app is created, it’s being mounted to that div with the id of #app.

```javascript
// file: main.js

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
```
In other words, the index.html file is the “single page” of our single page application, where all of the application code is mounted. So Vue Router enables client-side routing so we can navigate around and display different “views” of our app.

### package.json
All of our application’s dependencies are tracked inside our package.json file. If we take a quick look inside here, we see that the Vue CLI already inserted Vue Router as a dependency because we selected to add it when we configured our project.

```json
...
"dependencies": {
  "core-js": "^3.6.5",
  "vue": "^3.0.0-0",
  "vue-router": "^4.0.0-0"
},
...
```

This is telling our application to use a version of vue-router that is compatible with version 4.0.0-0 of vue-router. (Your version number may be different depending on when you take this course)

When we created the project with the CLI, it ran npm install for us, which went out to NPM, and installed the vue-router library inside our application’s node_modules directory.

Now let’s take a look inside the router directory to see how Vue Router is working.

### How Vue Router is configured
Inside the router directory, we find the index.js for our router. At the top of this file, we are importing the vue-router library.

```javascript
// file: src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
And then we import a component we’ll use in our routes:

import Home from '../views/Home.vue'
And then we use this route:

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    ...// Skipping this part, which we will come back to later
  }
]
```

The path indicates the actual route, in terms of the URL, that the user will be taken to. In this first route, there’s only the /, meaning this is the root, the homepage of our application, and what people see when they go to our domain at `example.com`.

The name allows us to give this route a name so we can use that name throughout our application to refer to this route (more on this later in the course).

The component allows us to specify which component to render at that route. Note that Home was imported at the top of the file. So as it is, the Home component will be rendered whenever the browser’s URL ends with a / with nothing after it.

Taking a look at the second route object, we can see it has a different path:

```js
// file: src/router/index.js

{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
```

When the browser’s URL ends with `/about`, the About component will be rendered.

You probably noticed it’s also importing the component differently. Rather than importing it at the top of the file like we did with Home, we are instead importing it only when the route is actually called. As it says in the comments, this will generate a separate about.js file, which will only be loaded into someone’s browser once they navigate to /about. This is a performance optimization that isn’t necessary in our simple, small application. But as an application grows, it can be useful to split out how it’s loaded to different JavaScript files, which only get loaded when they are needed.

Further down the file, we use createRouter to create the router, telling it to use the browser’s History API (we selected this as an option when we configured the project with Vue CLI), and sending in the routes we created above, before finally exporting it from this file.

```js
// file: src/router/index.js

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

So we’ve defined the two different views that our app is going to be able to navigate between, but we actually haven’t yet loaded this router into our Vue instance. Remember, our entire application gets loaded from our main.js, and if we look inside this file we can see that we’re importing our ./router/index.js file, which is bringing in what we exported from router.js.

```js
// file: main.js

import router from './router' // <-- This imports index.js from the /router directory
```

And in `main.js` you’ll notice that we tell our Vue instance to use the router we’ve imported:

```js
// file: main.js

createApp(App)
  .use(router)
  .mount('#app')
```

So far so good. Now we are understanding how the router is set up. But where is the functionality added to allow the user to navigate to different parts of the app?

### Built-in Vue Router Components

Looking within App.vue, we’ll find a div with the id of #nav. And inside of it there are some router-links, which are global, Vue Router-specific components we have access to.

```html
<div id="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/about">About</router-link>
</div>
```

And below them is this other Vue Router component:

```html
<router-view/>
```

So what’s happening here?

`<router-link>` is a component (from the vue-router library) whose job is to link to a specific route. You can think of them like an embellished anchor tag, where the to attribute behaves similar to href.

`<router-view/>` is essentially a placeholder where the contents of our “view” component will be rendered onto the page.

When a user clicks on the Home link, where are they taken to? That answer lies within the to attribute: `<router-link to="/">`

They are taken to /, which means that according to the route that is set up in `router.js`, the Home component will be loaded.

```js
// file: src/router/index.js

{
  path: '/',
  name: 'Home',
  component: Home
}
```

But where, exactly, will it be loaded? The answer is: in the `<router-view/>`

Again, that is just a placeholder that is replaced by the “view” component we route to, such as Home or About.

### Seeing it happening live
Although the Vue DevTools aren’t ready for the new Vue 3 version of Vue Router, we can see this behavior by looking at it within a Vue 2 app:

If we call up the Vue Devtools we can see our router-link components, and as we switch pages we can see the About or Home components getting switched out as needed.

Also, if we look into the network panel of our browser, we can see that indeed our application is loaded once, and no subsequent requests are asked of the server. All our templates are loaded into our browser, and we are indeed doing client-side routing.

### Customizing our Example App
Now that we understand the foundations of Vue Router, we’re ready to start cuztomizing the routes within our example app. Our task list includes:

Rename Home.vue to EventList.vue
Customize route for EventList
Update About.vue
Reconfigure About route
Rename Home.vue to EventList.vue
In the last lesson, we transformed the Home.vue component into an event list, so let’s rename things to match that new reality, changing the name of the file itself to EventList.vue and the name of the component as well.

```html
<!-- src/views/EventList.vue -->

export default {
  name: 'EventList',
  ...
 }
```

### Customize route for EventList
Now that the file has been renamed, we’ll need to change our import statement in our router file, and amend the route object itself.

```js
// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue' // imported renamed SFC

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList
  },
  ...
]
```

### Update About.vue
Now let’s add some personalization to the About page to fit our example app, adding this text description.

```html
<template>
  <div class="about">
    <p>A site for events to better the world.</p>
  </div>
</template>
```

### Reconfigure About route
Since we don’t need to be using route-level code-splitting for our app, we’ll simplify the About route object, like so:

```js
// file: src/router/index.js

{
  path: '/About',
  name: 'About',
  component: About
}
```

At this point, our newly customized router file looks like this:

```js
// file: src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventList from '../views/About.vue'

    
export default new Router({
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventList
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
```

### A final step

Because we’re now displaying that event list on what used to be our “Home” page, let’s update the inner HTML of the router-link for that view.

```html
<!-- file: App.vue -->

<template>
  <div id="app">
    <div id="nav">
      <router-link :to="/">Events</router-link> |
      <router-link :to="/about">About</router-link> |
    </div>
      <router-view/>
  </div>
</template>
```

## API Calls with Axios

As our app currently stands, the events that we’re displaying are simply hard-coded within the data of the EventList.vue component. In a real-world app, there would likely be some sort of database of events that we would be pulling from. Our app would make a request for the events, the server would respond with those events (as JSON), and we’d take those events and set them as our component’s data, which we then display in the view.

https://firebasestorage.googleapis.com/v0/b/vue-mastery.appspot.com/o/flamelink%2Fmedia%2F1.opt.1605053999987.jpg?alt=media&token=0ae8fd12-5843-459c-a2b4-41785bee9d39

So our tasks in this lesson include:

Create a mock database to house our events
Install a library (Axios) to make API Calls
Implement a getEvents() API call
Refactor our API code into a service layer
Our Mock Database
To create our mock database, we’ll be using My JSON Server, which is a simple solution that requires no installation. We just need a Github repo with a db.json file in it. If you’ve been coding along, you may have already noticed that I’ve added a `db.json` file to the course’s repo:

```json
{
  "events": [
    {
      "id": 123,
      "category": "animal welfare",
      "title": "Cat Adoption Day",
      "description": "Find your new feline friend at this event.",
      "location": "Meow Town",
      "date": "January 28, 2022",
      "time": "12:00",
      "organizer": "Kat Laydee"
    },
    {
      "id": 456,
      "category": "food",
      "title": "Community Gardening",
      "description": "Join us as we tend to the community edible plants.",
      "location": "Flora City",
      "date": "March 14, 2022",
      "time": "10:00",
      "organizer": "Fern Pollin"
    },
    {
      "id": 789,
      "category": "sustainability",
      "title": "Beach Cleanup",
      "description": "Help pick up trash along the shore.",
      "location": "Playa Del Carmen",
      "date": "July 22, 2022",
      "time": "11:00",
      "organizer": "Carey Wales"
    }
  ]
}
```

This code should look very familiar to you, since it’s a JSON version of the events data that is currently within the local data of our EventList.vue component. This is the data we’re going to soon be fetching with our new API call.

In order to access our mock server, we’ll go to the url:

```
my-json-server.typicode.com/{GithubUserName}/{RepoName}
```

(Obviously, if you’re creating your own db.json file within your own Github account’s repo, you’ll want to fill in the blanks for your UserName and RepoName here.)

Adding `/events` to the end of the URL allows us to target the events data specifically, so `my-json-server.typicode.com/{GithubUserName}/{RepoName}/events` is the URL we’ll soon use to make our call.

### Axios for API Calls
Now that we have our mock database and know what URL to call out to, we’re ready to install a library to help us make API calls. We’ll be using the Axios library, which we can install as a dependency from the terminal or by using the Vue UI.

From terminal, when cd’d into the root of your project, run:

```shell
$ npm install axios
```

Why are we using Axios? It’s very popular and includes many features including:

* GET, POST, PUT, and DELETE requests
* Add authentication to each request
* Set timeouts if requests take too long
* Configure defaults for every request
* Intercept requests to create middleware
* Handle errors and cancel requests properly
* Properly serialize and deserialize requests & responses
* And more…

Now that we’ve installed it, we can start using it and write our first API Call.

### Implementing Axios to get events
To write our API call, we’ll head into the EventList.vue component, delete out the hard-coded events data, import Axios, then add the created lifecycle hook.

```html
<!-- file: src/views/EventList.vue -->

<script>
import EventCard from '@/components/EventCard.vue'
import axios from 'axios'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    // get events from mock db when component is created
  }
}
</script>
```

If lifecycle hooks are a new concept to you, you just need to understand that a component has a lifecycle and different hooks (or methods) are run at those different stages in its lifecycle. For example, before it’s created, when it’s created, before it’s mounted, when it’s mounted, and so on.

In our case, we want to make our API call and get our events when the component is created, so we’ll run the get method available to us on axios, passing in the my-json-server url as the argument (where we want to get from).

```html
<!-- file: src/views/EventList.vue -->

<script>
import EventCard from '@/components/EventCard.vue'
import axios from 'axios'

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    axios.get('https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events')
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
```

Because Axios is a promise-based library and runs asynchronously, we need to be waiting for the promise returned from the get request to resolve before proceeding. That’s why we added the .then, which allows us to wait for the response and set our local events data equal to it.

Because we want to grab any errors that occur, we’ve also added .catch and we’re just logging the error to the console. While there are production-level solutions for error-handing, we won’t be delving into that in this course. This solution serves our needs for this simple implementation.

(In case you’re wondering: we could’ve used the alternative [async / await](https://scotch.io/tutorials/asynchronous-javascript-using-async-await) syntax instead of .then. I’ve chosen this syntax since I assume more people are already familiar with it, and I find it’s a bit less abstract for newcomers. Both work just fine, and I encourage you to write your asynchronous calls as you and your team prefer.)

If we check this out in the browser, we should now be seeing our events being displayed, pulled in smoothly from our newly implemented mock server.

### Reorganizing our code into a service layer
While we’ve made great progress, there’s a problem with our code. Currently, we’re importing Axios into the EventList.vue component. But in the next lesson, we’re going to create a new component, which displays our event’s details. That new component will also need to make an API call. If we’re importing Axios into each component that needs it, we’re unnecessarily creating a new instance of Axios each time we do that. With API code woven throughout our application, this gets messy and makes our app harder to debug.

A cleaner and more scalable solution is to modularize our API code into a service layer. To do so, we’ll created a services folder in our src directory and create a new EventService.js file.


```js
// file: src/services/EventService.js

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  }
}
```

At the top, we’re importing Axios. Below that, we’ve added an apiClient constant, which holds our singular Axios instance. As you can see, we’ve set up a baseURL and some other configurations for Axios to use as it communicates with our server.

Now that we’ve set that up, we can export a method that gets our events, using our new Axios apiClient.

```js
// file: src/services/EventService.js

...

export default {
  getEvents() {
    return apiClient.get('/events')
  }
}
```

As you can see, we still have access to the Axios get method, and we’re passing in '/events' as the argument when making this call. This string will be added to our baseURL, so the request will be made to: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events'

Next up, we just need to make use of this new EventService within our EventList.vue component, deleting out the Axios import, importing the EventService, and running its getEvents() call.

```html
<!-- file: src/views/EventList.vue -->

<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
~~import axios from 'axios'~~

export default {
  name: 'EventList',
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    EventService.getEvents()
      .then(response => {
        this.events = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

And with that, we’ve refactored our API code into a modular service layer.

### Up Next
When viewing our events in the browser, the EventCards look clickable. Wouldn’t it be nice if we could click on them and view more details about that event? In the next lesson, we’ll learn how to achieve this with Vue Router’s dynamic routing abilities.

## Dynamic Routing
In this lesson, we’re going to add the functionality where a user can click any of the EventCards that are displayed on our homepage and be routed to a view that shows more details about that event. In other words: we’re going to implement some dynamic routing behavior. We’ll tackle this new feature in two parts.

#### Part 1: What we’ll achieve
* Create a new EventDetails component to display the event’s details
* Add a new API call to fetch a single event by its id (this is the event we’ll display the details of)
* Add a route for the new EventDetails component
* Make EventCard clickable so we can access this new EventDetails route
* Create EventDetails Component

First up, we’ll create the component to display the event details, adding it to our views directory.

```html
<!-- file: src/views/EventDetails.vue -->

<template>
  <div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: null
    }
  },
  created() {
    // fetch event (by id) and set local event data
  }
}
</script>
```

It renders out the details from the event in our data. That event is retrieved from an API call that fetches it, by its id. Let’s revisit our mock database to see how to fetch it.

Add API call to fetch event by id
Notice what happens when we call up our my-json-server url, this time with an id at the end of it (…/events/123). This targets a single event, where its id matches the end of our url: 123.

This is the kind of url we’ll use when fetching a single event, where it ends with the event’s id. Let’s head into our EventService file and add that API call now.

```js
// file: src/services/EventService.js

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events')
  },
  //Added new call
  getEvent(id) {
    return apiClient.get('/events/' + id)
  }
}
```

The getEvent call is very similar to the getEvents one from the last lesson. However, it takes in an id as its argument, which is appended to the end of the url we’re making a get request to.

Now that the call is ready to use, let’s use it within our new EventDetails component.

```html
<!-- file: src/components/EventDetails.vue -->

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'
export default {
  data() {
    return {
      event: null,
      id: 123
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
```

A few things to note here:

* We are calling getEvent from the EventService, which we’ve now imported into the component
* We’re passing in this.id - That id is currently just a hard-coded data value. (We’ll make this dynamic in part 2 of this lesson. This is not our ultimate solution.)
* We’re setting our local event data equal to the response of our getEvent request

Now that this component is making a call out for a single event to display, we can add this component to our routes.

### Add EventDetails as a route
We’ll head into our router file, import EventDetails, and add it to our routes array:

```js
// file: src/router/index.js

...
import EventDetails from '@/views/EventDetails.vue'
import About from '@/views/About.vue'

const routes = [
  ...
  {
    path: '/event/123',
    name: 'EventDetails',
    component: EventDetails
  },
  ...
]
```

For now, we’ll just hard-code the path: '/event/123'. Eventually, the end part (123) will be dynamic, and updated with the id of the event that is currently being displayed.

Now that we have this new route, we need to be able to access it. Again, we’re wanting to access this route whenever we click on one of the EventCards on our homepage.

### Make EventCard clickable with a router-link
Heading into the EventCard component, let’s wrap our template code in a `router-link`

```html
<!-- file: src/components/EventCard.vue -->

<template>
  <router-link to="event/123">
    <div class="event-card">
      <span>@{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>
```

Now, when one of our EventCards is clicked, we’ll be routed to the new path event/123.

If we check this out in the browser, we’ll see that it’s working so far… When we click on the Cat Adoption Day EventCard, we’re taken to a view that displays the details of that event.

However, if we click on any other EventCard, we’re still pulling up the same Cat Adoption Day details, and the id at the end of our url is the same: 123. That’s expected, since we hardcoded the id we are passing into the getEvent call, and in the path of the EventDetails route.

This brings us to the end of Part 1 and to the beginning of Part 2, where we make this routing behavior dynamic so we can route to the details of any EventCard we click on.

### Part 2: Making it Dynamic
To make our routing behavior dynamic, we need to switch out the hard-coded id in our path (/123) and replace it with a dynamic segment. This is basically a variable parameter for the url path, which gets updated with the id of whichever event is currently displayed on that route.

We’ll then want to be able to feed that dynamic segment into the EventDetails component as a prop to be used when making the getEvent call.

### Add a dynamic segment to EventDetails route
Let’s get started, and add a dynamic segment to the path of the EventDetails route.

```js
// file: src/router/index.js

  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails
  },
```
Notice how the syntax for a dynamic segment begins with a colon : and is followed by whatever you want to call the segment. In this case, it’s :id since it gets replaced with our event’s id. In another use case, this could be something like :username or :orderNumber.

We’ve also added props: true here to give the EventDetails component access to this dynamic segment parameter as a prop.

Since we’ve updated the path in this route, the path in the to attribute of our EventCard’s attribute now needs to be updated. Remember, it’s currently hardcoded as `to="event/123"`

```html
<!-- file: src/components/EventCard.vue -->

<template>
  <router-link to="event/123">
    <div class="event-card">
      <span>@{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>
```

A cleaner solution here would be to simply use a named route, where we bind `:to` an object that specifies which route this link routes to.

```html
<!-- src/components/EventCard.vue -->

<router-link :to="{ name: 'EventDetails' }">
```

Relevant Tangent: Now, we’ve also made our app a bit more scalable. In a bigger app with `router-links` throughout it, it becomes unnecessarily strenuous to maintain the paths in each `router-link` whenever they need to change. On the other hand, if your `router-links` used named routes, and your route’s path needs to change, you can simply change it once in the router file, and none of your `router-links` need to be updated since they aren’t relying on the path itself.

### Add event id to router’s parameters
At this point you might be wondering how we tell our dynamic :id segment what value it needs to be replaced by. We can do so by adding the params property onto our object here in the to attribute:

```html
<!-- file: src/components/EventCard.vue -->

<template>
  <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
    <div class="event-card">
      <span>@{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  }
}
</script>
```
Remember from a few lessons ago, this component has the event as a prop, so we can grab event.id from it and set the params id equal to it.

```html
<router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
```

Now, when we click on this router-link, we’re routed to EventDetails and the route’s path is appended with the event’s id.

We can now finally feed that id param into the EventDetails component as a prop.

```html
<!-- file: src/components/EventDetails.vue -->

<script>
import EventService from '@/services/EventService.js'
export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
```
Now, when we say getEvent(this.id), we’re referring to the newly added id prop. When EventDetails is routed to and thus created, it now makes a request for the event with the id that is found in the dynamic parameter of the route’s path.

### We’re almost there
If we check this out in the browser, we’re successfully able to click on an EventCard and display the proper details for that event. Great job following along this far, we’re almost to the end. If we pop open our developer console however, we’ll see an error:

What’s happening here is that EventDetails is trying to display the event’s details before it has received the event back from the API call. We need to tell our component to wait until it has the event before trying to display its details. Fortunately, that is a very simple fix.

```html
<!-- file: src/components/EventDetails.vue -->

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
```

By adding a simple v-if="event" on our div here, we can make sure it only renders when the event exists in our data.

### Cleaning up our Code
With that, we’ve finished our dynamic routing behavior. Now, I just want to clean a few things up before we end.

First, our EventCards don’t look as nice now that they’re wrapped with a `router-link`

Let’s add an event-link class to the router-link to make it look nicer:

```html
<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <...
  </router-link>
</template>

<style scoped>
...
.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
```

For consistency’s sake, we can also update the App.vue file to use named routes instead of hardcoded paths.

```html
<!-- App.vue -->

<div id="nav">
  <router-link :to="{ name: 'EventList' }">Events</router-link> |
  <router-link :to="{ name: 'About' }">About</router-link>
</div>
```
Again, this helps build in scalability to the maintenance of our app’s routes.

### Next steps
To continue learning about concepts like route params and other Vue Router topics, you can check out our entire Touring Vue Router course.

In the next lesson, we’re going to learn how to take our app and deploy it into production, using Render.

### Deploying with Render
At this point, our example app has all of the features we need it to for this course. We’ve covered a lot of concepts along the way and unpacked fundamental Vue app development practices. We’re now ready to take our project to the next step of any real-world application and deploy it out into the real world. In this lesson, we’ll understand what happens in the build process and how to smoothly deploy our app with a convenient platform called Render.

### What happens when we build our app?
Before we deploy our Vue app, it has to first be built. If this concept is new to you, I’m referring to the process of compiling all of our code into a state that is ready to release onto the Internet for people to use.

Remember earlier in the course, when we learned how the index.html file is the “single page” of our single page application? We looked at how our App is being loaded into the div with the id of "app" in this file:

```html
<!-- public/index.html -->

<div id="app"></div>
<!-- built files will be auto injected -->
```

Did you notice that below that div, there’s a comment telling us that when we build our app, the finished, deployable, built files will end up here? We can get a better grasp of what this looks like by running through the build process.

If we peek into our project’s `package.json` file, we’ll see these Vue CLI scripts available to us.

```json
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```
We’re already familiar with running the serve command in order to spin up our project on a local host. We’ve been using it throughout this course as we’ve developed the application code. Since we’re ready to take our project into the real world, we can move on to using the build command, which of course builds our project into a usable product that can be deployed. Let’s see what happens when we type the command npm run build in our terminal (while cd’d within the root of the project).

### Terminal

```shell
$ npm run build

⠏  Building for production...

 DONE  Compiled successfully in 9317ms                                                                                  4:19:32 PM

  File                                 Size                                        Gzipped

  dist/js/chunk-vendors.3002c4a1.js    141.24 KiB                                  50.80 KiB
  dist/js/app.f2213f62.js              5.08 KiB                                    1.98 KiB
  dist/css/app.d5e424b2.css            0.61 KiB                                    0.38 KiB

  Images and other types of assets omitted.

 DONE  Build complete. The dist directory is ready to be deployed.
```

As we see, our app was compiled successfully and output into a new `dist` directory. This directory contains the production-ready code that we will deploy.

Taking a look inside this new dist directory, we’ll see a folder for our CSS code, another one full of our now-bundled JS code, and an index.html file. Sure enough, when we look inside that new, production-ready index.html, we see that our built files have been auto-injected, just like that comment promised.

```html
<!-- dist/index.html -->

<div id=app></div>
<script src=/js/chunk-vendors.3002c4a1.js></script>
<script src=/js/app.f2213f62.js></script>
```

Now that we understand what this build process looks like, how do we actually go about deploying this code into production?

### A high-stakes headache
When talking about deployment, we’re actually talking about a rather complex and nuanced process.

To do it right, you’d need to:

* Find a web hosting service responsible for serving your app
* Hook up a custom domain for your site
* Get SSL - https certificates to ensure you have a secure domain
* Build the site locally, and drop those files into the server
* Ensure everything is being served correctly

Once your app is deployed, there are additional concerns around maintaining it and continuing to deploy new and improved versions of it in a stable way, and ensuring you can roll back to earlier versions in an emergency. This can all be quite a pain. If you aren’t confident about what you’re doing, it’s a pretty high-stakes risk to take all of this on solo.

Fortunately, there are platforms that do a lot of the heavy lifting of deployment (and re-deployment) for us. Which brings me to our solution of choice, which we’ll be learning about in this lesson: Render.

### Render to the Rescue
Render provides instant deploys for your apps. You simply connect it up to your project’s repo, and it automatically builds and deploys your app onto a live site that users can see and interact with. It can also perform automatic updates for you so that whenever you push to your repo, Render automatically rebuilds and deploys your site with no additional work on your end.

In order to get started using it to deploy our Vue app, we’ll just create a free account.

You’ll be emailed a verification link, which you’ll click to enter into your new account. Once you’re in, you’ll see that there are a number of services available within Render. We’re going to start off by clicking the blue New + button, which reveals a dropdown with some options.

As you can see, we’re able to deploy a Static Site served over a global CDN with the ability to add a custom domain, plus SSL out of the box. If you’re not familiar, SSL (Secure Sockets Layer) is a protocol for web browsers and servers that allows for the authentication, encryption, and decryption of data sent over the Internet. In other words: it’s a built-in security measure that comes free with Render.

We’ll select this Static Site option to deploy our Vue app with Render, which prompts us to select a repo for the site that we want to deploy. Since we haven’t yet connected any repos to our Render account, we’ll click on the “Github” link to do so. If you’re not already logged into Github, you’ll sign in to install Render within your Github account and select the repo you’d like to connect.

IMPORTANT: In order to follow along with these steps, you’ll need to fork the Vue Mastery course repo to your personal Github account. That way, you’ll be able to connect the forked repo at this step.

Upon clicking install, you’ll be redirected back to Render, where you should now see that newly connected repo showing up.

Now we’re ready to select that repo and deploy it as a static site, which is a very straightforward process. As the page intelligently says: “You seem to be using Vue.js, so we’ve autofilled some fields accordingly.”

We’ll give our state site a Name; I’m calling it “Real World Vue 3”.

As for the Branch, this is where you’d typically select Master (which is the default selection) since most apps deploy the Master branch of their repo. However, in our case, since I’ve been building the app incrementally with each new lesson ending with its own ending branch, we’re going to select L6-end since this includes the final code for our entire example app.

We can leave the autofilled Build Command unchanged, as well as the name of the directory to publish to: dist (look familiar?).

There are additional Advanced options as well, including the ability to Add Environment Variables and/or a Secret File, but we’ll skip those for now.

I do want to bring your attention to the Auto Deploy field, though, which is set to “Yes” by default. This means our app will be automatically redeployed whenever a change is pushed to this branch, which is a pretty awesome feature. If we wanted to handle this manually, we’d toggle this to “No” and we could instead trigger a manual deploy with the button of the same name.

Now we’re ready to hit the Create Static Site button and watch Render bake our site into a delicious live site.

### Adjusting for History Mode
We can now click on the link Render created for our site, which in my case is https://real-world-vue-3.onrender.com, to view our app live!

As we click around, it looks like it’s working. But watch what happens when we open a new tab and try going to a specific page, like: https://real-world-vue-3.onrender.com/event/123

Uh oh… we’re getting a “Not Found” message, and there’s this 404 error in the console. Why is this happening?

In the Vue Router Essentials lesson, I briefly mentioned how our router is using history mode because we selected that option when we created our project from the Vue CLI. Well that just became very relevant.

```js
// file: src/router/index.js

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
```

In history mode, our app is taking advantage of the browser’s history.pushState API to change the URL without reloading the page.

The problem we’re currently running into is the fact that our app is a single page app, which means everything needs to be served from index.html. While our development server was configured to work this way for us, we need to configure Render’s rules so that it knows to always serve up index.html, no matter what url we navigate to.

We can do this very simply within the Redirect / Rewrite tab of our static site’s dashboard:

We’ll add a catchall of /* and tell it to always Rewrite to /index.html Now, no matter what url we request, it will be served from index.html. Problem solved.

By the way... If you’re wondering why everything seemed to work fine initially, before I pasted that url into a new tab and everything broke, that’s because when we first visited our new site, we visited the root route (’/’) which inherently served up index.html, and history mode took over from there.

With that catchall implemented, we’ve now solved our issue and successfully deployed our site. Before we end, let’s tour Render a bit more to understand what else is possible.

### Touring Render
We already looked at the Redirects / Rewrites tab, but there are other tabs here that are just as useful, such as Events, which shows a history of deploys that have been made. This is where we can perform a rollback to a previous build if necessary.

Under the Pull Request tab, you can enable pull requests and Render will automatically create a new instance of your site any time a pull request is created on your deployed branch. With its own URL, it can be used to review code before merging and will be deleted automatically when the PR is closed. This makes testing and collaboration easier.

Speaking of collaboration, you can also create and work within teams on Render, which an individual account holder can create from their dropdown here:

### Render scales with you
As your app scales, perhaps with a more robust backend or some server-side rendering, you can scale up your Render services, too—horizontally (add more instances of a service) or vertically (add more CPU and RAM to an instance)—with features including:

Web services
Managed PostgreSQL databases
Cron jobs
Private services
Background workers
And you can choose from several environments:

Docker
Node
Ruby
Go
Elixir
Python
Rust

A Helpful Community Forum
If you ever get stuck while using Render, they also have a community form that can help you get unstuck. In fact, they’ve even created a “Vue Mastery” category to address any issues you may run into while following this lesson.

### What’s next?
Now that we’ve finished coding our app and deployed it out into the wild, where do we go from here? There are many more features to add and concepts to unpack, and in our next lesson we’ll take a look at the different ways we can take this app to the next level. See you there!

Please note that Vue Mastery is an affiliate of Render. As our subscribers choose to use their services, our work at Vue Mastery receives compensation, a percentage of which is given back to support the Vue.js framework.

## Scaling the app
We’ve reached the final lesson of this course, and I want to congratulate you for following along until the end. We’ve built a simple yet solid Vue app and deployed it out into the world. So where do we go from here? There are a number of features we could add, and additional concepts within the Vue framework (and ecosystem of tools) to learn. So what should a Vue developer master next?

In this lesson, I’m going to give a tour of what potential next steps we could take to scale up our app in different directions. This will simultaneously provide some guidance around how to continue with your Vue learning journey and how to best utilize the Vue Mastery platform to level up your skills.

### What’s next?
If you take a look at our courses page, you’ve probably already noticed we have our library of content arranged in different paths. These paths are arranged in the suggested order for consuming our courses. Having said that, your ideal next course ultimately depends on your current needs and pressing interests.

So let’s explore some of the main Vue concepts and how a number of our course addresses them.

### Vue 3 Forms

If we continued building out our Events for Good app beyond this course, we’d need a production-ready form that enables users to create new events. Forms are arguably one of the most important parts of any app, allowing us to intake important information from our users. A well done form (or a poorly done form) can ultimately affect a company’s bottom line in significant ways.

When building forms with Vue, you don’t just want to build a form that serves a specific purpose. You’ll want to know how to build a set of base form components that are highly reusable so they can be used and reused in a modular way throughout any of your Vue apps.

From inputs to checkboxes and radio buttons, our Vue 3 Forms course walks through best practices as you develop a set of form components you can take with you into any of your future projects.

### Mastering Vuex
If we’ve implemented the ability for users to create new events, we’ll want a nice global location to store those events once they’re created. As our app’s component tree grows, it becomes increasing harder to manage the data within our app; as it’s created, updated, and displayed. This brings us to Vuex: Vue’s official library for state management.

When we created our project with the Vue CLI, we selected Vuex. But what purpose, exactly, does it serve?

As a Vue app grows, and you have more and more views and components within those views, you’ll need to have a reliable and predictable way to manage how that data is stored, sent around, and changed, within your app.

Notice how this store folder was installed into our project by the CLI. You can think of Vuex as the storage center for data throughout your app. Let’s look inside the store’s index.js:

In short, the store provides us with what we need to keep track of the state of things within our app, and update that state in an organized modular way that is predictable and traceable.

Please be aware that this course’s example app uses an earlier Vue 2 version of the app we built in this course. The reason we do not have a Vue 3 version of our Vuex course is because there has not been a major reworking of Vuex for Vue 3. The syntax for how Vuex is used and the concepts behind how it works are all the same whether you’re using Vue 2 or Vue 3. If you take the Mastering Vuex course and code along with it, I do suggest you use the example app from this Real World Vue 3 course and add the new Vuex features to it.

### Touring Vue Router
While we covered the essentials of Vue Router in this course, I’ve mentioned how there are plenty more navigation-based abilities available to us with this handy routing library, and our Touring Vue Router course covers many of them.

So if your app needs features like pagination, guards on certain routes that limit user access, or if you need to enable programmatic navigation or nested routes, this course takes you beyond the essentials and tours various features within this routing toolset.

### Beyond the beginner’s path

If you take the courses outlined so far, you’ll have broadened and reinforced your knowledge of fundamental production-level Vue practices. You’ll then be ready for our more intermediate courses that cover everything from strengthening your Vue apps with Unit Testing, to adding User Authentication, and integrating with popular libraries within the Vue.js ecosystem such as Nuxt.js and Vuetify.

### You’ve made it
With that, I hope you feel clear about what your next steps are on your path to Vue Mastery. I wish you well as you level up your skills and expand the opportunities that become available to you as you become increasingly skilled with this powerful JavaScript framework. See you in another course!

