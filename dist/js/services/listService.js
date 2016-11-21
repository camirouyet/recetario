
app.service('listService', function() {
 
  this.setListLocal = function(data){
    if(data){
      localStorage.setItem("lists_push", JSON.stringify(data));
    }else{ 
       localStorage.removeItem("lists_push");
    }
  }

  this.getListLocal = function(){
    return localStorage.getItem("lists_push") ? JSON.parse(localStorage.getItem("lists_push")) : [];
  }
  
  this.addListLocal = function(newList){
    var local = this.getListLocal()
    local.push(newList);
    localStorage.setItem("lists_push", JSON.stringify(local));
  }

  this.setList = function(data){
    localStorage.setItem("lists", JSON.stringify(data));
  }
 
  this.getList = function(){
    return localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")) : [];
  }

  this.addList = function(newLists){
	  var data = this.getList();
    Array.prototype.push.apply(data, newLists)
    this.setList(data);
  }

  this.deleteItem = function(List){
    this.setList(this.getList().splice(this.getList().indexOf(List), 1));
  }

  this.editItem = function(index, newItem){
    var data = this.getList();
    data[index] = newItem;
    this.setList(data);
  }

});