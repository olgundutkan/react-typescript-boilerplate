import React from 'react';
import { Container, Typography } from '@mui/material';
import ItemForm from '@components/form/item';
import { useDispatch } from 'react-redux';
import { addItemStart } from '@store/actions/item';

/**
 * ItemCreatePage Component
 *
 * Displays a form to create a new item.
 * Dispatches a Redux action on submission to add the item to the store.
 */

const ItemCreatePage: React.FC = () => {
  const dispatch = useDispatch();

  /**
   * Handles form submission by dispatching addItemStart action.
   *
   * @param data - The form data representing the new item.
   */
  const handleSubmit = (data: any) => {
    dispatch(addItemStart(data));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Item
      </Typography>
      <ItemForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ItemCreatePage;
