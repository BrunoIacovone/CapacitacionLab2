import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import './Item.css';

interface ItemProps {
    text: string;
    isRead: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

const Item: React.FC<ItemProps> = ({ text, isRead, onToggle, onDelete }) => {
    return (
        <ListItem className={`item ${isRead ? 'item-done' : ''}`}>
            <ListItemText primary={text} className="item-text" />
            <div className="item-actions">
                <IconButton onClick={onToggle} color="primary">
                    <CheckIcon />
                </IconButton>
                <IconButton onClick={onDelete} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </div>
        </ListItem>
    );
};

export default Item;