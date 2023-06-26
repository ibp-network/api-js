import { IbpApi } from "./index.js";

;(async () => {

  const api = new IbpApi({
    url: 'http://localhost:4000',
    apiKey: '123123123'
  });
  api.subscribe('healthCheck');

  api.on('healthCheck', (data) => {
    console.log(data);
  });

  setTimeout(() => {
    api.unsubscribe('healthCheck');
    console.log('unsubscribed');
    process.exit(0);
  }, 30 * 1000);

})();
