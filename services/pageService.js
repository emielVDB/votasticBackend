/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');
var Page = require('../models/page');


function savePage(page) {
    return new Promise(function (resolve, reject) {
        page.save(function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

function getPageById(objectId) {
    return new Promise(function (resolve, reject) {
        Page.findById(objectId, function (err, result) {
            if (err) return reject(err);

            resolve(result)
        })
    })
}

module.exports = {
    savePage: savePage,
    getPageById: getPageById
};