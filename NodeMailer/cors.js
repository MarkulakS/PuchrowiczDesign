const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ["http://localhost:4200"];

var corsOptionDelegate = (req, callBack) => {
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {origin: true};
    }else{
        corsOptions = {origin: false};
    }
    callBack(null, corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);