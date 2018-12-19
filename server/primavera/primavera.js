var Client = require('node-rest-client').Client;
var client = new Client();

class Primavera {
    constructor() {

        // set variables for class
        this.primaveraSecondToken;
        this.primaveraSecondTokenExpireTimestamp;
        this.apiURL = "http://10.227.148.151:2018/WebApi/";

        // get token

        this.fetchToken();
    }

    fetchToken() {
        console.log("fetching token");
        let data = {
            "username": "FEUP",
            "password": "qualquer1",
            "company": "UV3",
            "instance": "DEFAULT",
            "grant_type": "password",
            "line": "professional"
        };
        this.data = "";
        Object.keys(data).forEach(k => {
            this.data += k + "=" + data[k] + "&";
        });
        var args = {
            data: this.data,
            headers: {
                "Content-Type": "x-www-form-urlencoded",
                "cache-control": "no-cache",
            }
        };
        let parent = this;
        return new Promise(function (resolve, reject) {
            client.post(parent.apiURL + "token", args, function (data, response) {
                parent.primaveraSecondToken = data.access_token;
                parent.primaveraSecondTokenExpireTimestamp = Date.now() / 1000 + data.expires_in;
                console.log("token updated");
                resolve();
            });
        });
    }

    tokenIsValid() {
        if (Date.now() / 1000 < this.primaveraSecondTokenExpireTimestamp) {
            console.log("token is valid");
            return true;
        } else {
            console.log("token is invalid");
            return false;
        }
    }

    inventoryOverview() {
        console.log("fetching inventory overview");
        if (!this.tokenIsValid()) {
            this.fetchToken();
        }

        let parent = this;
        return new Promise(function (resolve, reject) {

            var args = {
                headers: {
                    "Authorization": "Bearer " + this.primaveraSecondToken
                }
            };

            client.get(parent.apiURL + "Base/Artigos/LstArtigos", args, function (data, response) {
                // parsed response body as js object
                resolve(data);
            });
        });
    }

    sqlQuery(sql) {
        console.log("running sql query: " + sql);
        if (!this.tokenIsValid()) {
            this.fetchToken().then(_ => {
                return this._sqlQuery(sql);
            });
        } else
            return this._sqlQuery(sql);
    }

    _sqlQuery(sql) {
        let parent = this;
        return new Promise(function (resolve, reject) {
            var args = {
                headers: {
                    "Authorization": "Bearer " + parent.primaveraSecondToken,
                    "Content-Type": "application/json",
                },
                data: '"' + sql + '"'
            };
            client.post(parent.apiURL + "Administrador/Consulta", args, function (data, response) {
                // parsed response body as js object
                resolve(data);
            });
        });
    }
}

module.exports = Primavera;