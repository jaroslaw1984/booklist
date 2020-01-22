"use strict";

export class RequestHTTP {
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(request => request.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
