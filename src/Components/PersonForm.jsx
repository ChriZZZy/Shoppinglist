import { useState, useEffect } from "react";
function PersonForm({blankPerson, personToEdit, mutatePerson}) {
    const [person, setPerson] = useState({...personToEdit}) 

    useEffect(() => {
        setPerson(personToEdit)
    }, [personToEdit]);

function handleChange(e){
    const value = e.target.value;
    const name = e.target.id;
    setPerson({...person, [name]: value});
}


function handleSubmit(e){
    e.preventDefault();
    // callback function
    mutatePerson(person);

}


 return ( 
        <div>
            <h1>add/edit person</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="id">Id</label>
    <input id="id" type="number" readOnly placeholder="id" value={person.id} onChange={handleChange}/>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" placeholder="name" value={person.name} onChange={handleChange} />
    <label htmlFor="age">Age</label>
    <input id="age" type="number" min="1" max="120" placeholder="age" value={person.age} onChange={handleChange} />
    <label htmlFor="email">Email</label>
    <input id="email" type="email" placeholder="email" value={person.email} onChange={handleChange} />
    <label htmlFor="gender">Gender</label>
    <select id="gender" value={person.gender} onChange={handleChange}>
        <option defaultChecked>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    </select>

    <button> update </button>
    <button onClick={() => setPerson(blankPerson)}> reset </button>
    </form>
        </div>
     );
}


export default PersonForm;