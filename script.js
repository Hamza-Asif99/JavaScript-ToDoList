//selections
var table= document.getElementsByTagName("table")[0]
var completeTable= document.getElementsByTagName("table")[1]
var todo = document.getElementById("quest")
var todoList = document.querySelector(".pendingTable")
var completedTable = document.querySelector(".completedTable")

//event listeners
todoList.addEventListener("click",deleteCheckQuest)
//functions

if(localStorage.getItem("todo") !== null){
    var data = JSON.parse(localStorage.getItem("todo"))
    var objLength = Object.keys(data).length;

     for(let i =0;i<objLength;i++){

        var newtr = document.createElement("tr")
        var questNumTD = document.createElement("td")
        questNumTD.innerText = data[i].questNum

        var questTD = document.createElement("td")
        questTD.innerHTML = data[i].quest
        console.log(data[i].quest)

        var delButton = document.createElement("button")
        var delTD = document.createElement("td")
        delTD.append(delButton)
        delButton.innerText = "Delete"
        delButton.classList.add("delButt")
        console.log(delButton.getAttribute("class"))
        newtr.append(delTD)

        var checkButton = document.createElement("button")
        var checkTD = document.createElement("td")
        checkTD.append(checkButton)
        checkButton.innerText = "Completed"
        checkButton.classList.add("checkButt")


        newtr.append(questNumTD)
        newtr.append(questTD)
        newtr.append(delTD)
        newtr.append(checkTD)
        table.append(newtr)
    }
}

if(localStorage.getItem("done") !== null){
    var data = JSON.parse(localStorage.getItem("done"))
    var objLength = Object.keys(data).length;

    for(let i =0;i<objLength;i++){

        var newtr = document.createElement("tr")
        var questNumTD = document.createElement("td")
        questNumTD.innerText = data[i].completeNum

        var questTD = document.createElement("td")
        questTD.innerHTML = data[i].completeQuest

        newtr.append(questNumTD)
        newtr.append(questTD)
       
        completeTable.append(newtr)
    }
}


function addQuest(){

    var questNumber = document.createElement("td")
    questNumber.innerText = todoList.children.length
    
    var newQuest = document.createElement("tr")
    var questData = document.createElement("td")
    questData.innerText = todo.value

    newQuest.append(questNumber)
    newQuest.append(questData)
    table.append(newQuest)

    var delButton = document.createElement("button")
    var delTD = document.createElement("td")
    delTD.append(delButton)
    delButton.innerText = "Delete"
    delButton.classList.add("delButt")
    console.log(delButton.getAttribute("class"))
    newQuest.append(delTD)

    var checkButton = document.createElement("button")
    var checkTD = document.createElement("td")
    checkTD.append(checkButton)
    checkButton.innerText = "Completed"
    checkButton.classList.add("checkButt")

    newQuest.append(checkTD)

    todo.value = ""
    if(localStorage.getItem("todo") == null){
        storeTodo = [
           
        ]
    }
    else{
        storeTodo = JSON.parse(localStorage.getItem("todo"))
        
    }
    storeTodo.push({questNum: questNumber.innerText, quest:questData.innerText})
    localStorage.setItem("todo",JSON.stringify(storeTodo))
    
}

function deleteCheckQuest(event){
    var allRows = document.querySelectorAll(".pendingTable tr")
    console.log(allRows[1].children[0])
    const item = event.target
    if(item.classList[0] === "delButt"){
        item.parentElement.parentElement.remove()
        for(let i = 1;i < allRows.length;i++){
            allRows[i].children[0].innerText = i-1;
        }

        var data = JSON.parse(localStorage.getItem("todo"))
        for(let i = 0;i<data.length;i++){
            if(item.parentElement.parentElement.children[1].innerText == data[i].quest){
                data.splice(i,1)
                console.log(data.length)
                if(data.length == 0){
                    localStorage.removeItem("todo")
                }
                else{

                    localStorage.setItem("todo",JSON.stringify(data))
                }
            }

        }

    }

    if(item.classList[0] === "checkButt"){
        var copyRow = document.createElement("tr")
        completedTable.append(copyRow)
        var completeCount = document.createElement("td")
        completeCount.innerText = document.querySelectorAll(".completedTable tr").length - 1
        copyRow.append(completeCount)
        var row = item.parentElement.parentElement
        
        var completedQuest = document.createElement("td")
        
        completedQuest = row.children[1].innerText
        copyRow.append(completedQuest)
        console.log(row.children[1].innerText)

        row.remove()
        
        for(let i = 1;i < allRows.length;i++){
            allRows[i].children[0].innerText = i-1;
        }

        var data = JSON.parse(localStorage.getItem("todo"))

        for(let i = 0;i<data.length;i++){
            if(item.parentElement.parentElement.children[1].innerText == data[i].quest){
                data.splice(i,1)
                console.log(data.length)
                if(data.length == 0){
                    localStorage.removeItem("todo")
                }
                else{

                    localStorage.setItem("todo",JSON.stringify(data))
                }
            }

        }
        if(localStorage.getItem("done") == null){
            done = [
                
            ]
        }
        else{
            done = JSON.parse(localStorage.getItem("done"))
            
        }
        done.push({completeNum: completeCount.innerText , completeQuest: row.children[1].innerText})
        localStorage.setItem("done",JSON.stringify(done))



    }


}
function clearTable()
{
    var rows = document.querySelectorAll(".completedTable tr")
    for(let i = 1;i<rows.length;i++){
        rows[i].remove()
    }
    localStorage.removeItem("done")
}