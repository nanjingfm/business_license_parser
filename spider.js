const request = require('request');
const spiderFactory = require('./spiderFactory');


// 上海
// let url = 'https://www.sgs.gov.cn/notice/notice/view?uuid=VNnvAqA.4ES2TG74ds_0DqR04VyXdrRK';

// 江苏
// let url = 'http://www.jsgsj.gov.cn:58888/ecipplatform/jiangsu.jsp?org=6983AED1959EFDD1779E9DBFB475D88C&id=E51645B030B9D138A5431FF8A8919EA6&seqId=C7B2A1C3F19AD0B8C19513BA872FEA49&activeTabId=';

// 安徽
// let url = 'http://www.ahcredit.gov.cn/company/detail.jspx?id=4DF7F0DF406796D4FBC6416835FB667D&jyzk=jyzc';

// 河北
// let url = 'http://www.hebscztxyxx.gov.cn/notice/notice/view?uuid=md_lN2FD619d_VxXhTsFKLnzdwZCCU6b&tab=01'

// 山西
// let url = 'http://sx.gsxt.gov.cn/company/detail.jspx?id=E81FD4AFC7F681EBCBAA1F77BDF2E6FE&jyzk=jyzc'

// 辽宁 FIXME:暂不支持
// let url = 'http://gsxt.lngs.gov.cn/saicpub/entPublicitySC/entPublicityDC/sEntDetail.action'

// 吉林
// let url = 'http://jl.gsxt.gov.cn/Publicity/Details_NZGSFR.html?id=10bff6da-012a-1000-e000-fe13c0a80043&entTypeCode=1130'

// 黑龙江
// let url = 'http://gsxt.hljaic.gov.cn/company/detail.jspx?id=05AC68F7F6DE39358DF2E346DA9765D9&jyzk=jyzc'

// 浙江
// let url = 'http://gsxt.zjaic.gov.cn/client/entsearch/selectByDocId?docId=8377CEED291FB266E22458E241EF007FB51C4B8DFB0EADE299B9AE470E367B72&classFlag=1&pubType=2'

// 福建 FIXME:暂不支持
// let url = 'http://fj.gsxt.gov.cn/notice/notice/view'

// 江西
 //let url = 'http://jx.gsxt.gov.cn/pages/nzgsfr/informationinfo.jsp?pripid=MzYwMTAwMjAxMDAzMDIwMDAwMDI2OAu002Cu002C'

// 山东
//let url = 'http://218.57.139.24/pub/jbxx/qy/5D26090652B834E2B8DB463596AD8C87D5FE618FE874CF4E8CA4882DE2FCD589/jbxx'

// 青海
//let url = 'http://gsxt.qhaic.gov.cn/company/detail.jspx?id=BD7EE381931AD3CBDD99F95394E11C05&jyzk=jyzc'

//甘肃
//let url = 'http://xygs.gsaic.gov.cn/gsxygs/pubSearch/basicView?pripid=1406269&entcate=compan&queryType=query'

//陕西
let url = 'http://sn.gsxt.gov.cn/ztxy.do?method=qyInfoNew&maent.pripid=6100000000078731&random=1471584971969'

let Parser = spiderFactory.make(url);

Parser.parse(url).then((companyInfo) => {
    console.log(companyInfo);
})

