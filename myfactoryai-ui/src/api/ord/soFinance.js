import request from '@/utils/request'

// 查询订单明细列表
export function listSoFinance(query) {
    return request({
        url: '/ord/soFinance/list',
        method: 'get',
        params: query
    })
}

// 查询订单明细列表
export function listSoFinanceAll(query) {
  return request({
    url: '/ord/soFinance/listAll',
    method: 'get',
    params: query
  })
}

// 查询订单明细详细
export function getSoFinance(id) {
    return request({
        url: '/ord/soFinance/' + id,
        method: 'get'
    })
}

// 开票登记
export function registerInvoice(data)  {
  return request({
    url: '/ord/soFinance/registerInvoice',
    method: 'put',
    data: data
  })
}
