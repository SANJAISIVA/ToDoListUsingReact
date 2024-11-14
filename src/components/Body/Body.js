// import './Body.css'
// import { useEffect, useRef, useState } from 'react';

// export default function Body() {
//     const [todoList, setTodoList] = useState([]);
//     const [todoItem, setToDoItem] = useState('');
//     const refer = useRef(null)
    
//     const [checkedArray, setCheckedArray] = useState([]);

//     useEffect(() => {
//         const savedList = JSON.parse(localStorage.getItem("todoList"));
//         const savedCheckedArray = JSON.parse(localStorage.getItem("checkedArray"));
//         if (savedList) {
//             setTodoList(savedList);
//         }
//         if (savedCheckedArray) {
//             setCheckedArray(savedCheckedArray);
//         }
//     }, []);

//     useEffect( () => {
//         if (todoList.length > 0) {
//             localStorage.setItem("todoList", JSON.stringify(todoList));
//         }    
//         localStorage.setItem("checkedArray", JSON.stringify(checkedArray));
//     }, [todoList,setTodoList,checkedArray])

//     function changeTextStyle(index) {
//         let list = Array.from(document.querySelectorAll("li"));
//         let tempCheckedArray = [...checkedArray]
//         list.forEach( (listItem, i) => {
//             let inputElement = listItem.querySelector("input[type='checkbox']")            
//             let pElement = listItem.querySelector("p");
            
//             if (inputElement.checked) {
//                 pElement.style.textDecoration = "line-through";
//                 listItem.style.backgroundColor = "lightGreen";
//                 tempCheckedArray[i] = true;
//             } else {
//                 pElement.style.textDecoration = "none";
//                 listItem.style.backgroundColor = "lightCoral";
//                 tempCheckedArray[i] = false;
//             }
//         } );
//         setCheckedArray(tempCheckedArray);
//     }
    
//     function deleteListItem(index) {
//         const tempList = [...todoList];
//         tempList.splice(index, 1);
//         setTodoList(tempList);

//         const tempCheckedList = [...checkedArray];
//         tempCheckedList.splice(index, 1);
//         setCheckedArray(tempCheckedList);
//     }

//     function editExistingListItem(index) {
//         let data = prompt("Edit the selected item", `${todoList[index]}`);        
//         const tempArray = todoList.map(
//             (item, i) => ( i === index ? data : item )
//         )
//         setTodoList(tempArray);
//     }

//     function addItemToList() {
//         if (todoItem.trim()) {
//             setTodoList([...todoList, todoItem]);
//             setCheckedArray([...checkedArray, false]);
//             setToDoItem('');
//             console.log(checkedArray);
//         }  
//         refer.current.focus();
//     }

//     return(
//         <div className="bodyContainer">
//             <input type="text" ref={refer} value={todoItem} onChange={(e) => setToDoItem(e.target.value) }></input>
//             <input type="button" value="+" className="addItem" onClick={() => { addItemToList(); }}></input>

//             <div className="itemsContainer">
//                 <ol>
//                     {
//                         todoList.map(
//                             (listItem, index) => (
//                                 <li key={index}>
//                                     <input type="checkbox" onChange={() => {changeTextStyle(index);} }/>
//                                     <p>{listItem}</p>
//                                     <div className="buttonContainer">
//                                         <input type="button" value="Edit" onClick={() => editExistingListItem(index)}/>
//                                         <input type="button" value="Delete" onClick={() => deleteListItem(index)}/>
//                                     </div>
//                                 </li>
//                             )
//                         )
//                     }
//                 </ol>
//             </div>
//         </div>
//     );
// }


import './Body.css';
import { useEffect, useRef, useState } from 'react';

export default function Body() {

    const [todoObject, setTodoObject] = useState(() => {
        const savedTodos = JSON.parse(localStorage.getItem("TodoObject"));
        return savedTodos || [];
    });

    const [todoToDoItemInput, setToDoItemInput] = useState('');
    const inputRefer = useRef(null); 

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('TodoObject')) || [];
        console.log("Retrieved from localStorage on load:", savedTodos);
        setTodoObject(savedTodos);
    }, []);
    
    useEffect(() => {
        console.log("Saving to localStorage:", todoObject);
        localStorage.setItem('TodoObject', JSON.stringify(todoObject));
    }, [todoObject]);
    

    function addItemToList() {
        console.log(todoToDoItemInput);
        if(todoToDoItemInput.trim()){
            let newObject = {
                id: todoObject.length + 1,
                job: todoToDoItemInput,
                checked: false
            };
            setTodoObject([...todoObject, newObject]);   
            setToDoItemInput(``);
        }

        inputRefer.current.focus();
    }

    function deleteItem(id) {
        setTodoObject(todoObject.filter(listItem => listItem.id !== id))
    }

    function editItem(id, checkValue) {
        let existingValue = todoObject.find(item => item.id === id)
        const newValue = prompt("Edit the item...", existingValue.job)
        
        let arr =todoObject.map(listItem => {
            if(listItem.id === id){
                let newObject = {
                    id: id,
                    job: newValue,
                    checked: checkValue
                }
                listItem = newObject;
            } 
            return listItem;
        })
        console.log(arr);
        setTodoObject(arr);
    }

    function handleCheck(id) {
        let arr = todoObject.map(
            (listItem,index) => {
                if(listItem.id === id)
                    listItem.checked = !listItem.checked;
                return listItem
            }
        );
        setTodoObject(arr);
    }


    return(
        <>
            <div className="bodyContainer">
                <input type="text" ref={inputRefer} value={todoToDoItemInput} onChange={ e => setToDoItemInput(e.target.value)}></input>
                <input type="button" value="+" className="addItem" onClick={addItemToList}></input>

                <div className="itemsContainer">
                    <ol>
                        {
                            todoObject.map(
                                (todoItem, index) => (
                                    <li key={todoItem.id} style={todoItem.checked ? {backgroundColor:"#6EC207"} : {backgroundColor:"lightCoral"}}>
                                        <input type="checkbox" checked={todoItem.checked ? true : false} onChange={() => handleCheck(todoItem.id)}/>
                                        <p
                                        style={todoItem.checked ? {textDecoration:"line-through"} : {textDecoration:"none"}}
                                        >{todoItem.job}</p>
                                        <div className="buttonContainer">
                                            <input type="button" value="Edit" className="ediItem" onClick={() => editItem(todoItem.id, todoItem.checked)}/>
                                            <input type="button" value="Delete" className="delItem" onClick={() => deleteItem(todoItem.id)}/>
                                        </div>
                                    </li>
                                )
                            )
                        }
                    </ol>
                </div>
            </div>
        </>
    );
}