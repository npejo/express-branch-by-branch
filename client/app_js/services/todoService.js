'use strict';

angular.module('todoExample')
    .factory('todoService', function ($http) {
        return {
            getAll: function () {
                return $http.get('/api/todos').then(function (resp) {
                    return resp.data;
                });
            }
        }
    });