
function PersonLists({ items, deleteItemById, editItem }) {
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

                    {items.map((item) => (                      
                          <tr key={crypto.randomUUID()} >
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.calories}</td>
                            <td>
                                <button onClick={() => editItem(item)}>Edit</button>
                                <button onClick={() => deleteItemById(item.id)}>Delete</button>

                            </td>
                        </tr>
                    ))}
         

                </tbody>
            </table>
        </div>
    );
}

export default PersonLists;