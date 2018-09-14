// All Views are controlled from here

//========== Global Variables ============
var value = '', array = [], index = 0, found = false;
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
    if(e.keyCode == 13){
            createElements('LI', buttons + e.target.value + editField, 'task-list');
    }
     
}

function asd(e){
    console.log('e', e);
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
function deleteElement(){
    found = false;
    value = document.getElementById('element').value;
    if(value) {
        array = getArray();
        if (array.length) {
            array.forEach(function (node, idx) {
                if (value == node.element) {
                    index = idx;
                    found = true;
                }
            });
            if (found) {
                array.splice(index, 1);
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
function createElements(elementName, innerText, parentId){
    console.log('elementName: ', elementName);
    console.log('innerText: ', innerText);
    console.log('parentId: ', parentId);
    var node = document.createElement(elementName);
    // node.className = 'task';
    var textNode = document.createTextNode('asd');
    node.appendChild(textNode);
    document.getElementById(parentId).appendChild(node);
}

//============== End ===============