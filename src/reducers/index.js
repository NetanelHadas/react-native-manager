import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer
});



/* dummy reducer
for the start we just put a dummy reducer so our store
will get one reducer and thus be able to work.

banana: () => []
*/

/*
after we created our first reducer, AuthReducer
we can delete our dummy reducer.

the key we choose is the property of state
that we produce
(which is the name we use later when we call it in the componenets).

auth: AuthReducer

after our reducer is wired up
we should put it togther,
move to the AuthReducer file.

after we finished implementing our AuthReducer
at this moment we have one piece of state inside our application when our
app first bots up, which is called state.auth.email
which at the start holds an empty string.


*/

/*
we now need to import the EmployeeFormReducer
and add the data we get from it into a piece of state
we called employeeForm.

the employeeForm piece of state will be maintained by the
EmployeeFormReducer.
*/
