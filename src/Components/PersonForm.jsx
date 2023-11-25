import { useState, useEffect } from "react";


function PersonForm({blankItem, itemToEdit, mutateItem}) {
    const [item, setItem] = useState({...itemToEdit}) 

    useEffect(() => {
        setItem(itemToEdit)
    }, [itemToEdit]);

function handleChange(e){
    const value = e.target.value;
    const name = e.target.id;
    setItem({...item, [name]: value});
}


function handleSubmit(e){
    e.preventDefault();
    // callback function
    mutateItem(item);

}


 return ( 
        <div>
            <h1>add/edit Items</h1>
    <form onSubmit={handleSubmit}>
    <label htmlFor="id">Id</label>
    <input id="id" type="number" readOnly placeholder="id" value={item.id} onChange={handleChange}/>
    <label htmlFor="name">Name</label>
    <input id="name" type="text" placeholder="name" value={item.name} onChange={handleChange} />
    <label htmlFor="price">price</label>
    <input id="price" type="number" min="1" max="9000" placeholder="price" value={item.price} onChange={handleChange} />
    <label htmlFor="calories">calories</label>
    <input id="calories" type="number" min="1" max="9000"  placeholder="calories" value={item.calories} onChange={handleChange} />
    <label htmlFor="currency">Currency</label>
    <select id="currency" value={item.currency} onChange={handleChange}>
        <option defaultChecked>Select Currency</option>
        <option value="DKK">DKK</option>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
    </select>

    <button> update </button>
    <button onClick={() => setItem(blankItem)}> reset </button>
    </form>
        </div>
     );
}


export default PersonForm;