function PersonLists({
  items,
  deleteItemById,
  editItem,
  totalCalories,
  totalPrice,
  getTotalPriceWithCurrency,
}) {
  return (
    <div>
      <h1>List of itmes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Calories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price + " :" + item.currency}</td>
              <td>{item.calories}</td>
              <td>
                <button onClick={() => editItem(item)}>Edit</button>
                <button onClick={() => deleteItemById(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {/* Total row */}
          <tr>
            <td colSpan="2"></td>
            <td>Total price: {totalPrice}</td>
            <td>Total calories: {totalCalories}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PersonLists;
