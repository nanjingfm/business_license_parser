const _ = require('lodash');
const url = require('url');
const common = require('../common');
const cheerio = require('cheerio');
const request = require('request-promise');
const querystring = require('querystring');
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');

let keywordParser = common.keywordParser;

let parse = async (urlPath) => {

    let body = await request(common.getRequestOption(urlPath)).catch(() => {
        console.log('Http Request error.');
        return {};
    });

    const $ = cheerio.load(body);
    let pripid = $('input[name="pripid"]').val();

    let urlInfo = url.parse(urlPath);
    let geturl = $('#iframe').attr('src');
    geturl = 'http://' + urlInfo.hostname + '/' + geturl;

    try{
        let body = await request({
            url: geturl,
            encoding: null,
        }).catch(() => {
            console.log('Http Request error.');
            return {};
        });
        body = iconv.convert(body).toString();

        let companyInfo = {};
        const $ = cheerio.load(body, {decodeEntities: false});

        $('.detail_info .table_xq td').map(function() {
            let content = $(this).text();
            if (_.isEmpty(content) || content == '•') {
                return;
            }
            let parseResult = keywordParser(content);
            if (false === parseResult) {
                return;
            }
            companyInfo[parseResult.key] = parseResult.value;
        });

        return companyInfo;

    }catch(e){
        console.log('error', e);
    }

}
module.exports = {parse};
