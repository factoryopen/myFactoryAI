import request from '@/utils/request'

// 查询工序出工列表
export function listProcessWork(query) {
    return request({
        url: '/exe/processWork/list',
        method: 'get',
        params: query
    })
}

// 查询工序出工列表
export function listProcessingWorkByMl(query) {
  return request({
    url: '/exe/processWork/listByMl',
    method: 'get',
    params: query
  })
}

// 查询工序出工详细
export function getProcessWork(id) {
    return request({
        url: '/exe/processWork/' + id,
        method: 'get'
    })
}

// 新增工序出工
export function addProcessWork(data) {
    return request({
        url: '/exe/processWork',
        method: 'post',
        data: data
    })
}

// 修改工序出工
export function updateProcessWork(data) {
    return request({
        url: '/exe/processWork',
        method: 'put',
        data: data
    })
}

// 删除工序出工
export function delProcessWork(id) {
    return request({
        url: '/exe/processWork/' + id,
        method: 'delete'
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

