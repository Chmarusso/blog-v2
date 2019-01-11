---
title: Push items to React component using ActionCable
date: 2017-04-23 13:48:16
tags:
- dajsiepoznac2017
- getnoticed
- react
- ruby
- javascript
- actioncable
- websockets 
- ruby on rails
intro: Today I learned how to push items from Rails 5 backend to React component using ActionCable. 
cover: /images/react-actioncable.jpg
---
I'm working on the WebChatter app and today I want to create a view that will display to consultant a list of all active chats with customers. Such lists are changing dynamically, because someone may connect or disconnect in a matter of seconds. I don't want to do polling on the client side, so I decided to use WebSockets. Rails5 are coming with a nice library for dealing with WebSockets called [ActionCable](https://www.npmjs.com/package/actioncable). I want to use subscribe AS channel in my React component and add new chat to list each time a new customer show up. 

Before we can start using ActionCable in Rails5 app some basic configuration is required. First, we need to configure a route for ActionCable in `config/routes.rb`:
```ruby
mount ActionCable.server => '/cable'
```

Then we have to install redis gem: 
```ruby
gem 'redis'
```

Make sure that redis is up and running on our development machine: 
<blockquote class="imgur-embed-pub" lang="en" data-id="a/0kONG"><a href="//imgur.com/0kONG"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

Once it's done we can create our first channel:
```ruby
# app/channels/chats_channel.rb 
class ChatsChannel < ApplicationCable::Channel  
  def subscribed
    stream_from 'chats'
  end
end 
```

Now let's install npm packet for ActionCable: 
```
$ yarn add actioncable
```

The AS packet is ready to use, so we can focus on the React component: 
```jsx
import React, { PropTypes } from 'react'
import { Row, Col, Menu } from 'antd';
import { Chat } from './Chat';

export default class Chats extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      chats: [],
    };
  }

  renderChats() {
    const chats = this.state.chats; 
    const chatItems = chats.map((chat, i) =>
      <Menu.Item key={i}>{chat.name} - {chat.email}</Menu.Item>
    );

    return chatItems;
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <Menu mode="inline">
              {this.renderChats()}
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}
```

Currently, my component is ready to render menu items each time an internal state of `chats` got changed. It is not exactly what we need, so let's add a subscription to `ChatsChannel` and mutate state once new chat arrives. First we need to import `ActionCable` from `node_modules`, then we have to subscribe to our channel and mutate on state each time the new message is received:  
```jsx
import React, { PropTypes } from 'react'
import { Row, Col, Menu } from 'antd';
import { Chat } from './Chat';
import ActionCable from 'actioncable';

export default class Chats extends React.Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      chats: [],
    };
    this.subscribeChannel()
  }

  addChat(chat) {
    this.state.chats.push(chat)
    this.setState({
      chats: this.state.chats
    });
  } 

  subscribeChannel() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create('ChatsChannel', {
      received: (data) => {
        this.addChat(data.chat);
      } 
    });
  }

  renderChats() {
    const chats = this.state.chats; 
    const chatItems = chats.map((chat, i) =>
      <Menu.Item key={i}>{chat.name} - {chat.email}</Menu.Item>
    );

    return chatItems;
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={4}>
            <Menu mode="inline">
              {this.renderChats()}
            </Menu>
          </Col>
        </Row>
      </div>
    );
  }
}
```

Now we can restart the server, run `rails console` in the background and see if we can push items to client from our backend. Just broadcast something to our channel:
```ruby
ActionCable.server.broadcast "chats", { chat: {email: 'customer@bbc.com', name: 'John Doe' } }
``` 
<iframe src="//giphy.com/embed/o885J7s3lnx3a?html5=true" width="680" height="280" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/o885J7s3lnx3a">via GIPHY</a></p>

Looks like it is working. In the next iteration, I will try to move subscription logic from the React component and just pass an array of chats as a prop from Redux store. 