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
