import { useNavigation } from '@react-navigation/native';
import { getLanguageList } from '../service'
const fetchTest = async () => {
  const res = await fetch(
    'https://www.zhihu.com/api/v3/oauth/sms/supported_countries'
  );
  const data = await res.json();
  // console.log(data);
  return data;
};

const namespace = 'popular'

const popular = {
  namespace,
  state: {
    data: [],
    v: '1.0',
    verCode: '',
    number: 1,
    content: [],
    lists:{},
    tabs:['Java','Android','Ios','React','React Native',"php","c","c++","c#"]
  },
  effects: {
    *zhihu(_, { call, put }) {
      const res = yield call(fetchTest);
      yield put({
        type: 'save',
        payload: {
          content: res.data,
        },
      });
    },
    *searchList({payload:key}, { call, put, select }) {
      const { lists } = yield select(_=>_[namespace])
      const res = yield call(getLanguageList,key);
      // console.log(res);
      yield put({
        type: 'save',
        payload: {
          lists:{
            ...lists,
            [key]:res&&res.data&&res.data.items
          },
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default popular;
