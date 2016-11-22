
app.controller("MisRecetasController", function($scope, recetasService) {
	localStorage.setItem("firstTime", 'user');
	$scope.recetas = recetasService.getRecetas();
});

app.controller("RecetaController", function($scope, $rootScope, $routeParams, $http, $timeout, recetasService, listService) {
	$rootScope.modal = true;

	localStorage.setItem("firstTime", 'user');
    $scope.selectedReceta = recetasService.getReceta($routeParams.id);
	$scope.selectedReceta.id = $routeParams.id;

	$scope.onAddToList = function(){
		var recipeIngredients = [];
		if($scope.selectedReceta.hasOwnProperty('ingredients')){
			for(var i = 0; i < $scope.selectedReceta.ingredients.length; i++){
				recipeIngredients[i] = {
					name: $scope.selectedReceta.ingredients[i].name, 
					cant: $scope.selectedReceta.ingredients[i].cant
				}
			}
     	}

		listService.addList(recipeIngredients);
		
		var config = {headers: {'Content-Type': 'application/json'}};
		var body = JSON.stringify(listService.getList());
  
		$http.put("https://recipebook-d9365.firebaseio.com/list.json", body, config)
		.success(function(respuesta){
			
			listService.setListLocal(false);
			$rootScope.respuesta = 'Guardado exitosamente';
            $timeout(function () {
					$rootScope.respuesta = false;
			}, 1000);

		})
		.error (function (error) {
			listService.addListLocal(newList);
			
			if(error){
				console.log(error);
				$rootScope.respuesta = 'Há ocurrido un error, vuelva a intentarlo más tarde';
				$timeout(function () {
					$rootScope.respuesta = false;
				}, 1000);
			}else{
				$rootScope.respuesta = 'Guardado exitosamente';
				$timeout(function () {
					$rootScope.respuesta = "Sin conexión";
				}, 1000);
			}
		});
	}

	$scope.onDelete = function(){
		recetasService.deleteReceta($scope.selectedReceta.id);
		
		var config = {headers: {'Content-Type': 'application/json'}};
		var body = JSON.stringify(recetasService.getRecetas());
  
		$http.put("https://recipebook-d9365.firebaseio.com/recipes.json", body, config)
		.success(function(respuesta){
			
			recetasService.setRecetasLocal(false);
			$rootScope.respuesta = 'Eliminado exitosamente';
            $timeout(function () {
					$rootScope.respuesta = false;
           			 window.history.back();
			}, 1000);

		})
		.error (function (error) {
			console.log(error);
			$rootScope.respuesta = 'Há ocurrido un error, vuelva a intentarlo más tarde';
			$timeout(function () {
				$rootScope.respuesta = "Sin conexión";
			}, 1000);
			
		});
	}

	$scope.$on("$destroy", function() {
		$rootScope.modal = false;
	});
});