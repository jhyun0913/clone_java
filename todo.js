const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
//[]배열 {}객체



function deleteToDo(event){
    const btn = event.target
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //forEach처럼 toDos에 들어있는거 한번씩 필터 거쳐서 배열로만듬
    const cleanToDos = toDos.filter(function(toDo){
        console.log(toDo.id, li.id);
        return toDo.id!==parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}


function patintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;
    delBtn.innerText="🔥";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id =newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    patintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedTodDos =JSON.parse(loadedToDos);
        parsedTodDos.forEach(function(todo){
            patintToDo(todo.text);
        });
    }else{

    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();