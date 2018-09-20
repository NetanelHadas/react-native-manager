// Import libraries for making a component
import React from 'react';
import { View } from 'react-native';

// Make a component
const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
    /*
    by passing (props) and using {props.children} we are letting the CardSection
    componenet use/contain any tag used by his parent, be it View,Text, Image or Button.
    */
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    // In the Card component we set it to 0, so we wont have double bordering on the bottom
    padding: 5, // spacing between whats inside each cardSection.
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row', // the way flexbox will arrange the items in the CardSection.
    // we can use column for when we want to elements to be under one another (default is column).
    borderColor: '#ddd',
    position: 'relative' // We will explain later
  }
};


// Make the component available to other parts of the app
export { CardSection };



/* modifying the CardSection component

in this app we modified the CardSection component a bit
because we want to be able to pass it the prop
flexDirection: 'column'
in cases where we want the items inside a CardSection
to be positioned one under the other
and not from left to right like we set in the default CardSection component
that we wrote.

the prop object that we pass this component
will now have a style object inside it as well.

lets now use this prop inside this component.

we will take the
styles.containerStyle
and overide it with any additional styles
that were passed in on the props object.

we will wrap the styles.containerStyle with an array as the following:
<View style={[styles.containerStyle]}>
and as a second argument pass props.style as the following:
<View style={[styles.containerStyle, props.style]}>

this is a trick with styling in react-native,
a style props that is being passed to a primitive element
like a View or a Text
can take an array.
if we pass an array of styles
then the style most to the right
will overide any style on the left.
what this does is,
it tells the View tag
use the styles.containerStyle (the most right one)
but if there is anything different that is being passed from
the props.style (the most left one) use that instead.

this exactly fits our use case,
because by default we want to have flexDirection: 'row'
unless we specifically pass an overide of flexDirection: 'column'

(return to the EmployeeCreate component).

*/
