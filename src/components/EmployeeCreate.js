// Import a library to help create a component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';

// Create a component
class EmployeeCreate extends Component {
  onButtonPress() {
    const { name, phone, shift } = this.props;

    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}


// so we can bring our pieces of state and use it in this component
const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift } = employeeForm;

  return {
    name,
    phone,
    shift
  };
};

// Make the component available to other parts of the app
export default connect(mapStateToProps, {
  employeeUpdate, employeeCreate
})(EmployeeCreate);


/*
we need to make sure the router
knows about this component.

and make a scene to represent this component.

if our app moves a bit slowly between scene don't worry
on the mobile device it will run smoothly.

*/

/*
after we added the dummy component we made for the EmployeeCreate component
to the Router and saw that its showing up
we can start working on making the real EmployeeCreate form.

lets add the functionality that lets user's create employees.
this is another exercise in form generation and form validation.

we are going to make the componenets.
wire them up to action creators.
make a reducer to pass the values of the form.
and make a piece of state to hold those values.

we thought about making a create form component
and a show form component.
the show form will have the option to message the employee his shifts
and all of the other functionalities we want.
later I decided we can combine it into one form that will make sense.

first I created the following form:

<Card>
  <CardSection>
    <Input
      label="Name"
      placeholder="Jane"
    />
  </CardSection>

  <CardSection>
    <Input
      label="Phone"
      placeholder="555-555-5555"
    />
  </CardSection>

  <CardSection>
  </CardSection>

  <CardSection>
    <Button>
      Create
    </Button>
  </CardSection>
</Card>

and checked that it shows properly with no compilation errors.

now we will make our action creators and reducers
for this form.
rememeber, we prefer not to hold our values in the componenet level state
but to put it in the redux application level state in the pieces of state
we make in the index.js in the reducers folder.
we want our data to sit in the app level state.

lets now make our action creators
(move to the index.js in the actions folder and to EmployeeActions.js file).

now that we made our action creator
we need to make a reducer, EmployeeFormReducer
to get the action from the action creator.
an action creator will always sends its action to all of the reducers
and just the reducer that recognizes the action will take it and work with it.

now that we have the action creator, EmployeeActions ready
and our reducer, EmployeeFormReducer ready
we are ready to import them into our EmployeeCreate form.
lets import the actions and the connect tool as well
and wire it up using the connect tool
and then use it in our code.

first import
import { connect } from 'react-redux';
import { employeeUpdate } from '../actions/EmployeeActions';

lets use the connect tool to wire the actions into the EmployeeCreate form
export default connect(null, { employeeUpdate })(EmployeeCreate);
we do not have a mapStateToProps function yet so we inserted null in its spot
for now.
and insert the action creator we want to use, employeeUpdate
as a second argument.

lets now add the mapStateToProps function
to pull staff of the employeeForm piece of state
since we are going to use the name, phone and shift values
inside the EmployeeCreate component.
export default connect(mapStateToProps, { employeeUpdate })(EmployeeCreate);
and write the mapStateToProps as we did in our code.

now we just need to make sure we
pass these values, the name and phone
on to the respective inputs.
value={this.props.name}
value={this.props.phone}

one last thing we need to do is
when ever an input value is changed, on onChangeText
we call our employeeUpdate action creator
with the given text the user enters.
onChangeText={text => this.props.employeeUpdate({ prop: 'name',value: text})}
(we used this.props.employeeUpdate and not this.onEmployeeUpdate.bind(this)
because we did not make a helper function like we did in the LoginForm component
this.onEmailChange.bind(this)).

note:
our employeeUpdate action creator recieves an object that holds a prop and a value
and thats why we wrote the code employeeUpdate({ prop: 'name', value: text})} for it.
the passing of a single object with props is what enables us to use
a single action creator as we did,
rather than having a few action creators as we did in the authentication.

don't forget to do this as well for phone.
onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text})}


refactor!
lets refactor the lines
onChangeText={text => this.props.employeeUpdate({ prop: 'name', value: text})}
onChangeText={text => this.props.employeeUpdate({ prop: 'phone', value: text})}
using es6 to
onChangeText={value => this.props.employeeUpdate({ prop: 'name', value})}
onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value})}

lets now test that our app works so far.
(ESlint notfied us we need to use the mapStateToProps,
because we forgot to add it to the connect helper).

note:
because of the odity of how firebase handles errors,
if there is any error in our code during the sign in process
its going to be caught during that firebase promise.
you might think you entered the wrong password
but it could be that the promise swallowed the error.


*/

/* picker widget

the picker widget purpose is to show
a list of days of the week to the user
so they can pick one of those days for this employee to work on.

for this we are going to use a react-native primitive component,
it is called a picker component.

(look at the react-native documentation in the web if you like as well,
https://facebook.github.io/react-native/docs/components-and-apis.html
look for picker at the left side).

we want to use the picker and not the pickerIOS,
pickerIOS is specifically for IOS.

the picker will work on both android and IOS, which is what we need.

Picker:

<Picker
  selectedValue={this.state.language}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>

label is what the user will see
value is the internal value that the application is going to use.

lets now implement this Picker inside of our applicaiton.
import the Picker from react-native.
and in our unused CardSection we will add our Picker.

<CardSection>
  <Picker>
    <Picker.Item label="" value="" />
  </Picker>
</CardSection>

we added seven of those Picker.Item because we have seven
days in the week to choose from.
In our case label and value will be the exact same thing.

now we need to declare the
selectedValue
and the onValueChange
in our Picker.

In the Picker api
declaring the picker is a little bit different in the way we are setting the
selectedValue
but it is completely identical as the input tags we did above it.

<Picker
  selectedValue={this.props.shift}
  onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
>
  <Picker.Item label="Monday" value="Monday" />
  <Picker.Item label="Tuesday" value="Tuesday" />
  <Picker.Item label="Wednesday" value="Wednesday" />
  <Picker.Item label="Thursday" value="Thursday" />
  <Picker.Item label="Friday" value="Friday" />
  <Picker.Item label="Saturday" value="Saturday" />
  <Picker.Item label="Sunday" value="Sunday" />
</Picker>

remember at the start shift: ''
exactly like name and phone.

we later decided to change
onValueChange={day => this.props.employeeUpdate({ prop: 'shift', value: day })}
to
onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
just to be consistent but both will work.


now we test to see if it works
and to our suprise the Picker didn't show as it should have.

by default the Picker renders with a zero width set to it.

to make sure it expands to fill the whole area available to it
we have to tell it to expand to all of that area.
to tell a component to expand to fill all of the available area
we pass it a style={{ flex: 1 }}
and now its working as it should.

the picker looks different between android and IOS.
in android you pick between the available options.
in IOS you can scroll down using a slider.
this is just a small difference between the two phones.

our picker is in place
but we do not have a label next to it yet to tell the user what is it for.
so to add a label we will not make a seperate component
like we did with the input component for the primitive textInput component
this is because we need to specify the days of the week in this picker
this is a lot of customization for a reuseable component
which means we will not reuse it too much because it is very specific.
so we will simply add a Text tags with 'Select Shift'
and it to it a bit of styling.
paddingLeft is gonna make sure it stands off the left side of the form
and line up nicely with the name and phone labels.

we can see that the picker is positioned a bit too much to the left.
(look at the picture
part 2, slide 8, picker is positioned too much to the left).
this is because the CardSection component has a style of
flexDirection: row,
this means that all of the CardSection children
will be layed out going from left to right,
so first there is the shift that takes up the full height
and the second element will be placed to the right of the shift label.

so for this specific case we want the layout to go from top to bottom,
flexDirection: column
this means we want to overide this specific CardSection style
with some custom style,
for that we will pass to the CardSection an object with a prop inside of it.

lets now make sure we can overide the styling inside this
very particular CardSection.
<CardSection style={{ flexDirection: 'column' }}>

note:
for all of the primitive component we used so far,
like Text, Picker or TouchableOpacity
all of those accept a style prop
and react-native internally makes use of that style prop.
the CardSection is not a primitive component
its a component we made.
so there is no property that will automatically be consumed/used for us
when its a component we made.
just becaused I passed a style object to the CardSection
it does not mean it will be used in any way.
we have to open the CardSection component
and make sure that I make use of this prop that Im passing to the CardSection.
again, I have to do this because its a component that we made.

Move now to the CardSection and change it accordingly.


later on I removed the
style={{ flex: 1 }}
to make the Picker visable
after changing the CardSection.


*/

/* saving the data from the EmployeeCreate form using firebase

lets now save the data the EmployeeCreate form is producing.

so when a user submits this form we save this data some how
so if the user
logs out and then logs in or even uninstalls the app
or uses it on a different device
the user will still see thier list of employees.

to save our data for each user
we are going to make use of firebase.
we are already using firebase for authentication
so it makes sense to also use it to store our data as well.

firebase was initially known for its data storage capabilities
so it makes sense to use it for this purpose.

the object we want to save is the employee model,
an object that has a name, phone and shift.
this is exactly what our form is producing right now,
the EmployeeFormReducer produces exactly that.

in firebase in the browser
go to the DataBase tab button.

firebase is a json data store
its not like SQL data base that you have different tables
and rows on each of these tables.

the data we are going to put in the json store is a java script object
which will hold some number of properties.
and each property has a value.
we will explain how we structure these objects inside of our firebase database.

each time we use firebase
try to understand what will be the scheme/structure
of the data we want to save in the firebase database
because if done well its going to save time down the line.
(look at part 2, slide 9,
scheme or structure of how we want to save our data in firebase for this app).

this scheme is very generic so we can reuse it
on other apps as well without a lot of change.
this scheme is reuseable on a lot of different types of apps.

the scheme:

the blue box in the picture is firebase database.

inside it we are going to make a collection of users,
we are going to have a number of users inside our application.

each user is going to have its own collection of employees.
for example user number one is going to have a collection of employees
that contains employee number one and employee number two.

the fact that we authenticate the user using firebase
does not mean we are getting the users injected
into our data store as well.
these are two seperate things in firebase,
Authentication and database.

(look at picture
part 2, slide 10, the json data structure).
this is the data structure we are going to see inside of our application
for all of our different users.

we are going to have a users key that points at an object {},
the keys of that object are each of our individual users,
user with ID 456, user with ID 123.

each of these users points to an object of employees.
the object of employees hold the employee with ID 1 and employee with ID 2.

each employee has its own name, phone and shift.

again this is a json scheme.

*/

/* SECURITY

each user that signs up to our app is going to have his
own slice of data.
user 123 is going to have its own collection of employees,
so we should make sure we implement some type of security in our app
to make sure users can't hack around in our app
and some how read the employees of another user.
we need to make sure we have some amount of security in our firebase database.

lets expand a bit more about security,
the default security rule is that a user must be authenticated,
so once a user is authenticated he can reach out to any data
inside of our database!!!
we are going to fix this!!!

under the Realtime Database tab
click the rules tab at the top,
the rules tab changes the security rules of our application.

{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

default case is:
only allow the users to read and write to our database
if they authenticated.
if auth is null do not allow them to
read or write any data of/to the application.

in this rules tab we are going to set some number of rules
that dictates what data a user can read and write inside of our database.

lets now update the rules tab to make it a lot more secure
to the application we are going to make.

{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}

in my firebase data; "rules": {
there will be a collection of users; "users": {
in the users collection there will be a bunch of keys
where each key is a user's ID; "$uid": {
if a user trys to edit any data inside the uid bucket
they must have a uid equal to auth.uid;
".read": "$uid === auth.uid",
".write": "$uid === auth.uid"

in other words,
look at the current users id, auth.uid
if it equals to the id of the bucket, "$uid"
then allow them to read or write from this data
otherwise deny to them.

example:
if user 123 logs in
and trys to edit any data inside the user 456 bucket.
firebase is going to compare the uid of
user 123, the currently logged in user
to the bucket id of user 456
since are not equal the user will not have read or write access
to any of the data inside the bucket 456.

this is how security works in firebase.

this is a very generic scheme and works in many cases.
since for any type of app where a user has its own island/bucket
of data this type of scheme works well.

don't forget to press the PUBLISH
of the new rules set we just made.

now no user can reach out to other users data and mess with it.

*/

/* lets now start saving the data into the firebase database

once we start saving data it will show
in the firebase database interface.

lets now save the employees that are being created within our application
when the user press the create button.

for that we will create an event handler on the button,
onPress.
when ever the button is pressed we will call an action creator
and this action creator will attempt to save this data to firebase.
if it is successful it will navigate the user back to the EmployeeList screen.

so the road map here is:
hook up the button
make the action creator
save the records
navigate back to the EmployeeList screen
where the user can see thier new employee pop up on the list.

hook up the button
<Button onPress={this.onButtonPress.bind(this)}>
  Create
</Button>
because it is a call back and we need to reference to this
we need to bind the context.

inside our onButtonPress function
we will call our action creator.
onButtonPress() {
  const { name, phone, shift } = this.props;

  this.props.employeeCreate({ name, phone, shift });
}

lets now make this action creator
and hook it up to this componenet.
(move to the EmployeeActions.js file).

don't forget to
import the employeeCreate action creator
and to add it to our connect tool so it will pass its action to the reducers.
(lets multiline in the connect helper since its becoming a bit too long).

we changed
this.props.employeeCreate({ name, phone, shift });
to
this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
a more detailed explanation for this is in the EmployeeActions file.
(we did it so in the case the user don't uses the picker
it will default shift day to monday as shown on the picker
as the first option,
and not just send an empty string instead).

note:
we are exploiting a work around in javascript,
we are couting on the fact that our reducer produces shift
as an empty string by default,
empty string is a falsy value in javascript,
so if we do in javascript '' || 'Monday'
the result will be Monday.

the idea is that by default our picker should always have
a value set to it.

*/

/* geting a prop from the navigation tool, Actions.employeeCreate()

lets now console.log(this.props.employee);
inside of our render method.

we can see that if we press the Add at the top right
in the console we see undefined
(console at http://localhost:8081/debugger-ui).
because we went to the form and did not pass any configuration
directly to the form.
only by navigating to the EmployeeCreate form by
tapping on an employee row/ListItem we are passing that extra prop to it.

so now when we tap an existing employee row
we get that particular employee in the EmployeeCreate form as well.

we are now loading up the EmployeeCreate form
and we know which employee we want to show in it.
we know which employee we want to show in it,
which employee we want to prefill these fields with.

lets now do the prefilling.

*/

/* prefilling

prefilling the from with the this.props.employee
we got from the navigation tool,
Actions.employeeCreate(this.props.employee);

we can now navigate to the EmployeeCreate form either by
creating a new employe when we tap the Add button
or by tapping one of the employee's row
incase the user wants to edit/delete or text message the employee.

we can now remove the
console.log(this.props.employee);
we had at the top of our render method to check if we are recieving this prop
as we wanted to from the ListItem component when the user taps a row.


now what we should decide about is whether or not
we should reuse this component for both creating an editing an employee,
one componenet that is responsible for both creating and editing an employee.
or make a new component to deal with the editing employee.
(look at the picture part2, slide 11,
difference between the
create employee form
and the display/edit employee form).

the reason that deciding if to have one component for both operations
is a big deal, is because
there is a lot of logic that is common for both creating and editing
an employee.

the big difference between the two are the buttons at the bottom.

on the create form we got a create button.

on the display/edit form we got a save and delete buttons.
(the save button is similar to the create button but
will work a bit differently).
it will try to update an existing employee
as opposed to creating one from scratch.
it will also have a delete button to delete an employee
and a text message an employee his shift.

all the buttons at the bottom are not shared between the two forms.

does it make sense to try and reuse this component?

to have this thing work using a single component
there will have to be a lot of conditional logic (if...then...)
inside of this single component.
there would be benefit in code sharing
but a cost in increase complexity inside this form.
these are the pros and cons of this decision.

(this decision is not just limited to react
it is common to all types of frame works).

(look at
part2, slide 12
and part2, slide 13
to see the difference in the logic between the two forms).

important!
when the user edits the existing data in the form
we want to avoide updating our user's model in memeory
because the user can keep changing the input
or even press the back button
and this should only be saved in the user's model in memeory
when the user press the save button.

so whenever the user edits the form
we should not edit the user's model in memeory
(not editing the one that is stored in our EmployeeReducer
- the one using the firebase database.
we are editing the employee that is stored inside the EmployeeFormReducer).

once the user clicks save
we save the data for the EmployeeReducer.

now we will try to make an attempt at reusing some of the code
we already got in the EmployeeCreate form.

*/

/* reusing some of the code we already got in the EmployeeCreate form

one option is to reuse the entire component
and add to it conditional programing (if...)

another is to make a new component entirely.

we will take a hybrid approach,
the reuseable part in the EmployeeCreate and EmployeeEdit
are the fields in the middle, name, phone and shift.

we will create a seperate component
we already have EmployeeCreate
and we will make EmployeeEdit.

we will then make a third component called EmployeeForm,
its purpose is to give us the 3 fields above
in any place we want.
I will pull these fields into a seperate EmployeeForm component
and use that component inside the EmployeeCreate and EmployeeEdit components.

so the EmployeeCreate and the EmployeeEdit
will have different buttons.
EmployeeCreate at this moment have create button
and EmployeeEdit will have a save and delete buttons.

lets now make the EmployeeForm component.

*/

/*
since we created the EmployeeForm component
to hold the name, phone and shift
we can clean them from this EmployeeCreate component
as we are going to use the EmployeeForm component
inside this component.

so lets clean our form first,
delete:
import { Picker, Text } from 'react-native';
delete:
the our 3 fields.

and add:
import EmployeeForm from './EmployeeForm';


the important part!
any prop that is being passed to the EmployeeCreate component
should be passed as a prop to the EmployeeForm component.

<EmployeeForm {...this.props} />

we will talk about why we do this in just a second.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

notice that everything still works the same, when we press the create button.
the only difference that we made is that we extracted all of these fields
to a seperate component.


*/

/* EmployeeEdit component

we will now make the EmployeeEdit component.
it will looks similar to the EmployeeCreate component.

but it will have to different things when the user clicks the
buttons at the bottom.
thats why creating a different form will let us more easly
customize the logic behind the button.
(move to EmployeeEdit.js file).

*/
