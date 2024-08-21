import React, { useEffect, useState } from "react";
import axios from "axios";
import { List as MUIList, Typography, TextField, Button } from "@mui/material";
import Item from "../item/Item";
import './List.css';

interface Item {
  id: number;
  text: string;
  isRead: boolean;
}

const List: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemText, setNewItemText] = useState<string>("");

  const getItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/items");
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error fetching the items!", error);
    }
  };

  const addItem = async () => {
    if (newItemText.trim() === "") return;

    const newItem = { id: Date.now(), text: newItemText, isRead: false };
    try {
      const response = await axios.post("http://localhost:3001/api/items", newItem);
      setItems([...items, response.data]);
      setNewItemText("");
    } catch (error) {
      console.error("There was an error adding the item!", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("There was an error deleting the item!", error);
    }
  };

  const handleToggle = async (id: number) => {
    const item = items.find(item => item.id === id);
    if (!item) return;

    const updatedItem = { ...item, isRead: !item.isRead };
    try {
      await axios.put(`http://localhost:3001/api/items/toggle/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? updatedItem : item));
    } catch (error) {
      console.error("There was an error updating the item!", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
      <div className="list-container">
        <Typography variant="h4" className="list-header">Item List</Typography>
        <div className="list-input">
          <TextField
              label="New Item"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={addItem}>
            Add Item
          </Button>
        </div>
        <MUIList className="list-items">
          {items.map(item => (
              <Item
                  key={item.id}
                  text={item.text}
                  isRead={item.isRead}
                  onToggle={() => handleToggle(item.id)}
                  onDelete={() => handleDelete(item.id)}
              />
          ))}
        </MUIList>
      </div>
  );
};

export default List;