const url = require('url');
const _ = require('lodash');

const keyMap = {
    '统一社会信用代码/注册号': 'registerCode',
    '统一社会信用代码': 'registerCode',
    '注册号': 'registerCode',
    '企业名称': 'companyName',
    '类型': 'companyType',
    '法定代表人': 'legalPerson',
    '注册资本': 'registeredCapital',
    '成立日期': 'establishmentDate',
    '经营期限自': 'startDate',
    '营业期限自': 'startDate',
    '经营期限至': 'endDate',
    '营业期限至': 'endDate',
    '登记机关': 'registrationAuthority',
    '核准日期': 'approvalDate',
    '登记状态': 'registrationStatus',
    '住所': 'address',
    '经营范围': 'businessScope',
}

let keywordParser = (str) => {
    let infoArr = str.split('：');
    infoArr = infoArr.length != '2' ? str.split(':') : infoArr;

    if (infoArr.length != '2') {
        console.log('htmlParser error' + str);
        return false;
    }

    for (let key in keyMap) {
        if (infoArr[0].indexOf(key) != -1) {
            let value = infoArr[1].replace(/["\n"\s]/g, '');
            let result = {key: keyMap[key], value: value};
            delete keyMap[key];
            return result;
        }
    }

    return false;
}

const getRequestOption = (urlPath, method = 'GET', headers = {}) => {
    let urlInfo = url.parse(urlPath);
    console.log({
        url: urlPath,
        method: method,
        headers: _.assignIn({
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept': 'text/html',
            'Host': urlInfo.hostname,
            'Referer': urlPath,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        }, headers)
    });
    return {
        url: urlPath,
        method: method,
        headers: _.assignIn({
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Accept': 'text/html',
            'Host': urlInfo.hostname,
            'Referer': urlPath,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
        }, headers)
    }
}
module.exports = {keyMap, keywordParser, getRequestOption}