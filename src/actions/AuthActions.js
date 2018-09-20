import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  PASSWORD_RESET_SUCCESS
} from './types';


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};


export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.employeeList({ type: 'reset' });
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        dispatch({ type: LOGOUT_USER });
        Actions.login({ type: 'reset' });
      });
  };
};

export const passwordReset = ({ email }) => {
  return (dispatch) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        passwordResetSuccess(dispatch);
      });
  };
};

const passwordResetSuccess = (dispatch) => {
  dispatch({
    type: PASSWORD_RESET_SUCCESS
  });
};

/*
an action creator returns an action.

an action is a plane javascript object.
it always has a type property.

*/

/* types.js
the string email_changed
is forming a strong link between
this action
and the reducer

if we make a small typo mistake
in the action type
or in the reducer case string
the reducer will never properly pick up on this action when its dispatched.

to solve this we make variables to hold our action's type
and a file to hold this variables,
this make it a lot easier to check in which type we made a mistake
if a reducer doesn't work as it should for us.

then we will import that file
to our reducer
and to our action
so we can use these variables as we need to.

this will prevent us for making very small typos.
*/

/*
then we import the file types.

and use the variable.

we use the { } bracers
to get tye specific type variables we want.
*/

/*
we will multiline from
import { EMAIL_CHANGED, PASSWORD_CHANGED } from './types';

to
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED
} from './types';

because we expect it to grow more in the future

*/

/* Redux-Thunk

as stated we want to make an asynchronous action creator
to authenticate the user by making an ajax request.

and only after the request succeeds we have the information we need
to actually return/dispatch an action.

first we will write our action creator loginUser
with the authentication request
to make sure it works in an asynchronous fashion.

first we will make a starting point
and then change it a bit until it works.

export const loginUser = ({ email, password }) => {
};

({ email, password })
means we are expecting an object with an email and password properties on it.

now we need some logic to handle our firebase login.

first import firebase.

now handle the sign in of a user,
not creating a new account or anything like that.

export const loginUser = ({ email, password }) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
};


this call is going to make a request to the firebase servers
so the earliest time we can get access to any response from these servers
is by adding a then clause.

calling signInWithEmailAndPassword
if succeeds returns us the user
that just signed in
so we can use this.

export const loginUser = ({ email, password }) => {
  firebase.auth().signInWithEmailAndPassword(email, password);
    .then(user => console.log(user));
};

the then clause will be executed after the request is finished,
and the then clause will be called with a user if one exists.

if we enter a user that does not exist or invalid credentials
we will not see anything out of this promise (then clause)
because it will hit a catch case and we are not handling that catch right now.

so how do we dispatch and action after we hit that then clause?
because if we hit the then clause is where we want to return an action.

for this we will use a supporting library called
redux-thunk
this is our solution here.

we will use redux-thunk to handle
asynchronous action creators.

redux-thunk is used to handle any type
of asynchronous action creator that we might need through out our code.
it can be used for any type of ajax request not only for firebase.
for any long process we can imagen we can use redux-thunk.

redux thunk is an npm module we need to install,
so first lets install it.

npm install --save redux-thunk

the point of redux-thunk is to allow us to bend
the action creator rules
(look at pictur 16.action creator rules - with no redux thunk)

here is how it bends the rules
(look at picture 17.how redux thunk bends the rules of an action creator)
it enables the action creator
instead of returning an action
to return a function
this function will be called with dispatch,
dispatch is the important part.

we used store.distpatch to send an action off to all of our different reducers.
(back when we used the js playerground tool)

so in redux-thunk we return a function
that gives us access to store.dispatch method.

this distpatch method will allow us to manually dispatch
an action to all of our different reducers and not automatically.

*/

/* Redux Thunk in practice

lets wire up redux-thunk in our app.js file

move to the app.js file

now after we wired it in app.js

we can use it in our action creators.

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
    .then(user => console.log(user));
  };
};

we added the
return (dispatch) => {

};

thats it, this is redux-thunk in practice.

look at the picture,
what redux-thunk do.

what it does is:

our action creator now returns a function,
return (dispatch)

when the function is returned
redux-thunk sees that a function was returned,
so it will call the function with the dispatch method,
like doing store.dispatch(function)

once redux-thunk calls the function we returned
we will then start our loging request.
because the function we called is the signInWithEmailAndPassword function.

then we wait...and wait...

when the request is complete and the user logs in

the then clause (.then) runs.

and inside our .then we will manually dispatch our action.
this last step is the entire key to this thing.


this entire thing works, by recognizing that an
asynchronous action is going to happen here
and we can not immediately return an action.

by giving us access to dispatch
we can call dispatch at any point in time.
like, inside of the .then
or, inside of the .catch
or, where ever we want to.

at that point in time we can manually dispatch an action
instead of immediately returning an action from the action creator it self.

*/

/* .then

in our .then, which is after the user signed in,
is where we want to dispatch an action from.

so we change:
.then(user => console.log(user));

to:
.then(user => {
  dispatch({})
});

we manually dispatch an action
(thats what redux-thunk enabled us to do).

.then(user => {
  dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });

our .then is called with a user module
we pass this user module as the payload property.

this whole thing works because
we do not call dispatch
until the entire request is complete.

after the request is complete
we create our action
and we manually pass it to dispatch our selves.

the important thing here to understand is
the asynchronous action creator we made
and that it lets us do any asynch action we want!
and only after that asynch action is done,

firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user =>

we can manually dispatch an action, with what ever action we want.
dispatch({ type: 'LOGIN_USER_SUCCESS', payload: user });

this why redux-thunk gives us a lot of power.

*/

/*
now we will add the followings:

we need to change the action string 'LOGIN_USER_SUCCESS'
to be a const.
add it to the types.js file
we imported it
and changed it in the loginUser action creator.
add it to the AuthReducer and use it the reducer it self, adding a case.
(move to the AuthReducer file).

create account if one does not exist.
(explained below).

add a spinner.
(explained below).

show error message if authntication failed.
(explained below).

so now we will add some more robust handling around the loginUser action creator

working with redux-thunk we can dispatch as many actions as we like
from a single action creator.

*/

/* user's ID
in
dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

we see that we dispatch an action with a payload user,
this user const holds the user id we saw in the console (the user module).

move to AuthReducer.
*/

/* account creation

now we want to make sure when the authentication fails
we attempt to create a new account for the user as well.

.catch(() => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({ type: 'SIGNUP_USER_SUCCESS', payload: user });
    })

so now our loginUser action creator looks like this:

return (dispatch) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
    })
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
        });
    });
};

the downside of redux-thunk as we can see here
that it can create a very bad looking code.

we can make helper functions to help process the call backs.
we can see that on both success cases we are dispatching an identical actions.

so we should create a new function called login user success
it will take the dispatch method and automatically dispatch
our success action for us.

this helper method is just to make the code cleaner (its not a must).
we will not export this method since we are only calling it
from inside this file.

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

and now we replace the code inside our action creator.
*/

/*
two more things:

handling an error:
now we need to add a .catch
in case the use enters the wrong credentials.
(like we did in the auth application).

we will put the case for a failure inside of a helper method as well, loginUserFail.
again to keep things as organized as we can

.catch(() => loginUserFail(dispatch));

make sure you add LOGIN_USER_FAIL to the
import at the top of this file
type.js
AuthReducer.js

now we need to make sure we show an error message to the user.


and adding a spinner:
we need to send an action
when the action creator is first called
so it shows our spinner

*/

/*
when I added the spinner I created the action creator

export const showSpiner = () => {
  return {
    type: SHOW_SPINNER,
  };
};

and called it from the LoginForm component.

I changed the above component to local function

const loginUser = (dispatch) => {
  dispatch({
    type: LOGIN_USER
  });
};

and called it from the loginUser action creator.
by doing this I save from calling two different components.

later I decided even to delete this local action creator function
and simply used manually the function dispatch from withing loginUser
with the type of action I want directly to the AuthReducer.
as I did in the code above.
this keeps the code clearer and easier to understand,
it also makes it a lot easier to understand when does the spinner gets called.


don't forget to import LOGIN_USER
from the types.js file.
*/

/* changing loginUserSuccess to handle navigation - Actions.main

to move the user between the different scenes.

first we do:
import { Actions } from 'react-native-router-flux';

and now inside of the loginUserSuccess action creator we add:
Actions.employeeList();
at the bottom.

in our Router.js we used:
<Scene key="employeeList" component={EmployeeList} title="Employees" />
the key value is the one that lets us use the Actions.employeeList() call
as long as we remember to import Actions to the component.
import { Actions } from 'react-native-router-flux';

this is why the key property is so important,
it is what we use to navigate around in our application.

if I create a scene with a key property I can navigate to it at any point in time
from anywhere in my code by just calling Actions."key value"()
as long as we rememeber to import the Actions.


back button:
we can see that in our app there is also a back button at the top that looks like <
when we press it, it takes us back to the LoginForm screen/scen
and the credentials are empty.
we got this button for free, we didn't have to add it to the employeeList component
and add it while also figuring out what was the last scene we showed before it.
this is why the built in header is so useful for us,
it gives us a lot of functionality for free.
and we can also change this back button as we will do in a bit,
we will want to disable it between the LoginForm screen and the EmployeeList screen.

to change the back button we will first need to understand a bit more
how scenes work.
(look at the picture part 2, slide 4,
the different flows indicate where we want the back button
we are given to be enabled).
we see that in the main flow there is the EmployeeList component
and the Employee component,
we want to enable a back button from the Employee to the EmployeeList
but not enable a back button from the EmployeeList to the LoginForm
because they are not in the same flow.
if the button had a 'sign out' or 'log out' written on it
then it would make sense but just having a back sign on it does not make sense.

we want to have back button enabled on within scenes in the same flow
and not between screens/scenes of different flows.
the back button should be in places it makes sense to have it.

so to enable or disable a back button between scenes
we need to use what is called scene nesting.

*/

/* scene nesting

(look at the picture
part2, slide 4, scene nesting).

in our auth flow there is a single screen
and there is no screen you should be able to go to that has a back button
to return to the LoginForm scene.

so we are going to nest our LoginForm screen in its own seperate scene bucket,
with a single key of auth.

insted of nest we can also call it a bucket,
so after we are done creating a scene for the LoginForm screen
we will have an auth bucket that holds the LoginForm screen.
so now whenever we leave the auth bucket we will not see a back button
or anything like that.

on the otherhand we want to have a back button between the
EmployeeList component and the Employee component.
so it does make sense to nest them togther in thier own scene bucket.
since they are in the same scene bucket every time I am going
from one screen to the other I expect to have a back button and a forword button
show on the top of the screen.
this is automatically given to us by the router library.
lets now nest our scenes and then the presence of the back button
will automatically be infered for us.
(return to the Router.js file)

*/

/*
we will now make our action creators
for the EmployeeCreate component.

we notice that we have a lot of action creators that are dealing with authentication.
so putting more action creators here for the EmployeeCreate process
will make things less organized.
so we will create a new action creators file that will have just the actions
related to dealing with employees.

we will make a seperate file that will have the just the actions
related to dealing with authentication in a bit as well.

*/
