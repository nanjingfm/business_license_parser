const _ = require('lodash');
const cheerio = require('cheerio');
const common = require('../common');
const request = require('request-promise');

let keywordParser = common.keywordParser;

let parse = async (url) => {
    let body = await request(common.getRequestOption(url)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    let companyInfo = {};
    const $ = cheerio.load(body);
    $('.tableYyzz td').map(function() {
        let content = $(this).text();
        if (_.isEmpty(content)) {
            return;
        }
        let parseResult = keywordParser(content);
        if (false === parseResult) {
            return;
        }
        companyInfo[parseResult.key] = parseResult.value;
    });
    return companyInfo;
}

module.exports = {parse};