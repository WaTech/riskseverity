function SeverityRiskCtrl($scope, $http) {
    'use strict';

    if(appConfig.data) {
        $scope.data = appConfig.data;
    } else if(appConfig.dataUrl) {
        $http.get(appConfig.dataUrl).success(function(data) {
            $scope.data = data;
        });
    } 

    $scope.printMode = false;
    $scope.assessmentDate = new Date().toLocaleDateString();
    $scope.steps = $scope.data.severity.length + $scope.data.risks.length + 1;

    
    $scope.step = 1;
    $scope.selections = [];

    $scope.next = function() {
        $scope.step++;
        $scope.screenChange();
    };

    $scope.previous = function() {
        $scope.step--;
        $scope.screenChange();
    };

    $scope.screenChange = function() {
        if($scope.step < $scope.data.severity.length+1) {
            $scope.stageGroup = 'Severity';
            $scope.stage = $scope.data.severity[$scope.step-1];
        } else if($scope.step < $scope.data.risks.length + 1 + $scope.data.severity.length) {
            $scope.stageGroup = 'Risks';            
            $scope.stage = $scope.data.risks[$scope.step -  1 - $scope.data.severity.length];
        } else {
            // final step
        }
        
        $scope.storeState();
    };

    $scope.storeState = function() {
        var stateData = {
            step: $scope.step,
            selections: $scope.selections
        };
        if($scope.step===$scope.steps) {
            stateData.agency = $scope.agency;
            stateData.project = $scope.project;
        }
        
        sessionStorage.setItem('riskSeverityState', JSON.stringify(stateData));
    };
    
    $scope.startOver = function() {
        $scope.step = 1;
        $scope.selections = [];
        $scope.screenChange();
    };

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
        for(var i=0; i<$scope.selections.length; i++) {
            score += $scope.selections[i].score;
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

    // init
    //if(window.location.hash) {
    //var state = JSON.parse(decodeURIComponent(window.location.hash.replace(/^#/,'')));
    if(window.sessionStorage) {
        var stateDoc = window.sessionStorage.getItem('riskSeverityState');
        if(stateDoc) {
            var state = JSON.parse(stateDoc);
            $scope.step = state.step;
            $scope.selections = state.selections;
            $scope.agency = state.agency;
            $scope.project = state.project;
        }
    }
    if(jQuery(".print-content").length>0 || window.location.search==='?print=true') {
        $scope.printMode = true;
    }
    $scope.screenChange();
}

