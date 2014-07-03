function SeverityRiskCtrl($scope, $http) {
    'use strict';

    if(appConfig.data) {
        $scope.data = appConfig.data;
    } else if(appConfig.dataUrl) {
        $http.get(appConfig.dataUrl).success(function(data) {
            $scope.data = data;
        });
    } 

    $scope.stageGroup = 'Severity';
    $scope.stage = $scope.data.severity[0];
    $scope.step = 1;
    $scope.steps = $scope.data.severity.length + $scope.data.risks.length + 1;
    $scope.scores = [];

    $scope.next = function() {
        $scope.step++;
        screenChange();
    };

    $scope.previous = function() {
        $scope.step--;
        screenChange();
    };

    function screenChange() {
        if($scope.step < $scope.data.severity.length+1) {
            $scope.stageGroup = 'Severity';
            $scope.stage = $scope.data.severity[$scope.step-1];
        } else if($scope.step < $scope.data.risks.length + 1 + $scope.data.severity.length) {
            $scope.stageGroup = 'Risks';            
            $scope.stage = $scope.data.risks[$scope.step -  1 - $scope.data.severity.length];
        } else {
            // final step
            $scope.assessmentDate = new Date().toLocaleDateString();
        }
    }
    
    $scope.scoreText = function(score) {
        switch(score) {
        case 1:
            return 'Low';
        case 2:
            return 'Medium';
        case 3:
            return 'High';
        }
        return '';
    };

    $scope.oversightLevel = function() {
        var score = 0;
        for(var i=0; i<$scope.scores.length; i++) {
            score += $scope.scores[i];
        }

        if(score<=13)
            return 'Level 1 - Low';
        if(score<=19)
            return 'Level 2 - Medium';
        else
            return 'Level 3 - High';
    };
    $scope.oversightLevelStyle = function() {
        switch($scope.oversightLevel()) {
        case 'Level 1 - Low':
            return 'Low';
        case 'Level 2 - Medium':
            return 'Medium';
        case 'Level 3 - High':
            return 'High';
        default:
            return '';
        }
    };

}

