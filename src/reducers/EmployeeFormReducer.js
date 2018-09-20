import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
  CANCEL_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMPLOYEE_UPDATE:
      // action.payload === { prop: 'name', value: 'jane' }
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    case EMPLOYEE_SAVE_SUCCESS:
      return INITIAL_STATE;
    case EMPLOYEE_DELETE_SUCCESS:
      return INITIAL_STATE;
    case CANCEL_UPDATE:
      return INITIAL_STATE;
    default:
      return state;
  }
};


/*
this reducer gets his actions from the EmployeeActions file
that holds the actions creators for this process.

for starts lets put our boiler plate for a reducer:

import {
  EMPLOYEE_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    default:
      return state;
  }
};

*/

/*
lets now work on this reducer.

this reducer will be responsible for all of the different values of our
EmployeeCreate form.
this reducer will maintain three properties of state,
name, phone and shift.

lets now add a case for EMPLOYEE_UPDATE,
when the user types something.

now in this case here
our action payload
is an object
having a key of prop (the prop is name/phone/shift)
and a key of value (its new value)

so the code is:
(I can delete the comment I left in the code if I want).

case EMPLOYEE_UPDATE:
  return { ...state, [action.payload.prop]: action.payload.value }

we put in the specific prop its new value.

key interpolation
the square bracers [] are not an array!!!!
this is called key interpolation,
the key we are adding to the object,
{ ...state, [action.payload.prop]: action.payload.value }
will be determined at run time.

if we call our action creator with a prop of name
this [action.payload.prop]
will turn into name

if we call our action creator with a prop of shift
this [action.payload.prop]
will turn into shift

and so on with phone.

we had const INITIAL_STATE = {};
lets put some INITIAL_STATE just to make things clearer
regarding what properties this reducer is going to be maintaining.
const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};


lets also now do a quick refactor for the index.js in the actions folder
as this file is responsible for actions related to authentication
we would like to rename the file as such,

like we did with the EmployeeActions file and EmployeeFormReducer
regarding EmployeeCreate.
we will make a new file called AuthActions with our current AuthReducer
regarding the LoginForm. (instead of index.js)



we can now start wiring our EmployeeFormReducer to our combineReducers call
and then wire it inside our EmployeeCreate form.
so we can send the props to our action creators
and we can get the data from the pieces of state using the mapStateToProps function
to our EmployeeCreate component.

*/

/* EMPLOYEE_CREATE

after we worked on our EmployeeActions.js a bit more
we needed to add a EMPLOYEE_CREATE case to the EmployeeFormReducer.

if we see EMPLOYEE_CREATE case
an employee has successfuly being created
we can reset all of the properties in the EmployeeFormReducer
so the next time the user looks at the form
it will be completely cleared/empty.

return { ...state, phone: '', name: '', shift: '' };
or simply
return INITIAL_STATE;

*/
