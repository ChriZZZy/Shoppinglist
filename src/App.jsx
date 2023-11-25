
import './styles/App.css/'
import PersonLists from './Components/PersonList'
import PersonForm from './Components/PersonForm'
import { useState,useEffect } from 'react';
import { fetchData } from './util/persistance';

const blankItem = { "id": "", "name": "","price": "","calories": "", "currency": "" };

//add blankItem for a groceryList

function App() {
const[items, setItems] = useState([]);
const[itemToEdit, setItemToEdit] = useState(blankItem);

//add GroveryItems and setGroceryItems to useState
//add ItemToEdit and setItemToEdit to useState remember to add (blankItem)
const APIURL = "http://localhost:3000/api";

// editGroceries (Tobias)
function editItem(item)
{ 
  setItemToEdit(item);
}

// mutateGroceries (Tobias)
function mutateItem(item){
 if (item.id != ""){
  //put
  updateItem(item)
  } else {
  //post
  createItem(item)
  }
 }

 
// updateGroceries (Tobias)
function updateItem(item){
  console.log("update");
 fetchData(`${APIURL}/${item.id}`,
 item => {
  setItems(
    items.map((i => i.id === item.id ? {...item} : i))
  );
 },
 "PUT",
 item
 );
    }

function createItem(item){
  console.log("create")
  fetchData(APIURL, (item)=>setitems([...items,  item]), 
    'POST', 
    item);
}



  function getItems(callback){
   fetchData(APIURL, callback)
  }

  function deleteItemById(itemId){
    // fjern via  API - JSON server
    fetchData(`${APIURL}/${itemId}`, ()=>{}, "DELETE");

    // fjern fra person array via usestate 
    setItems ([...items.filter((item) => item.id != itemId)])
 }

  useEffect(() => {
     getItems((data) => setItems(data) );
  }, []);

  return (
  <div>
    <h1>ShoppingList</h1>
    <PersonLists 
    items ={items} 
    deleteItemById={deleteItemById}
    editItem={editItem}
    />

    <PersonForm 
    blankItem={blankItem}
    itemToEdit={itemToEdit}
    mutateItem={mutateItem}
  />
  </div>
  )
}

export default App
