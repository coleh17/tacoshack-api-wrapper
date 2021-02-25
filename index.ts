import request from 'request';
// TacoShack API endpoint
const API_URL = 'http://api.tacoshack.online/';

/**
 * Base class for the API
 */
class TacoShack {
    constructor() { }
    /**
     * Fetches a users shack data
     * @param {string} userID ID of user to fetch
     * @param {object} data Shack data to fetch, default is all shack data
     */
    fetchShack(userID: string, data: object = {}) {
        if (!/^[0-9]{17,19}$/.test(userID)) throw new Error("Invalid User ID provided, must be a Discord snowflake.");
        const options = {
            url: `${API_URL}/shacks/${userID}`,
            method: 'GET',
            form: data ? data : {
                all: true
            }
        }
        request(options, (err, res, body) => {
            if (err) throw new Error(`Error making request to API:\n${err.stack}`);
            if (res.statusCode === 400) throw new Error(`Bad request to API, fetch failed.\n${res}`);
            if (res.statusCode === 500) throw new Error(`Interval API Error, fetch failed.`);
            return JSON.parse(body);
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
        request(options, (err, res, body) => {
            if (err) throw new Error(`Error making request to API:\n${err.stack}`);
            if (res.statusCode === 400) throw new Error(`Bad request to API, fetch failed.\n${res}`);
            if (res.statusCode === 500) throw new Error(`Interval API Error, fetch failed.`);
            return JSON.parse(body);
        })
    }
}