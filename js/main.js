// находим элементы
const form = document.querySelector('#form');
const taskInput =document.querySelector('#taskInput');
const tasksList=document.querySelector('#tasksList');
const emptyList=document.querySelector('#emptyList');

//отслеживаем нажатие
form.addEventListener('submit', addTask);

//удаление задач (слушаем клик по всему списку)

tasksList.addEventListener('click', deleteTask)

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

//проверим хранится ли что-то в localStorage
if(localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

//функции
function addTask(event) {
    // отмена перезагрузки страницы
 event.preventDefault() ; // отменяет стандартное поведение. то есть отменяем отправку формы

 //достаем текст задачи из поля ввода
 const taskText = taskInput.value; //то значение в поле,которое мы ввели

//добавление написанную задачу ( нужно отобразить в html разметки)
const taskHtml = `<li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`

// добавляем  HTML-код в определенное место внутри элемента DOM  без перезагрузки всей страницы с помощью insertAdjacentHTML
tasksList.insertAdjacentHTML('beforeend', taskHtml) //принимаем два значение, первое куда хотим поставить( в начало, в конец и тд),а  второе кусок кода

// очищаем поле вводаи возвращаем на него фокус
taskInput.value = " ";

//переместим на него фокус

taskInput.focus()

//скрываем "Список дел пуст" при появлении задачи

// проверим есть ли задачи
if (tasksList.children.length > 1) {
    emptyList.classList.add('none')
}

saveHTMLtoLS()
}


function deleteTask(event) {

     
    //проверяем, что клик был по кнопке удалить задачу
    if ( event.target.dataset.action ==='delete'){
// console.log('delete ')
        //найдем среди их родителей тег li чтобы удалить потом
    const parenNode = event.target.closest('.list-group-item'); // closest ищет среди родителей
    // console.log(parenNode);
    parenNode.remove()

    //как только удалили все задачи нужно вернуть обратно "список дел пуст"
        if (tasksList.children.length == 1) {
            emptyList.classList.remove('none')
        }
}
saveHTMLtoLS() 
    }

function doneTask (event) {
    // проверяем что клик был по кнопке "задача выполнена"
    if (event.target.dataset.action === "done") {
        const parentNode =event.target.closest('.list-group-item');
        const taskTitle=parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');

    }

    saveHTMLtoLS()
}



//сохранение разметки в localStorage

function saveHTMLtoLS() {
    localStorage.setItem('tasksHTML', tasksList.innerHTML);

}