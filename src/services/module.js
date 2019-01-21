import request from '@/utils/request1';
import Constants from '@/utils/constants';
import downloadFile from '@/utils/downloadRequest';

export async function list(params) {
  return request(`${Constants.baseUrl}module/list`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function save(params) {
  return request(`${Constants.baseUrl}module/save`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function edit(params) {
  return request(`${Constants.baseUrl}module/edit`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function remove(params) {
  return request(`${Constants.baseUrl}module/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function download(params) {
  return downloadFile(`${Constants.baseUrl}module/download`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
