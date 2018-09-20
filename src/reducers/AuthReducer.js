import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  PASSWORD_RESET_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case LOGOUT_USER:
      return INITIAL_STATE;
    case PASSWORD_RESET_SUCCESS:
      return { ...state, error: 'Email sent'};
    default:
      return state;
  }
};



/*
our boiler plate for reducers are a function
that we are exporting by default
and has 2 arguments:
export default (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

remember
we can never return undefined from a reducer
for this we set state = null
so incase nothing is happened we will return null and not undefined.

we will change our regular plate just a bit to look better with redux
to:

const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

now in the case nothing is changed it simply returns and empty string
and not an undefined.
*/

/*
now we need to make sure our reducer watchs for an action
of the appropriate type.
for now it only passes back our state object

const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

we need to make sure we watch for an action of type
'email_changed'
and update our state object accordingly.

so we change the code above to:

const INITIAL_STATE = { email: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'email_changed':
      return action.payload;
    default:
      return state;
  }
};


/*

/*
to prevent typos
we added a types file we can import
and use the type variables from it.

now it looks like:

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return action.payload;
    default:
      return state;
  }
};
*/

/*
important to remember
that inside each case statment
is our logic.

the following bug is very common:
from the types file I can import any variable
even if it does not exist in the file it self, like
import { EMAIL_CHANGEDFAFASFA} from '../actions/types';

and no error will be thrown,
because it will consider this variable as undefined in the spot that we use it.

so it is exactly like having a case of undefined,
case undefined:

but we know that every action MUST have a type NOT UNDEFINED,
each action must have a declared type.

so my action will never catch anything inside a reducer.

so make sure to look at the import statment!!!
make sure you don't have a typo in the variable name you want to use!!!!

you can use inside the case the following console.log() to check this:
case EMAIL_CHANGED
  console.log('action!')
*/

/* updating our state objects

look at the pictures,
how to update our state object
and how to update our state object continued

to understand how we update our state object.

speicifically with tripe equals, ===
like we have in the pictures.
=== asks are both pointers look at the same exact object in memory?
if yes, then true.
false otherwise.

if the two are equal, nothing happened (no data changed) so don't need to update
the components.
if the two are not equal, something changed we need to send it
to our components and rerender to the screen.

this means we need to update our state object in the correct fashion.
if we will not do it in the correct fashion,
redux will think that nothing was changed.
this is how combineReducers works.

to do this we must make a new object for redux to understand
we changed the value of our state.

which means we can not simply do:
case EMAIL_CHANGED:
  state.email = action.payload;
  return state;

if we do this, redux will compare the old value of state
and a the new value of state that we returned,
since its the same object in memeory redux will think that
nothing was changed and no updates will be sent to the componenets.

so instead of returning our state object
we need to return something that makes redux think
we made a change, kind of tricking redux.

so we need to change
case EMAIL_CHANGED:
  state.email = action.payload;
  return state;

to

case EMAIL_CHANGED:
  return { ...state, email: action.payload };

we made a new object, { }
take all of the properties of the existing state and insert them into this object,
...state
define a new property with this value and toss it ontop of the existing state object,
email: action.payload
so if there is an existing email object already in the state, it will be over written
by this new email property.
and return this object.

so by default when our reducer first runs
we will have an initial state that has an email property with an empty string.
then the user insert an email input, by pressing a letter,
so our action.payload will be that letter
then we create an object with the existing state,
that has an email property with an empty string,
we will then on top of it put the new email property with that letter,
this will over write the existing email with an empty string on the state object.

the critical part to understand here is that we created a new object,
{ }
this new object toke the values from our state object and throw them in.

since we returned our new object, when we return it
redux will say
this new { } === state ?
and because this is a brand new object the answer will be no, not equal.
so this new object will be sent to all of the componenets to be rerendered.

the point is:
when we return a value from a reducer,
this value MUST be a brand new object
otherwise redux will think its the same state object from before
so we don't have to do anything.

every single press by the user will call the reducers
and reformulate our auth piece of state.

which we now need to send back down o our componenet/s.
*/

/*
in here as well we will multiline
import { EMAIL_CHANGED, PASSWORD_CHANGED } from '../actions/types';

to
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from '../actions/types';

because we expect it to become longer in the future.

*/

/*
dont forget to update our INITIAL_STATE object
const INITIAL_STATE = { email: '' };

to
const INITIAL_STATE = { email: '', password: '' };

and multiline it a bit

const INITIAL_STATE = {
  email: '',
  password: ''
};


by setting initial values of empty strings to the email and password
we let future programmers know that this reducer is responsible
the email and password properties.
*/

/*
our AuthReducer will need to keep couple other properties in the state
beyond just email and password.
like:
loading - boolean, for recording if we are trying to authenticate the user.
error - string, record whether or not there is an error with the authntication.
and tell the user "authentication failed" or something like that.
user - the user model that is supplied by firebase,
an object that tells us what is the current signed in user's name and id are.
a short description of our user that is signed in.

after we make a request to the firebase server
we want to update our application state.


*/

/* the action creator loginUser

we will make an action creator called loginUser,
it will get an email and a password
and then make an ajax request.

until this request succeeds or fails - until it completes
we don't know what action we want to return.

with previews action creators,
we called the action creator
action creator runs
action creator returns an action.
all is done instantly (look at the picture how action creators work).

with the loginUser action creator things work a bit differently
(look at the picture how this new kind of action creator works
- loginUser action creator).
we call our action creator
action creator runs
make an ajax request to firebase
and.... waits

since ajax requests are asynchronous
we don't have any value to return yet.
only at some time in the future after the request is complete
we can actually return an action.

the point is:
when we have action creators that make ajax requests
things behave differently
and our default pattern that we showed above
starts to break down to behave a bit differently,
because we don't have something immidiately to return from this function.

in javascript there is no such thing as sleep or wait,
when the action creator runs it will execute the code inside of it
and immidiately return,
and there is nothing we can do to stop that,
we cant make the action creator wait in anyway.

so we need some new methodology here,
new way that will help us make an ajax request
and at some point in the future dispatch an action
that would say,
loading complete
here is an erro message if there is one.
here is the user's name and id if there is one.

summery:
up to here we made synchronous action creator that instantly
returns an action.

we need to be able to write asynchronous action creator
that will return an action at some point in the future.

redux helps us with this one.

*/

/* Redux Thunk

as stated we want to make an asynchronous action creator
to authenticate the user by making an ajax request.

and only after the request succeeds we have the information we need
to actually return/dispatch an action.

first we will write our action creator loginUser
with the authentication request
to make sure it works in an asynchronous fashion.

moved to the actions.js file
*/

/*
after we finished our loginUser action creator
we came back here to check if we get the actions as we want to.

using
console.log(action);
above our switch.
*/

/*
to make we have a user to test with
we need to go to our browser inside the firebase website

go to auth
and add a user
using this we can manually add a user to our project.
we can do this to create a test account.

*/

/*
now we need to make sure our loginUser action creator
is being called somewhere inside my application.

lets insert it into the LoginForm.

*/

/* so what are the properties we want to change when the user signs in?

we get that user ID, that user module from firebase.

and we attach it as payload to the action.

so we need to reflect that user ID (module)
on our user piece of state.

so when ever we successfuly log in we can use that ID.

case LOGIN_USER_SUCCESS:
  return { ...state, user: action.payload };


we need to add user to our INITIAL_STATE object as well
just to keep clean organized and easier to understand
for other programmers.

having the user id (or user module) is going to be useful
in several other locations.

now we need to handle the creation of a user's account.
move back to the actions.js file
*/

/* LOGIN_USER_FAIL

LOGIN_USER_FAIL will handle the case where the user entered
wrong credentials and failed to log in.

we can delete that
console.log(action)
we had earlier to check if our reducer actually gets
the different types of actions.
or we can leave it as it is.

import LOGIN_USER_FAIL
add a case for LOGIN_USER_FAIL

add INITIAL_STATE a property error.
this will hold the error we want to show to the user.

if an error has occured, we will change the error property
value to 'Authentication Failed.'

so we can show it to our user.


lets now also care for security

so whenever a user fails to sign in
we will reset the password he wrote in the text input.

in cases like this redux starts to get really nice,
we will not only send the user a message
but also reset the password shown back to empty string.
so in the case we entered a bad password it will simply delete it.

*/

/* redux niceness continues!

if we tried loging in and made a mistake in the credentials
we will get the authentication failed message

if we then renter the correct credentials
we still see the authentication failed message!

we need to change our LOGIN_USER_SUCCESS case
to clear the error message in the case the user succeeds loging in.
error: ''

*/

/* small odity with firebase and a work around on how to handle it

if we do something like:

case LOGIN_USER_SUCCESS:
  banana;
  return { ...state, user: action.payload, error: '' };

and we enter a correct user email and password credentials and press the button,
it will give us the authentication failed message
and not an error like we expected to get.

but why?

this is an odity with firebase,
we get to the LOGIN_USER_SUCCESS case as we should
and we are getting to the banana line,
we are executing banana
and error is being thrown.

lets look at our call stack,
the order in which we call our different functions inside the loginUser
asynchronous action creator.

when we call
firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => loginUserSuccess(dispatch, user))

in the context of the signInWithEmailAndPassword and the .then promise
loginUserSuccess runs
we dispatch the action
we get to that line in the reducer
an error is thrown.

firebase sees the error
and assumes something went wrong with the request
firebase.auth().signInWithEmailAndPassword(email, password)
because we are operating in its context.

so it moves to the .catch

then it tries to
firebase.auth().createUserWithEmailAndPassword(email, password)
which again calls the
.then(user => loginUserSuccess(dispatch, user))
and again an error is thrown.

this leads us to the last .catch
.catch(() => loginUserFail(dispatch));
which shows us the authentication failed error on the screen.

lets see it more clearly,
lets change the followings

.catch((error) => {
  console.log(error);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(() => loginUserFail(dispatch));
});

so we can see the error that is being thrown.

we can see in the console
banana is not defined.
we were at loginUserSuccess in the actions file
and we attempted to distpach an action
which got to the banana line.

this is a wiered odity with firebase
and not a great way to catch this error.

to somewhat handle this odity from now on
after every .catch we will keep the console.log(error) statment
in our asynchronous action creators as we did here.
this way we can see from where the error message came from in cases like this
in addition to seeing the authentication failed message.

make sure you move the banana error after
from our LOGIN_USER_SUCCESS case :)

*/


/* spinner
now lets work on the spinner

don't forget to import the LOGIN_USER type.

and add another case statment to handle this type.

case LOGIN_USER:
  return { ...state, loading: true };

again remember to add the loading property to the INITIAL_STATE
so it will be easier to understand what is this piece of state
is made of for future programmer who work on this.

In the case that the spinner animation is running I want to clean
any error message that shows
so also change error: ''
this also gives a better feedback to the user.

we also need to make sure we clean the loading animation
once LOGIN_USER_SUCCESS or LOGIN_USER_FAIL
because the process of login has finished loading.
so we add the load: false
flag to these cases.

currently we are toggeling correctly our loading flag from true to false
and otherwise as needed.
*/

/* moving to another window and coming back

now lets also make sure that once a user logs in and then
return back to the login screen
the email and password won't be cached/saved in already
in the input tags.

so once the user logs in successfuly we will clean
the email and password.

I multiline the LOGIN_USER_SUCCESS case
to make it look better.

case LOGIN_USER_SUCCESS:
  return { ...state,
    user: action.payload,
    error: '',
    loading: false,
    email: '',
    password: ''
  };

notice that in the LOGIN_USER_SUCCESS case
we are actually reseting every single property on our state object
to its initial value!
error: '',
loading: false,
email: '',
password: ''

so in this case we can change from:

case LOGIN_USER_SUCCESS:
  return { ...state,
    user: action.payload,
    error: '',
    loading: false,
    email: '',
    password: ''
  };

to

case LOGIN_USER_SUCCESS:
  return { ...state, ...INITIAL_STATE, user: action.payload };

we reset our current state and make it as our INITIAL_STATE
and on top of that we add the user's ID
user: action.payload

*/
