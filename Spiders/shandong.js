const _ = require('lodash');
const url = require('url');
const common = require('../common');
const cheerio = require('cheerio');
const request = require('request-promise');
const querystring = require('querystring');

let parse = async (urlPath) => {
    // 获取pripid
    let body = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    console.log(body);
    const $ = cheerio.load(body);
    let pripid  = $('#pripid').val();
    let csrfToken  = $('meta[name="_csrf"]').attr('content');
    console.log(pripid);
    console.log(csrfToken);

    let urlInfo = url.parse(urlPath);
    urlPath = `http://${urlInfo.hostname}/pub/jbxx/qy/${pripid}?0.9153625060474255`;

    let result = await request(common.getRequestOption(urlPath, 'POST', {
        'X-CSRF-TOKEN': csrfToken,
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': 1,
        'Referer': 'http://218.57.139.24/pub/search/index',
    })).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    console.log(result);
    let resultJson = JSON.parse(result);
    console.log(resultJson);
    let companyInfo = {
        'registerCode': resultJson.uniscId,
        'companyName': resultJson.entName,
        'companyType': resultJson.entType_CN,
        'legalPerson': resultJson.leRep,
        'registeredCapital': resultJson.regCap,
        'establishmentDate': resultJson.estDate,
        'startDate': resultJson.opFrom,
        'endDate': resultJson.opTo,
        'registrationAuthority': resultJson.regOrg_CN,
        'approvalDate': resultJson.apprDate,
        'registrationStatus': resultJson.regState_CN,
        'address': resultJson.dom,
        'businessScope': resultJson.opScope,
    };
    return companyInfo;
}

module.exports = {parse};