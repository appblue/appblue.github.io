---
title: Vue.js 3 - Part One
description: Introduction to building applications in Vue.js 3
date: 2021-04-27
draft: false
tags:
    - vue cli
---
## Vue CLI - Creating the Project
In this tutorial, we’ll create our project using the Vue CLI. We’ll then look at the Vue UI, a graphical user interface for managing our project. We’ll end by touring the project that the CLI generates for us to get comfortable working within these files and folders.

### Why a CLI?
As you probably know, CLI stands for Command Line Interface, and the Vue CLI provides a full system for rapid Vue.js development. This means it does a lot of tedious work for us and provides us with valuable features out-of-the-box.

* It allows us to select which libraries our project will be using
* Then it automatically plugs them into the project.
* It Configures Webpack

When we build our app with Webpack, all of our JavaScript files, our CSS, and our dependencies get properly bundled together, minified and optimized.

* It allows us to write our HTML, CSS & JavaScript however we like
* We can use single-file .vue components, TypeScript, SCSS, Pug, the latest versions of ECMAScript, etc.
* It enables Hot Module Replacement (HMR)
* When you save your project, changes appear instantly in the browser.

### Installing the CLI
In order to use the CLI, you’ll need to have Node.js version 8.9 or above (v10+ recommended).

To install the CLI, run this command in your terminal:

```shell
$ npm i -g @vue/cli
# OR
$ yarn global add @vue/cli
```
Once it is installed, you’ll have access to the vue binary in your command line. We’ll use this to create our project.

### Creating a Vue project
There are two ways we can create our project. With the Vue UI, or directly from the command line, which we’ll do now by running this command in our terminal:

```shell
$ vue create real-world-vue
```

This command will start the creation of a Vue project, with the name of “real-world-vue”. You’ll then be prompted with the option to pick a default preset or to manually select features using following steps:

* Using the down arrow key, we’ll highlight Manually select features, then hit enter. 
* You’ll then be presented with a list of feature options. Using the down arrow key, we’ll move down and use the spacebar to select Router, Vuex and Linter / Formatter. Then hit enter.
* Next up, we’ll select the version of Vue.js that we want to use. Of course, we’ll select Vue 3 here.
* Then we’ll say Y (yes) to using History mode for Vue Router.
* You’ll then be asked to choose a Linter / Formatter, which is entirely up to you. Go ahead and choose ESLint + Prettier and tell it to Lint on save.
* And for the sake of this tutorial, please choose to have dedicated config files, but you could also keep them in package.json. Again, this is totally up to you.
* You will have the option to save all of these settings as a preset. For now please choose not to with N. If you’d like to save this as a preset, however, it will be stored in a JSON file named .vuerc in your user home directory.
* When you finally hit enter, your project will be created automatically.

### Serving our Project

Once our project is done being created, we can cd into it. In order to view it live in our browser, we’ll run the command npm run serve, which compiles the app and serves it live at a local host. Our app is running live in the browser. It already has two pages, the Home page and the About page, which we can navigate between because it’s using `Vue Router`.

### Vue UI

Now that we understand how to create a Vue project from the command line, let’s repeat this same process but with the Vue UI instead, which is an intuitive visual way to manage our Vue projects.

Since we already have access to the vue binary, we can type vue ui in our terminal, which will start up the Vue UI in our browser.

To create a project in here, we’d click the Create tab, select the location where we want to save our project, then click Create a new project here. This will guide us through all of the project configuration steps we just went through from the terminal.

#### Vue UI Features
From the UI dashboard, we can do things such as monitor for plugin and dependency updates for our project and perform vulnerability checks. You can also add plugins to your project from the Vue UI, which makes it very simple to add a library that you may need, such as Vuetify. We won’t be installing this plugin, but if you’re interested in learning about this component design framework, we have an entire Vuetify course.

Additionally, we can view all of the dependencies our project is using and add new dependencies from the UI. The UI also has a tab for us to configure the project globally and configure ES-Lint rules and more.

There is also a tab to run tasks on our project. When we run tasks, like serve, we get a lot of helpful visual feedback about our app and how it’s constructed and performing.

If you want to import a project that you hadn’t originally created from within the Vue UI, you can easily do so from the Import tab of the Project Manager. Just locate your project, and click Import this folder.

### Touring our Vue Project

Now that we know how to create our project from the terminal and also from the UI, let’s take a look at the project that was created for us.

* The `node_modules` directory is where all of the libraries we need to build Vue are stored.
* In the `public` directory, you can place any static assets you don’t want to be run through Webpack when the project is built.
* The `src` directory is where you’ll spend most of your time since it houses all of the application code.
* You’ll want to put the majority of your assets, such as images and fonts, in the `assets` directory so they can be optimized by Webpack.
* The `components` directory is where we store the components, or building blocks, of our Vue app.
* The `router` folder is used for Vue Router, which enables our site navigation. We use Vue Router to pull up the different “views” of our single page application.
* The `store` is where we put Vuex code, which handles state management throughout the app. By the end of this course, you’ll have a basic understanding of what Vuex is for, but we won’t be implementing any Vuex code. This course serves as a foundational course that prepares you for our Vuex course.
* The `views` directory is where we store component files for the different views of our app, which Vue Router loads up.

The `App.vue` file is the root component that all other components are nested within.

The `main.js` file is what renders our App.vue component (and everything nested within it) and mounts it to the DOM.

Finally, we have a .gitignore file where we can specify what we want git to ignore, along with a babel.config.js file and our package.json, which helps npm identify the project and handle its dependencies, and a README.md.

How the App is Loaded
You might be wondering now, how is the app being loaded? Let’s take a look at that process.

```javascript 
    // file: src/main.js

    import { createAPP } from "vue";
    import App from "./App.vue";
    import router from "./router";
    import store from "./store";

    createApp(App)
      .use(Router)
      .use(Store)
      .mount("#app");
```

In our `main.js` file, we’re importing the createApp method from Vue, along with our App.js component. We’re then running that method, feeding in the App (the root component that includes all of our application code since all other components are nested within it).

As the method name explicity states, this creates the app and we’re telling it to use the Router and Store that are imported above. Finally, the app is mounted to the DOM via the mount method, which takes in an argument to specify where in the DOM the app should be mounted. But where exactly is this id of `"#app"`?

If we peek inside our index.html file, we can see there’s a div with the id of `"app"`, with a helpful comment below it.

```html
<!-- public/index.html -->

<div id="app"></div>
<!-- built files will be auto-injected -->
```

Ah. So this is where our Vue app is being mounted. Later, we’ll gain a deeper understanding of how this index.html serves as the “single page” of our single page application.

### Wrapping Up

You should now have an understanding of how we can create a Vue project and how to manage it from the Vue UI. We also explored the project that was created for us to get ready to start customizing this project. In the next lesson, we’ll build our first single file .vue component.

## Single File Components

Now that we’ve created our project with the Vue CLI, we’re ready to start customizing it to build our own app.

If you’re coding along (which I encourage you to do) you’ll want to checkout the L3-start branch of our project repo to grab the starting code (L3 stands for Lesson 3). In that code, I want to bring your attention to this file I’ve added:

```javascript
// file: prettierrc.js

module.exports = {
  singleQuote: true,
  semi: false
}
```

Here, I’ve set up some rules so that Prettier will change any double quotes (") to single ones (') and remove any semicolons (;). I’m not advocating for or against semicolons and double quotes. This is a simple example of how you might add some Prettier configuration rules to your project. We could do something similar for ESLint as well. For a more in-depth look at how you can configure ESLint + Prettier as well as get the most out of VS Code, you can check out this article.

### What are these .vue files?

In order to start building our app, we need to get some foundational understanding of how things are working within the demo app the CLI created for us, including the views directory, which includes two single-file .vue files: Home.vue and About.vue

These are the components that Vue Router loads up when we navigate to the Home and About routes, respectively.

In the next lesson, we’ll explore the essentials of Vue Router, but for now you just need to understand that these “view” components are the different views that can be seen (or navigated to) within our app. They can contain child components that are nested within them, and their children will be displayed in that view as well. For example, the Home.vue component has a child: HelloWorld.vue, which has a bunch of template code that is being displayed when we’re on the Home route.

Each of these .vue files are single file components, and that’s what this lesson is exploring: How are single file components composed, and how do you use them to create a Vue app?

## Anatomy of a Single File Component

When we’re talking about Vue apps, we’re really talking about a collection of Vue components. So what do these single file components look like under the hood?

A typical `.vue` component has three sections: `<template>`, `<script>`, and `<style>`.

To use the analogy of a human body, you can think of the template as the skeleton of your component since it gives it structure, and the script section is the brains, providing the intelligence and behavior. The style section is exactly what it sounds like: the clothing, makeup, hairstyle, etc.

Traditionally, these sections are written in HTML, JavaScript and CSS. However, with the proper setup, you could also use alternatives such as Pug, TypeScript, and SCSS.

Now that we’re starting to understand single file components, we can start building our own. But first, what are we building in this course, exactly?

### The app we’re building

By the end of this course, we will have built an app that display events.

The events will be pulled in from an external API call, and displayed on the Home page. We’ll be able to click on the event to see the event details.

### Our first Single File Component

To get started building our first component, we’ll simply delete out the code that is within the `<template>`, `<script>`, and `<style>` sections of HelloWorld.vue. While we’re at it, let's rename this file to EventCard.vue, since it’s the card that displays info for each event.

```html
<!-- src/components/EventCard.vue -->

<template>
  <div class="hello">
  </div>
</template>

<script>
export default {
  name: 'EventCard'
  // props: {
  //  msg: String
  // }
}
</script>

<style scoped>
</style>
```

Now that this file is cleared out, we can add our own code to it. First, let’s add some styles. We’ll change the class name on the div in order to do that.

```html
<!-- src/components/EventCard.vue -->

<template>
  <div class="event-card">
  </div>
</template>

<script>
export default {
  name: 'EventCard'
  // props: {
  //  msg: String
  // }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
```

Now the div has the proper styles, including a hover effect. If you’re wondering what that scoped attribute means, that allows us to scope and isolate these styles to just this component. This way, these styles are specific to this component and won’t affect any other part of our application. You’ll see me using scoped styles throughout this course.

Since we want to display information about the event on this EventCard, we need to give it an event to display. So let’s add that in the data option of our `<script>` section.

```html
src/components/EventCard.vue

<script>
export default {
  name: 'EventCard'
  // props: {
  //  msg: String
  // },
  data() {
    return {
      event: {
          id: 5928101,
          category: 'animal welfare',
          title: 'Cat Adoption Day',
          description: 'Find your new feline friend at this event.',
          location: 'Meow Town',
          date: 'January 28, 2022',
          time: '12:00',
          petsAllowed: true,
          organizer: 'Kat Laydee'
       }
     }
   }
}
</script>
```

Now, in the `<template>` we can display some of that event data with JavaScript expressions, like so:

```html
<!-- src/components/EventCard.vue -->

<template>
  <div class="event-card">
    <span>@{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
</template>
```

That’s it for the component for now.

In order for this EventCard to be displayed, it needs to be put somewhere that can be routed to, such as the Home.vue file in our views directory. Just like with the HelloWorld.vue file, we’ll need to import EventCard.vue, register it as a child component, and then we can use it in the template.

```html
<!-- src/views/Home.vue -->

<template>
  <div class="home">
    <EventCard />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'Home',
  components: {
    EventCard // register it as a child component
  }
}
</script>
```

Now, we should be seeing our EventCard showing up in the browser when we’re on the Home view.

### Refactoring for a more production-ready use case

We’re making great progress, but remember we want the EventCard to be displaying in the middle of the Home page. And, since we’ll eventually have a collection of events that we pull in from an API call, we need to do a bit of refactoring to make this a more production-ready use case.

Our refactoring steps include:

* Move events data to parent (Home.vue)
* Parent creates EventCard component for each event in its data
* Parent feeds each EventCard its own event to display
* Parent displays EventCards in a Flexbox container
* Let’s get started with this refactor.

#### Move events data to parent

Our first step is to delete out the event data from EventCard. We’ll then add an event prop instead, so that the parent can feed this component an event object to display. We’re then left with this code:

```html
<!-- src/components/EventCard.vue -->

<template>
  <div class="event-card">
    <span>@{{ event.time }} on {{ event.date }}</span>
    <h4>{{ event.title }}</h4>
  </div>
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

<style scoped>
.event-card {
  padding: 20px;
  width: 250px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>
```

Now that EventCard is set up to receive an event, we can add the events data to the parent, Home.vue.

```html
<!-- src/views/Home.vue -->

<template>
  <div class="home">
    <EventCard />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'Home',
  components: {
    EventCard
  },
  data() {
    return {
      events: [
        {
          id: 5928101,
          category: 'animal welfare',
          title: 'Cat Adoption Day',
          description: 'Find your new feline friend at this event.',
          location: 'Meow Town',
          date: 'January 28, 2022',
          time: '12:00',
          petsAllowed: true,
          organizer: 'Kat Laydee'
        },
        {
          id: 4582797,
          category: 'food',
          title: 'Community Gardening',
          description: 'Join us as we tend to the community edible plants.',
          location: 'Flora City',
          date: 'March 14, 2022',
          time: '10:00',
          petsAllowed: true,
          organizer: 'Fern Pollin'
        },
        {
          id: 8419988,
          category: 'sustainability',
          title: 'Beach Cleanup',
          description: 'Help pick up trash along the shore.',
          location: 'Playa Del Carmen',
          date: 'July 22, 2022',
          time: '11:00',
          petsAllowed: false,
          organizer: 'Carey Wales'
        }
      ]
    }
  }
}
</script>
```

#### Parent creates EventCard components

Now that Home.vue has the events data, we can use that data to create a new EventCard for each of the event objects that are in that data, using the `v-for` directive.

```html
<!-- src/views/Home.vue -->

<template>
  <div class="home">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'Home',
  components: {
    EventCard
  },
  data() {
    return {
      events: [
        {
          id: 5928101,
          category: 'animal welfare',
          title: 'Cat Adoption Day',
          description: 'Find your new feline friend at this event.',
          location: 'Meow Town',
          date: 'January 28, 2022',
          time: '12:00',
          petsAllowed: true,
          organizer: 'Kat Laydee'
        },
        {
          id: 4582797,
          category: 'food',
          title: 'Community Gardening',
          description: 'Join us as we tend to the community edible plants.',
          location: 'Flora City',
          date: 'March 14, 2022',
          time: '10:00',
          petsAllowed: true,
          organizer: 'Fern Pollin'
        },
        {
          id: 8419988,
          category: 'sustainability',
          title: 'Beach Cleanup',
          description: 'Help pick up trash along the shore.',
          location: 'Playa Del Carmen',
          date: 'July 22, 2022',
          time: '11:00',
          petsAllowed: false,
          organizer: 'Carey Wales'
        }
      ]
    }
  }
}
</script>
```

Notice how we’re binding the event’s id to the `:key` attribute. This gives Vue.js a way to identify and can keep track of each unique EventCard.

#### Parent feeds each EventCard its own event

Additionally, as we iterate over the events array to create a new EventCard for each event object, we’re passing in that event object into a new `:event` prop we’ve added to the EventCard. This way, each EventCard has all of the data it needs to display its own event info.

#### Parent displays EventCards in a Flexbox container
If we check this out in the browser, it’s working. We’ve created an EventCard for each of the events in `Home.vue` data.


Finally, we just need to put these events in a Flexbox container to get things looking how we want. Let’s head into the `Home.vue` file and change the class name of the `div` that our EventCard is nested within, and add some Flexbox styles.

```html
<!-- src/views/Home.vue -->

<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
...
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
```

Now, our EventCards will be displayed within a center-aligned column.

### What about Global Styles?

So far, we’ve discussed scoped styles and how the scoped attribute allows us to add styles that target the specific component we’re concerned about. But what about global styles that we want applied to our entire app? While there are different ways to achieve this, the simplest way to get started with this is by heading into the App.vue file. Remember: this is the root component of our app.

Notice that there are some styles rules that the CLI set up for us in this component’s `<style>` section.

```html
<!-- src/App.vue -->

<template>
...
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
```

These are global styles that are applied to the entire app. Here, we could add a new rule. Like so:

```html
<!-- src/App.vue -->

<style>
...
h4 {
  font-size: 20px;
}
</style>
```

Now, any h4 in our app will have a font-size of 20px. Since our EventCard’s template has an h4, that element will receive this new global style.

```html
<!-- src/components/EventCard.vue -->

<div class="event-card">
  <span>@{{ event.time }} on {{ event.date }}</span>
  <h4>{{ event.title }}</h4>
</div>
```

Speaking of global items in our Vue app, what would happen if we added something like an h1 to our App.vue’s template?

```html
<!-- src/App.vue -->

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <h1>Events For Good</h1> <!-- new element -->
    <router-view />
  </div>
</template>
```

Let’s head into the browser and take a look.

We’re seeing a few things. First, our Flexbox container is working and the event titles are now just a bit bigger (20px) due to that new global h4 style rule we added. And notice what happens when we navigate to the About route.

We’re still seeing that `h1` displaying “Events For Good”. So this tells us that we can place content in our App.vue’s template that we want to be displayed globally across every view of our application. This could be useful for things like a search bar, header, or of course a nav bar like we already have here.

But for our use case, we don’t need that title showing up in every view, so we’ll place it into the Home.vue file.

```html
<!-- src/views/Home.vue -->
<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
```

Now that title will only show up one the Home route.

### Let’s ReVue
We’ve covered a lot. We learned what a single file .vue component is, how it’s composed (with scoped versus global styles), and how to start using these .vue components to build up a Vue app. In the next lesson, we’re going to dive deeper into the essentials of Vue Router to better understand how to set up app navigation. See you there!

