const _ = require('lodash');
const url = require('url');
const common = require('../common');
const request = require('request-promise');
const querystring = require('querystring');

let parse = async (urlPath) => {

    let urlInfo = url.parse(urlPath);
    let params = querystring.parse(urlInfo.query);
    urlPath = `http://${urlInfo.hostname}/api/PubBaseInfo/Business/${params.id}`;

    let result = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    let resultJson = JSON.parse(result);
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