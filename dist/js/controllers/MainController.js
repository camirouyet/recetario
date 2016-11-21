
app.controller("MainController", function($scope,$http, $rootScope, recetasService) {
	$scope.firstTime = (localStorage.getItem("firstTime"))? false : true; 

	$scope.setRecetas = function () {
		$http.get("https://recipebook-d9365.firebaseio.com/recipes.json")
		.success(function (data) {
			recetasService.setRecetas(data);
			recetasService.addReceta(recetasService.getRecetasLocal());
			$scope.recetas = recetasService.getRecetas();
			$rootScope.respuesta = false;
		}).error (function (data) {
			var datos_local = recetasService.getRecetas();
			if (datos_local.length != 0){
				$scope.recetas = datos_local;
				$rootScope.respuesta = "Sin conexión";
			}else{
				$rootScope.respuesta ="No hay Recetas guardadas";
			}
		});
    }
	
	$scope.setRecetas();
});
