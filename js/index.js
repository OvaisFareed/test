// All Views are controlled from here

//========== Global Variables ============
var value = '', array = [], index = 0, found = false, task = { id: '', value: '' }, taskId = '', elementNo = 0, isEdit = false;

// load tasks after 1 second, so that html loaded before it 
setTimeout(function() {
    loadAllTasks();    
}, 1000);
//============== End ===============

//========== Main Functions ==============

// load all tasks
function loadAllTasks() {
    document.getElementById('new-task-name').value = '';    
    array = getArray();
    elementNo = 0;
    if (array.length) {
        document.getElementById('task-list').innerHTML = ``;        
        array.forEach(function (savedTask) {
            generateTaskList(savedTask.id, savedTask.value);
        });
    }
    else {
        document.getElementById('task-list').innerHTML = ``;
    }
}

// add/update task
function submit(event) {
    if (event.keyCode == 13) {
        task.value = event.target.value;
        if(task.value){
            if(isEdit){
                updateTask();
            }
            else{
                addTask();
            }

        }
        else {
            alert('field must be fill..');
        }
    }   
}

// add task in the list
function addTask(){
    task.id = 'task' + elementNo;
    generateTaskList(task.id, task.value);
    array.push(task);
    setArray(array);
    document.getElementById('new-task-name').value = '';
    task = {};
}

// edit task in the list
function editTask(event){
    event.target.classList.add('hidden');
    isEdit = true;
    document.getElementsByClassName('hidden')[0].classList.remove('hidden');
    var id = event.target.parentElement.id;
    if(id) {
        array = getArray();
        if (array.length) {
            array.forEach(function (savedTask, idx) {
                if (id == savedTask.id) {
                    task = savedTask;
                }
            });
            document.getElementById('new-task-name').value = task.value;
        }
    }
}


// delete Task from List
function deleteTask(event){
    found = false;
    var id = event.target.parentElement.id;
    if(id) {
        array = getArray();
        if (array.length) {
            index = 0;
            array.forEach(function (task, idx) {
                if (id == task.id) {
                    index = idx;
                    found = true;
                }
            });
            if (found) {
                array.splice(index, 1);
                setArray(array);
                loadAllTasks();
            }
        }
    }
}

// update Task in List
function updateTask(){
    task.value = document.getElementById('new-task-name').value;
    if(task.value) {
        array = getArray();
        if (array.length) {
            array.forEach(function (item, idx) {
                if (item.id == task.id) {
                    index = idx;
                }
            });
            if (index !== -1) {
                array.splice(index, 1, task);
                document.getElementById(task.id).classList.remove('hidden');
                isEdit = false;    
                setArray(array);
                loadAllTasks();
            }
        }
        else {
            alert('Task List not exists \n create first..')
        }
    }
    else {
        alert('field must be fill..');
    }
}

// move task upward
function moveUp(event){
    task = {};
    var id = event.target.parentElement.id;
    if(id) {
        array = getArray();
        if (array.length) {
            index = 0;
            array.forEach(function (savedTask, idx) {
                if (id == savedTask.id) {
                    index = idx;
                    task = savedTask;
                }
            });
            if (task) {
                if (index - 1 >= 0) {
                    var temp = array[index - 1];
                    array[index - 1] = task;
                    array[index] = temp;
                    setArray(array);
                    loadAllTasks();
                }
            }
        }
    }
    
}

// move task downward
function moveDown(event){   
    task = {};
    var id = event.target.parentElement.id;
    if(id) {
        array = getArray();
        if (array.length) {
            index = 0;
            array.forEach(function (savedTask, idx) {
                if (id == savedTask.id) {
                    index = idx;
                    task = savedTask;
                }
            });
            if (task) {
                if(index + 1 < array.length){

                    var temp = array[index + 1];
                    array[index  + 1] = task;
                    array[index] = temp;
                    setArray(array);
                    loadAllTasks();
                }
            }
        }
    }
}

//============== End ===============

//========== Helper Functions ==========

// set Task List in Local Storage
function setArray(array){
    localStorage.setItem('list', JSON.stringify(array));
}

// get Task List from local Storage
function getArray(){
    return JSON.parse(localStorage.getItem('list')) || [];
}

// generate task list
function generateTaskList(taskId, task) {
    createElements('LI', '', 'task-list');
    document.getElementsByTagName('li')[elementNo].setAttribute('id', taskId);
    elementNo++;        
    createElements('SPAN', task, taskId, 'task');
    createElements('BUTTON', '^', taskId, 'move-up');
    createElements('BUTTON', 'v', taskId, 'move-down');
    createElements('BUTTON', 'x', taskId, 'delete');
    createElements('BUTTON', 'edit', taskId, 'edit');
    document.querySelectorAll('button').forEach(function(element) {
       switch(element.className){
           case 'move-up': {
            element.addEventListener("click", moveUp);
            break;               
           }
           case 'move-down': {
            element.addEventListener("click", moveDown);
            break;             
           }
           case 'delete': {
            element.addEventListener("click", deleteTask);
            break;
           }
           case 'edit': {
            element.addEventListener("click", editTask);
            break;               
           }
           default: {
               console.log('no class matched');
           }
       }     
    })
}

// create Elements in DOM
function createElements(elementName, innerText, parentId, className){
    var node = document.createElement(elementName);
    node.classList.add(className);
    var textNode = document.createTextNode(innerText);
    node.appendChild(textNode);
    document.getElementById(parentId).appendChild(node);
}

//============== End ===============