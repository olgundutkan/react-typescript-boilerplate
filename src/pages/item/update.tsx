import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { getItemStart, updateItemStart } from '@store/actions/item';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import ItemForm from '@components/form/item';

/**
 * ItemUpdatePage Component
 *
 * Displays a form to update an existing item.
 * Loads initial data from the Redux store.
 */
const ItemUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getItemStart(Number(id)));
    }
  }, [dispatch, id]);

  const { selectedItem: item, loading, error } = useSelector((state: RootState) => state.item);

  /**
   * Handles form submission by dispatching updateItemStart action.
   *
   * @param data - The form data representing the updated item.
   */
  const handleSubmit = (data: any) => {
    dispatch(updateItemStart({ ...data, id: Number(id) }));
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container>
        <Typography variant="h6">Item not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Item
      </Typography>
      <ItemForm initialValues={item} onSubmit={handleSubmit} />
    </Container>
  );
};

export default ItemUpdatePage;
