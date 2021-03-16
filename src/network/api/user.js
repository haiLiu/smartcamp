import {request} from "../server/request"


/* 用户列表 */
export function userList(param) {
  return request({
    method: "get",
    url: "users",
    params: param,
  })
}

/* 更改状态*/
export function stateChange(param) {
  return request({
    method: "put",
    url: `users/${param.id}/state/${param.state}`,
    params: param,
  })
}

/* 添加用户 */
export function addUser(param) {
  return request({
    method: "post",
    url: "users/",
    data: param,
  })
}

/* 编辑用户 */
export function editUser(id,params) {
  return request({
    method: "put",
    url: "users/"+id,
    data: params
  })
}

/* 删除用户 */
export function deleteUser(id) {
  return request({
    method: "delete",
    url: "users/"+id
  })
}

/* 给用户分配角色 */
export function assignUser(id,param) {
  return request({
    method: "put",
    url: "users/"+id+"/role",
    data: param
  })
}