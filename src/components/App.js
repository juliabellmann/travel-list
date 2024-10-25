import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import  Stats from "./Stats";

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

    function handleClearList() {
        const confirmed = window.confirm("Are you sure you want to delete all items?");
        if(confirmed) setItems([]);
    }
    
    return (
        <div className="app">
            <Logo />
            
            <Form onAddItems={handleAddItems} /> {/* convention, das neue prop der handle funktionen mit "ON:::" zu benennen (identisch ist auch möglich) */}
            <PackingList 
                items={items} 
                onDeleteItem={handleDeleteItem} 
                onToggleItem={handleToggleItem} 
                onClearList={handleClearList}
            /> {/* passing die Items in die PackingList, damit diese darauf zugreifen können prop={items-array}*/}
            <Stats items={items}/>
        </div>
    );
}