// All Views are controlled from here

//========== Global Variables ============
var value = '', array = [], index = 0, found = false, task = { id: '', value: '' }, taskId = '', elementNo = 0, isEdit = false;
//============== End ===============

// node's Constructor
function Node(element, next) {
    this.element = element;
    this.next = next;
}


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

setTimeout(function() {
    loadAllTasks();    
}, 1000);


// add/update task
function submit(e) {
    if (e.keyCode == 13) {
        task.value = e.target.value;
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
function editTask(e){
    console.log('edit', e.target.parentElement.id);
    e.target.classList.add('hidden');
    isEdit = true;
    document.getElementsByClassName('hidden')[0].classList.remove('hidden');
    var id = e.target.parentElement.id;
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
function deleteTask(e){
    console.log('delete', e.target.parentElement.id);
    found = false;
    var id = e.target.parentElement.id;
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
            alert('Linked List not exists \n create first..')
        }
    }
    else {
        alert('field must be fill..');
    }
}

//============== End ===============

// insert Before any node
function insertNodeBefore(){
    value = document.getElementById('element').value;
    var newElement = document.getElementById('newElement').value;
    if(value && newElement) {

        array = getArray();
        if (array.length) {
            array.forEach(function (node, idx) {
                if (value == node.element) {
                    index = idx;
                }
            });
            if (index !== -1) {
                array.splice(index, 0, new Node(newElement, array[index + 1]));
                setArray(array);
                arrayStatus(true, 'Linked List: ');
            }
        }
        else {
            alert('Linked List not exists \n create first..');
        }
    }
    else {
        alert('field must be fill..');
    }
}

// insertAfter
function insertAfter(){
    value = document.getElementById('element').value;
    if(value) {
        var newElement = document.getElementById('newElement').value;

        array = getArray();
        if (array.length) {
            array.forEach(function (node, idx) {
                if (value == node.element) {
                    index = idx;
                }
            });
            if (index !== -1) {
                array.splice(index + 1, 0, new Node(newElement, array[index + 1]));
                setArray(array);
                arrayStatus(true, 'Linked List: ');
            }
        }
        else {
            alert('Linked List not exists \n create first..');
        }
    }

    else {
        alert('field must be fill..');
    }
}

// addAtFirst
function addAtFirst(){
    value = document.getElementById('element').value;
    if(value) {
        array = getArray();
        if (!array.length) {
            alert('Linked List not exists \n create first..')
        }
        else {
            array.unshift(new Node(value, null));
            setArray(array);
            arrayStatus(true, 'Linked List :');
        }
    }
    else {
        alert('field must be fill..');
    }
}

// insert Element At Last index of Linked List
function addAtLast() {
    value = document.getElementById('element').value;
    if(value) {
        array = getArray();
        if (!array.length) {
            alert('Linked List not exists \n create first..')
        }
        else {
            array.push(new Node(value, null));
            setArray(array);
            arrayStatus(true, 'Linked List: ');
        }
    }
    else {
        alert('field must be fill..');
    }
}

//========== Helper Functions ==========

// set Linked List in Local Storage
function setArray(array){
    localStorage.setItem('list', JSON.stringify(array));
}

// get Linked List from local Storage
function getArray(){
    return JSON.parse(localStorage.getItem('list')) || [];
}

// generate task list
function generateTaskList(taskId, task) {
    createElements('LI', task, 'task-list');
    document.getElementsByTagName('li')[elementNo].setAttribute('id', taskId);
    elementNo++;        
    createElements('BUTTON', '^', taskId, 'move-up');
    createElements('BUTTON', 'v', taskId, 'move-down');
    createElements('BUTTON', 'x', taskId, 'delete');
    createElements('BUTTON', 'edit', taskId, 'edit');
    document.querySelectorAll('button').forEach(function(ele) {
       switch(ele.className){
           case 'move-up': {
            ele.addEventListener("click", asd);
            break;               
           }
           case 'move-down': {
            ele.addEventListener("click", asd);
            break;             
           }
           case 'delete': {
            ele.addEventListener("click", deleteTask);
            break;
           }
           case 'edit': {
            ele.addEventListener("click", editTask);
            break;               
           }
           default: {
               console.log('no class matched');
           }
       }     
    })
}

function asd(){
    console.log('asd clicked!');
}

function qwe(){
    console.log('qwe clicked!');
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