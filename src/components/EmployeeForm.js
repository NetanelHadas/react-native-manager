// Import a library to help create a component
import React, { Component } from 'react';
import { Text, View, Picker, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';


// Create a component
class EmployeeForm extends Component {
  render() {
    return (
      <ScrollView>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Phone"
            placeholder="555-555-5555"
            value={this.props.phone}
            onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Select Shift</Text>
          <Picker
            selectedValue={this.props.shift}
            onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </ScrollView>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

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
export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);

/*
the sol purpose of this component
is to show the 3 different fields,
name, phone and shift
to the user.
*/

/*
we used to View tags because

because the render method needs to return just one
top level element.
*/

/*
don't forget to import the required component
and the bring the styles object.
*/

/*
we now need to make sure the EmployeeForm component
will have access to the employeeUpdate action creator.

we need to add a mapStateToProps function
so we can use this.props.name for example inside this component.

we can implement it as I did at the top
or do
(state)
and then
state.employeeForm;
as a different way.

*/
