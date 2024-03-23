"use strict";

import { sessionManager } from '../utils/session.js';

const BASE_URL = "http://localhost:1234";

const requestOptions = {
    headers: { Token: sessionManager.getToken()},
};

const requestCorsOptions = {
    headers: { 
        'Sec-Fetch-Mode': 'no-cors',
       'Referrer-Policy': 'unsafe-url',
    },
};

export { BASE_URL, requestOptions, requestCorsOptions };