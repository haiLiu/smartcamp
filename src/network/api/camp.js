import {request} from "../server/request"


/* 用户列表 */
export function campList(param) {
  return request({
    method: "get",
    url: "camps",
    params: param,
  })
}