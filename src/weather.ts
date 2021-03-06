const request = require("request");

const weatherApiUrl = "http://api.openweathermap.org/data/2.5/weather";
const weatherAppID = "9fe30b09f7e7460c40db95f622682c10";
const units = "metric";

export default class Weather {
    public loc: any;
    public type: string;
    constructor(loc: any, type: string) {
        this.loc = loc;
        this.type = type;
    }
    public get(onSuccess: any) {
        let locq;
        if (this.type === "zip") { locq = "zip=" + this.loc; } else { locq = "q=" + this.loc; }

        request(
            `${weatherApiUrl}?${locq}&units=${units}&appid=${weatherAppID}`,
            (error: any, response: any, body: any) => {
            if (error && response.statusCode !== 200) {
                throw error;
            }
            onSuccess(JSON.parse(body));
        });
    }
}
