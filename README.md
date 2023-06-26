# api-js
API for ibp-monitor (js)


## Dependencies

- ibp-monitor version 0.2.n+ (currently in develop branch - https://github.com/ibp-network/ibp-monitor/tree/develop)

## Example usage

```javascript

// const IbpApi = require('ibp-api');
import { IbpApi } from './index.js';

let api = new IbpApi({
  // the url of the ibp-monitor operator
  url: 'https://ibp-monitor.operator.com',
  // the apiKey is provided by the ibp-monitor operator
  apiKey: 'my-api-key'
});

// create listener
api.on('healthCheck', (event) => {
  console.log('A healthCheck was created!', event);
});

// Subscribe to '<model>.<event>'
api.subscribe('healthCheck');

// After some time, unsubscribe from 'user.created' event.
setTimeout(() => {
  api.unsubscribe('healthCheck');
}, 10000);

```

