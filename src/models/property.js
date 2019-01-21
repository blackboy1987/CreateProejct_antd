import { list, edit, save, remove, list1 } from '@/services/property';

export default {
  namespace: 'property',
  state: {
    data: {
      content: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0,
    },
    list: [],
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

    *list1({ payload }, { call, put }) {
      const response = yield call(list1, payload);
      yield put({
        type: 'list1Info',
        payload: Array.isArray(response) ? response : [],
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
  },

  reducers: {
    listInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    list1Info(state, action) {
      return {
        ...state,
        list: action.payload,
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
