
import './styles/App.css/'
import PersonLists from './Components/PersonList'
import PersonForm from './Components/PersonForm'
import { useState,useEffect } from 'react';
import { fetchData } from './util/persistance';

const blankperson = { "id": "", "age": "","name": "","email": "","gender": "" };

//add blankItem for a groceryList

function App() {
const[persons, setPersons] = useState([]);
const[personToEdit, setPersonToEdit] = useState(blankperson);

//add GroveryItems and setGroceryItems to useState
//add ItemToEdit and setItemToEdit to useState remember to add (blankItem)
const APIURL = "http://localhost:3000/api";

// editGroceries (Tobias)
function editPerson(person)
{ 
  setPersonToEdit(person);
}

// mutateGroceries (Tobias)
function mutatePerson(person){
 if (person.id != ""){
  //put
  updatePerson(person)
  } else {
  //post
  createPerson(person)
  }
 }

 
// updateGroceries (Tobias)
function updatePerson(person){
  console.log("update");
  fetchData(`${APIURL}/${person.id}`, 
    setPersons(persons.map(p => p.id === person.id ? person : p)),
    'POST', 
    person);
}

function createPerson(person){
  console.log("create")
  fetchData(APIURL, (person)=>setPersons([...persons,  person]), 
    'POST', 
    person);
}



  function getPersons(callback){
   fetchData(APIURL, callback)
  }

  function deletePersonById(personId){
    // fjern via  API - JSON server
    fetchData(`${APIURL}/${personId}`, ()=>{}, "DELETE");

    // fjern fra person array via usestate 
    setPersons ([...persons.filter((person) => person.id != personId)])
 }

  useEffect(() => {
     getPersons((data) => setPersons(data) );
  }, []);

  return (
  <div>
    <h1>Person DB</h1>
    <PersonLists 
    persons ={persons} 
    deletePersonById={deletePersonById}
    editPerson={editPerson}
    />

    <PersonForm 
    blankPerson={blankperson}
    personToEdit={personToEdit}
    mutatePerson={mutatePerson}
  />
  </div>
  )
}

export default App
