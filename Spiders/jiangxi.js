const _ = require('lodash');
const url = require('url');
const common = require('../common');
const request = require('request-promise');

let parse = async (urlPath) => {

    let urlInfo = url.parse(urlPath);
    urlPath = `http://${urlInfo.hostname}/baseinfo/queryenterpriseinfoByRegnore.do?${urlInfo.query}&randommath=0.1496956534695686&_=1513837496022`;

    let result = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    let resultJson = JSON.parse(result);
    let companyInfo = {
        'registerCode': resultJson.REGNO,
        'companyName': resultJson.ENTNAME,
        'companyType': resultJson.ENTTYPE_CN,
        'legalPerson': resultJson.NAME,
        'registeredCapital': resultJson.REGCAP,
        'establishmentDate': resultJson.ESTDATE,
        'startDate': resultJson.OPFROM,
        'endDate': resultJson.OPTO,
        'registrationAuthority': resultJson.REGORG_CN,
        'approvalDate': resultJson.APPRDATE,
        'registrationStatus': resultJson.REGSTATE_CN,
        'address': resultJson.DOM,
        'businessScope': resultJson.OPSCOPE,
    };
    return companyInfo;
}

module.exports = {parse};