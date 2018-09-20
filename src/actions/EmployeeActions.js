import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
  CANCEL_UPDATE
} from './types';


export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: EMPLOYEE_DELETE_SUCCESS })
        Actions.employeeList({ type: 'reset' })
      });
  };
};

export const cancelUpdate = () => {
  return {
    type: CANCEL_UPDATE
  };
}

/*
we can make a different action creator for each field as we did in with authentication
like:

export const nameChanged = (text) => {
  return {
    type: NAME_CHANGED,
    payload: text
  };
};

export const phoneChanged = (text) => {
  return {
    type: PHONE_CHANGED,
    payload: text
  };
};

but in this case we will make a single action creator that will
handle any update to the form what so ever.

export const employeeUpdate = ({ prop, value }) =>

if I want to update the name I will call it with
prop.name and a value of what ever the new name is.
if I want to update the shift I will call it with
prop.shift and a value of what ever the new shift days are.

this action creator is called with an object that contains
a prop and a value key.
and the payload property is an object containing
a prop key.
and a value key as well.
(we used es6 here to do as explained above).

don't forget to add this type to the type.js file
and import it to this file.

now that we have the employeeUpdate action creator ready
we need to make a reducer to recieve the action from it.

*/

/*
we are now making the employeeCreate action creator.

make sure to add the type into our types.js file.

lets add our action creator a
console.log(name, phone, shift);
so we can see the value of name, phone and shift.

when we write a name and a phone but don't choose a shift
we see the name the phone but not the shift,
this is because shift in this case is an empty string here.



lets now see why shift ends up being an emptry string.

the state of our form is held by the EmployeeFormReducer,
by default the EmployeeFormReducer does not have an initial value
for any element in the form (it has an empty string).

the picker it self visually defaults to being monday,
when we look at that form we see monday shows as selected on the screen
but thats just the visual behavior of that picker.
its not selecing monday for us it just defaulting to that value.

if we change the picker
that will initiate that chnage, it will call the action creator
and then shift will be set to what we choose.

here are possible solutions:
1) I could default shift to Monday instead of an empty string
in my INITIAL_STATE.
the problem with this is that it tightly couples
the options in the picker, the days of the week,
to this reducer
so if we ever want to change it to day and time
we will need to change the reducer as well.

2) we can add a componentWillMount() function
inside of our EmployeeCreate form
and as soon as the EmployeeCreate component is mounted to the device,
as soon as it is rendered, we can call the action creator manually
and default the value of shift to monday for example.

3) when we call the action creator employeeCreate
we can default the value of shift.
this will make sure that when we call the action creator
their will be a value in there.
lets do option number 3.
(move back to the call we made to the employeeCreate action creator
from EmployeeCreate component and add to it a default value).

now lets make sure that when our employeeCreate action creator is called
we actually sends the data to firebase to be saved.

*/

/* saving the data into the firebase database

we will implement this inside of employeeCreate action creator.

since we want to send data to firebase we fist must import it,
import firebase from 'firebase';

first lets remove the
console.log(name, phone, shift);
statment we had (used it to check we are actually getting the 3 properties).

lets now add the firebase code to the employeeCreate action creator:
firebase.database().ref('/users/userId/employees')

this code says
get access to our firebase.database
then make a reference, .ref()
to this path, /users/userId/employees

this is a path to our json data store,
a path through the different jsons that we have.

the json that we have is sorted by:
a top level collection of users
then a user id
and then a collection of employees
this translates to
find a key of users
find a key of usersId
finds a key of employees

we don't want the usersId
to be hard coded
because we want it to be the user id of the currently authenticated user.
this will give us the intermidiate key of like user 123.

lets now get access to the currently authenticated user in our application
because we need thier id to put inside our path.

to get access to the currently authenticated user we can call:
const { currentUser } = firebase.auth();
currentUser is our user model.
this currentUser holds the uid property which is the id of that user,
currentUser.uid

so now we need to replace inside of
firebase.database().ref('/users/userId/employees')
the userId.
to do that we will use template strings / strings interpolation
which is a feature of es6.
we will change the above to
firebase.database().ref(`/users/${currentUser.uid}/employees`)
we changed the '' to ``
and userId to ${currentUser.uid}
now the code will inject that id instead of the userId.
every javascript variable inside the currely bracers
will be injected into the string
and we will end up with the fully qualified string for example uid123
so the final result will look like
"/users/123456/employees"


we now have a reference to a specific location in our data store
we want now to take some operation on that reference,
we want actually to do something at this point in time.

to add new data to this slice of our firebase data store
we need to call the .push method on that reference.
we can pass this .push an object
firebase.database().ref(`/users/${currentUser.uid}/employees`)
  .push({ name, phone, shift });
and anything inside of that object will be saved
to that reference (to that path spot of our firebase database).

lets now see how does this look inside of our firebase console.
(our app shows an error that our action creator is not returning an action
but thats ok for now because we want to see what is saved into the
firebase database and is showned in the firebase console).
we can see a new users root
and inside it a uid which represents a user (this is the ID of the currently logged in user).
and inside it a collection of employees
and inside it an employee with an ID.
and inside it the details of the employee (name, phone, shift).

our reference call with the path created this tree.
and our .push method created the employee object with the requested properties.

rememeber that the uid that we are seeing in the console belongs to the
currently authenticated user.
the rules that we set up means,
if any user logs in without an uid of
"what we see at the moment in the firebase console"
they should not have access to any of the data sitting inside
of this user's bucket.
only the user with that uid will get access to this collection of employees
and any other data that we add here as well.

we will now navigate our user back to the EmployeeList screen.

*/

/* navigating our users back from the EmployeeCreate screen to EmployeeList screen

we can now save a new employee into firebase
we just need to make sure that after we save a record successfuly
we kick our user back to the EmployeeList screen
where they will see the new employee on the screen.

we also need to make sure our employeeCreate action creator
returns an action (object with a type property on it).

to solve the returning action issue we are going to use redux-thunk,
we want that our employeeCreate will be an asynchronous action creator
(deal with entities outside of the app, like firebase auth or database).

this time we will use redux-thunk to break the rules!

in the case here we are just pushing to a remote reference
and we don't really need a response back from firebase,
once the data is transfered we are done.

when our EmployeeList comes togther
we go and get that list of all the different employees from firebase,
the EmployeeList componenet is going to automatically update it self
with the new employees that were just added.
what we mean by that is we don't need an action to be dispatched
from the employeeCreate action creator at all,
this means we don't need to return an action.
we don't need to wrap this with redux-thunk to get access to the dispatch method.

we want this action creator to fade in into nothingness.
to do this we are going to pretend we are going to use redux-thunk
but we are really not.
to do this we will simply wrap the code with a federal function as follows:
return () => {
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift });
};

the code will be called with redux-thunk
but we are not using the dispatch method to return an action perse.



we need to do that one additional thing we meantioned at the top,
once a new employee is created we want to navigate the user back to the
EmployeeList screen
where they should see the new employee pop up.
to do this we need to add a
.then()
to this promise
return () => {
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then();
};
and inside of that .then
we will call our Actions object from our router library
to navigate back to the employeeList screen.
Actions.employeeList();
like so:
.then(() => Actions.employeeList());

we use .employeeList()
because thats the key we used for that scene.

don't forget to import
import { Actions } from 'react-native-router-flux';



breaking the rules:
we are breaking the rules of redux-thunk
by exploiting the fact that we can return a function
but we are not actually using dispatch inside the return at all.
by doing this we pass the requirment of redux-thunk
that an action creator must return an action.



we can see that now after we create a new employee
we return to our EmployeeList screen
but!
when we navigate to the EmployeeList screen
we can now see a back button <
this is because we added to our stack of current views
and that doesn't really fit to what we want.
I don't want to be able to go back to the EmployeeCreate form.
I did go back to my EmployeeList from the EmployeeCreate form
and not the other way around.

there are 2 ways to handle this:

1) pass an additional argument to the
Actions.employeeList({ type: 'reset' })

if we pass in an option of type: 'reset'
it tells our navigation library
that we want to go to the employeeList
but don't want to treat it like its a view we are going to advance into
so we can press the back button to return to the previews screen.
it reset the entire view stack so there won't be a return button.


there is one small issue tho,
when we go to the EmployeeCreate form
our form still has the infomation of the employee we just created.
because we created a new record in firebase
it does not mean it will automatically clear out all the state that is in our
EmployeeFormReducer for us.
so when we go back to the EmployeeCreate form we can still see the
information of the employee we just created.

so maybe we do want to dispatch an action from our employeeCreate action creator.
so after we successfuly create an employee
we will not only navigate back to the employeeList
but we will also dispatch an action that will be responsible for reseting
all of the fields in the EmployeeFormReducer.

so after we create the user
we will reset the EmployeeFormReducer
and navigate back to the EmployeeList screen.

so to dispatch an action we must make sure we recieve the dispatch method
inside of our return function.
return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => Actions.employeeList({ type: 'reset' }));
};

and then in our .then
we will not only navigate to the employeeList
but we will also dispatch an action
return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => {
      dispatch({ type: EMPLOYEE_CREATE })
      Actions.employeeList({ type: 'reset' })
    });
};

we will watch for the type: EMPLOYEE_CREATE
in our EmployeeFormReducer
and when we see that type we will reset all of the fields inside of our form.

import the EMPLOYEE_CREATE from the types.js file
and add EMPLOYEE_CREATE to the types.js file
and then use it inside of our EmployeeFormReducer.


*/

/* small note

I added into App.js the line

console.ignoredYellowBox = ['Setting a timer'];

this was to prevent showing an error firebase has at this moment,
"Setting a timer....."
*/

/*
now we will fetch the data from the firebase to show automatically
on our EmployeeList component.
(move to the EmployeeList component).
*/

/* employeesFetch action creator

we will make a new action creator
that will fetch the data from the firebase database.

we need to make a request to firebase
grab our list of employees
and dispatch an action.

making a request to the outside is
an asynchronous action,
which means we will use redux-thunk here as well.
so inside of our action creator we will have
a federal function that gets called with the dispatch method as follows:
return (dispatch) => {

};

to work with our firebase data
we create a .ref to a very particular spot in our json database
(just like we did in the employeeCreate action creator).

by creating a .ref we can work with the data located at that path.
we are currently saving all of our employees to:
/users/${currentUser.uid}/employees
so we will make another reference to the same location
but this time tell firebase that we want to fetch data from that location
rather than pushing a new record in there.

so we will create the same .ref again:
firebase.database().ref(`/users/${currentUser.uid}/employees`)
make sure you get access to the current user
(since we are using string interpolation).
const { currentUser } = firebase.auth();



but this time we want to fetch data
fetching data is done as the follows:
.on('value', snapshot => {

});

the federal function => {}
will be called with the snapshot object we put as the second argument.

.on('value'
this means, anytime anydata any new 'value' comes from this .ref,
from this data bucket
call this federal function => {}
with an object that describe the data sitting in there, the snapshot object.

the snapshot object is not an array of employees
it is an object that describe what data is in there.
it is an object we can use to get a handle on these employees.
lets now see how we use that snapshot object.

when ever we get some amount of new data, 'value'
from the .ref
we will dispatch an action

.on('value', snapshot => {
  dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
});

snapshot.val() is how we get access to the data
that is at that reference we entered above it.
again snapshot is not the actual data,
it is an object that describes the data
that we can use to get access to the data
using the snapshot.val() commend.

the reason behind using the snapshot
is that it gives you a lot of other fantastic data,
kind of meta level data about what json is sitting at that point
over there in the reference.

the .on('value', snapshot).... action creator
--------is persistent--------
so if we call employeesFetch one time
it will immidiately start up the event handler
firebase.database().ref(`/users/${currentUser.uid}/employees`)
  .on('value', snapshot => {
and for the rest of the life of our application
it will call the federal function snapshot => {}
anytime any new data comes across.
this is where firebase and redux work togther pretty well,
because we can set up our .on('value', )
to watch on for some new data
and at any point in our application life cycle,
anytime there is new value that comes across,
we will automatically dispatch and action
of type: EMPLOYEES_FETCH_SUCCESS
with the new data in there.

this is going to be very valueable when we go from the EmployeeCreate
back to the EmployeeList
because when we call EmployeeCreate and make a new employee
firebase will automatically detecet
.on('value', snapshot => {
that we added a new emoloyee
and dispatch an action automatically
dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
and our data will instantly show up inside the EmployeeList
without actually having to do anything
which is pretty nice.

we now need to call this action creator from the EmployeeList component
it is important to note that this is a watcher action creator
that will automatically dispatch an action when the data is changed
in that location.-------------------

dont forget to import
EMPLOYEES_FETCH_SUCCESS
and add it to the types.js file

lets now create the reducer case that will catch this action.

*/

/* employeeSave action creator to update employee records

we previewsly created a new record in firebase
updating is just as simple.

instead of .push()
that creates a new recrod

we will use .set()
set updates information.

lets now make this new action creator, called employeeSave
we expect this action creator to be called with
{ name, phone, shift, uid }
the last property, the uid
is the key to changing the specific record we want to change
in the database.
since we are updating an existing record
we have to be very explicit in telling firebase
what specific record we are trying to update.

so whenever we call this action creator
we need to make sure we specify
the employee we are trying to update.

if we go into the firebase console
we can see that when we click users
we see each user's uid
when we then click the employees
we see that each employee has a uid.


rmemeber since this will probably be
an asynchronous action creator
we first must return a function.
return () => {};

in the
firebase.database().ref(`/users/${currentUser.uid}/employees`)
we need to specify the exact record we are trying to update
so in the .ref we need to point to the very specific record,
to the record with this particular uid.
firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)

when it is found I want to set some new properties on it
.set({ name, phone, shift })

finally for right now
we are going to do a
console.log('saved!');

so the entire thing will look like:

return () => {
  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then(() => console.log('saved!'));
};


now we will change it to navigate back to the EmployeeList screen.
first make sure
we imported our Actions object at the top.

now we change the console.log('saved!') statment
with Actions.employeeList();
but we want to make sure that when we navigate back to the employeeList
we will not see the return button < at the top.
so we add the type: 'reset' property as follows:
Actions.employeeList({ type: 'reset' })



we notice now that when we press the add button at the top right
the information of the last person we edited
are now being shown as default.
this should not be the case.

if we edited an employee.
and then want to create a new employee
we should see the empty default fields.

so to do that we need to
dispatch an action
that will set the properties to empty strings inside our EmployeeFormReducer.
(exactly like we did after we create a new employee).

so now the action creator will look like:

return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then(() => {
      dispatch({ type: EMPLOYEE_SAVE_SUCCESS })
      Actions.employeeList({ type: 'reset' })
    });
};


dont forget to add the EMPLOYEE_SAVE_SUCCESS
to the types.js file
and import it in
EmployeeActions
and in EmployeeFormReducer

*/

/* important note!!!!!!!

remember in the action creator employeesFetch
we wrote
.on('value',

which means that any time we update or save a record
we automatically gonna get it called
and when its called it will do
snapshot => {
  dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });

which grabs the new employess and load them up.

and this is why we see the instant update
for an employee in the EmployeeList screen
when we change his records.


just changing the records using employeeSave
even if inside our firebase database
DOES NOT change it in our EmployeeFormReducer state

it does change specifically because we set a watcher,
.on('value',
a watcher on that list of employees
firebase.database().ref(`/users/${currentUser.uid}/employees`)
  .on('value',

only because of this right here we get that updated model back from firebase.

so we just do an action and then redux and firebase take it from there
and do the required changes.


now we will add the options to
delete an employee
and text message an employee with their updated schedule.
*/

/* text messaging an employee and deleting an employee

now we will add the options to
text message an employee with their updated schedule
delete an employee


text messaging an employee

now we want to add the option for the user
to text message an employee his shift.

in react-native it is very simple to text people,
initiating the texting process is very easy.

we will not automatically send off a text message to the target employee.
we will kick our users over to thier text messaging client on the device
and we will let them send the final message.

go in the browser to
https://www.npmjs.com/
this is where we can find documentation on all the different packages
in npm.

look for the package
react-native-communications
this package works for both ios and android.
it can be used to initiate phone calls, emails, text messaging etc...

for our case we care for text messaging

according to the api all we got to do is
text(phoneNumber, body)

lets first install this as an npm package

inside our EmployeeEdit form
we will put our new button for texting.
(move to EmployeeEdit.js)

*/

/* employeeDelete action creator

we need to make sure we pass this action creator the
uid of the employee we want to delete.

we will use .ref
to get to that specific employee
firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
we pass the same interpolated string as we did before.
${currentUser.uid} means finds this user's bucket of data.

and then we will use a firebase method to say,
please remove this record.
so how do we remove records using the firebase api.
we just got to call the method
remove()

we point at a very particular part of our firebase data structure
firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
and we call remove on it.
.remove()

and this node and any children that it has
get removed.

after we remove the employee
we should navigate our user back to the EmployeeList screen
using the Actions.employeeList({ type: 'reset' })
and they are not going to see that employee on the list anymore.
we add the { type: 'reset' } because we don't want to add another view
to our stack,
which means we don't want to see the return back button <
at the top left.

so it looks like this:

return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.employeeList({ type: 'reset' })
    });
};

ESlint
tells us we are not using dispatch in this case,
so we can delete it.
we are not using dispatch because
whenever we make a change to our list of employees
the existing employeesFetch action creator
using the
.on('value',
will trigger again
we will have another dispatch from that method
and we will get the new collection of employees showing on the screen.
so once we delete an employee everythign should update as we expect.

return () => {
  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(() => {
      Actions.employeeList({ type: 'reset' })
    });
};

important!!!
again this is an asynchronous action creator
so it must dispatch an action
according to the requirments of redux-thunk
(if we are dispatching an action that is,
in here we are not
since the dispatch is being called using the
.on('value',
event handler).


lets now wire up this action creator
in the EmployeeEdit component.

after testing we saw that
if we delete an employee
and then want to create a new employee
the details of the employee we just deleted
are showing up in the EmployeeCreate form.
so we decided to dispatch an action
that will return the data in the EmployeeFormReducer
back to its INITIAL_STATE.

this makes sure that if we delete an employee
his records will not show back in the EmployeeCreate form.

so it now looks like this:

return (dispatch) => {
  firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then(() => {
      dispatch({ type: EMPLOYEE_DELETE_SUCCESS })
      Actions.employeeList({ type: 'reset' })
    });
};

*/
