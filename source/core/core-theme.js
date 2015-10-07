/**
 * Created by yangjiajun on 15/10/7.
 */


function CoreTheme($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue',{
            'default'   :   '500',
            'hue-1'     :   '900',
            'hue-2'     :   'A100',
            'hue-3'     :   '400'
        })
        .accentPalette('green',{
            'default'   :   '600',
            'hue-1'     :   '900',
            'hue-2'     :   'A100',
            'hue-3'     :   '400'
        })
        .warnPalette('deep-orange',{
            'default'   :   '500',
        })
}

CoreTheme.$inject = ['$mdThemingProvider'];

export default CoreTheme;