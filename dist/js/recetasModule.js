var app = angular.module('Recetas', [
  'ngRoute',
  'mobile-angular-ui'
  ]);

app.config(function($routeProvider) {
  $routeProvider.when('/',   
		{templateUrl: 'views/home.html', reloadOnSearch: false, 
		controller 	: 'MainController'})
	.when('/recipes',  
		{templateUrl: 'views/misRecetas.html', reloadOnSearch: false,
		controller 	: 'MisRecetasController'})
	.when('/list', 
		{templateUrl: 'views/list.html', reloadOnSearch: false,
		controller 	: 'ListController'})
	.when('/new',  
		{templateUrl: 'views/nuevaReceta.html', reloadOnSearch: false,
		controller 	: 'newRecetaController'})
	.when('/:id',  
		{templateUrl: 'views/receta.html', reloadOnSearch: false,
		controller 	: 'RecetaController'})
	.when('/:id/edit',  
		{templateUrl: 'views/nuevaReceta.html', reloadOnSearch: false,
		controller 	: 'newRecetaController'})
	.otherwise({
			redirectTo: '/'
		});
});

app.run(function($rootScope) {
    $rootScope.modal = false;
	$rootScope.respuesta;
});
