import {
  EMPLOYEES_FETCH_SUCCESS
} from '../actions/types';


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

/*
lets put in our boiler plate for a reducer:

import {

} from '../actions/types';


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    default:
      return state;
  }
};

*/

/* lets now see how firebase loads this data for us

remember the action we are getting from the employeesFetch action creator
is going to have as its payload the snapshot.val()
so by calling console.log(action)
we want to see exactly what this value is
and what its going to do for us.

don't forget to add this reducer to our combineReducers call.
in the index.js file in the reducers folder.

lets now run this thing and see what we get in our console.log()
we see that we are getting an object named employees
that holds each existing employee as an object.

this is a very common data structure that we are going to see from firebase,
rather then giving us an array of employees,
we get back an object containing all of the different employees that we have.
the keys of the object are the uid of each employee.
so if we want to reference to the employee jane specifically
I can reference an uid of Kvn5.....
and the same for the other employees.
so rather than coming back as an array of employees
we get back an object.
this is a common data structure we are going to see in a lot of
redux apps.
we will have an object that holds keys,
each key for a specific record,
as opposed to an array.

the reason for this is to help with redux requirment of
always returning a new object from a reducer.
it is not only because of redux but part of it is.

example:
if we wanted to have an array of employees
and update a very specific employee
using a reducer.

we will have to return a new array,
find in it the record we want to update,
splice the record out and insert the updated record
and also make sure that we return a new array (using the ...state, array)
(the syntax works with arrays as well).

in contrast!
updating an object (and not an array) full of records is a lot easier
when we want to update a specific record.

when we organize by id we can do something like this:
case EMPLOYEES_FETCH_SUCCESS:
  console.log(action);
  return { ...state, [id]: action.payload };

so rather then walking through an entire array,
finding the record we want to replace.
we can just say:
take all of the records out of the existing object, ...state
create a new key value pair, [id]: action.payload
where the key is the uid of the record that we want to update
and the value is the updated record it self.

this is called an id based approach
and it is a very useful approach.

we don't need to do that just yet,
for now we care about the list of employees
that are coming back from firebase.
so for now we will just replace it with:
case EMPLOYEES_FETCH_SUCCESS:
  return action.payload;

thats why we made our INITIAL_STATE an object
because eventually we are going to end up with an object
containing all the different employees in our application.

for now we are done with our EmployeeReducer.
we are now keeping track of all the different employees.

lets now start working on rendering this list of employees to the user.
(move to the EmployeeList component).

*/
