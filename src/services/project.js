import request from '@/utils/request1';
import Constants from '@/utils/constants';

export async function list(params) {
  return request(`${Constants.baseUrl}project/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function save(params) {
  return request(`${Constants.baseUrl}project/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}project/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`${Constants.baseUrl}project/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function loadList(params) {
  return request(`${Constants.baseUrl}project/loadList`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
