---
title: 'Restrict access to routes using React, React Route and Redux'
date: 2017-03-25 12:28:28
tags:
- dajsiepoznac2017
- getnoticed
- redux
- javascript
- react
- react-router
intro: Simple approach for authentication check before rendering components.
cover: /images/authentication-react-router-redux.jpg
---
Today I want to learn how to allow access to specific routes only for authenticated users. In my application, I'm using react, react-router and redux. Let's see how those three libraries combined may be used for the creation of simple authentication system.

First, we gonna need single React component which renders content that should be visible only for authenticated users:
```jsx
import React, { PropTypes } from 'react'
import { Row, Col } from 'antd';

export default class User extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={12} offset={6}>
            This section is for logged users.
          </Col>
        </Row>
      </div>
    );
  }
}
```

Now let's add a new route that renders this component:
```jsx
import { Route, IndexRoute } from 'react-router';
import BaseLayout from '../layout/BaseLayout';
import Home from '../components/Home';
import User from '../components/User';

export default (
  <Route path="/" component={BaseLayout}>
    <IndexRoute component={Home}/>
    <Route path="user" component={User}/>
  </Route>
);
```

We have route and component, but nobody can actually access this view without knowing exact path. It can be easily solved by adding a link somewhere in our application:
```jsx
render() {
  return (
    <div>
      <Link to="/user">Restricted area</Link></p>
    </div>
  );
}
```

Now it is time for a more tricky part. Before rendering the component we need to somehow check if the user is authenticated. Once someone is not authenticated we have to redirect the intruder somewhere else. In order to do so, we need some logic that checks a state of the current user and decides whether something might be rendered or not. State of the current user (authenticated or not authenticated) is stored in the Redux store. Let's create a container that will do the job:

```jsx
import React, { PropTypes } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'

class EnsureUserLoggedInContainer extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }

  componentWillMount() {
    const { isAuthenticated } = this.props;
    if (!isAuthenticated) {
      browserHistory.replace("/");
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.$$currentUserStore.get('isAuthenticated')
});

export default connect(mapStateToProps, {})(EnsureUserLoggedInContainer);
```

In above code, we have a smart React component which is connected to `currentUserStore`. If the user is authenticated we are rendering all passed children through props (in our case it would be a component that we created before, but it can be also any other component or group of components). In a scenario when someone is not authenticated we are simply redirecting the user to some other place: `browserHistory.replace("/");`.

Once our container is ready we can update the routing and check if our link is working for the state when the current user is not authenticated:

```jsx
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import BaseLayout from '../layout/BaseLayout';
import Home from '../components/Home';
import User from '../components/User';
import EnsureUserLoggedInContainer from '../containers/EnsureUserLoggedInContainer';

export default (
  <Route path="/" component={BaseLayout}>
    <IndexRoute component={Home}/>
    <Route component={EnsureUserLoggedInContainer}>
      <Route path="user" component={User}/>
    </Route>
  </Route>
);
```

From now on, all routes wrapped in `EnsureUserLoggedInContainer` will be accessible only to authenticated users.

I did not cover the full path of user authentication (for instance our app is not calling the backend), but I will cover this in upcoming posts.
