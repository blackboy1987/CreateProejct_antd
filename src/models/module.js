import { list, edit, save, remove, download } from '@/services/module';

export default {
  namespace: 'module',
  state: {
    data: {
      content: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0,
    },
    moduleInfo: {},
  },

  effects: {
    *list({ payload }, { call, put }) {
      const response = yield call(list, payload);
      yield put({
        type: 'listInfo',
        payload: response,
      });
    },
    *save({ callback, payload }, { call }) {
      const response = yield call(save, payload);
      if (callback) {
        callback(response);
      }
    },
    *edit({ payload }, { call, put }) {
      const response = yield call(edit, payload);
      yield put({
        type: 'moduleInfo',
        payload: response,
      });
    },
    *remove({ callback, payload }, { call }) {
      const response = yield call(remove, payload);
      if (callback) {
        callback(response);
      }
    },
    *download({ callback, payload }, { call }) {
      const response = yield call(download, payload);
      if (callback) {
        callback(response);
      }
    },
  },

  reducers: {
    listInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    moduleInfo(state, action) {
      return {
        ...state,
        moduleInfo: action.payload,
      };
    },
  },
};
