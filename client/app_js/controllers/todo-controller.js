'use strict';

angular.module('todoExample').controller('TodoCtrl', function($scope, todos) {
    $scope.todos = todos;
});