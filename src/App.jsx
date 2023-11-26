import "./styles/App.css/";
import PersonLists from "./Components/PersonList";
import PersonForm from "./Components/PersonForm";
import Signup from "./Components/Signup";
import { useState, useEffect } from "react";
import { fetchData } from "./util/persistance";

const blankItem = { id: "", name: "", price: "", calories: "", currency: "" };

//add blankItem for a groceryList

function App() {
  const localUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(blankItem);
  const [user, setUser] = useState(localUser);

  //add GroceryItems and setGroceryItems to useState
  //add ItemToEdit and setItemToEdit to useState remember to add (blankItem)
  const APIURL = "http://localhost:3000";

  // editGroceries (Tobias)
  function editItem(item) {
    setItemToEdit(item);
  }

  function calculateTotalPrice() {
    const totalPrice = items.reduce(
      (total, item) => total + parseFloat(item.price),
      0
    );
    return totalPrice;
  }

  function calculateTotalCalories() {
    const totalCalories = items.reduce(
      (total, item) => total + parseFloat(item.calories),
      0
    );
    return totalCalories;
  }

  // mutateGroceries (Tobias)
  function mutateItem(item) {
    if (item.id != "") {
      //put
      updateItem(item);
    } else {
      //post
      createItem(item);
    }
  }

  // updateGroceries (Tobias)
  function updateItem(item) {
    console.log("update");
    fetchData(
      `${APIURL}/list/${item.id}`,
      (item) => {
        setItems(items.map((i) => (i.id === item.id ? { ...item } : i)));
      },
      "PUT",
      item
    );
  }

  function createItem(item) {
    console.log("create");
    fetchData(
      APIURL + "/list/",
      (item) => setItems([...items, item]),
      "POST",
      item
    );
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function getItems(callback) {
    fetchData(APIURL + `/list?user=${user.id}`, callback);
  }

  function deleteItemById(itemId) {
    // fjern via  API - JSON server
    fetchData(`${APIURL}/list/${itemId}`, () => {}, "DELETE");

    // fjern fra person array via usestate
    setItems([...items.filter((item) => item.id != itemId)]);
  }

  useEffect(() => {
    if (user) {
      getItems((data) => setItems(data));
    }
  }, [user]);

  return (
    <div>
      {user == null ? (
        <div>
          <h1>Login</h1>
          <Signup setUser={setUser} />
        </div>
      ) : (
        <div>
          <h1>ShoppingList</h1>
          <button id="logout" onClick={logout}>
            log out
          </button>
          <PersonLists
            items={items}
            deleteItemById={deleteItemById}
            editItem={editItem}
            totalPrice={calculateTotalPrice()}
            totalCalories={calculateTotalCalories()}
          />

          <PersonForm
            user={user}
            blankItem={blankItem}
            itemToEdit={itemToEdit}
            mutateItem={mutateItem}
          />
        </div>
      )}
    </div>
  );
}

export default App;
