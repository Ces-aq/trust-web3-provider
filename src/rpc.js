"use strict";

class RPCServer {
  constructor(rpcUrl) {
    this.rpcUrl = rpcUrl;
  }

  getBlockNumber() {
    return this.call({jsonrpc: "2.0", method: "eth_blockNumber", params: []})
    .then(json => json.result);
  }

  getBlockByNumber(number) {
    return this.call({jsonrpc: "2.0", method: "eth_getBlockByNumber", params: [number, false]})
    .then(json => json.result);
  }

  getFilterLogs(filter) {
    return this.call({jsonrpc: "2.0", method: "eth_getLogs", params: [filter]});
  }

  call(payload) {
    // console.log("==> call rpc ", payload);
    return fetch(this.rpcUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(json => {
      // console.log("<== rpc result", json);
      if (!json.result && json.error) {
        // eslint-disable-next-line no-console
        console.log("<== rpc error", json.error);
        throw new Error(json.error.message || "rpc error");
      }
      return json;
    });
  }
}

module.exports = RPCServer;
