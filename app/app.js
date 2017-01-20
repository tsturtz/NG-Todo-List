/**
 * Angular App Configuration
 * To-Do App using Angular Material
 *
 * @config Disable Aria Warnings
 * @config Configure Angular Material Color Themes
 */

angular.module('todoApp', ['ngMaterial','firebase','focus-if','angularMoment'])

    .config(function ($mdAriaProvider) {
        $mdAriaProvider.disableWarnings();
    })

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('white', {
            '50': '#fff',
            '100': '#fff',
            '200': '#fff',
            '300': '#fff',
            '400': '#fff',
            '500': '#fff',
            '600': '#fff',
            '700': '#fff',
            '800': '#fff',
            '900': '#fff',
            'A100': '#fff',
            'A200': '#fff',
            'A400': '#fff',
            'A700': '#fff',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined    // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('teal', {'default': '500'})
            .accentPalette('indigo', {'default': '400'})
            .warnPalette('deep-orange', {'default': '700'})
            .dark();
        $mdThemingProvider.theme('add')
            .primaryPalette('white')
            .accentPalette('teal', {'default': '500'})
            .warnPalette('grey', {'default': '800'})
            .dark();
    });