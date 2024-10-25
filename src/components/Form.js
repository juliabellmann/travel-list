import { useState } from "react";

export default function Form({onAddItems}) {
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