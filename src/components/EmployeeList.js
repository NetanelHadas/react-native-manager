// Import a library to help create a component
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import { employeesFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import { CardSection, Button } from './common';

// Create a component
class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    console.log(this.props);
    return(
      <View>
        <ListView
          enableEmptySection
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />

        <CardSection>
          <Button onPress={this.props.logoutUser}>
            Log-out
          </Button>
        </CardSection>
      </View>
    );
  }
}


// so we can bring our pieces of state and use it in this component
const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }; // { name: 'Jane', phone: '555-555', shift: 'Monday', id: 'bsadaswhatever'}
  });

  return { employees };
};

// Make the component available to other parts of the app
export default connect(mapStateToProps, { employeesFetch, logoutUser })(EmployeeList);


/*
for starts this is just a test component.
*/

/*
after we are done with navigation between the
LoginForm componenet and the EmployeeList componenet

we can now start making this componenet a real componenet
and not just a dummy component.

we can't create employees for this employeeList component to show.

so first lets make the create employee component.
so our users can create an employee.
and then we can come back and work on the EmployeeList component.

*/

/*
now that we finished working on the EmployeeCreate form
and successfuly transfered the data to the firebase database
lets now work on the EmployeeList component
and make sure it can display a list of employees to our user.

we need to some how load our list of employees into this component
(we can create them but not fetch them yet).

so lets first make sure we can fetch the employees into our applocation state.
and then work on the EmployeeList component a bit more to show these employees.

work process:
lets make an action creator to fetch our list of employees.
we will ofcourse add a new reducer to store that list of employees.
and then come back to EmployeeList and render that list of employees.

lets now add our action creator in the EmployeeActions.js file.
because this is the file that has to do with everything related
to working with employees.
(move to the EmployeeActions file).

we finished making the employeesFetch action creator,
so lets now import the employeesFetch action creator and use it.

dont forget to import the connect helper
import { connect } from 'react-redux';
and wire it up.
export default connect(null, { employeesFetch })(EmployeeList);
there is no mapStateToProps function for now so put null at the first argument.

lets now call the employeesFetch action creator
so we can fetch this list of employees
or start watching for employees to be loaded the instant this component
is about to be rendered to our device.
so we will add our life cycle method,
componentWillMount
so as soon as this component is about to be shown on the device
we will attempt to go get all of those employees.
componentWillMount() {
  this.props.employeesFetch();
}


last thing we need to do is add a new reducer to recieve
this list of employees.
this reducer will have the sol purpose of holding out list of employees
that are active for this user.
for this we will make a completely new reducer
and not use the EmployeeFormReducer.
because it has nothing to do with the EmployeeCreate form
but has everything to do with the employees showing screen.
(we created the file EmployeeReducer.js
move to that file).

*/

/* lets now render this list of employees to the user

we will now need to render this list of employees using the
ListView component.
(like we did in the tech_stack application).
don't forget to import ListView at the top
and remove the View and Text tags.

for a ListView component we have to make a data source object, ds,
and this ds object require us to give it a method
that say how to render an individual row (rowHasChanged is responsible for that).

componentWillMount() {
  this.props.employeesFetch();

  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  this.dataSource = ds.cloneWithRows(this.props.employees);
}


there is something a bit funny in the code here at this moment,
when the EmployeeList component is about to be rendered to the device
the componentWillMount will be called.
we immidiately tell our action creator to fetch our list of employees,
so the first time this renders to the device we will not have any employees available.

fetching the employees is asynchronous request,
which takes some amount of time.
but then the very first line of code after it
that we try to make use of is
this.props.employees
which we expect this.props.employees to be empty
by the time we get to that line of code there.
because the actual request to fetch the list of employees
this.props.employeesFetch();
is not going to be complete just by then.

because of this problem we need to do a refactor.
any time a piece of state updates
the connect helper will run mapStateToProps.
and the component will get some new number of props,
that new ones in addition to the old ones that we pulled from our state object.

so even if this.props.employees does not have any value now
it will have a value eventually.

we can get a handle on that value by using another life cycle method called,
componentWillReceiveProps()
this is a new life cycle method that will be called
when ever we are about to receive a new set of props
to rerender the componenet with.
inside this life cycle method we can recreate our data source
assuming that this time around we will have access to our employees.

the interesting thing about the componentWillReceiveProps life cycle method is
that it gets called with the new set of props the component
is about to be fed
and this new set of props is captured as the first argument to the method.
so the method is called with something that by convention we call
nextProps.
so inside the method componentWillReceiveProps
nextProps are the next set of props that this component
will be rendered with.
and this.props is still the old set of props.

so we get access to both set of props
inside of componentWillReceiveProps method.

it is a good method to use incase we expect changes
that we want to react to inside of our props object.

we are now thinkg about moving the creation code for creating our data source
into our componentWillReceiveProps method.
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

this.dataSource = ds.cloneWithRows(this.props.employees);

but that might not be the best solution.

this is because once a user creates an employee
he then returns to the EmployeeList component,
when the user goes to EmployeeCreate the EmployeeList component
gets thrown away.
when the user goes back to the EmployeeList
they are going to get a new instance of EmployeeList.

so
it will be EmployeeList will be rendered to the screen,
we will call componentWillMount,
we fetch the new list of data.
but we already loaded all of our employees
and they are still sitting in our global state object.

so it will benefit us if we try to build our data source both
when the component first loads up
and when it recieves new props.

so our solution for this case is:

lets add a new helper method called, createDataSource()
I expect this thing to be called with a props object.
and inside of it we are going to put all of the ListView
building staff.
createDataSource({ employees }) {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  this.dataSource = ds.cloneWithRows(employees);
}

since we destructred employees from the state object
instead of this.props.employees
we can use employees

and then call the createDataSource from both the
componentWillMount
and from componentWillReceiveProps

so no matter where im coming to this component from
I will always attempt to create my data source
which is exactly the behavior I want to have.

now each time we get a new list of employees from firebase
we will recreate our data source.

*/

/* Employees object into an array

as we saw in the console.log(action)
we did in the EmployeeReducer
our Employees are given to us as an object.
rather than the array that we expected.

in the commend
this.dataSource = ds.cloneWithRows(employees);

the cloneWithRows has no idea how to work with an object holding objects
but it does know how to work with an array of objects.

we have to convert the employees piece of state
from an object employees
to an array of employees.

in our mapStateToProps function
we will convert our state.employees
from an object
to an array.

lodash library

to do as instructed above we need to install a library called
lodash
so
npm install --save lodash

lodash has a bunch of helper methods for working with
objects and arrays
and it has one in particular that we are going to use
with the conversion from an object to an array.

don't forget to import it.
import _ from 'lodash';


we will now also add our mapStateToProps function.
const mapStateToProps = state => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });
};


for every element of the employees object,
every key value pair,
we are going to take the employee model, val
and the key, which is the uid in the pair (val, uid)      (uid is unique id)

so from this thing I will return an object => {}
containing all of the properties of the employee model, ...val
and the uid

what the above code says is:
state.employees is an object, it has many key value pairs.
for each key value pair, this iteration is done by the .map
run the fat arrow function => {}
the fat arrow function will be called with each value (val) and key (uid).
val is the user model, it has the name, phone and shift properties
and uid is the record.

we then create a new object return { }
and push all of the values, ...val from the model, the name, phene and shift
and also throw the uid on top.

so the end result will look like:
{ name: 'Jane', phone: '555-555', shift: 'Monday', id: 'bsadaswhatever'}

so for each object inside the state.employees object
we craft the above object to be an object we put in an array.
to this array we assign the name employees,
const employees = ....

.map is what puts the objects into an array for us.

and the last step is to just return this array.
return { employees };


now we can use this array of emplyees inside of our EmployeeList component as
this.props.employees


lets now throw a console.log() into our render method
to verify this actually works.

the instant the EmployeeList screen showed up,
we got the console log because it rendered the first time.

it then called our action creator to go fetch some data
and after that data was fetched
we ended up with a second console.log() in the console
from the render method because our component rerendered.

in the first console.log of our employees props object.
we have an employees prop
which is an empty array (we have no yet loaded any employees).

then on our second console.log
we have an employees prop
it is an array
it has 6 records in it.
and each record is an object.
each record has a name,phone, shift and a uid of that particular employee.

lets now change our EmployeeList component
to show a list item, an individual row for each of our employees
that we have loaded up.

*/

/* now that we have the data we can now start working on the ListView

in our tech_stack app
we made a single item component
to represent a single item/employee in our list.

it is a simple component
but we will still make it into something seperate
just incase we want to give special functionalities
to an individual row.

lets first put in our component
the ListView tags
<ListView
  enableEmptySection
  dataSource={this.dataSource}
  renderRow={this.renderRow}
/>

enableEmptySection comes to solve a small issue in react-native,
heads up this issue might be fixed in following updates so be aware of it.
dataSource={this.dataSource} is a property we always craft
when we get a new set of props.
renderRow={this.renderRow} is responsible in rendering a singular row
of our list, we need to build this renderRow function.

renderRow(employee) {
  return <ListItem employee={employee} />;
}

as we said, the ListItem is the component we will create.
(like we did in tech_stack when we wanted to add the spring animation
to make the library expand when we click on it).
don't forget to import ListItem, altough we have not made it yet.
we can also delete the imported View and Text because we don't use
them anymore.

usually if we have a few ListView, lists in our app,
we would instead of calling it ListItem
we will call it EmployeeListItem or something like that
so it will be clearer what we use for each list.

we will now make our
ListItem component
to show each employee on his own row.

now we can see our list of employees pop on the screen.


now if we add a new employee
he should automatically show when we return on the EmployeeList screen
when we return to it.
this is because the employeesFetch action creator we made,
we made it so we only need to call it one time in our app
for it to always refetch the data if any new data comes from firebase
(firebase is a live dynamic data store).
so every time the collection of employees gets updated
we will get notifed by the .on('value') event handler.

lets now work on our next feature,
the ability to edit and delete an existing employees.

*/

/* edit and delete an existing employees

we should be able to tap an employee
and see more details about them
that we can edit.

once the user taps one of the employee's row
we want to call Actions."" helper from the router
to go to the required scene.
(move back to ListItem).

*/
