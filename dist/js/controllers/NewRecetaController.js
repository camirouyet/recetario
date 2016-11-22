
app.controller("newRecetaController", function ($scope, $http, $rootScope, $routeParams, $location, $timeout, recetasService){
	localStorage.setItem("firstTime", 'user');
	$rootScope.modal = true;
	$scope.receta =  {};

	$scope.imagesSearched = {};
	$scope.imageFind = false;
	
	var recipeName = '';
    var recipeImage ='';
    var recipeContent = '';
    var recipeIngredients = [];

    if($routeParams.hasOwnProperty('id')){
      $scope.id = $routeParams.id;
	  var recipe = recetasService.getReceta($routeParams.id); 

      if(recipe.hasOwnProperty('ingredients')){
        for(var i = 0; i < recipe.ingredients.length; i++){
          recipeIngredients[i] = {name: recipe.ingredients[i].name, cant: recipe.ingredients[i].cant}
        }
      }
    
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeContent = recipe.description;
    }
	
	$scope.receta = {
		name: recipeName,
		description: recipeContent, 
		imagePath: recipeImage, 
		ingredients: recipeIngredients
	};

	$scope.searchImg = function(value){
		$scope.showPanel = true;
		var params = {
			q: value,
			count:  3,
			size: 'Medium'
		};
		
		$.ajax({
			url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
			beforeSend: function(xhrObj){
				// Request headers
				xhrObj.setRequestHeader("Content-Type","multipart/form-data");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","dfcb427893e549e7b77c5271e8a16fd2");
			},
			type: "POST",
			// Request body
			data: "",
		})
		.done(function(data) {
			$scope.imageFind = true;
			$scope.imagesSearched = data.value;
		})
		.fail(function(error) {
			$rootScope.respuesta = 'Lo siento, ha ocurrido un error';
			console.log(error)
		});
		
	};

	$scope.onSelectImg  = function(contentUrl){
		$scope.receta.imagePath = contentUrl;
	}

	$scope.onSubmit = function (newReceta){
	
		if(newReceta.hasOwnProperty('ingredients')){
			for(var i = 0; i < newReceta.ingredients.length; i++){
				newReceta.ingredients[i] = {name: newReceta.ingredients[i].name, cant: newReceta.ingredients[i].cant}
			}
		}
		
		if($scope.id){
			recetasService.editReceta($scope.id, newReceta);
        }else{
			recetasService.addReceta([newReceta]);
		} 

		var config = {headers: {'Content-Type': 'application/json'}};
		var body = JSON.stringify(recetasService.getRecetas());
  
		$http.put("https://recipebook-d9365.firebaseio.com/recipes.json", body, config)
		.success(function(respuesta){
			
			recetasService.setRecetasLocal(false);
			$rootScope.respuesta = 'Guardado exitosamente';
            $timeout(function () {
					$rootScope.respuesta = false;
            		window.history.back();
			}, 1000);

		})
		.error (function (error) {
			if($scope.id){
				recetasService.editRecetaLocal($scope.id, newReceta);
			}else{
				recetasService.addRecetaLocal(newReceta);
			} 
			if(error){
				console.log(error);
				$rootScope.respuesta = 'Lo siento, ha ocurrido un error';
			}else{
				$rootScope.respuesta = 'Guardado exitosamente';
				$timeout(function () {
					$rootScope.respuesta = "Sin conexión";
            		window.history.back();
				}, 1000);
			}
		});
	}

	$scope.onRemoveItem =  function(index){
		$scope.receta['ingredients'].splice(index);
	}

	$scope.onAddItem = function(name, cant){
		$scope.receta['ingredients'].push({cant: cant, name: name});
		$scope.add = {};
	}
	
	$scope.$on("$destroy", function() {
		$rootScope.modal = false;	
	});
	
});