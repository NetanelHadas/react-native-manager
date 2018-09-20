// Import a library to help create a component
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete, cancelUpdate } from '../actions';

// Create a component
class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    this.props.cancelUpdate();
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;

    console.log(name, phone, shift);
    this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.textWithoutEncoding(phone, `Your upcoming shift is on ${shift}`);
  }

  onAccept() {
    const { uid } = this.props.employee;

    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  renderEmailButton() {
    return (
      <Button onPress={this.onEmailPress.bind(this)}>
        Email!
      </Button>
    );
  }

  onEmailPress() {
    const { name } = this.props;

    const body = `my name is \n${name}!`;

    Communications.email(['Netanel.Hadas@gmail.com'], null, null, 'test', body);
  }

  render() {
    return (
      <Card>
        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>

        <CardSection>
          {this.renderEmailButton()}
        </CardSection>
      </Card>
    );
  }
}


// so we can bring our pieces of state and use it in this component
const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return {
    name,
    phone,
    shift
  };
};

// Make the component available to other parts of the app
export default connect(mapStateToProps, {
  employeeUpdate, employeeSave, employeeDelete, cancelUpdate
})(EmployeeEdit);





/* EmployeeEdit component

we will now make the EmployeeEdit component.
it will looks similar to the EmployeeCreate component.

but it will have to do different things when the user clicks the
buttons at the bottom.
thats why creating a different form will let us more easly
customize the logic behind the button.

*/

/*
the mapStateToProps function
in the EmployeeEdit component
I wrote a bit differently
than the mapStateToProps function
in the EmployeeCreate component
just to show that both ways are ok
and just look different.
*/

/* ESlint
small note:
make sure to instal ESlint
so it will notify you if you have small annoying typo mistakes.
*/

/*
here is where it gets interesting.

we need to customize this version of the form
to work for editing an employee.

this means 2 things:
1) this form always gets navigated to
with an employee in mind,
the employee we are trying to change.
so we need to load this employees info into the form reducer.

2) we need to add another action creator
to specifically update an employee
over the data of its current data in the firebase database.


at this moment when a user press an employee line
it is going to the employeeCreate route.
we need to make sure we change it over to employeeEdit,
so now we need to add a new scene to Router.js
to represent employeeEdit.
and then we will have access to the Actions.employeeEdit();
route as well.


solving the two problems above.

1) lets now solve the issue
that whenever we navigate to the EmployeeEdit form
we want to preload/bootstrap the reducer (EmployeeFormReducer) with the employee
that is being passed to the form.
inside of this.props.employee
is the employee we are trying to modify
that we passed this component from the ListItem component.

we will use a trick to load up our reducer with this employee,
first lets import
import { employeeUpdate } from '../actions';
employeeUpdate is the action creator that will modify
our EmployeeFormReducer,
thats what changes the state of that reducer.
(dont forget to add it to the connect helper at the bottom).

we will make a life cycle method,
componentWillMount
and once this EmployeeEdit component renders to the screen
inside the componentWillMount method
we will call the employeeUpdate
with any property that this.props.employee has.

to do that we will need to use low dash as well,
_
first we need to import it,
import _ from 'lodash';

we are going to use _
to iterate over all the properties of the employee:
_.each(this.props.employee)
the this.prop.employee
is an object with key value pairs of: uid, name, phone and shift.
so for each key value pair:
_.each(this.props.employee, (value, prop))
we will call our action creator:
_.each(this.props.employee, (value, prop) => {
  this.props.employeeUpdate({ prop, value });
});

lodash calls our function with the order 'value', 'key'.
The idea here is to stick with the convention of iterating over an array,
where the first argument is the value of an index,
and the second argument is the index/name (name, phone, shift, etc..).

another approach to do this is to
create a new action creator
to accept an entire employee model
and then update all of the values in the reducer.

note!
I still like using Lodash because it is more flexible in two fronts -
1. It will not throw an error if you try to iterate over a non-array value.
2. Closely related to #1,
lodash's 'each' will work properly on objects in addition to arrays.


when we edit an employee
we are not touching the underline employee model
that came from firebase (the one being maintained by the EmployeeReducer).
this means that if we edit an employee
go back to the EmployeeList screen
and then again go to the edit screen of that employee
his values will return to thier original values,
the values that are saved on the firebase server.
this is because nothing got saved to the firebase database.


2) lets now wire up our button
so when we press the save changes
it will update the information in the firebase database.

we need to make an action creator to actually
save the changes we are making into an employee
in our firebase database.

for now when a user press the Save Changes button
the onPress event handler calls the onButtonPress function
which for now just
consol.log(name, phone, shift);
we verifed with it that we get the updated values out of the EmployeeFormReducer
for the employee we want to save the new values into the firebase database.

so now we need to replace this console.log()
with an action creator that will save our new data into firebase.

lets now make this action creator
(open EmployeeActions.js file)
we previewsly created new record in firebase
updating is just as simple.

don't forget to import this action creator
and to add it in the connect tool.
if we want we can now also remove the console.log(name, phone, shift);
we used to check we are geting the new information.

when we call the employeeSave action creator
don't forget!
to also need to give it the uid of the record we are trying to update.
this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });

how do we get the this.props.employee.uid ?
we get to the EmployeeEdit screen
by pressing an employee row in the EmployeeList screen,
when we do that we have an event handler, onPress (implemented in the ListItem)
that calls the onRowPress function.
onRowPress() {
  Actions.employeeEdit({ employee: this.props.employee });
}

in this function we move to the EmployeeEdit screen
and when we do
we also pass it the this.props.employee
as employee
so now in the EmployeeEdit
we can do
this.props.employee.uid or this.props.employee.name
etc...
to get the information we need.

so this is where this.props.employee.uid
is coming from.


now when we test it in the simulator
we can also see the data is being saved live
in the firebase console.
any record that is being update by pressing the Save Changes button
will now show in yellow in the firebase console.

last thing to do is verify we got the
console.log('save!');
showing in our console,
and it does.



lets now also navigate the user back to the EmployeeList screen
after they successfuly saved the changes.

so until now our action creator was:

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => console.log('saved!'));
  };
};

lets now change it to move us back to the EmployeeList screen
after we save the changes we made to an employee.

so inside the same action creator
we will need to do similar changes like we did in the
employeeCreate action creator.

*/

/* text messaging button

we will not add our text messaging button
to this form.

<CardSection>
  <Button onPress={this.onTextPress.bind(this)}>
    Text Schedule
  </Button>
</CardSection>

so when the user press the button
the onPress event handler will call the
onTextPress helper method.

we need to import it so:
import Communications from 'react-native-communications';

onTextPress() {
  const { phone, shift } = this.props;

  Communications.textWithoutEncoding(phone, `Your upcoming shift is on ${shift}`);
}

we will do an interpolated string in the place of the second argument
because we want to customize the message that will be sent.

changed the
Communications.text(phone, `Your upcoming shift is on ${shift}`);
to what you see above,
otherwise you will get % sign between words
in the place there should be a space.

important!!!
because we used
string interpolation
it is important to use the back ticks, ``
instead of regular quotes.

ESlint
tells you that you can use just the text()
without the Communications at the start
but it does not matter.


after installing a new package
you might get an error that talks about imports
make sure you close your emulator before installing a new package
as it might solve this problem.
if that does not work
close the emulator
close the cmd
close android studio
restrat all but the emulator
install the package again and then run the simulator.

now we can send messages to our employees using the app.

moving to the last feature we need to work on,
we need to add a delete employee button
and when the user press that button
I want to pop up a modal to the user
that asks them to confirm the delete press
(this is done because the text schedule button
and delete button
are close to each other
and a user can accidentally press
the delete button by mistake
so we don't want the press to right away delete the employee).



*/

/* showing a modal to our user

a modal is a pop up
that asks from the user to confirm the last action he just did.
we are not moving the user to a different screen
we are showing the user a pop up (modal).

the user will need to confirm his action
with a press on a yes or no.

to do this we are going to use another primitive component.
go to in the browser
https://facebook.github.io/react-native/docs/getting-started.html
and on the left hand side look for Modal.

modal is a primitive component
that is a part of react-native.

what we care about in this modal are:

visable flag
visible={this.state.modalVisible}
which determine if we can or cant see the modal.

transparent flag
transparent={false}
decides whether or not we can see through it to the content behind it.

animation type
animationType="slide"
determines how the modal will be showed to the user.
does it pop up/slide

event handler
onRequestClose={() => {alert("Modal has been closed.")}}
if the modal gets closed by the user
we will get a call back and we can do what we want in the {}

note:
on android it is a must to pass in a
onRequestClose method.
even if we don't want to do anything with it
we have to pass it in.

because we might want modals in many different areas of our application
so it makes sense to create it as a reuseable component
and put it in our common folder.

we might want to have many yes or no questions in many different locations
in our application
so we should turn it into a reuseable component.
(move to the Confirm.js file
this is our reuseable modal).

*/

/* adding the Confirm component to EmployeeEdit

all we have to do is place this modal on this component
to see if it works and how it looks like.
so inside the <Card>
we will do:
<Confirm>
  Are you sure you want to delete this?
<Confirm>

here is the important part,
the Confirm by default
is not visable
until we pass it a prop
of visable.
we need to pass it visable={true}
so as of now it will not be visable
even if we toss it in the EmployeeEdit
until we specifically toggle it to be visable.
this is whats so great about the Confirm box we just built.

so we want to make sure the user can see this Confirm component
only after the user press the delete button.

lets now create a new CardSection
with a button in it.
that button will say Delete or Delete Employee.
lets do that above the Confirm.




so now the last big challange is
to make sure the Confirm is not visable by default.
we need to pass it a visable flag, visable={}
we are telling from EmployeeEdit
when the Confirm should be visable.
it should not be visable all the time,
we only some times want it to be visable.
so to toggle the visabiliy of this thing
it needs to go between true and false.
and it will be flipped when ever we press the Delete button.

this sounds like
component level state.

but don't we only use redux store state now?
we dont always have to use redux everywhere.
the visability of the Confirm message
does not concern any other aspect of our application
so it does not belong in application level state (redux state).

so we will add a new piece of state called showModal
if its true show the modal
if its false do not show the modal.

so first initialize our piece of state at the top.
state = { showModal: false };


<Confirm
  visible={this.state.showModal}
>
  Are you sure you want to delete this?
<Confirm>


now the only thing left to do is
setup a onPress event handler on the delete button
to toggle the value of showModal.

ok now when we press the Delete button
we see the Confirm Modal poping up.

now we need to add the onAccept and onDecline event handlers
to the Confirm component.
so at this moment when we press the yes and no button nothing happens.


*/

/* adding the onAccept and onDecline event handlers

in the Confirm component
we see that we pass it two seperate methods.

one that we call onAccept when the user press yes
one that we call onDecline when the user Press no.

both onAccept and onDecline are coming from the props
that we pass this Confirm component.

this lets us customize
and have very specific behavior
whenever the user clicks yes or no.

but we now need to implement this behavior.
lets now pass in to the Confirm we used in the EmployeeEdit form
an onAccept and onDecline prop
and in these call backs we need to do the appropriate thing.
either delete the user or dismiss and go back.

lets now pass it those props.

<Confirm
  visible={this.state.showModal}
  onAccept={this.onAccept.bind(this)}
  onDecline={this.onDecline.bind(this)}
>

onDecline

lets first do the easy one, onDecline
when the user press the onDecline
the user just want to close the modal,
close that message box that pops up to them.

the modal is only visable when
this.state.showModal
is true.

so the only thing we have to do here is flip this boolean into false
and the modal will just dispear.
we just toggle the visability of the modal with a single prop.

onAccept

this is where we want to actually initiate the employee deletion process.

to work with our firebase data
we will use the same pattern that we used in the past.
we will create an action creator.
(move to the EmployeeActions.js file)

*/

/* lets wire up the employeeDelete action creator in here.

lets now wire up the employeeDelete action creator
and test how it behaves.

don't forget to import it
and make sure I bind this action creator to the component it self
using the connect tool.

last thing we have to do
when ever a user seeing the Confirm component
whenever they press the yes button to delete an employee
this will call our onAccept callback (goes back to call the method)
so inside the onAccept we need to make sure
we call the employeeDelete action creator.
and we pass it the employee's uid,
the uid of the employee we want to delete.

onAccept() {
  this.props.employeeDelete({ uid: this.props.employee.uid });
}

or

onAccept() {
  const { uid } = this.props.employee;

  this.props.employeeDelete({ uid });
}

both works

*/

/*
return to important an important part

is how we used to EmployeeForm
both in
EmployeeCreate
and EmployeeEdit

we riped out just the fields them selves so we can show it
in both EmployeeCreate and EmployeeEdit forms.

this is a good decision because if we ever come back
with more custome behavior
for either the create or the edit side
we can keep on adding more implementation
without really having to worry about disrupting anything
thats going on with each of the individual forms.

tho this makes the assumption
that the fields that we show are not going to change.


*/
