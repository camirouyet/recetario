
app.directive('listAdd', ['listService', '$http', function(listService, $http) {
  return {
    restrict: 'E',
    transclude: true,
    link: function(scope) {
      scope.isAdd = true;

      scope.onSubmit = function(){
        if(scope.isAdd){
          listService.addList([scope.selectedItem]);
        }else{
          listService.editItem(scope.selectedId, scope.selectedItem);
        }
		
        var config = {headers: {'Content-Type': 'application/json'}};
        var body = JSON.stringify(listService.getList());
      
        $http.put("https://recipebook-d9365.firebaseio.com/list.json", body, config)
        .success(function(respuesta){
            listService.setListLocal(false);
        })
        .error (function (error) {
            listService.addListLocal([scope.selectedItem]);
        });
        scope.onClear();
      }

      scope.onDelete = function(){
          debugger
          listService.deleteItem(scope.selectedId);
          scope.onClear();
      }

      scope.onClear = function(){
        scope.isAdd = true;
        scope.lista = listService.getList();
        scope.selectedItem = {name: null, amount: null};
		    scope.selectedId = null;
      }

    }, 
    templateUrl: 'includes/list-add.html'
  };
}]);