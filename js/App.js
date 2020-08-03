import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import * as dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn'; // 导入本地化语言
import dva from './models/dva';
import models from './models/index';
import AppNavigators from './routes/root'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const dvaApp= dva.createApp({
  initialState: {},
  models: models,
});

const store = dvaApp.getStore();
// dayjs.locale('zh-cn'); // 使用本地化语言

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <AppNavigators />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
});

export default App;
