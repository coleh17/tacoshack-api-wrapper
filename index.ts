// import request from 'request';
const request = require("request");
// TacoShack API endpoint
// const API_URL = 'http://api.tacoshack.online/';
const API_URL = 'http://tacoshack.online:4041/';

/**
 * Base class for the API
 */
module.exports = class TacoShack {
    constructor() { }
    /**
     * Fetches a users shack data
     * @param {string} userID ID of user to fetch
     * @param {object} data Shack data to fetch, default is all shack data
     */
    async fetchShack(userID: string, dataObj: object = {}) {
        return new Promise(async (resolve, reject) => {
            if (!/^[0-9]{17,19}$/.test(userID)) reject(new Error("Invalid User ID provided, must be a Discord snowflake."));
            const options = {
                url: `${API_URL}shack/${userID}`,
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                },
                body: dataObj,
                json: true
            }
            await request(options, async (err: Error, res: any, body: any) => {
                if (err) throw new Error(`Error making request to API:\n${err.stack}`);
                if (res.statusCode === 400) reject(new Error(`Bad request to API, fetch failed.`));
                if (res.statusCode === 500) reject(new Error(`Interval API Error, fetch failed.`));
                resolve(body.shack);
            })
        })
    }

    /**
     * Fetches a franchises data
     * @param {string} tag Tag of franchise to fetch
     * @param {object} data Franchise data to fetch, default is all franchise data
    */
    fetchFranchise(tag: string, data: object = {}) {
        if (!/^[a-zA-Z0-9]{3}$/.test(tag)) throw new Error("Invalid Franchise Tag provided, must be 3 characters and alphanumerical.");
        const options = {
            url: `${API_URL}/franchise/${tag}`,
            method: 'GET',
            form: data ? data : {
                all: true
            }
        }
        request(options, (err: Error, res: any, body: any) => {
            if (err) throw new Error(`Error making request to API:\n${err.stack}`);
            if (res.statusCode === 400) throw new Error(`Bad request to API, fetch failed.\n${res}`);
            if (res.statusCode === 500) throw new Error(`Interval API Error, fetch failed.`);
            return JSON.parse(body);
        })
    }


    // Testing Methods //

    /**
     * Test method for setting up test cases
     * @returns 5
     */
    testFunc() {
        return 5;
    }
    /**
     * Test method for setting up test cases
     * @returns Shack object
     */
    async testFetch() {
        return new Promise(async (resolve, reject) => {
            const options = {
                url: `${API_URL}shack/280428044156534784`,
                method: 'GET'
            }
            await request(options, (err: Error, res: any, body: any) => {
                if (err) reject(err);
                resolve(JSON.parse(body).shack);
            })
        })
    }
}