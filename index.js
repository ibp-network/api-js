import io from 'socket.io-client';
import EventEmitter from 'events';
import { serializeError, deserializeError } from 'serialize-error';

function logEvent (eventName) {
  return function (data) {
    console.log(`Event ${eventName}`, data);
  }
}
function logError (eventName) {
  return function (err) {
    console.error(`Error ${eventName}`);
    console.error(serializeError(err));
  }
}

class IbpApi extends EventEmitter {
  constructor(options) {
    super();
    this.url = options.url;
    this.apiKey = options.apiKey;
    this.socket = io(this.url, {
      query: {
        workerId: 'api-test',
        apiKey: this.apiKey,
        capabilities: [], // none, we won't be doing any work
      }
    });
    this.socket
      .on('connect', logEvent('connect'))
      .on('disconnect', logEvent('connect'))
      .on('parse_error', logEvent('parse_error'))
      .on('connect_error', logError('connect_error'))
      .on('error', logError('error'))
      .on('events', function(data) {
        console.log('Received events:', data);
      })

  }

  /**
   * Eg: subscribe('healthCheck', 'created')
   * @param {*} event 
   */
  subscribe(event, ...args) {
    const model = event; // .split('_')[0];
    // const eventName = event.split('_')[1]; 
    // TODO: support multiple events, like 'created', 'updated', 'deleted'
    const eventName = `subscribe_${model}`;
    this.socket.emit(eventName);
    this.socket.on(model, (data) => {
      this.emit(model, data);
    });
  }

  /**
   * Eg: unsubscribe('healthCheck')
   * @param {*} event 
   */
  unsubscribe(event) {
    const model = event; // .split('_')[0];
    const eventName = `unsubscribe_${model}`
    this.socket.emit(eventName);
    this.socket.off(model);
  }

}

export { IbpApi };
