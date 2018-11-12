class TWebView extends Component{
    constructor(props){
        super(props);
        this.state = {
            url : 'http://www.3mentuan.cn/site/login',
            isError:false
        }
    }
    _onNavigationStateChange (navState){
        if(navState.canGoBack){
            global.isBack = true;
        }else{
            global.isBack = false;
        }
    }

    _showError(){
        this.setState({
            isError : true
        });
    }

    render(){
        return (
            <View style={styles.container}>

                {
                    this.state.isError?
                        <View style={styles.errorInfo}>
                            <Text style={styles.errorText}>网络有问题请检查网络情况，再刷新</Text>
                        </View>
                        :<WebView
                            ref={w => global.webview = w}
                            onNavigationStateChange={this._onNavigationStateChange}
                            style={{marginTop:-20}}
                            onError={this._showError.bind(this)}
                            startInLoadingState={true}
                            source={{uri: this.state.url}}/>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex:1
    },
    errorInfo:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    errorText:{
        fontSize:16,
        color:'#666'
    },
});