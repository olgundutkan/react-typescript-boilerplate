import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { getItemStart, updateItemStart } from '@store/actions/item';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import ItemForm from '@components/form/item';
import { BaseAction } from '@store/reducers/item';

/**
 * ItemUpdatePage Component
 *
 * Displays a form to update an existing item.
 * Loads initial data from the Redux store.
 * Navigates to the home page with a success message upon successful update.
 */
const ItemUpdatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getItemStart(Number(id)));
    }
  }, [dispatch, id]);

  const { selectedItem: item, lastAction, lastActionLoading, lastActionError, lastActionSuccessMessage } = useSelector((state: RootState) => state.item);

  /**
   * Handles form submission by dispatching updateItemStart action.
   *
   * @param data - The form data representing the updated item.
   */
  const handleSubmit = (data: any) => {
    dispatch(updateItemStart({ ...data, id: Number(id) }));
  };

  React.useEffect(() => {
    if (lastAction === BaseAction.UPDATE && lastActionSuccessMessage) {
      navigate('/', { state: { message: lastActionSuccessMessage } });
    }
  }, [lastAction, lastActionSuccessMessage, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Update Item
      </Typography>
  
      {lastAction === BaseAction.UPDATE && lastActionLoading && (
        <CircularProgress />
      )}
  
      {lastAction === BaseAction.UPDATE && lastActionError && (
        <Alert severity="error">{lastActionError}</Alert>
      )}
  
      {lastAction === BaseAction.GET_ONE && !lastActionLoading && item && (
        <ItemForm initialValues={item} onSubmit={handleSubmit} />
      )}
  
      {lastAction === BaseAction.UPDATE && !lastActionLoading && !item && (
        <Alert severity="error">Item not found</Alert>
      )}
    </Container>
  );
};

export default ItemUpdatePage;