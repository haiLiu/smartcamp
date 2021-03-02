import {request} from "../server/request"

export function login(param) {
  return request({
    method: 'post',
    url: "/login",
    params: param,
  })
}