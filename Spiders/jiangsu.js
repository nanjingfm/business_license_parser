const _ = require('lodash');
const url = require('url');
const common = require('../common');
const request = require('request-promise');

let parse = async (urlPath) => {

    let urlInfo = url.parse(urlPath);
    urlPath = `http://${urlInfo.hostname}:58888/ecipplatform/publicInfoQueryServlet.json?pageView=true&${urlInfo.query}`;

    let result = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    let resultJson = JSON.parse(result);
    let companyInfo = {
        'registerCode': resultJson.REG_NO,
        'companyName': resultJson.CORP_NAME,
        'companyType': resultJson.ZJ_ECON_KIND,
        'legalPerson': resultJson.OPER_MAN_NAME,
        'registeredCapital': resultJson.REG_CAPI,
        'establishmentDate': resultJson.START_DATE,
        'startDate': resultJson.FARE_TERM_START,
        'endDate': resultJson.FARE_TERM_END,
        'registrationAuthority': resultJson.BELONG_ORG,
        'approvalDate': resultJson.CHECK_DATE,
        'registrationStatus': resultJson.CORP_STATUS,
        'address': resultJson.ADDR,
        'businessScope': resultJson.FARE_SCOPE,
    };
    return companyInfo;
}

module.exports = {parse};