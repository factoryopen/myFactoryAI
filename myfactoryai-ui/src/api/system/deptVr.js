import request from '@/utils/request'
// 查询作业区列表
export function listWorkarea(query) {
  return request({
    url: '/system/dept/listWorkarea',
    method: 'get',
    params: query
  })
}

// 修改XY
export function updateDeptXY(data) {
  return request({
    url: '/system/dept/editXY',
    method: 'put',
    data: data
  })
}
