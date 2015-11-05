/**
 * Created by yangjiajun on 15/11/5.
 */
import LoginCtrl from './login-controller';
import LoginTpl from './login-template.html!text';

var LoginRoute = {
    template    :   LoginTpl,
    controller  :   'LoginCtrl',
    resolve:{
        
    }
};

export default LoginRoute;