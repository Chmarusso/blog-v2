---
title: Rails5/Rspec - Specs for authentication endpoint
date: 2017-04-09 15:19:00
tags:
- ruby
- ruby on rails
- rails5
- capybara
- dajsiepoznac2017
- getnoticed
intro: Rspec tests for authentication endpoint.
cover: /images/rails5-auth-specs.jpg
---
Couple days ago I've posted a short tutorial about creating an endpoint for authentication in Rails5. That tutorial did not cover very important part of writing tests. Today I want to get back and write some tests for it. In Ruby on Rails you may use many tools for testing, but my favorite combination is [Rspec](https://github.com/rspec/rspec-rails), [FactoryGirl](https://github.com/thoughtbot/factory_girl) and [Capybara](https://github.com/teamcapybara/capybara).

First, we need to install all necessary gems by editing our Gemfile file:

```ruby
group :development, :test do
  gem 'rspec-rails', '~> 3.5'
  gem 'factory_girl'
end

group :test do
  gem 'capybara'
end
```

Then we can install them: `bundle install` and move forward to standard Rspec configuration. Once an installation is complete run Rspec generator: `rails generate rspec:install`.

This generator created couple files and directories that are required for running tests by Rspec. Now we need to tell Rspec that we want to use FactoryGirl and Capybara. We can do it by editing `spec/rails_helper.rb`:
```ruby
require 'capybara/rspec'
require 'support/factory_girl'
```

Then create FactoryGirl configuration file at `spec/support/factory_girl.rb`:
```ruby
RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
end
```

One more adjustment and we are ready to go. In the end of configure block in `spec/spec_helper.rb` add the following setting:
```ruby
 config.before(:all) do
   FactoryGirl.reload
 end
```
FactoryGirl is a gem which makes producing factories very easy. Factories are 'fake' objects that we are using in the tests and Capybara is for writing acceptance tests (we gonna write some of them in my future posts).

Before writing actual tests lets add User factory and make sure that test database is up and running:

```ruby
#spec/factories.rb
FactoryGirl.define do
  factory :user do
    full_name 'John Doe'
    email 'John@Doe.com'
    password 'secret123'
    password_confirmation 'secret123'
  end
end
```

```
$ bundle exec rake db:create RAILS_ENV=test
$ bundle exec rake db:migrate RAILS_ENV=test
```

I am always starting from writing scenarios that I want to cover in my test. For our endpoint we can have following requests:

1. No params are given to our endpoint.
2. Invalid params with credentials given.
3. Valid params given.

Now let's transform above statements into Rspec code:
```ruby
# spec/requests/api/v1/user_sessions_spec.rb
describe 'POST /api/v1/user_sessions' do
  context 'when no params given' do
  end

  context 'when params given' do
    context 'and credentials are valid' do
    end

    context 'and credentials are invalid' do
    end
  end
end
```

We've got scenarios so now we can write some code which gonna tell us what should happen in each scenario:
```ruby
# spec/requests/api/v1/user_sessions_spec.rb
describe 'POST /api/v1/user_sessions' do
  context 'when no params given' do
    it 'returns 422 status' do
    end
  end

  context 'when params given' do
    context 'and credentials are valid' do
      it 'returns 200 status' do
      end

      it 'returns user id' do
      end

      it 'returns user full name' do
      end

      it 'returns user email' do
      end
    end

    context 'and credentials are invalid' do
      it 'returns 404 status' do
      end

      it 'returns proper error' do
      end
    end
  end
end
```

Now we have some template that has to be filled with some code. Let's start with the first scenario when no params at all are given:
```ruby
# spec/requests/api/v1/user_sessions_spec.rb
  context 'when no params given' do
    it 'returns 422 status' do
      post '/api/v1/user_sessions', params: {}
      expect(response.status).to eq 422
    end
  end
```

You can check if above test is "green" by running `bundle exec rspec spec/requests/api/v1/user_sessions_spec.rb`. Works on my machine, so I'm proceeding with spec test for our next scenario.  We need to check what is happening when we are receiving params with valid email and password. To perform such test some User has to be added to our database. We gonna use here previously created factory:

```ruby
# spec/requests/api/v1/user_sessions_spec.rb
context 'and credentials are valid' do
      let(:email) { 'valid@user.com'}
      let(:password) { 'secret123' }
      let!(:user) do
        create(:user, email: email, password: password, full_name: 'Valid User')
      end

      let(:params) do
        {
          user: {
            email: email,
            password: password
          }
        }
      end

      before do
        post '/api/v1/user_sessions', params: params
      end

      subject { JSON.parse(response.body) }

      it 'returns 200 status' do
        expect(response.status).to eq 200
      end

      it 'returns user id' do
        expect(subject['id']).to eq user.id
      end

      it 'returns user full name' do
        expect(subject['full_name']).to eq user.full_name
      end

      it 'returns user email' do
        expect(subject['email']).to eq user.email
      end
    end
```

In above snippet we are doing following things:
1. Valid email and password are stored in separate variables.
2. User object is created with given credentials.
3. Params hash is built with valid credentials.
4. Our endpoint is called just once in the before block, so in each separate test, we do not have to call it again and again.
5. Response body is parsed and assigned to subject variable
6. Each `it` block is checking the content of parsed JSON response.

Our final spec is following:

```ruby
# spec/requests/api/v1/user_sessions_spec.rb
require 'rails_helper'

describe 'POST /api/v1/user_sessions' do
  let(:url) { '/api/v1/user_sessions' }

  context 'when no params given' do
    it 'returns 422 status' do
      post url, params: {}
      expect(response.status).to eq 422
    end
  end

  context 'when params given' do
    context 'and credentials are valid' do
      let(:email) { 'valid@user.com'}
      let(:password) { 'secret123' }
      let!(:user) do
        create(:user, email: email, password: password, full_name: 'Valid User')
      end

      let(:params) do
        {
          user: {
            email: email,
            password: password
          }
        }
      end

      before do
        post url, params: params
      end

      subject { JSON.parse(response.body) }

      it 'returns 200 status' do
        expect(response.status).to eq 200
      end

      it 'returns user id' do
        expect(subject['id']).to eq user.id
      end

      it 'returns user full name' do
        expect(subject['full_name']).to eq user.full_name
      end

      it 'returns user email' do
        expect(subject['email']).to eq user.email
      end
    end

    context 'and credentials are invalid' do
      let(:params) do
        {
          user: {
            email: 'johon@doe.com',
            password: 'wrong'
          }
        }
      end

      before do
        post url, params: params
      end

      it 'returns 404 status' do
        post url, params: params
        expect(response.status).to eq 404
      end

      it 'returns proper error' do
        post url, params: params
        json = JSON.parse(response.body)
        expect(json['error']).to eq 'User not found.'
      end
    end
  end
end
```

Now you can run tests and output should be following:
<blockquote class="imgur-embed-pub" lang="en" data-id="GHmCWnP"><a href="//imgur.com/GHmCWnP">View post on imgur.com</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

All code used in this example might be found [here](https://github.com/Chmarusso/web_chatter/pull/2/files).
