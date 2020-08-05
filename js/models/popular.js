import { useNavigation } from '@react-navigation/native';
import { getLanguageList } from '../service'
import {deepAssignObj, makeArray} from '@/utils/helper';
import {addArrayItem, delArrayItem, updateArray} from '@/utils/array';

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
      // const { lists } = yield select(_=>_[namespace])
      const res = yield call(getLanguageList,key);
      console.log(res);
      // yield put({
      //   type: 'assign',
      //   payload: {
      //     [key]:res&&res.data&&res.data.items
      //   },
      //   path:'lists'
      // });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    assign(state, dadad) {
      const {path, payload} = dadad
      return deepAssignObj(state, payload, path);
    },
    add(state, action) {
        return addArrayItem(state, action);
    },
    del(state, action) {

        return delArrayItem(state, action);
    },
    update(state, action) {
        return updateArray(state, action);
    }
  },
};

export default popular;
