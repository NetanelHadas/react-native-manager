// Import libraries for making a component
import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';


// Make a component
const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Stack key="root">
        <Scene key="login" component={LoginForm} title="Please Login" initial />
        <Scene
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          key="employeeList"
          component={EmployeeList}
          title="Employees"
        />
        <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
        <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
      </Stack>
    </Router>
  );
};

// Make the component available to other parts of the app
export default RouterComponent;



/*
the purpose of this file is to have one location
where I can tweak all the different scenes
that a user can navigate to.
(all the different routes the user can navigate to).

so in this file we are going to define
all the different possible screens/scenes
the a user can visit inside our app.

we will make a componenet to do that,
so we will start by putting a boiler plate
to make a functional componenet.


import { Scene, Router } from 'react-native-router-flux';

we don't call this component Router because we are importing
other router object to this file.

our boiler plate:

const RouterComponent = () => {
  return (
    <Router>
      <Scene />
    </Router>
  );
};

now we will pass the Scene
the props we discuessed in the app component comments.
<Scene
  key="login"
  component={LoginForm}
  title="Please Login"
/>

now we need to put this component inside of our application,
inside of our app component.

*/

/* sceneStyle

any style we pass in the sceneStyle
will be applied to all of the different scenes
in our application when they show up to the screen.
thats why its a global style object.

paddingTop: 65
to move our component 65 units down.

this should now also solve our not seeing email input bug.

when we add a global style
we also need to think about cross platform compatibility
so we must check it works on different operating systems as well
once we add this global style.

*/


/* so how do we navigate to different components/screens?

so now we will add a test component to figure out
how to get around to different scenes in our application.

making the test component
and navigating between different scenese in our application.

note!
we are going to use the built in header and not the one we created,
we can substitute between the two but we are not going to.
once we start using our header to navigate around it will become
clearer why we use the built in header.



lets now make the dummy test component, EmployeeList.
we will make it into a real component later
but for starts it will just be a dummy component.

our goal is to figure out how to add another scene
to my application
and see how that works with our navigation library.

make sure you import EmployeeList.js
now we have a second screen to show inside our application.

whenever I want to see the EmployeeList
I do not want to see the LoginForm any more,
they are 2 mutually exclusive screens.
I either want to see my LoginForm or my EmployeeList.

so for the EmployeeList we will make another scene component.
<Scene key="EmployeeList" component={EmployeeList} title="Employees" />
key naming can be what ever we want,
it is a convention to call them the same as the component but its not a must.
because we added the title="Employees"
we will get the nav bar and it will have Employees written on it.

now that we have 2 different scenes we need to add a way to
navigate between 2 different screens.

to navigate between different scenes
we have to be very explicit very direct about it.
we have to initiate some change in our application
that says "please take the user to this new scene".

now that we have 2 scenes
lets use that initial prop.
just to test things out lets add the initial prop to our EmployeeList scene.
<Scene key="EmployeeList" component={EmployeeList} title="Employees" initial />
as expected we saw the EmployeeList component on the screen first
instead of the LoginForm.
lets do another test and put the EmployeeList scene before the LoginForm scene
without an initial prop on any,
now I see the EmployeeList on the screen when the apps first boots up.
so without an initial prop it will decide which scene to show first
sololy based on order.

we don't want to relay upon order so we will use the initial prop
in our applications.
but its also a good convention to have the LoginForm scene
ordered first because it will show first on the user's screen.



lets now do some programatic navigation
so we can automatically navigate our users between the different scenes.

one we login successfuly we want to see the EmployeeList on the screen.
so in our actions creator file
whenever we hit the loginUserSuccess action creator
this is where we want to navigate our user to the EmployeeList screen.

so we will do our navigation in the loginUserSuccess action creator.
(move to the index.js file in the actions folder).

*/

/* scene nesting

read the explanation in the index.js in the actions folder.

<Scene key="auth">
  <Scene key="login" component={LoginForm} title="Please Login" initial />
</Scene>

<Scene key="main">
  <Scene key="employeeList" component={EmployeeList} title="Employees" />
</Scene>

now I have two different scene buckets.
because they are in two different buckets we can now freely navigate
between either of them without seeing the back button < at the top
when we move from one to the other.

but there is something we also need to change,
we used the Actions.employeeList() to navigate to the EmployeeList scene.
but now we are navigating between the different buckets
so we can't navigate directly to a nested scene.

so now when we want to go from the LoginForm scene
to the employeeList scene I will call Action.main()
and relay on that to dump me on my employeeList.
(change in the index.js in the actions folder).

so change the Action.employeeList()
to Action.main()
in the index.js in the actions folder.

*/

/*
move to the employeeList component.
*/

/* customizing the header in each scene component

any props we pass to the scene component will be forworded to it's header.

all of the props for adding a button to the right/left sides of the title
should be added to the scene component that we want its title to
have these buttons,
and the scene component will make sure they get forworded to the right spot.

so baiscally we can customizes the header of each scene component as we like.

we will pass our EmployeeList scene a prop called
rightTitle
to make a button show up
and also give it a function
onRight
that will be called whenever the user taps on that button.

lets multiline the employeeList scene
because it will have a few more props.

we first made this:
<Scene
  onRight={() => console.log('right!!!')}
  rightTitle="Add"
  key="employeeList"
  component={EmployeeList}
  title="Employees"
/>
</Scene>

to make sure the props are showing and working as intended.
the api of the react-native-router-flux explains well what each prop does
but some times they don't explain where to add these props.
in the navigation bad case the props go on the scene
and they show on the correct spots when we go to the appropriate scene.

*/

/*
we will now make a new componenet
that enables us to create a new employee.

after we created the EmployeeCreate component
I import it to this component
and create a scene for it.

I should ask my self,
where does this EmployeeCreate component scene should go?
in the auth bucket or in the main bucket?

ask your self, how does the user should navigate to this?
I want the user to be able to navigate from the EmployeeList
to the EmployeeCreate form.
and once they are in the EmployeeCreate form they can decide to not create
a new employee and just return to the EmployeeList form
using that back button on the top < as we saw earlier.

so the EmployeeCreate scene should be in the main bucket.


now after we added the EmployeeCreate scene
we want to navigate to the EmployeeCreate screen once
our user presses the top right button in our EmployeeList screen.
so we change this:
<Scene
  onRight={() => console.log('right!!!')}
  rightTitle="Add"
  key="employeeList"
  component={EmployeeList}
  title="Employees"
/>
to
<Scene
  onRight={() => Actions.employeeCreate()}
  rightTitle="Add"
  key="employeeList"
  component={EmployeeList}
  title="Employees"
/>

don't forget to
import { Scene, Router, Actions } from 'react-native-router-flux';
so we can use Actions."key value"()



now that we have two scenes
we need start using that initial prop.
initial prop is in charge of what scene should show up first.
since the employeeList is declared first, according to the order of declaration,
it will show first,
but since we want to make it nice an clear we will add the initial prop
to the EmployeeList scene.

*/

/*
now we can start working on the EmployeeCreate form.
*/

/* EmployeeEdit

after we created the EmployeeEdit form

first we need to make sure we import it.
then we can make it a scene.

we want this scene to be in the same scene bucket
as the other employee routes.
so inside the "main" scene we will add
<Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />

title is whats going to be shown at the top of the screen.

*/
