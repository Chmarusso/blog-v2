---
title: Fetch ETH balance using NodeJS and AWS Lambda
date: 2018-07-26 19:11:36
tags:
- NodeJS
- javascript
- serverless
- aws lambda
intro: Learn how to deploy NodeJS function to AWS Lambda using Serverless framework.
cover: ./serverless-node-js.jpg
---
[Serverless](https://serverless.com/) framework allows deploying any NodeJS function to AWS Lambda. This means that within a couple of minutes you are able to deploy code from your terminal to Amazon servers. Serverless will take care of everything and generate URL of ready to use endpoint. You can focus on writing code and do not spend (or waste... 😅) time on infrastructure related stuff. All you need to do is provide your AWS credentials and do some initial configuration. The entire process is very well described [here](https://serverless-stack.com/chapters/create-an-aws-account.html).

Once we have [serverless](https://serverless.com/) installed and configured we can actually focus on the implementation of our endpoint. Today I want to have an endpoint which will return me an ETH balance for given address. There are a many Ethereum JS clients, but I decided to use [ethers.js](https://github.com/ethers-io/ethers.js/) . [Web3](https://github.com/ethereum/web3.js/) is a more popular one, but for some reason, it was not working on AWS Lambda (locally I had no problems, but deployed function was throwing weird error `module initialization error: Error`).

<iframe width="560" height="315" src="https://www.youtube.com/embed/WCsmH4u0-x8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Here is a basic implementation of my lib which connects through Infura to the Etherum network:
```javascript
import ethers from 'ethers'

const providers = ethers.providers
const network = providers.networks.mainnet

export const provider = new providers.InfuraProvider(network)
export const getBalance = async (address) => {
  const balance = await provider.getBalance(address)

  return ethers.utils.formatEther(balance)
}
```
[Infura](https://infura.io/about) provides secure, reliable, and scalable access to the Ethereum blockchain network. Of course, you can use any other provider or even your very own Etherum blockchain that may run locally.

Now we can use this lib and prepare function that will be deployed to AWS Lambda:
```javascript
import { success, failure } from "./libs/response-lib"
import { getBalance } from './libs/etherum-lib'

export async function balance(event, context, callback) {
  try {
    const addressId = event.pathParameters.id
    const addressBalance = await getBalance(addressId)

    callback(null, success({balance: addressBalance}))
  } catch(e) {
    callback(null, failure({ status: false, error: 'Something went wrong...' }))
  }
}
```
As AWS Lambda is executing this function on our behalf each function have to be structured in the proper way ([documentation](https://docs.aws.amazon.com/lambda/latest/dg/programming-model-v2.html)). Basically, the function should take three arguments: `event`, `context`, and `callback`.

`event` - any incoming data like headers, body or other parameters
`context` - object that might be used for interaction with AWS Lambda
`callback` - function that allows returning something to the caller (JSON object in   our situation)

Now we can add above function to `serverless.yml` configuration file so framework will know the details about it:

```yml
functions:
  balance:
    # Defines an HTTP API endpoint that calls the balance function in eth.js
    # - path: url path is /balance/{id}
    # - method: GET request
    handler: eth.balance
    events:
      - http:
          path: balance/{id}
          method: get
```

The great thing about serverless is that you can test your code locally without deploying to any servers:
```bash
serverless offline start

Serverless: Watching for changes...
Serverless: Starting Offline: dev/eu-central-1.

Serverless: Routes for balance:
Serverless: GET /balance/{id}

Serverless: Offline listening on http://localhost:3000

Serverless: GET /balance/0x281055Afc982d96fAB65b3a49cAc8b878184Cb16 (λ: balance)
Serverless: The first request might take a few extra seconds
{ chainId: 1,
  ensAddress: '0x314159265dd8dbb310642f98f50c066173c1259b',
  name: 'homestead' }
Serverless: [200] {"statusCode":200,"headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true},"body":"{\"balance\":\"1538422.985582127349856002\"}"}

Serverless: Warning: context.done called twice within handler 'balance'!
```

Everything is working as expected, so now it is a perfect time for deploying code to AWS Lambda:

```bash
$ serverless deploy

Serverless: Package lock found - Using locked versions
Serverless: Packing external modules: source-map-support@^0.4.18, babel-runtime@^6.26.0, ethers@^3.0.25
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (3.53 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: eth-app-api
stage: dev
region: eu-central-1
stack: eth-app-api-dev
api keys:
  None
endpoints:
  GET - https://1kiaycxw09.execute-api.eu-central-1.amazonaws.com/dev/balance/{id}
functions:
  balance: eth-app-api-dev-balance
Serverless: Removing old service artifacts from S3...
```

As you can see endpoint is ready to be used by your web or another app.
