---
title: React/Redux - Rendering alerts 
date: 2017-05-07 19:37:25
tags:
- dajsiepoznac2017
- getnoticed
- react
- redux
- javascript
- js
intro: Today I added Alert component to my training app (WebChatter).
cover: /images/redux-thunk-react.jpg
---
Couple weeks ago I've [added to my application](/2017/04/16/Call-API-from-React-component/) an authentication form. It was working fine, but error handling was not implemented as it should (everyone would agree that `console.log` is not the very best way of letting know user about unsuccessful login attempt). I decided to fix this by introducing to my application new React component that is responsible for rendering errors and notices to users. 

The component is pretty straightforward and it looks like this: 
```jsx
import React, { PropTypes } from 'react'
import { Alert } from 'antd';

export default class AlertMessage extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }

  renderMessage() {
    if(this.props.alertType) {
      return (<Alert message={this.props.message} type={this.props.alertType} />);
    } else {
      return (<span></span>);
    }
  }

  render() {
    return (<div>{this.renderMessage()}</div>);
  }
}
```

If a component receives `alertType` prop equal to anything other than null then it renders `Alert` component from Ant package. When `alertType` is null no alert should be shown. 

I decided to keep alert data in dedicated Redux store: 
```javascript
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const { type, message } = props;

  const { $$alertState } = initialStates;
  const initialState = {
    $$alertStore: $$alertState.merge({
      alertType: type,
      message: message
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return composedStore(createStore)(reducer, initialState);
};
```
Currently, I want to have just two actions for my new store. `RENDER` which will display alert, and `CLEAR` that will hide the alert:
```javascript
export const RENDER = 'RENDER';
export const CLEAR = 'CLEAR';
```

```javascript
import { RENDER, CLEAR } from '../constants/alertConstants';

export const renderAlert = (type, message) => ({
  type: RENDER, alertType: type, message: message
});

export const clearAlert = () => ({
  type: RENDER, alertType: null, message: null
});
```
Now we can write a new reducer: 
```javascript
import Immutable from 'immutable';

import * as actionTypes from '../constants/alertConstants';

export const $$initialState = Immutable.fromJS({
  alertType: null,
  message: null
});

export default function alertReducer($$state = $$initialState, action = null) {
  const { type, message, alertType, error } = action;

  switch (type) {

    case actionTypes.RENDER: {
      return $$state.merge({
        alertType: alertType, 
        message: message
      });
    }

    case actionTypes.CLEAR: {
      return $$state.merge({
        alertType: null,
        message: null
      });
    }

    default: {
      return $$state;
    }
  }
}
```

We've got store, actions and reducer, so now it's time for combining everything all together:
```javascript
import { connect } from 'react-redux';
import AlertMessage from '../components/AlertMessage';

const mapStateToProps = (state) => ({
  alertType: state.$$alertStore.get('alertType'),
  message: state.$$alertStore.get('message')
});

export default connect(mapStateToProps, {})(AlertMessage);
```

And placing AlertContainer somewhere in the app:
```jsx
import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import BaseComponent from 'libs/components/BaseComponent';
import CurrentUserContainer from '../containers/CurrentUserContainer';
import AlertContainer from '../containers/AlertContainer';
import 'antd/dist/antd.css'
import './BaseLayout.css';

export default class BaseLayout extends BaseComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Row>
              <Col span={4}>
                <Link to="/">
                  <h1 className='title'>WebChatter</h1>
                </Link>
              </Col>
              <Col span={10}>
                <AlertContainer/>
              </Col>
              <Col span={4}>
                <CurrentUserContainer/>
              </Col>
            </Row>
          </Header>
          <Content>{this.props.children}</Content>
          <Footer></Footer>
        </Layout>
      </div>
    );
  }
}
```

I want to render alerts on successful or failure login, so I will refactor `currentUserActionCreator` a bit: 
```javascript
import { LOGIN, LOGOUT } from '../constants/currentUserConstants';
import { RENDER, CLEAR } from '../constants/alertConstants';
import { renderAlert } from './alertActionCreators';

import Axios from 'axios';

export const loginUser = (user) => ({
  type: LOGIN, user
});

export const authenticateUser = (email, password) => {
  const apiUrl = '/api/v1/user_sessions';

  return (dispatch) => {
    return Axios.post(apiUrl, {user: {email: email, password: password}})
      .then(response => {
        dispatch(loginUser(response.data));
        dispatch(renderAlert('success', 'You are logged in.'));
      })
      .catch(error => {
        if (error.response.status == 404) {
          dispatch(renderAlert('error', 'User not found.'));
        }
      });
  };
};
```

From now on every user will receive nice feedback message after login.