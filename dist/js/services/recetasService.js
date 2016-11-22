
app.service('recetasService', function() {
 
  this.setRecetasLocal = function(data){
    if(data){
      localStorage.setItem("recetas_push", JSON.stringify(data));
    }else{
       localStorage.removeItem("recetas_push");
    }
  }

  this.getRecetasLocal = function(){
    return localStorage.getItem("recetas_push") ? JSON.parse(localStorage.getItem("recetas_push")) : [];
  }
  
  this.addRecetaLocal = function(newReceta){
    var local = this.getRecetasLocal()
    local.push(newReceta);
    localStorage.setItem("recetas_push", JSON.stringify(local));
  }

  this.setRecetas = function(data){
    localStorage.setItem("recetas", JSON.stringify(data));
  }
 
  this.getRecetas = function(){
    return localStorage.getItem("recetas") ? JSON.parse(localStorage.getItem("recetas")) : [];
  }

  this.getReceta = function(id){
      var recetas = this.getRecetas();
    return recetas[id];
  }

  this.addReceta = function(newRecetas){
	   var data = this.getRecetas();
    Array.prototype.push.apply(data, newRecetas)
    this.setRecetas(data);
  }

  this.deleteReceta = function(index){
    var recetas = this.getRecetas();
    recetas.splice(index, 1);
    this.setRecetas(recetas);
  }

  this.editReceta = function(recetaId, newReceta){
    var data = this.getRecetas();
    data[recetaId] = newReceta;
    this.setRecetas(data);
  }

});