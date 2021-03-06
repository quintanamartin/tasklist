//UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listerners
loadEventListeners();

//Load all event listeners 
function loadEventListeners(){
   //DOM Load EVENT
   document.addEventListener('DOMContentLoaded', getTasks);
   //Add task event
   form.addEventListener('submit',addTask);
   //Remove task event
   taskList.addEventListener('click', removeTask);
   //Clear task event
   clearBtn.addEventListener('click', clearTasks);
   //Filter task event
   filter.addEventListener('keyup', filterTasks )
}
//Get tasks from localStorage
function getTasks(){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task){
      //Create li element
      const li = document.createElement('li');
      //Add class
      li.className = 'collection-item';
      //Create text node and append to LI
      li.appendChild(document.createTextNode(task)); 
      // Create new link element
      const link = document.createElement('a');
      //Add link class
      link.className = 'delete-item secondary-content';
      //Add icon HTML
      link.innerHTML = '<i class="fa fa-remove"></i>';
      //Append the link to li
      li.appendChild(link);
      //Append li to ul
      taskList.appendChild(li); 
   });
}

//ADD TASK
function addTask(e){
   if(taskInput.value === ''){
      alert('Add a task!');
   }
   //Create li element
   const li = document.createElement('li');
   //Add class
   li.className = 'collection-item';
   //Create text node and append to LI
   li.appendChild(document.createTextNode(taskInput.value)); //shows the value of the task
   // Create new link element
   const link = document.createElement('a');
   //Add link class
   link.className = 'delete-item secondary-content';
   //Add icon HTML
   link.innerHTML = '<i class="fa fa-remove"></i>';
   //Append the link to li
   li.appendChild(link);
   //Append li to ul
   taskList.appendChild(li);
   //Store in localStorage
   storeTaskInLocalStorage(taskInput.value);
   //Clear input
   taskInput.value = '';
   e.preventDefault();
}

//Store tasks
function storeTaskInLocalStorage(task){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}

//REMOVE TASK
function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
      if(confirm('Are you sure?')){
         e.target.parentElement.parentElement.remove(); // >> LI 
         //Remove from localStorage
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
   }
}

//Remove from localStorage
function removeTaskFromLocalStorage(taskItem){
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
         tasks.splice(index, 1);
      }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
//Clear tasks
function clearTasks(){
   // taskList.innerHTML = ''; --> OPTION A
   while(taskList.firstChild){ //First child of the task list
      taskList.removeChild(taskList.firstChild);
   } 
   //Clear from localStorage
   clearTasksFromLocalStorage();
}
//Clear tasks from localStorage
function clearTasksFromLocalStorage(){
   localStorage.clear();
}



//Filter tasks
function filterTasks(e){
   const text = e.target.value.toLowerCase();
   
   document.querySelectorAll('.collection-item').forEach(
      function(task){
         const item = task.firstChild.textContent;
         if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
         } else {
            task.style.display = 'none';
         }
      });
}