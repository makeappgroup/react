import React from 'react';
import {Text, View, Image,BackHandler,ToastAndroid, Navigator, Platform} from 'react-native';
import {Button, StyleSheet, WebView, Dimensions} from 'react-native';

import {
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';

let name = "丁丁支付";
let lastBackPressed = null;
let globalUrl = 'http://www.dingdingzhifu.com';

const {width, height} = Dimensions.get('window');

function setNav(title) {
    return {
        title: title,
        headerStyle: {
            backgroundColor: '#f4511e',
            paddingTop: 0,
            height: 40
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 15
        }
    };
}

class DetailsScreen extends React.Component {
    static navigationOptions = setNav("详情");
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Details!</Text>
            </View>
        );
    }
}


class LogoTitle extends React.Component {
    render() {
        return (
            <Text> &lt; </Text>
        );
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = ({navigation, screenProps}) => ({
        headerTitle: <Text style={{backgroundColor: '#f4511e',
            paddingTop: 0,
            height: 40,
            color:'#fff',
            fontWeight:'normal',
            fontSize:15,
            lineHeight:40
        }} onPress={() => {
            webview.goBack()
        }}> &lt; 返回    {navigation.state.params?navigation.state.params.locationTitle:'Test2'}</Text>,
        headerStyle: {
            backgroundColor: '#f4511e',
            paddingTop: 0,
            height: 40
        }
    });
    static flagSet = 0;

    constructor(props) {
        props.navigation.setParams({
            locationTitle:  name
        });
        super(props);
    }

    /**
     * 处理android的返回键
     */
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    /**
     * 处理android的返回键
     */
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        lastBackPressed = null;
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress',()=>{});
        }
    }

    /**
     * 处理android的执行函数
     */
    onBackAndroid = ()=>{
        if (true) { // 根界面
            if(false == this.state.backButtonEnabled) {
                if (lastBackPressed && lastBackPressed + 2000 >= Date.now()){
                    return false;
                }
                ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
                lastBackPressed = Date.now();
            }else{
                webview.goBack();
            }
            return true;
        }
    }
    _onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
        });
    }



    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {/*
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                */}
                <WebView
                    ref={w => global.webview = w}
                    style={{width: width, height: height - 20, backgroundColor: 'gray'}}
                    source={{uri: globalUrl, method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    onNavigationStateChange={this._onNavigationStateChange}
                    onLoadStart={()=>{
                        if(HomeScreen.flagSet === 0){

                        }else{
                            HomeScreen.flagSet = 1;
                        }
                    }}
                />
            </View>
        );
    }
}


const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});

/**
 * Tab点击跳转调用的公共方法
 */
const route = (navigation) => {
    if (!navigation.isFocused()) {
        // 路由方法, 动态跳转到对应界面
        let map = {
            "丁丁支付":"http://www.dingdingzhifu.com",
            "商城示例":"http://www.wantme.cn"
        };
        name  = navigation.state.routeName;
        globalUrl = map[navigation.state.routeName];
        //alert(globalUrl);
        navigation.navigate(navigation.state.routeName, {
            title: navigation.state.routeName
        })
    }
};

export default createBottomTabNavigator(
    {
        "丁丁支付":{
            screen: HomeStack, // 对应跳转到的界面
            navigationOptions: ({navigation}) => ({ // 添加navigation参数
                tabBarLabel: '丁丁支付',
                tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                    route(navigation)
                }
            })
        },
        "商城示例": {
            screen: HomeStack, // 对应跳转到的界面
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '商城示例', // tabBar显示的文字
                tabBarOnPress: () => { // 使用tabBarOnPress点击事件
                    route(navigation)
                }
            })
        }
    },
    {
    }
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});