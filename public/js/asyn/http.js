"use strict";

/**
 * This class contains methods GET, POST , DELETE, PUT for handling json server data
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
  put(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "PUT",
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
  del(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(request => request.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }
}
