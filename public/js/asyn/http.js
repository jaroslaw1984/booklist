"use strict";

/**
 * This class is for fetching a data from url that is pass in a class methods.
 *
 */

export class RequestHTTP {
  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(request => request.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
  post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(request => request.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
