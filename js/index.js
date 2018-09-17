// All Views are controlled from here

//========== Global Variables ============
var value = '', array = [], index = 0, found = false, task = '', taskId = '', elementNo = 0;
// <li class="task">
var buttons = `<div class="tools">
<button class="delete" title="Delete">X</button>
<button class="move-up" title="Up">^</button>
<button class="move-down" title="Down">v</button>
</div><span class="task-name">`;
var editField = `</span>
<input type="text" class="task-name hidden"/>`;
//</li>
//============== End ===============

// node's Constructor
function Node(element, next) {
    this.element = element;
    this.next = next;
}


//========== Main Functions ==============

// create new array
function create(){
    var arraySize = parseInt(document.getElementById('arraySize').value);
    if(arraySize) {
        for(var i=0; i<arraySize; i++){
            array[i] = new Node(null, null);
        }
        for(var j=0; j<arraySize-1; j++){
            array[j].element = Math.round(Math.random() * 10);
            array[j].next = array[j+1];
        }
        array[arraySize-1].element = Math.round(Math.random() * 10);
        setArray(array);
        arrayStatus(true, 'Linked List created:');
    }
    else {
        alert('field must be fill..');
    }
}

// show Linked List status
function submit(e) {
    if (e.keyCode == 13) {
        task = e.target.value;
        taskId = 'task' + elementNo;
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
                ele.addEventListener("click", deleteElement);
                break;
               }
               case 'edit': {
                ele.addEventListener("click", qwe);
                break;               
               }
               default: {
                   console.log('no class matched');
               }
           }     
        })
        array.push(taskId);
        setArray(array);
        document.getElementById('new-task-name').value = '';
        
    }
     
}

function asd(){
    console.log('asd clicked!');
}

function qwe(){
    console.log('qwe clicked!');
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

// delete Element from Linked List
function deleteElement(e){
    console.log('delete', e.target.parentElement.id);
    found = false;
    value = e.target.parentElement.id;
    if(value) {
        array = getArray();
        if (array.length) {
            array.forEach(function (element, idx) {
                if (value == element) {
                    index = idx;
                    found = true;
                }
            });
            if (found) {
                array.splice(index, 1);
                setArray(array);
            }
        }
    }
    
}

// update Element in Linked List
function updateElement(){
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
                array.splice(index, 1, new Node(newElement, array[index + 1]));
                setArray(array);
                arrayStatus(true, 'Linked List: ');
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

//============== End ===============

//========== Helper Functions ==========

// set Linked List in Local Storage
function setArray(array){
    localStorage.setItem('list', JSON.stringify(array));
}

// get Linked List from local Storage
function getArray(){
    return JSON.parse(localStorage.getItem('list')) || [];
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