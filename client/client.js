console.log("Angular is running!");
var app = angular.module("toDoApp", []);

app.controller('MainController', ['$http', function($http){

  var vm = this;
  vm.taskObject = {"completed" : false};
  vm.taskList;



  vm.addTaskData = function () {
    console.log("this is the taskObject being sent to add:", vm.taskObject);
    $http.post('/task/addTask', vm.taskObject).then(function(serverResponse){
      console.log('added this task to db:', serverResponse);
      vm.taskObject = {"completed" : false};
      vm.getAllTasks();
    })
  };

  vm.getAllTasks = function() {
    $http.get('/task/allTasks').then(function(response){
      console.log('this is the server response from getAllTasks', response);
      vm.taskList = response.data;
      console.log('These are the tasks currently in db:', response.data);
    })
  };

  // 'item'and 'index' below are just paramaters, filled in with actual data from the dom in those placeholders.
  vm.deleteTask = function(item, index) {
    console.log("index", index);
    // this returns the selected index number in the array.
    var id = item.id;
    // we're using the 'item' paramater from above which is really our selected item object in our selected ng-repeat.
    console.log("this is the object id:", id);

    $http.delete('/task/delete/' + id).then(function(response){
      console.log('ajax delete call made');
      vm.getAllTasks();
    });
  }

  vm.finishedTask = function(item, $index) {
    var id = item.id;
    $http.put('/task/finishedTask/' + id).then(function(response){
      console.log('put call made');
      vm.getAllTasks();
      // this is reordering my list, I don't like it. But haha just saw that's one of the parts of pro mode. Accidental pro.

    });
  }

  // on start of page get all the tasks to display:
  vm.getAllTasks();
















  // end controller
}])
