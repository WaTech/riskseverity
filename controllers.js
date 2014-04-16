'use strict';

function SeverityRiskCtrl($scope, $http) {
    //$http.get('/sites/default/files/apps/riskseverity/data.json').success(function(data) {
    $http.get('data.json').success(function(data) {
	$scope.data = data;
    });

    $scope.risksScore = 0;
    $scope.severityScore = 0;
    $scope.risksScoreStyle = '';
    $scope.severityScoreStyle = '';
    $scope.selectedSeverityCount = 0;
    $scope.selectedRiskCount = 0;


    $scope.updateSeverity = function(col,row) {
	var severity = $scope.data.severity;
	severity[col].selected = row;
	
	$scope.severityScore = 0;
	$scope.selectedSeverityCount = 0;
	for(var i=0;i<severity.length; i++) {
	    var selected = severity[i].selected;
	    if(selected!=null) {
		$scope.selectedSeverityCount++;
		$scope.severityScore += severity[i].levels[selected].score;
	    }
	}
	$scope.severityScoreStyle = $scope.scoreStyle($scope.severityScore);

	// setup print table row
	var printCell = angular.element(document.querySelector('#severityPrint'+col));
	var printContent = severity[col].levels[row].text;
	printCell.html(printContent);
    }

    $scope.updateRisks = function(col,row) {
	var risks = $scope.data.risks;
	risks[col].selected = row;
	
	$scope.risksScore = 0;
	$scope.selectedRiskCount = 0;
	for(var i=0;i<risks.length; i++) {
	    var selected = risks[i].selected;
	    if(selected!=null) {
		$scope.selectedRiskCount++;
		$scope.risksScore += risks[i].levels[selected].score;
	    }
	}
	$scope.risksScoreStyle = $scope.scoreStyle($scope.risksScore);

	// setup print table row
	var printCell = angular.element(document.querySelector('#riskPrint'+col));
	var printContent = risks[col].levels[row].text;
	printCell.html(printContent);
    }

    $scope.oversightLevel = function() {
	if($scope.selectedRiskCount+$scope.selectedSeverityCount<8) {
	    return '';
	}

	var score = $scope.risksScore + $scope.severityScore;
	if(score<=13)
	    return 'Level 1 - Low';
	if(score<=19)
	    return 'Level 2 - Medium';
	else
	    return 'Level 3 - High';
    }
    $scope.oversightLevelStyle = function() {
	switch($scope.oversightLevel()) {
	case 'Level 1 - Low':
	    return 'green';
	case 'Level 2 - Medium':
	    return 'yellow';
	case 'Level 3 - High':
	    return 'red';
	default:
	    return '';
	}
    }
    

    $scope.cellStyle = function(category,col,row) {
	if(category[col].selected===row)
	    return 'selected';
	return '';
    }

    $scope.scoreStyle = function(score) {
	if(score >= 10)
	    return 'red';
	if(score >= 6)
	    return 'yellow';
	if(score >= 4)
	    return 'green';
	return '';
    }
}
