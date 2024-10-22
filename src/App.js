import { useState } from "react";

// const initialItems = [
//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
      }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item )); // Video 83 Min 8ca
    }
    
    return (
        <div className="app">
            <Logo />
            
            <Form onAddItems={handleAddItems} /> {/* convention, das neue prop der handle funktionen mit "ON:::" zu benennen (identisch ist auch möglich) */}
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} /> {/* passing die Items in die PackingList, damit diese darauf zugreifen können prop={items-array}*/}
            <Stats />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 🧳</h1>;
}
function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);


//   const [items, setItems] = useState([]); da wir die Daten in einem sibling-component verwenden möchten, müssen wir diese Zeile zum nächstgelegenen gemeinsamen parent-component (hier: function App()) verschieben 
// function handleAddItems(item) {
//     setItems((items) => [...items, item]);
//   }



  function handleSubmit(e) {
    e.preventDefault();

    // damit kein leeres Item gesendet wird
    if(!description) return;

    const newItem= {description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    // nach Absenden des Formulars dieses wieder auf die default Wete setzen
    setDescription("");
    setQuantity(1);
  }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={ (e) => setQuantity(Number(e.target.value))}>
              {/* MERKEN! */}
              {Array.from({length: 20}, (_, i) => i +1).map((num) => (<option value={num} key={num}>{num}</option>))}
            </select>
            <input txpe="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <button>Add</button>
        </form>
    );
}

// Datenübermittlung mit props geht nicht, da Form und PackingList Siblings sind -> darum 
function PackingList({ items, onDeleteItem, onToggleItem }) {  // { items } immediatly destrucuring des Props-Objects // onDeleteItem wird hier zwar nicht verwendet, wird aber hier drüber "gepassed"
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />
                ))}
            </ul>
        </div>
    );
}

// {item} : destructured prop
function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>
                You have x items on your list, and you already packed X (x%)
            </em>
        </footer>
    );
}
