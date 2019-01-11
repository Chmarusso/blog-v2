---
title: G2A Pay - Create payment (Ruby)
date: 2017-04-22 15:24:41
tags:
- dajsiepoznac2017
- getnoticed
- ruby
- backend
intro: Create new payment in G2A Pay using Ruby.
cover: /images/g2a-ruby.jpg
---
On one of my websites, I want to integrate new payment gateway processor **G2A Pay**. I checked their documentation and it looks pretty easy. The whole process, in general, might be divided into following steps: 

1. Get **token** by calling API endpoint with payment parameters
2. Redirect user to specific G2A checkout page using **token**  
3. Wait for notification sent from G2A server to your server URL (notifications are sent on each transaction status change)

In today's post, I will focus only on the first point. First of all, we need couple configuration parameters. I've extracted them to my application config file ([Figaro](https://github.com/laserlemon/figaro) gem is very helpful for such configurations), so I can have different configurations for each of my environments:
```yaml
development:
  G2A_API_HASH: hash # get it from G2A Settings -> Merchant
  G2A_API_SECRET: secret # get it from G2A Settings -> Merchant
  G2A_MERCHANT_EMAIL: merchant@youremail.com
  G2A_QUOTE_URL: https://checkout.test.pay.g2a.com/index/createQuote # sandbox endpoint
  G2A_FAILURE_URL: http://my-test-store.com/order/failure
  G2A_OK_URL: http://my-test-store.com/order/success
```

Now we can proceed to more interesting part. We need to build payload following guides from G2A [documentation](https://pay.g2a.com/documentation/). For performing POST request I decided to use [rest-client](https://github.com/rest-client/rest-client) gem and [digest](https://ruby-doc.org/stdlib-2.1.0/libdoc/digest/rdoc/Digest.html) for hash generation. Here is the first implementation of my class for G2A checkout token generation: 
```ruby
require 'restclient'
require 'digest'

module GA 
  class GeneratePayment
    class << self
      def call(order_id, amount, currency, item)
        payload = payment_params(order_id, amount, currency, item)

        post_request(payload)
      end

      private 

      def payment_params(order_id, amount, currency, item)
        {
          api_hash:    ENV['G2A_API_HASH'],
          hash:        generate_hash(order_id, amount, currency),
          order_id:    order_id, 
          amount:      amount,
          currency:    currency,
          email:       ENV['G2A_MERCHANT_EMAIL'],
          url_failure: ENV['G2A_FAILURE_URL'],
          url_ok:      ENV['G2A_OK_URL'],
          'items[0]' => item
        }
      end

      def generate_hash(order_id, amount, currency)
        string = order_id + amount + currency + ENV['G2A_API_SECRET']
        Digest::SHA256.hexdigest(string)
      end     

      def post_request(params)
        begin
          resp = RestClient::Request.execute(method: :post, 
                                            url: ENV['G2A_QUOTE_URL'], 
                                            payload: params
          resp.body
        rescue => e
          e.response
        end
      end
    end
  end
end
```
Usage: 
```ruby
item = {"sku"=>"413-1", "name"=>"Diablo 3", "amount"=>"25", "qty"=>"1", "price"=>"100", "id"=>"11203", "url"=>"https://teststore.com/products/11203-Diablo-3"}
GA::GeneratePayment.call('order-1231', '100', 'EUR', item)
```

Output:
```ruby
{
"status": "ok",
"token": "854d863124b6db"
}
```
Now user may be redirected to `https://www.test.pay.g2a.com/index/gateway?token=854d863124b6db`

In the next iteration, I will improve error handling and allow to pass an array of items to the constructor. 
