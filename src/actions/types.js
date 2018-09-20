// all of the definitions to all of the different action's types
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const PASSWORD_RESET_SUCCESS = 'password_reset_success';

export const EMPLOYEE_UPDATE = 'employee_update';
export const EMPLOYEE_CREATE = 'employee_create';
export const EMPLOYEES_FETCH_SUCCESS = 'employees_fetch_success';
export const EMPLOYEE_SAVE_SUCCESS = 'employee_save_success';
export const EMPLOYEE_DELETE_SUCCESS = 'employee_delete_success';
export const CANCEL_UPDATE = 'cancel_update';



/*
the string 'email_changed'
does not have to match the variable name EMAIL_CHANGED

there is no tie between the two.

the string has to be unique relative to all the other action types
we have.
*/

/*
we will export many different types from this file
because we will have a lot of different actions.

thats why we didn't use the default keyword, and used const instead
because we will export many different types like this from this file.
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
adding the variable for the
password_changed string
*/

/*
for the spinner we used the naming
LOGIN_USER
because it shows before the user succeeds or fails loging in.

we want the different names to help explain
the point in the process each of the different types happens/ is used.

the spinner is showed before we
LOGIN_USER_SUCCESS
or LOGIN_USER_FAIL
so it is reasonable to call this LOGIN_USER
*/

/*
remember the value in the '' just has to be unique relative to all
the other types that we have.
*/
