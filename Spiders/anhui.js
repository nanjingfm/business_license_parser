const _ = require('lodash');
const url = require('url');
const cheerio = require('cheerio');
const common = require('../common');
const request = require('request-promise');

let keywordParser = common.keywordParser;

let parse = async (urlPath) => {

    let urlInfo = url.parse(urlPath);
    urlPath = `http://${urlInfo.hostname}/business/JCXX.jspx?${urlInfo.query}&date=${Date()}`;

    let body = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    let companyInfo = {};
    const $ = cheerio.load(body);
    $('.detail_info td').map(function() {
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