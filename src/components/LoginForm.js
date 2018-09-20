// Import a library to help create a component
import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser, passwordReset } from '../actions';


// Create a component
class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onPasswordResetButtonPress() {
    const { email } = this.props;

    this.props.passwordReset({ email });
  }

  renderButton() {
    const { loading } = this.props;

    if (loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderPasswordResetButton() {
    const { error } = this.props;

    if (error === 'Authentication Failed.') {
      return (
        <Button onPress={this.onPasswordResetButtonPress.bind(this)}>
          Reset your password?
        </Button>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderPasswordResetButton()}
        </CardSection>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

// so we can bring our pieces of state and use it in this component
const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return {
    email,
    password,
    error,
    loading
  };
};

// Make the component available to other parts of the app
export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, passwordReset
})(LoginForm);



/* since we are making a stand alone component,
once that depends more on redux
we will not copy paste our existing LoginForm.

we will do this from scrutch and build a LoginForm
that works with redux.
*/

/*
lets use our boiler plate for a component.

// Import a library to help create a component
import React, { Component } from 'react';
import Card from './commmon';


// Create a component
class LoginForm extends Component {
  render() {
    return (
      <Card>
      </Card>
    );
  }
}


now lets use it inside our app component
*/

/*
now lets import our common directory

and start building our LoginForm component

secureTextEntry
is to make sure the text entered will be shown as ******
to prevent an attack.

everything up to here looks exactly like we did the LoginForm
in the auth app.

but the change will be that not the component will keep track of the value
of the email and password inside of the component state
but the store state will.
redux will be in charge of this part instead.

*/

/* connecting redux

at this moment there is no logic at all in our LoginForm component,
now we will start inserting this logic.

we want to call an action creator when we get a new text
in our Input tags.

this action creator will create an action and send it to the store
from the store it will be passed to all of the reducers of the app
and the reducer that accepts it will change the store's/app's state.
the new state will be sent to all of our components to be rerendered
with a new state that they can show on the screen.

and then we wait for new changes for this process to happen again.

this new action will be
with a new text
and with a specific action type

look at the picture in folder "pics for apps",
"how does the LoginForm works with redux"
each time we will want to add logic to an application
this approach will make it a lot easier to do so.

again, for complex applications this approach makes things a lot easier
on the long run.


step one

wait for the user to type something
and when they do call an action creator.

for watching when the user enters something
we need to use the onChangeText event handler.

onChangeText={this.onEmailChange.bind(this)}

because this is a call back
where we are going to make reference to this
we need to use bind, to bind the context this.

onEmailChange
is an event handler / helper function we need to add
to make things clear.
inside this function we will call our action creator to
update our app level state with the new value the user typed in.

lets now add our action creator.

after we created our action creator we need to add it to the
LoginForm file
and wire it up to redux.

don't forget to import connect,
import { connect } from 'react-redux';

don't forget to import our action creator
import { emailChanged } from '../actions';

now we will wire up our action creator with the connect helper to the store.
export default connect(null, actions)(LoginForm);
null is because we don't have a mapStateToProps function yet.
change actions to { emailChanged }

look at the file
'this is where we are after we set our action creator
and wired up our connect tool in the LoginForm component
- green is what we implemented now'
at the pics for apps folder.
this is what we implemented so far.


*/

/* step two

now we need to implement our reducer.

at this moment we have a dummy reducer
we created inside of our reducers file.
banana: () => []

we need to create a new reducer to handle the action we get.

lets make a new reducer file for our new reducer,
AuthReducer.js

we call it AuthReducer because we want this single reducer
to handle everything that have to do with the authentication inside our app.

it will handle the email and the password
it will decide if there is an error with the authentication
and it will also decide if to show a spinner to the user.

its responsible to all of the things related to the authentication.
*/

/*
now we need to enable access to the app state from inside this componenet
to do this we change:
export default connect(null, { emailChanged })(LoginForm);
to
export default connect(mapStateToProps, { emailChanged })(LoginForm);

and add this component the function mapStateToProps.

note!
as explained before,
we can see we don't use local component state here
but an app state instead.
as the app gets more complex it will make sure it still runs fast.
*/

/*
after we finished building our AuthReducer

we can now build our mapStateToProps helper function inside this component
and see if we can get the state data that we need into our component,
in this case our LoginForm.

const mapStateToProps = state => {
  return {
    email: state.auth.email
  };
};


export default connect(mapStateToProps, { emailChanged })(LoginForm);

now we can do in our code,
this.props.email

so now inside our input tags
we can add the value property.

<Input
  label="Email"
  placeholder="user@gmail.com"
  onChangeText={this.onEmailChange.bind(this)}
  value={this.props.email}
/>

now whenever the user presses anything
we update our application state
and from there we update the value inside our input tags.
now when ever we want to reference to the whatever the user enetered
in the email field
we can do state.auth.email

*/

/*
now we need to do the exact same process we did in one section above
for the password.

because we reference this (use this)
we need to bind the context.
onChangeText={this.onPasswordChange.bind(this)}

add a call to our action creator
onPasswordChange(text) {
  this.props.passwordChanged(text);
}

later on we will learn how to refactor the many calls we have
to our action creators into one.

don't forget to
import { emailChanged, passwordChanged } from '../actions';
and
export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginForm);
*/

/*
we need to add
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password
  };
};

so we can use in our component
this.props.password

since we use state.auth
few times its a good candidate to use
es6 distructuring if we like to.
for now we will leave it as it is.
we could change it to:

const mapStateToProps = state => {
  const { email, password } = state.auth;

  return {
    email,
    password
  };
};
*/

/*
now we need to add the value property to the input tag
*/

/*
lets now insert the loginUser action creator
into our LoginForm component.

don't forget to import it
and add it to the connect tool (which lets us actually call the action creator).

the connect line got a bit long so lets multiline it.

inside the button tags:

<Button onPress={this.onButtonPress.bind(this)}>
  Login
</Button>

onButtonPress is our helper method
and inside it we will call our action creator.

onButtonPress() {
  const { email, password } = this.props // this is es6 distructuring

  this.props.loginUser({ email, password });
}


we set up the method signature of the loginUser method
to expect an object with an email and password properties
so we need to make sure we pass in an abject
that has an email and a password properties.

using the
console.log(action);
we inserted in our AuthReducer
now when we change the text in email or password we can also see
the action that is being sent to the reducer
and when we press the button we can see the LOGIN_USER_SUCCESS,
the test@test.com email we added manually to the firebase website
and the UID, which is the user ID, this is the user module we talked about.

this user module disribes the currently logged in user.

*/

/*
we will modify our mapStateToProps function a bit
to get access to the error piece of state.

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
  };
};

refactoring

lets do some refactoring to make the mapStateToProps look better

const mapStateToProps = state => {
  const { email, password, error } = state.auth;

  return {
    email: email,
    password: password,
    error: error
  };
};

this will work but lets change it to:

const mapStateToProps = ({ auth }) => {
  const { email, password, error } = auth;

  return {
    email,
    password,
    error
  };
};




now lets show the error to the user
import text tag
and inside our render method above button add

<Text>
  {this.props.error}
</Text>

lets add some styling for it
so it will be shown in red in big letters
*/


/* two ways to implement the spinner - I did the second way at the end

first way

when I implemented the spinner for starts I did

onButtonPress() {
  const { email, password } = this.props;


  this.props.showSpiner();
  this.props.loginUser({ email, password });
}

I called two different action creators.

second way (as I did in my code)

later I changed the implementation to
calling just one action creator.

I made a manual dispatch call from within the loginUser action creator
to the AuthReducer which changes the loading variable
and by that saved calling two different action creators from within LoginForm.

it is also reasonable because when we call the loginUser action creator
we for sure want to show the spinner
since we are starting a login process for a user.

I also made the helper function
this.renderButton()

within that function
we can check if the loading flag is true or false
and decide whether to show the spinner or the button accordingly.
(like we did in the auth app).

also we need to add the loading flag
to the mapStateToProps function
so we can use it within our LoginForm component.


*/
