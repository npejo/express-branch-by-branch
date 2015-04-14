'use strict';

angular.module('todoExample')
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller: 'TodoCtrl',
            templateUrl: 'todo-list.html',
            resolve: {
                todos: function (todoService) {
                    return todoService.getAll();
                }
            }
        });
    });