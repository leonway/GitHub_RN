import { useNavigation } from '@react-navigation/native';
const fetchTest = async () => {
  const res = await fetch(
    'https://www.zhihu.com/api/v3/oauth/sms/supported_countries'
  );
  const data = await res.json();
  console.log(data);
  return data;
};

const popular = {
  namespace: 'popular',
  state: {
    data: [],
    v: '1.0',
    verCode: '',
    number: 1,
    content: [],
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
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default popular;
