const request = require('request');

class KeyChain extends Array {
    add(key) {
        this.push(Promise.resolve(key));
    }

    addByUri(uri) {
        this.push(new Promise((resolve, reject) => {
            request(uri, (err, result) => {
                if (err) {
                    return reject(err);
                }

                resolve(result);
            });
        }));
    }

    get(key) {
        return Promise.resolve(null);
    }
};

module.exports = KeyChain;
