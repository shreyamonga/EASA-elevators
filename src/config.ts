import { Injectable } from '@angular/core';
// import { environment } from '@env/environment';
declare const require: any;

class ConfigHelper {
    config: any;
    constructor() {
        try {
            this.config = require('./assets/config.json');
        } catch (e) {
            // if (!environment.production) {
            console.log('Error while reading configuration json file');
            // }
        }
    }
}

@Injectable({
    providedIn: 'root'
})

export class Config {
    Links: any;

    constructor() {
        const _ConfigHelper = new ConfigHelper();
        this.Links = _ConfigHelper.config;
    }
}
