import request from '@/utils/request'

// 查询单据规则列表
export function listBillcodeRule(query) {
  return request({
    url: '/system/billcodeRule/list',
    method: 'get',
    params: query
  })
}

// 查询单据规则详细
export function getBillcodeRule(id) {
  return request({
    url: '/system/billcodeRule/' + id,
    method: 'get'
  })
}

// 新增单据规则
export function addBillcodeRule(data) {
  return request({
    url: '/system/billcodeRule',
    method: 'post',
    data: data
  })
}

// 修改单据规则
export function updateBillcodeRule(data) {
  return request({
    url: '/system/billcodeRule',
    method: 'put',
    data: data
  })
}

// 删除单据规则
export function delBillcodeRule(id) {
  return request({
    url: '/system/billcodeRule/' + id,
    method: 'delete'
  })
}
