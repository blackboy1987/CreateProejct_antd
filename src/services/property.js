import request from '@/utils/request1';
import Constants from '@/utils/constants';

export async function list(params) {
  return request(`${Constants.baseUrl}property/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function save(params) {
  return request(`${Constants.baseUrl}property/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}property/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`${Constants.baseUrl}property/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function list1(params) {
  return request(`${Constants.baseUrl}property/list1`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
