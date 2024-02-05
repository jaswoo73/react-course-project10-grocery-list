import { useState } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./items";
import { ToastContainer, toast } from "react-toastify";

const setLocalStorage = (items) => {
  localStorage.setItem("list", JSON.stringify(items));
};

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return JSON.parse(list);
};

const App = () => {
  const [items, setItems] = useState(getLocalStorage() || []);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success("item added to the list");
  };

  const removeItem = (itemId) => {
    const { name } = items.find((item) => item.id === itemId);
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);

    toast.success(`item "${name}" removed from the list`);
  };

  const editItem = (itemId) => {
    const { completed, name } = items.find((item) => item.id === itemId);
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
    completed
      ? toast.warning(`item "${name}" unchecked`)
      : toast.success(`item "${name}" checked`);
  };

  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
      <ToastContainer position="top-center" />
    </section>
  );
};

export default App;
