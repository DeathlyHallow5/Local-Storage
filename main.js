let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessege();
}

addButton.addEventListener('click', function(){
    let newTodo = {
        todo: addMessage.value,
        checked:false,
        important: false
    };

    todoList.push(newTodo);
    displayMessege();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessege(){
    let displayMessege = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, i){
        displayMessege += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessege;
    });
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    todoList.forEach(function(item){
        if (item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.shiftKey || event.metaKey){
                todoList.splice(i, 1);
            }else{
                item.important = !item.important;
            }
            displayMessege();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});