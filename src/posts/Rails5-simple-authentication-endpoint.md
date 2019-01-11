---
title: Rails5 - simple authentication endpoint
date: 2017-03-29 21:53:56
tags:
- ruby
- ruby on rails
- rails5
- dajsiepoznac2017
- getnoticed
intro: My training app (React/Redux) requires authentication and I decided to develop its backend using Rails5.
cover: /images/rails5-auth.jpg
---
Ruby on Rails have some really nice gems ([devise](https://github.com/plataformatec/devise)) to handle authentication, but I've decided to develop something from scratch. Maybe it would be useful for some Rails cadets.

When it comes to developing authentication system it is very important to keep our user's passwords safe. That means we cannot store them in plain text. Luckily, Ruby on Rails 5 has [ActiveModel::SecurePassword](http://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html) on board, so all passwords will be saved as secure digests in our database.

First, we need a User model:
```
$ rails g model User full_name:string email:string password_digest:string
```

Once model is generated we need to run database migrations:
```
$ bundle exec rake:db:migrate
```

Add `has_secure_password` attribute to User model:
```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
end
```

Add required bcrypt gem to Gemfile:
```ruby
gem 'bcrypt'
```

Install gem:
```
$ bundle
```

Once is installation finished you are free to go to your  Rails console where you can create some test User and play a bit with authentication:
```ruby
User.create(full_name: 'Artur Ch', email: 'chmarus@gmail.com', password: 'secret666', password_confirmation: 'secret666')

User.find_by(email: 'chmarus@gmail.com').authenticate('asd') => false
User.find_by(email: 'chmarus@gmail.com').authenticate('secret666') => User
```

Authentication works, so we can build our first endpoint. I want to obtain User entity by sending POST request to `/api/v1/user_sessions?user[email]=email@test.com&user[password]=password`

Here is necessary route:
```ruby
namespace :api do
  namespace :v1 do
    resources :user_sessions, only: [:create]
  end
end
```

Route is useless without a controller, so we need it as well:
```ruby
# app/controllers/api/v1/user_sesssions_controller.rb
class Api::V1::UserSessionsController < Api::V1::BaseController
end

# app/controllers/api/v1/base_controller.rb
class Api::V1::BaseController < ApplicationController
end
```

Now it's a tricky part because we need to validate user's email and password params. When everything is fine I want to return JSON object with the full name, email and id. If provided credentials are wrong (there is no user with given e-mail or/and password is not valid) JSON object should contain an error message. The controllers are not responsible for such logic, so let's write some tiny class that will do the job:
```ruby
# app/services/authenticate_user.rb
class AuthenticateUser
  class UserNotFound < StandardError; end

  class << self
    def call(email, password)
      user = User.find_by(email: email).try(:authenticate, password)
      fail UserNotFound unless user

      user
    end
  end
end
```

Rails5 is using Spring so we need to edit its config to include services directory:
```ruby
# config/spring.rb
%w(
  .ruby-version
  .rbenv-vars
  tmp/restart.txt
  tmp/caching-dev.txt
  app/services
).each { |path| Spring.watch(path) }
```

We are almost done, but we need to think about the way how we want to serialize User model into JSON object. There are plenty of ways to do it, but I've decided to use [active_model_serializers](https://github.com/rails-api/active_model_serializers/blob/master/docs/general/getting_started.md). To use this gem just install it:
```ruby
gem 'active_model_serializers', '~> 0.10.0'
```

Create serializer for User model:
```ruby
# app/serializers/user_serializer.rb
class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email
end
```

Now we can modify controller so it will use our authentication service:

```ruby
class Api::V1::UserSessionsController < Api::V1::BaseController
  def create
    @user = AuthenticateUser.call(email, password)
    render json: @user
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def email
    user_params[:email]
  end

  def password
    user_params[:password]
  end
end
```

When you run your development server and perform test request with proper e-mail and password params everything should work fine. Problem is that our app will crash when someone will send a wrong password or no params at all. We can solve it by catching those errors gently in our base controller:
```ruby
class Api::V1::BaseController < ApplicationController
  protect_from_forgery prepend: true

  rescue_from ActionController::ParameterMissing do |e|
    render json: { error: e.message }, status: :unprocessable_entity
  end

  rescue_from AuthenticateUser::UserNotFound do |e|
    render json: { error: 'User not found.' }, status: :not_found
  end

end
```

Now we can test endpoint:
<blockquote class="imgur-embed-pub" lang="en" data-id="a/G4iHm"><a href="//imgur.com/G4iHm"></a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
Looks like our simple authentication endpoint is working. The full code you can find [here](https://github.com/Chmarusso/web_chatter/pull/1/files). In next post, I will show you how to write tests for it.
