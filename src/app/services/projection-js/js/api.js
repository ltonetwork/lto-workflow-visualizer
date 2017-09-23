/**

 createScenarioContract('Inbeslagname').then(address => {
		console.log(address);
		scenario = new Scenario(address);
		scenario.newVersion(20170101, "{['my-test-scenario']}");
	});

 // Taken from console.log() above
 var scenarioAddress = "0xf5bf403477ac65719c959a01595b76ee7cfe3f1a";

 var scenario = new Scenario(scenarioAddress);

 scenario.getLastVersion()
 .then(lastVersion => {
					scenario.getVersion(lastVersion);
				});

 createProcessContract(scenarioAddress).then(address => {
		console.log(address);
	});

 var process = new Process("0x811088b21107bd4d1d5bb2a5cc8954e9a599564d");

 process.addEvent('_encrypted2_');
 process.addKey('_somekey2_');

 Promise.all([
 process.getScenario(),
 process.getEvents(),
 process.getKeys()
 ])
 .then(results => {
		const scenarioAddress = results[0];
		const events = results[1];
		const keys = results[2];
		console.log(scenarioAddress, events, keys);
	});


 **/


const request = require('request');
const base = 'http://web3-server-master.eu-west-1.elasticbeanstalk.com/eth';

function api() {

    this.createScenarioContract = function(name) {

        return new Promise(function(resolve, reject){

            request({
                url: base + '/contracts/scenario.sol',
                method: "post",
                body: {
                    "params": [
                        name
                    ]
                },
                json: true
            }, function(err, res, body){
                resolve(body.to);
            });

        });
    }

    this.createProcessContract = function(scenario) {

        return new Promise(function(resolve, reject){

            request({
                url: base + '/contracts/process.sol',
                method: "post",
                body: {
                    "params": [
                        scenario
                    ]
                },
                json: true
            }, function(err, res, body){
                resolve(body.to);
            });

        });

    }

    this.Scenario = function(address) {

        this.newVersion = function(effectiveDate, content) {

            return new Promise(function(resolve, reject){

                request({
                    url: base + '/contracts/scenario.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "publishScenarioVersion",
                        "params": [
                            effectiveDate,
                            content
                        ]
                    },
                    json: true
                }, function(err, res, body){
                    console.log(body);
                    resolve(body);
                });

            });
        }

        this.getLastVersion = function() {

            return new Promise(function(resolve, reject){

                request({
                    url: base + '/contracts/scenario.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "lastVersion",
                    },
                    json: true
                }, function(err, res, body){
                    resolve(body.result);
                });

            });
        }

        this.getVersion = function(version) {

            return new Promise(function(resolve, reject){

                request({
                    url: base + '/contracts/scenario.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "getScenario",
                        "params": [
                            version
                        ]
                    },
                    json: true
                }, function(err, res, body){
                    resolve(JSON.parse(body.result));
                });

            });
        }

    }


    this.Process = function(address) {

        this.getScenario = () => new Promise((resolve, reject) => {
            request({
                url: base + "/contracts/process.sol",
                method: "post",
                body: {
                    "address": address,
                    "method": "scenario",
                },
                json: true
            }, function(err, res, body){
                resolve(body.result);
            });

        });

        this.addEvent = function(event) {

            return new Promise(function(resolve, reject) {

                request({
                    url: base + '/contracts/process.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "addEvent",
                        "params": [
                            event
                        ]
                    },
                    json: true
                }, function(err, res, body){
                    console.log(body);
                    resolve(body.result);
                });
            });
        }

        this.getEvents = function() {

            var countEvents = new Promise(function(resolve, reject){

                request({
                    url: base + '/contracts/process.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "getEventSize",
                    },
                    json: true
                }, function(err, res, body){
                    resolve(body.result);
                });

            });

            return countEvents.then(counter => {

                var events = [];

                for(var i = 0; i < counter; i++) {

                    events[i] = new Promise(function(resolve, reject){
                        request({
                            url: base + '/contracts/process.sol',
                            method: "post",
                            body: {
                                "address": address,
                                "method": "events",
                                "params": [i]
                            },
                            json: true
                        }, function(err, res, body) {
                            if (err) {
                                reject(err);
                            }
                            resolve(body.result);
                        });
                    });
                }

                return Promise.all(events);
            });
        };

        this.addKey = function(key) {

            return new Promise(function(resolve, reject) {

                request({
                    url: base + '/contracts/process.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "addKey",
                        "params": [
                            key
                        ]
                    },
                    json: true
                }, function(err, res, body){
                    resolve(body);
                });
            });

        }

        this.getKeys = function() {

            var countKeys = new Promise(function(resolve, reject){

                request({
                    url: base + '/contracts/process.sol',
                    method: "post",
                    body: {
                        "address": address,
                        "method": "getKeySize",
                    },
                    json: true
                }, function(err, res, body){
                    resolve(body.result);
                });

            });

            return countKeys.then(counter => {

                var keys = [];

                for(var i = 0; i < counter; i++) {

                    keys[i] = new Promise(function(resolve, reject){
                        request({
                            url: base + '/contracts/process.sol',
                            method: "post",
                            body: {
                                "address": address,
                                "method": "keys",
                                "params": [i]
                            },
                            json: true
                        }, function(err, res, body){
                            resolve(body.result);
                        });
                    });
                }

                return Promise.all(keys);
            });
        }

    }


}
module.exports = api;