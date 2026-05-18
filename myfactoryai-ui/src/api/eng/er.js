import request from '@/utils/request'

// 查询工艺处理请求列表
export function listEr(query) {
    return request({
        url: '/eng/er/list',
        method: 'get',
        params: query
    })
}

// 查询工艺处理请求详细
export function getEr(id) {
    return request({
        url: '/eng/er/' + id,
        method: 'get'
    })
}

// 新增工艺处理请求
export function addEr(data) {
    return request({
        url: '/eng/er',
        method: 'post',
        data: data
    })
}

// 修改工艺处理请求
export function updateEr(data) {
    return request({
        url: '/eng/er',
        method: 'put',
        data: data
    })
}

// 删除工艺处理请求
export function delEr(id) {
    return request({
        url: '/eng/er/' + id,
        method: 'delete'
    })
}

// 完成
export function finish(id)  {
    return request({
        url: '/eng/er/finish/'+ id,
        method: 'put'
    })
}
// 生成产品料号
export function generateCode(data)  {
    return request({
        url: '/eng/er/generateCode',
        method: 'put',
        data: data
    })
}
// 维护BOM
export function updateBom(data)  {
    return request({
        url: '/eng/er/updateBom',
        method: 'put',
        data: data
    })
}
// 维护路线
export function updateRouting(data)  {
    return request({
        url: '/eng/er/updateRouting',
        method: 'put',
        data: data
    })
}
// 维护文档
export function updateDocs(data)  {
    return request({
        url: '/eng/er/updateDocs',
        method: 'put',
        data: data
    })
}



// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

