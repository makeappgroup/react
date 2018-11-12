import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
    BackHandler,
    ToastAndroid,
    View,
    StyleSheet,
    StatusBar,
    Text,
    WebView
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';


//根组件 ， 设置顶层的  navigator ， 加载 initialRoute 里的组件
class rootApp extends Component{
    render(){
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={{component: FirstPage}}
                    configureScene={this._configureScene}
                    renderScene={this._renderScene}
                />
            </View>
        )
    }

    _renderScene(route, navigator) {
        return <route.component navigator={navigator}  {...route.passProps} />;
    }

    _configureScene(route, routeStack) {
        return Navigator.SceneConfigs.FloatFromBottom
    }
}

class FirstPage extends Component{
    // 在 navigator 的第一个组件中 （ 官方术语 ： 在starter-kit里，我们在App这一级别 ） 绑定事件 ， 按back键回退导航栈的功能
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator) {
                let routes = this.props.navigator.getCurrentRoutes();
                let lastRoute = routes[routes.length - 1]; // 当前页面对应的route对象
                if (lastRoute.onHardwareBackPress) {// 先执行route注册的事件
                    let flag = lastRoute.onHardwareBackPress();
                    if (flag === false) {// 返回值为false就终止后续操作
                        return true;
                    }
                }

                // 判断是否是执行 webview 中网页的的回退
                if(isBack){
                    webview.goBack();
                    return true;
                }

                if (routes.length === 1) {// 在第一页了,2秒之内点击两次返回键，退出应用
                    //连按两次退出应用
                    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                        //最近2秒内按过back键，可以退出应用。
                        return false;
                    }
                    this.lastBackPressed = Date.now();
                    ToastAndroid.show('再按返回退出应用', ToastAndroid.SHORT);
                    return true;
                } else {
                    this.props.navigator.pop();
                }
            }
            return true;
        });
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress',()=>{});
        }
    }


    render(){
        return (
            <TWebView />
        );
    }
}

AppRegistry.registerComponent('myApp', () => rootApp);
