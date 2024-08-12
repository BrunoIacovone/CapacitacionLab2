import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ItemProps {
  text: string;
  done: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const Item: React.FC<ItemProps> = ({ text, done, onToggle, onDelete }) => {
  return (
      <ListItem>
        <Checkbox checked={done} onChange={onToggle} />
        <ListItemText primary={text} style={{ textDecoration: done ? "line-through" : "none" }} />
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
  );
}

export default Item;