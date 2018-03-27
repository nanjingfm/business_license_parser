const url = require('url');

let make = (urlPath) => {
    let urlInfo = url.parse(urlPath);

    switch (urlInfo.hostname) {
        case 'www.sgs.gov.cn': // 上海
            return require('./Spiders/shanghai');
        case 'www.jsgsj.gov.cn': // 江苏
            return require('./Spiders/jiangsu');
        case 'gsxt.hljaic.gov.cn': // 黑龙江
        case 'www.ahcredit.gov.cn': // 安徽
        case 'gsxt.qhaic.gov.cn': // 青海
            return require('./Spiders/anhui');
        case 'www.hebscztxyxx.gov.cn': // 河北
            return require('./Spiders/shanghai');
        case 'sx.gsxt.gov.cn': // 山西
            return require('./Spiders/anhui');
        case 'gsxt.lngs.gov.cn': // 辽宁
            console.log('暂不支持');
            return;
            return require('./Spiders/liaoning');
        case 'jl.gsxt.gov.cn': // 吉林
            return require('./Spiders/jilin');
        case 'gsxt.zjaic.gov.cn': // 浙江
            return require('./Spiders/zhejiang');
        case 'jx.gsxt.gov.cn': // 江西
            return require('./Spiders/jiangxi');
        case '218.57.139.24': // 山东
            return require('./Spiders/shandong');
        case 'xygs.gsaic.gov.cn': // 甘肃
        case 'gs.gsxt.gov.cn': // 甘肃
            return require('./Spiders/gansu');
        case 'sn.gsxt.gov.cn': // 陕西
            return require('./Spiders/shanxi');
    }
}



module.exports = {make};