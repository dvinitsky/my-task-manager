var selectedList,
  listCount = 0,
  //array of list objects
  listsArray = [];


//map enter key to click submit button
document.getElementById("input").addEventListener("keydown", function (event) {
  'use strict';
  if (event.keyCode === 13) {
    document.getElementById("addbutton").click();
  }
});

//refreshes the task selector by populating the dropdown with the selected list's options array


//takes in the ID of a selector element and the option object we want to add to it. Adds it.
function addToSelector(selectorID, newOption) {
  'use strict';
  document.getElementById(selectorID).add(newOption);
}

//takes in the text for a new option, then creates and returns the new option
function createOption(name) {
  'use strict';
  var newOption = document.createElement("option");
  newOption.text = name;
  return newOption;
}

function refreshTaskSelector() {
  'use strict';
  var selectorOptions = document.getElementById("dropdown").options,
    j = 0;

  while (selectorOptions.length > 0) {
    selectorOptions[0].remove();
  }

  while (j < selectedList.options.length) {
    selectorOptions[j] = selectedList.options[j];
    j += 1;
  }
}

//displays currently selector list, and calls refreshTaskSelecotr
function displayTaskList() {
  'use strict';
  var i = 0,
    string = "",
    selectorObject = document.getElementById("listselector"),
    mySelectedIndex = selectorObject.selectedIndex;

  selectedList = listsArray[mySelectedIndex];

  while (i < selectedList.taskDivElements.length) {
    document.getElementById("divcontainer").appendChild(selectedList.taskDivElements[0]);
    i += 1;
  }

  document.getElementById("taskname").innerHTML = selectedList.listName;

  refreshTaskSelector();
}


//adds text in input box to selected list as a new task. Also invokes createOption and addToSelector to add the task to this list's options array.
function addTask() {
  'use strict';
  var newTaskText = document.getElementById("input").value,
    checkIfBlank = newTaskText.replace(/\s/g, ''),
    newOption,
    newCheckboxElement,
    newTaskDivElement,
    newDiv,
    newPar,
    newParElement;

  if (checkIfBlank !== "") {
    selectedList.tasks.push(newTaskText);
    selectedList.options.push(createOption(newTaskText));

    newPar = document.createElement("P");
    newParElement = document.getElementById("divcontainer").appendChild(newPar);

    newCheckboxElement = document.createElement("INPUT");
    newCheckboxElement.type = "checkbox";

    newDiv = document.createElement("DIV");
    newTaskDivElement = document.getElementById("divcontainer").appendChild(newDiv);

    newTaskDivElement.appendChild(newParElement);
    newTaskDivElement.appendChild(newCheckboxElement);

    selectedList.taskDivElements.push(newTaskDivElement);

    displayTaskList();
  }

  document.getElementById("input").value = "";
}

//removes the selected item from the task selector and from the list's options array.
function removeTask() {
  'use strict';
  var selector = document.getElementById("dropdown"),
    mySelectedIndex = selector.selectedIndex;

  selectedList.options.splice(mySelectedIndex, 1);
  selectedList.tasks.splice(mySelectedIndex, 1);
  displayTaskList();
}

//creates new list object with a name, task array, task index, and options array. Also show all relevant DOM elements if this is the first list being created. 
function TaskList(name) {
  'use strict';
  this.listName = name;
  this.tasks = [];
  this.taskIndex = listCount;
  //an array holding the Option objects for this list's tasks
  this.options = [];
  this.completed = [];
  this.taskDivElements = [];

  listCount += 1;
}

//creates a new list with passed in name, creates option and adds it to list selector.
function createNewTaskList(newList) {
  'use strict';
  var newOption;

  listsArray.push(newList);

  newOption = createOption(newList.listName);
  addToSelector("listselector", newOption);
  document.getElementById("listselector").selectedIndex = newList.taskIndex;
  displayTaskList();
}

//this is triggered when the use presses "Create new task list". Prompts for the user to input list name.
function newListTrigger() {
  'use strict';
  var newList = new TaskList(window.prompt("Enter New Task List Name:"));
  createNewTaskList(newList);
}

function deleteTaskList() {
  'use strict';
  var currentListindex = selectedList.taskIndex;

  if (currentListindex !== 0) {
    listsArray.splice(currentListindex, 1);
    document.getElementById("listselector").selectedIndex = 0;
    displayTaskList();
  }
}

//default task list at the start
var defaultList = createNewTaskList(new TaskList("My List"));
