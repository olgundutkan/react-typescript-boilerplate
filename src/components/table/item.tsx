import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Item } from '@store/types/item';
import { useNavigate } from 'react-router-dom';
import Modal from '@components/modal/item';
import { useDispatch } from 'react-redux';
import { deleteItemStart } from '@store/actions/item';
import { formatDate } from '@utils/index';

/**
 * ItemTable Component
 *
 * Displays a table of item data including name, description, and creation date.
 * If the list is empty, a fallback message is shown instead.
 *
 * @component
 * @example
 * const items = [
 *   { id: 1, name: 'Item 1', description: 'Description 1', createdAt: '2024-01-01T10:00:00Z' }
 * ];
 * return <ItemTable items={items} />;
 *
 * @param {Object} props
 * @param {Item[]} props.items - List of items to display in the table.
 * @returns {JSX.Element} The rendered component.
 */
interface ItemTableProps {
  items: Item[];
}

const ItemTable: React.FC<ItemTableProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuItemId, setMenuItemId] = React.useState<number | null>(null);
  const [openDialogId, setOpenDialogId] = React.useState<number | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Handles opening the action menu for a specific item.
   *
   * @param event - The click event that triggered the menu.
   * @param itemId - The ID of the item whose menu is being opened.
   */
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, itemId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuItemId(itemId);
  };

  /**
   * Closes the open action menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
    setMenuItemId(null);
  };

  /**
   * Handler for the "Edit" action.
   */
  const handleEdit = (itemId: number) => {
    navigate(`/${itemId}/edit`);
    handleClose();
  };

  /**
   * Handler for the "Show" action.
   */
  const handleShow = (itemId: number) => {
    navigate(`/${itemId}`);
    handleClose();
  };

  /**
   * Opens the confirmation dialog before deleting an item.
   */
  const handleDelete = (itemId: number) => {
    setOpenDialogId(itemId);
    handleClose();
  };

  /**
   * Dispatches the delete action for the selected item and closes the dialog.
   */
  const handleDeleteConfirm = (itemId: number) => {
    dispatch(deleteItemStart(itemId));
    setOpenDialogId(null);
  };

  if (items.length === 0) {
    return <Typography>No items available.</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Updated At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{formatDate(item.created_at)}</TableCell>
                <TableCell align="right">{formatDate(item.updated_at)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuClick(e, item.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {anchorEl && menuItemId !== null && (
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => handleShow(menuItemId)}>Show</MenuItem>
            <MenuItem onClick={() => handleEdit(menuItemId)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(menuItemId)}>Delete</MenuItem>
          </Menu>
        )}
      </TableContainer>

      {openDialogId !== null && (
        <Modal
          open
          title="Confirm Delete"
          onClose={() => setOpenDialogId(null)}
          onConfirm={() => handleDeleteConfirm(openDialogId)}
          confirmText="Delete"
          cancelText="Cancel"
        >
          Are you sure you want to delete this item?
        </Modal>
      )}
    </>
  );
};

export default ItemTable;
