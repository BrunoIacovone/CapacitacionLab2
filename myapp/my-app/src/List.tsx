import React, { useEffect, useState } from "react";
import axios from "axios";
import { List as MUIList, Typography, TextField, Button } from "@mui/material";
import Item from "./Item";

interface Item {
  id: number;
  text: string;
  done: boolean;
}

const List: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState<string>("");

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("There was an error fetching the items!", error);
    }
  };

  const addItem = async () => {
    if (newItemText.trim() === "") return;

    const newItem = { id: Date.now(), text: newItemText, done: false };
    try {
      const response = await axios.post("http://localhost:3001/api/items", newItem);
      setItems([...items, response.data]);
      setNewItemText("");
    } catch (error) {
      console.error("There was an error adding the item!", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleToggle = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
      <div>
        <Typography variant="h4">Item List</Typography>
        <TextField
            label="New Item"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={addItem}>
          Add Item
        </Button>
        <MUIList>
          {items.map(item => (
              <Item
                  key={item.id}
                  text={item.text}
                  done={item.done}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDelete(item.id)}
              />
          ))}
        </MUIList>
      </div>
  );
};

export default List;