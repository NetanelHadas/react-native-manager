// Import a library to help create a component
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

// Create a component
class ListItem extends Component {
  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};


// Make the component available to other parts of the app
export default ListItem;



/* styling

we should add a little styling to the text tags.

at this moment they will render all the way to the left edge of the screen.

so we will increase the text size of this thing
and make sure it does not all way to the left edge of the screen.

*/

/*
once the user taps one of the employee's row
we want to call Actions."" helper from the router
to go to the required scene.

so like we did in tech_stack
we should make the ListItem a button.
we like in tech_stack we will make it a
TouchableWithoutFeedback button.

remember!!!
in TouchableWithoutFeedback there must be single tags
and thats why we wrap everything in the View tags.


now we need to add an onPress evet handler
to TouchableWithoutFeedback
so whenever we tap a row something will happen.
we will call this onPress event handler,
onRowPress.
<TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>

and inside the onRowPress helper we will want to do our actual navigation,
we will make the helper method onRowPress
and inside it we will use the Action.employeeCreate()
(because the key="employeeCreate" is what we gave
to that scene in the Router).

remember to use our Actions tool we need to import it first.
import { Actions } from 'react-native-router-flux';

we notice that once we press an employee and get to the EmployeeCreate form
the form is empty and without any of the details of the employee we taped on.

remember we want the screen we go to to be
show and edit screen.
we want at the button of this show and edit form to have
save changes, delete/fire and message/text employee button.

once we get to the EmployeeCreate form it is empty
because in the EmployeeFormReducer we instructed it
that after we create a new employee we should show the INITIAL_STATE.

so we want to instruct the EmployeeCreate form
so when ever it loads up
it should be showing a very particular employee,
we want to preload the data that it shows.

we could use an action creator that is called
employeeSelected or something like that,
that should show the employee details or the empty EmployeeCreate form.
but we notice that it gets a bit too unorganized.

boot strap

lets go with a different way,
lets bootstrap/inject our employee into the EmployeeCreate form.

*/

/* boot strap

lets go with a different way,
lets bootstrap/inject our employee into the EmployeeCreate form.

we need to communicate to the form which employee I want to show,
"for you should show this particular employee".

to do so we are going to pass some props
over to the EmployeeCreate form
with the navigation helper, Actions.employeeCreate();

we can pass any object we want in our navigation helper.
Actions.employeeCreate({ employee: this.props.employee });
now when ever this navigation is called
the EmployeeCreate form will be rendered
and it will be given an additional prop of employee
since each ListItem is called with one employee.
(lets now move to the EmployeeCreate form).

*/

/*
we changed
Actions.employeeCreate();
to
Actions.employeeEdit();
after we created the EmployeeEdit component.
*/
