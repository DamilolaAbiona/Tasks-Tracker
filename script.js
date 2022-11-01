const addTaskDiv = document.querySelector('.add-task');
const plusIcon = document.querySelector('.fa-plus');
const addCloseIcon = document.querySelector('.fa-times');
const taskFormDiv= document.querySelector('.task-form');
const taskForm = document.querySelector('form');
const taskEl = document.querySelector('.tasks');
const totalTask = document.querySelector('.total-task'),
valCal =document.querySelector('.cal')
valTsk = document.querySelector('.tsk')



const taskDate = document.getElementById('task-date')
const taskText = document.getElementById('task-text')
const addTaskBtn = document.getElementById('task-btn')
const clearBtn = document.querySelector('.clear');

// Handle Form Dissplay
const formDisplay = (e) => {
    if (e.target.classList.contains('fa-plus')){
        showForm();
    }
    if (e.target.classList.contains('fa-times')){
        hideForm()
        
    }
     if (taskDate.value === "" || taskText.value === ""){
        valCal.textContent ="Please pick a date and add a text !!!"
        valCal.style.display = "block"
        valCal.style.color = "red"

    }else {
        showTasks();
    }
    
}
// showForm
function showForm() {
taskFormDiv.style.top ="0";
     plusIcon.style.display = "none"
        addCloseIcon.style.display = "block"
         if (taskDate.value === "" || taskText.value === ""){
        valCal.textContent =""
        valCal.style.display = ""
        valCal.style.color = ""

    }else {
        showTasks();
    }
    
        
}
// function hideForm
function hideForm(){
    // Validation
    if (taskDate.value === "" || taskText.value === ""){
        valCal.textContent ="Please pick a date and add a text !!!"
        valCal.style.display = "block"
        valCal.style.color = "red"

    }else {
        showTasks();
    }
    
 taskFormDiv.style.top ="-700%";
        plusIcon.style.display = "block"
        addCloseIcon.style.display = "none"
        taskForm.reset()
        valCal.style.display = "none"
    

}
addTaskDiv.addEventListener("click", formDisplay)

// Get Tasks from the local storage
function getTasks() {
    let tasks = localStorage.getItem("tasks");
    if(tasks == null){
    tasksObj = [] 
    } else {
    tasksObj = JSON.parse(tasks)
    }
    
}
// Add task Button functionality
addTaskBtn.addEventListener('click', (e)=>{
    e.preventDefault();
//    get tasks
    getTasks();
    let myObj = {
        date:taskDate.value,
        text:taskText.value,
        completed:false
    }
    tasksObj.push(myObj);
    // save to the localstorage
localStorage.setItem("tasks", JSON.stringify(tasksObj))
// Show Tasks
showTasks();
//Hide form after adding tasks
hideForm();


});
// Show tasks on the page
function showTasks() {
    taskEl.innerHTML = "";
    getTasks();
      if (tasksObj.length == 0) {
    taskEl.innerHTML = "<p> No Task Added. Please Add all ask. </p>";
    taskEl.style.color = "black"
    taskEl.style.textAlign = " center"
    taskEl.style.padgingTop = "50px"
  }
 
  
   
    console.log(tasksObj);
    tasksObj.forEach(function(task,index){
        let taskItem = document.createElement("div")
        let taskContent = document.createElement("div")
        let taskIcon = document.createElement("div")
        taskItem.classList.add("task")
        taskContent.classList.add("task-content")
        taskIcon.classList.add("task-Icon")
        taskContent.innerHTML = ` 
        <p class="class-date">${task.date}</p>
             <span class="task-index">${index + 1}</span>
             <p class="task-text">${task.text}</p>
              <p class="hidden">${task.completed}</p>`;
             taskIcon.innerHTML =`
             <i class="fas fa-check" id="${index}" onclick="completeTask(this.id)"></i>
              <i class="fas fa-edit" id="${index}" onclick="editTask(this.id)" ></i>
               <i class="fas fa-trash-alt" id ="${index}" onclick=" deleteTask(this.id)"></i>
               
             `;
             taskItem.appendChild(taskContent)
             taskItem.appendChild(taskIcon)
             if (tasksObj.length != 0) {
        taskEl.appendChild(taskItem)
        console.log(taskItem.firstChild.children[3].innerText);
        const taskStatus = taskItem.firstChild.children[3].innerText;
        if (taskStatus == "true") {
            taskItem.classList.add("completed")
            
        }
        
        
    }
    });
    // Show total Tasks
    tasksObj.length > 1 
    ? (totalTask.innerHTML = `${tasksObj.length} Tasks`)
     :(totalTask.innerHTML = `${tasksObj.length} Task`)

} 

// Delete Task with Icon
 function deleteTask(index){
    deleteThisTask.trigger(confirmDelete)

    function confirmDelete() {
         getTasks();
        tasksObj.splice(index, 1)

    localStorage.setItem("tasks", JSON.stringify(tasksObj))
    showTasks();
        
    }
    // const confirmDel = confirm("Are you sure you want to delete this task?");
    // if(confirmDel){
    //     getTasks();
    //     tasksObj.splice(index, 1)

    // localStorage.setItem("tasks", JSON.stringify(tasksObj))
    // showTasks()
    // }
}
//Delete all tasks
 clearBtn.addEventListener("click", () =>{
    deleteAllTasks.trigger(deleteAll);

    function deleteAll(){
         localStorage.clear()
    showTasks();
    }
 })

// Clear All Tasks
// clearBtn.addEventListener("click", ()=>{
//      const confirmDel = confirm("Are you sure you want to delete all tasks?");
//     if(confirmDel){
//     localStorage.clear()
//     showTasks();
//     }


// });
// EditTasks
function editTask(index) {
    taskForm.reset();
    showForm()
    getTasks()
    taskDate.value = tasksObj[index].date;
    taskText.value = tasksObj[index].text
    taskText.focus();
    tasksObj.splice(index, 1)

    localStorage.setItem("tasks", JSON.stringify(tasksObj))
    showTasks();
}
// completed
function completeTask (index){
taskEl.addEventListener("click", (e)=>{
    if (e.target.classList.contains("fa-check")) {
        getTasks()
       console.log(tasksObj[index].text)
       console.log(tasksObj[index].completed)
       tasksObj[index].completed = true;
         localStorage.setItem("tasks", JSON.stringify(tasksObj))
    showTasks();
       
    }
})
}
showTasks();
    
         







