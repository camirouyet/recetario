
app.controller("ListController", function ($scope, $http, $rootScope, listService) {
	$scope.selectedItem = {name: null, amount: null};
    $scope.lista = listService.getList();
			
	$scope.onSelectItem = function(index){
        $scope.isAdd = false;
		$scope.selectedId = index;
		$scope.selectedItem = {
			name: $scope.lista[index].name, 
			amount: $scope.lista[index].amount
		};
	}
 }); 