/**
 * Created by emielPC on 20/11/16.
 */
var Promise = require('promise');

function savePage(page) {
    return new Promise(function (resolve, reject) {
        page.save(function (err, result) {
            if(err != null) reject(err);

            resolve(result);
        });
    });
}

module.exports = {
    savePage: savePage
};