---
title: Call API from React component
date: 2017-04-16 18:01:45
tags:
- dajsiepoznac2017
- getnoticed
- react
- redux
- redux-thunk
- javascript
- js
intro: Today I learned how to call API endpoint and dispatch action with results using redux and redux-thunk.
cover: /images/redux-thunk-react.jpg
---
I have [authentication endpoint](/2017/03/29/Rails5-simple-authentication-endpoint/) and [login form](/2017/03/25/Restrict-access-to-routes-using-React-React-Route-and-Redux/) in React component. Now I want to connect those two elements. Form credentials should be sent to authentication endpoint once a user clicks submit button. When API respond with success response I want to log the user in.  

From client app we need to call API endpoint. For such operations I decided to use `axios` library:
```
$ yarn add axios
```

Then I added action to `currentUserActionCreators.js` file:
```javascript
export const authenticateUser = (email, password) => {
  const apiUrl = '/api/v1/user_sessions';

  return (dispatch) => {
    return Axios.post(apiUrl, {user: {email: email, password: password}})
      .then(response => {
        dispatch(loginUser(response.data));
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
        }
      });
  };
};
```
In above example we are using [redux-thunk](https://github.com/gaearon/redux-thunk) for creating special [thunk action creator](http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559). Such action returns a function that takes `dispatch` argument. That means that we can from now on dispatch asynchronous action just like "normal" actions. Axios sends POST request to `apiUrl` with given user credentials. When a promise is resolved our action dispatches `loginUser` action with returned user entity as a parameter. Errors are caught and logged to console, but in the future, I will handle such cases by rendering proper message on UI.

Here is form component after some improvements:
```jsx
import React, { PropTypes } from 'react'
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

export default class LoginForm extends React.Component {

  constructor(props, _railsContext) {   
    super(props);
   this.state = {
      email: '',
      password: ''
    };    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticateUser(this.state.email, this.state.password);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }  

  render() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
        <FormItem>
          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                 placeholder="Email" name='email' value={this.state.email} onChange={this.handleInputChange} />
        </FormItem>
        <FormItem>
          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                 type="Password" placeholder="Password" name='password' value={this.state.password} onChange={this.handleInputChange} />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}
```
Each time input is changed I'm changing the state of the component by calling `handleInputChange` function. When a form is submitted I'm firing `authenticateUser` action which is passed to the component as a prop. In success scenario user is logged in.
