/**
 * "To-do For You"
 * Copyright © 2016-2017 Taylor Sturtz
 * MIT License (refer to LICENSE.TXT)
 *
 * Key technologies:
 * AngularJS(1.5), Angular Material, Firebase, AngularFire, Focus-if.js, Moment.js, Angular Moment
 *
 * Angular App and Angular Material Configuration
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
            .primaryPalette('indigo', {'default': '300'})
            .accentPalette('red', {'default': '500'})
            .warnPalette('grey', {'default': '800'})
            .backgroundPalette('grey', {'default': '200'});
        $mdThemingProvider.theme('add')
            .primaryPalette('white', {'default': '300'})
            .accentPalette('red', {'default': '500'})
            .warnPalette('indigo', {'default': '300'});
    });