import { list, edit, save, remove, loadList } from '@/services/project';

export default {
  namespace: 'project',
  state: {
    data: {
      content: [],
      pageNumber: 1,
      pageSize: 20,
      total: 0,
    },
    projectInfo: {},
    loadList: [],
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
        type: 'projectInfo',
        payload: response,
      });
    },
    *remove({ callback, payload }, { call }) {
      const response = yield call(remove, payload);
      if (callback) {
        callback(response);
      }
    },

    *loadList({ payload }, { call, put }) {
      const response = yield call(loadList, payload);
      yield put({
        type: 'loadListInfo',
        payload: response,
      });
    },
  },

  reducers: {
    listInfo(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    projectInfo(state, action) {
      return {
        ...state,
        projectInfo: action.payload,
      };
    },
    loadListInfo(state, action) {
      return {
        ...state,
        loadList: action.payload,
      };
    },
  },
};
