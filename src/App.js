// Import a library to help create a component
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

console.ignoredYellowBox = [
  'Setting a timer',
  'Warning: In next release empty',
  'Warning: React',
  'Warning: Can',
  'Unable to symbolicate'
];

// Create a component
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDRhNtjqtcr0ibVZdXouJJ_IScc18KJqnc',
      authDomain: 'manager-20304.firebaseapp.com',
      databaseURL: 'https://manager-20304.firebaseio.com',
      projectId: 'manager-20304',
      storageBucket: 'manager-20304.appspot.com',
      messagingSenderId: '701008130703'
    };
    firebase.initializeApp(config);
  }


  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}




// Make the component available to other parts of the app
export default App;




/*
here we will have a class based component

don't forget to install in the cmd react-redux and redux
npm install --save react-redux redux
*/

/*
we must make sure we pass our Provider tags
an instance of redux store

the Provider tag is what connects to all the different connect tags
we have in our componenets.

the Provider also makes sure all of these connect tags
can access to the redux store, grab our redux state
and then pass this state to an individual components.

<Provider store={createStore()}>

we can now wire it to our index.android.js and index.ios.js files
at the top levels.
*/

/*
now we need ot make sure we pass our store a reducer.

this initializes the state in the store
(since the reducer manipulates and pass the new data to the state).

we created our dummy reducer in the reducers folder inside index.js
and then imported it and passed it to our store.

now we can see our Hello!
*/

/* firebase

since we are using firebase for authentication in this App
we need to set up our default firebase configuration

and we also need to set up a new firebase project
in the firebase console.

first we need to install our firebase javascript library

npm install --save firebase

dont forget to import the firebase library.

here we need to do 3 things:

enable authentication for our app.
enable our sign in method, in our case email and password sign in.
copy paste that default web setup to link our poject to this authentication
(can find it in the right top side in the browser inside the firebase website).
we copy just the

var config = {
    apiKey: "AIzaSyDRhNtjqtcr0ibVZdXouJJ_IScc18KJqnc",
    authDomain: "manager-20304.firebaseapp.com",
    databaseURL: "https://manager-20304.firebaseio.com",
    projectId: "manager-20304",
    storageBucket: "manager-20304.appspot.com",
    messagingSenderId: "701008130703"
  };
  firebase.initializeApp(config);

without the script tags

make sure u change the var
to const

and change the double quotes
to single quotes

*/

/* From now on:
react will be to show something to the screen
redux will be to store our app state (the data)
and to do the logic of the app (the decision making).

first we will pull our common components

*/

/*
lets now implement our LoginForm component
inside our app component

render() {
  return(
    <Provider store={createStore(reducers)}>
      <LoginForm />
    </Provider>
  );
}

*/

/* wiring up redux-thunk

after we added the loginUser action creator
we can now import the redux-thunk library.

we also deleted the View and Text imports since we do not usem.

redux-thunk is called a middle ware,
we are wiring up a middle ware to our redux application.

to include any type of middle ware
we have to import a helper from redux as well, applyMiddleware.
import { createStore, applyMiddleware } from 'redux';

and now we will wire it up to our store
from
<Provider store={createStore(reducers)}>
  <LoginForm />
</Provider>

to
<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
  <LoginForm />
</Provider>

since it is a long line we can refactor it a bit to look nicer
to

render() {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}

second argument, {}
is for any initial state we might want to pass to our redux application.
mostly used for server side rendering.

third argument,
are what is called "store enhancers"
so our applyMiddleware(ReduxThunk) is a store enhancer
because it adds additional functionality to the store.

so this is how we wire up redux-thunk.

now that we have installed it we can make use of it inside
our action creator/s.
go back to our actions.js file
*/

/* important note!!!!!!!!
With the latest versions of the various packages,
authentication no longer works with createStore() in the App components render method.
Moving it to just below the imports and above the class declaration
(as the React docs suggest at http://redux.js.org/docs/basics/Store.html)
works:

[imports]

let store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {

...

*/

/* navigation with react-native: react-native-router-flux library
after we have our authentication working
we will start working on navigation with react-native.

unlike react js, which is for web development, that has the router library
to navigate between windows
react-native does not have a single standard library for all navigation.

we will use one possible solution,
this is considered a good solution but there are more solutions
for navigation in react-native.

we will use a react-native library called
react-native-router-flux

first lets install this library
npm install --save react-native-router-flux
and since we want a very specific version of this we will do
npm install --save react-native-router-flux@3.35.0

*/

/*
when a user press the login button
we the developer need to direct him to the employees screen.

jumping between the login flow
and the main flow
(look at the part 2, slide 1,
navigation in react native, how does react router flux works picture).
is more a direct programatic thing.

we will do it our selves as a developer.

so how do we use the navigation library that we just installed?

in the main flow we want to be able to go forword and back
between the screens as explained in the picture.

in the routing library there is something that is called
a scene.

a scene is how we organize a distinct page
that our user can navigate to.

a scene is a component that we are going to import from
the routing library.

in our application we have 3 distinct screens,
the login screen
the employees list screen
the employee create screen

since we have 3 screens we expect to have 3 scene components.
(look at the part 2, slide 2, scene explanation picture).

every scene component match up an existing component
using a key property.
this key property describe what does this scene shows.



how does the scene component work with the routing library?

the most challanging thing about this scene api is
just understanding what are all the props we can pass
to the scene are.

(look at part 2, slide 3,
how does scene component works with the routing library picture
for an explanation of each prop).

again, one scene component for each distinct screen in our application.

scene component has 4 big properties we are going to care about,
there are more props but these are the ones we are going to use
like 90% of the times in our applications.

<Scene
  key="login"
  component={LoginForm}
  title="Login"
  initial
/>

first prop is key,
the key is important and is different from the keys we used when
we made a list of react components.
this key IS NOT RELATED to list building keys,
the keys we used when we used map to build up
a list in our tech stack app.

the key is how we navigate around between screens in our application.
call Actions.login() to show this screen.

important!
the key has nothing to do with list building
it has to do with how we identify a particular screen.

second prop is component,
we tell the scene what component we want it to show.

third prop is title,
react-native-router-flux has a build in header component for us to use.
we made a header in the past but we will not be using that one.
we are going to use the one that is provided by this library.
there is a very good reason for that and we will it discuss when we start
using this header.
we should tell a scene what its title should be
so it will put that title on the navigation bar
that will be automatically created for us.

fourth and last prop is initial,
out of all of the different scenes I got in my application
when the app first boots up
I want to show this scene in particular.
we are going to have 3 different scenes and we want to show
the login screen first no matter what.


*/

/* implementation of scenes in our app

first lets make in our src folder a new file
called Router.js
(move to that file).

after we made the Router component
lets import it and implement it in the our app component.
import Router from './Router';

we will replace our <LoginForm /> inside the

render() {
  return(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}

to

render() {
  return(
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

we can now also delete the import of the LoginForm.


*/

/* BIG PROBLEM I HAD TO SOLVE

I had to do
npm update

I had to delete the node_modules folder from the project
and reinstall npm in the project folder using the cmd.
npm install

then I had to install the current version of
react-native-router-flux
npm --save react-native-router-flux

with no specific version specified,
in the guide they said to use a specific version that was outdated.

*/

/* summery and dealing with the display bug

summery so far:
the router tag organizes all the different scenes
we are going to put togther for our application.

each scene crossponds to one distinct screen
that we want to show to the user.

if we provide a title prop to the scene
the routing library will automatically generate
a header component for us and place it inside our application.
the component property inside the scene tag
tells the scene what component it should show.
and the key property will be used when we want to navigate
between different scenes in our application.
the initial property is used to figure out what should be
the first scene to show inside of application,
at this moment we only got one scene so we don't need to use it yet.

then we imported it to our app component
and placed it inside the render method.

the magic here is,
we placed the router tag and it figures out on its own
what to show to the screen for us.




dealing with not seeing the email input bug:

now we need to solve the display bug we have,
we don't see the email input.

we need to customize the navigation bar at the top
as much as we want.
by default we are getting something that can be heavily customized.

lets add some styling to fix this.
we are going to add global styling changes
by passing a property called
sceneStyle
to the router.
(move to the router component to add this)

this sceneStyle is considered global
because it will effect all of the scenese in our app.

after we added this style as we did in our router component
we can now see our email input tag.

since we added global styling
we need to check it works on other platforms as well.

*/

/* not showing errors to the user

I added into App.js the line

console.ignoredYellowBox = ['Setting a timer'];

this was to prevent showing an error firebase has at this moment,
"Setting a timer....."

I also added

console.ignoredYellowBox = ['Warning: In next release empty'];

to not show the user this particular error on the screen when
the user logs into the app.

I only did this for these specific errors
because I still want to see other erros that pop up.

note:
you need to add both warnings into the same
console.ignoredYellowBox
as follows:
console.ignoredYellowBox = ['Setting a timer', 'Warning: In next release empty'];

you can hide errors by using the
console.ignoredYellowBox = [''];
and adding between the '' what is written
in the yellow error (you can write just the start of it).

*/

/* making the release apk

https://facebook.github.io/react-native/docs/signed-apk-android.html#enabling-proguard-to-reduce-the-size-of-the-apk-optional
this explains how to do it

don't forget to run the cmd as admin when you do this.

go to
C:\Program Files\Java\jdkx.x.x_x\bin
in the cmd
and use the command:
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
fill the fields required
and remember the password
to generate a keystore.
save that key store!
and rememeber the password.
after you created the keystore, it will be in
C:\Program Files\Java\jdk1.8.0_111\bin
(same folder as where you need to go to).

take this keystore and put it in:
E:\reactnative\manager\android\app


in the file
E:\reactnative\manager\android\gradle.properties
add the:
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****

make sure you change the password to the password you choose
when you made the keystore.

in the file
E:\reactnative\manager\android\app\build.gradle
add the:
signingConfigs
with all the other parts
as explained in the website at the top.

then go to:
E:\reactnative\manager\android
in the cmd
and do
gradlew assembleRelease


The generated APK can be found under
E:\reactnative\manager\android\app\build\outputs\apk

*/
