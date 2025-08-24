// // امساك عناصر الاساسيه من صفحة html
const inputField = document.getElementById('todo-input');
const addButton = document.getElementById('add-task-button');
const taskList = document.getElementById('todo-list');

// // إنشاء رسالة فارغة
const emptyListMsg = document.createElement("p");
emptyListMsg.className = 'emptyListTask text-2xl text-blue-300 text-center font-bold';
emptyListMsg.textContent = 'No Task Created';
// taskList.appendChild(emptyListMsg);

// دالة التحقق من قائمة التاسكات فاضيه ولا لا
let updateEmptyMessage = () => {
    // لو كانت فاضيه تضيف رسالة لم يتم انشاء تسكات
    if (taskList.children.length === 0) {
        taskList.appendChild(emptyListMsg);
    // لو فيها تاسكات تمسح الرساله
    } else {
        if (taskList.contains(emptyListMsg)) {
            taskList.removeChild(emptyListMsg);
        }
    }
};


// استرجاع التاسكات القديمة أو مصفوفة جديدة
let tasks = JSON.parse(localStorage.getItem('saveTaskLS')) || [] ;
console.log(localStorage.getItem('saveTaskLS'))

// تحديث localStorage
function saveTasks() {
    localStorage.setItem('saveTaskLS', JSON.stringify(tasks));
}


// الداله الخاصه بانشاء تاسك
 let createTask = () => {
    const taskText = inputField.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.className = 'flex items-center justify-between bg-blue-100 p-2 rounded shadow-md';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'rose bg-red-200 text-red-700 hover:text-red-100 hover:bg-red-500 py-1 px-3 rounded-lg shadow-lg';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', () => {
            taskList.removeChild(listItem);
            updateEmptyMessage();
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        // أضف التاسك للمصفوفة واحفظ
        tasks.push(taskText);
        saveTasks();
        
        console.log(tasks.push(taskText))

        inputField.value = '';
        updateEmptyMessage();
    }
};

addButton.addEventListener('click', createTask);

// تحميل التاسكات من localStorage عند بداية الصفحة
tasks.forEach(taskText => {
    const listItem = document.createElement('li');
    listItem.className = 'flex items-center justify-between bg-blue-100 p-2 rounded shadow-md';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'rose bg-red-200 text-red-700 hover:text-red-100 hover:bg-red-500 py-1 px-3 rounded-lg shadow-lg';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', () => {
        taskList.removeChild(listItem);
        tasks = tasks.filter(t => t !== taskText);
        saveTasks();
        updateEmptyMessage();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
});
    console.log(tasks)