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

    let registeredCapital = '';
    let matchArr = body.match(/ toDecimal6\('(\d+)'\)/);
    if(!_.isEmpty(matchArr[1])) {
        registeredCapital = toDecimal6(matchArr[1]);
    }

    let companyInfo = {};
    const $ = cheerio.load(body);

    $('#basic_ dl').map(function() {
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
    if(companyInfo.registeredCapital) {
        companyInfo.registeredCapital = registeredCapital + companyInfo.registeredCapital;
    }

    return companyInfo;
}

function toDecimal6(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x*1000000)/1000000;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 6) {
        s += '0';
    }
    return s;
}

module.exports = {parse};
