---
title: Hands-on with React on Rails
date: 2017-03-13 18:14:45
tags:
- dajsiepoznac2017
- getnoticed
- ruby on rails
- javascript
- react
- webpack
- react
intro: Let's check if React and Ruby on Rails is a magnificent combination.
cover: /images/handson-react-on-rails.jpg
---
Some time ago I decided to learn React. I started with watching some videos on YouTube, then did course on CodeSchool and finally started working on small side project (comment system with replies, up/down voting, reporting and pagination). First I was really excited about whole React ecosystem, but then I realized that my JS knowledge is really outdated and I need to catch up with some of JS novelties ASAP.

I never used "modern" tools like Webpack, because I was depending on Rails way of managing JS or CSS assets. Rails way of packaging assets (sprockets) is fine for apps with not very sophisticated UIs, but when it comes to develop some serious SPA app with hundreds of views and models then it is a pain in the ass. So how we can solve this problem and make our life little easier? Let's try to integrate Webpack and some dependency management tool with Rails app!

### Round one: I will do whole setup on my own
At first I thought that I will just init npm project inside Rails app, install some dependencies, configure Webpack to produce bundle file into `public` directory and
just include the bundle in the layout view. Everything was fine till the moment I
decided that I want to have server rendering. After couple hours of hacking, I realized that
my skills are not enough to make Rails, Webpack, React, Redux and server side rendering to work with each other gently. Finally I gave up and decided to look for some ready to use boilerplate.

### Round two: Use some boilerplate, pal
I started looking for some boilerplate of Rails app with Webpack, React and Redux on board.
I found some, but most of them were not fully working or were working, but I could not understand how. Then I found https://github.com/shakacode/react_on_rails project and totally loved it. Great documentation, great community and great examples of usage.
If you want to start using React and Redux in your Rails project you should definitely give it a try. Very detailed tutorial will definitely help you stand on your feet.

### Demo time
Lets try our boilerplate and prepare first smart React component. By smart I mean component that is connected to some Redux store. First of all we need to add special helper to our layout:

```haml
= redux_store_hydration_data
```

This helper will produce hidden div that will contain any props that we want to pass from Rails controllers to client side. Now I'm gonna create simple store which gonna represent state of current user:

```javascript
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers, { initialStates } from '../reducers';

export default (props, railsContext) => {
  const { email, fullName, isAuthenticated, token } = props;

  const { $$currentUserState } = initialStates;
  const initialState = {
    $$currentUserStore: $$currentUserState.merge({
      email: email,
      fullName: fullName,
      isAuthenticated: isAuthenticated,
      token: token
    }),
    railsContext,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
  );

  return composedStore(createStore)(reducer, initialState);
};
```
As we have store, now we need reducers which will describe how store should change in response to dispatched action. Currently I want to have two actions: `login` and `logout`.

```javascript
import Immutable from 'immutable';

import * as actionTypes from '../constants/currentUserConstants';

export const $$initialState = Immutable.fromJS({
  email: null,
  fullName: null,
  isAuthenticated: false,
  token: null
});

export default function currentUserReducer($$state = $$initialState, action = null) {
  const { type, user, error } = action;

  switch (type) {

    case actionTypes.LOGIN: {
      return $$state.merge({
        email: user.email,
        fullName: user.fullName,
        isAuthenticated: true,
        token: user.token
      });
    }

    case actionTypes.LOGOUT: {
      return $$state.merge({
        email: null,
        fullName: null,
        isAuthenticated: false,
        token: null
      });
    }

    default: {
      return $$state;
    }
  }
}
```
Next we need to prepare some action:

```javascript
import { LOGIN, LOGOUT } from '../constants/currentUserConstants';

export const loginUser = (user) => ({
  type: LOGIN, user
});
```
We have store, reducer, action, so now it is a time for React component:

```jsx
import React, { PropTypes } from 'react'

export default class CurrentUser extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }

  renderMessage() {
    if(this.props.isAuthenticated) {
      return (<span>Welcome, {this.props.fullName}.</span>);
    } else {
      return (<span>You are not logged in.</span>);
    }
  }

  render() {
    return (<div className='container'>{this.renderMessage()}</div>);
  }
}
```
Above component is pretty useless if it is not connected to any store. Lets connect it to store:

```javascript
import { connect } from 'react-redux';
import CurrentUser from '../components/CurrentUser'
import * as actions from '../actions/currentUserActionCreators'

const mapStateToProps = (state) => ({
  fullName: state.$$currentUserStore.get('fullName'),
  isAuthenticated: state.$$currentUserStore.get('isAuthenticated')
});

export default connect(mapStateToProps, actions)(CurrentUser);
```

Now we can import above component and render it anywhere in our app:

```jsx
import React, { PropTypes } from 'react'
import { IndexLink, Link } from 'react-router'
import { Layout, Row, Col } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import BaseComponent from 'libs/components/BaseComponent';
import CurrentUserContainer from '../containers/CurrentUserContainer';
import 'antd/dist/antd.css'
import './BaseLayout.css';

export default class BaseLayout extends BaseComponent {

  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  /* eslint-disable react/no-unescaped-entities */
  render() {
    return (
      <div>
        <Layout>
          <Header>
            <Row>
              <Col span={20}>
                <h1 className='title'>WebChatter</h1>
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

Now, if you want to use component or store in some of your Rails views you just need to remember about registration of components/store:

```javascript
import ReactOnRails from 'react-on-rails'
import Home from '../components/Home'
import RouterApp from './ClientRouterApp';
import routerCurrentUserStore from '../store/routerCurrentUserStore';
import currentUserStore from '../store/currentUserStore';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Home, RouterApp
});

ReactOnRails.registerStore({
  routerCurrentUserStore,
  currentUserStore,
});
```

Store might be populated with any data from your Rails controller, just by passing any data through `props` hash:

```ruby
class HomeController < ApplicationController
  include ReactOnRails::Controller

  def index
    redux_store("currentUserStore", props: {email: 'test@test.com'})
    render_html
  end

  private

  def render_html
    respond_to do |format|
      format.html
    end
  end
end

```

Our Rails app now can talk with React components through Redux stores. Fully working example can be found here: https://github.com/Chmarusso/web_chatter .
