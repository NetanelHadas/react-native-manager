import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('manager', () => App);



/*
 first thing's first

first install your dependencies which are react-redux and redux
using the Cmd in the project's folder.

npm install --save react-redux redux

react-redux is the binding between react and redux.

can also install eslint if we want (shows mistakes in code).

second thing

set our root componenet, App.js
our root componenet is where we will have our redux store
using the provider tags.

and make sure our index files
index.android.js
and index.ios.js
point to that root componenet.

third thing

move our commmon componenets
*/

/*
make sure to return our App component

so change
AppRegistry.registerComponent('manager', () => manager);
into
AppRegistry.registerComponent('manager', () => App);

*/

/* LoginForm

we don't have to use redux in the authentication process but
we will use redux in our login process
because at some point in time our application will grow in complexity
and keeping track of everything that have to do with the authentication
in the redux store will save us on computation time.

important!!!
instead of keeping the pieces of state inside of our componenet's state (componenet level)
we will keep them in the state that is in the store instead (redux/application level).

we notice that we start to move componenets from a
very intelligence pieces of software that manage pieces of state
to simple componenets that behave more like templates

they now get data and create jsx

we want to pull out logic and keeping track of states
outside of our components
and push it to redux instead.

previewsly our LoginForm had a lot of logic in it, it was intelligent.
using redux we want to minimize the responsibilities of anyone
of our components,
so the LoginForm will become a lot simpler.

all what LoginForm is going to do is show a form now with no logic.
when ever the user does something, types, tap a button the LoginForm
will show an action creator.
we still have to have the minimum amount of logic like button taps
but deciding what to do about that tap, will be manage completely by redux.

we will only depend on react for preducing content on the screen
and getting some notification for when the user does something (user event).

redux will keep track for the state of our application
and decide how to handle or interprate these events that are coming in into our application.

*/
