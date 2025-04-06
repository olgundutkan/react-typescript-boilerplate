import React from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import ItemForm from '@components/form/item';
import { useDispatch, useSelector } from 'react-redux';
import { addItemStart } from '@store/actions/item';
import { RootState } from '@store/reducers';
import { BaseAction } from '@store/reducers/item';
import { useNavigate } from 'react-router-dom';

/**
 * ItemCreatePage Component
 *
 * Displays a form to create a new item.
 * Dispatches a Redux action on submission to add the item to the store.
 */

const ItemCreatePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lastAction, lastActionLoading, lastActionError, lastActionSuccessMessage } = useSelector((state: RootState) => state.item);

  /**
   * Handles form submission by dispatching addItemStart action.
   *
   * @param data - The form data representing the new item.
   */
  const handleSubmit = (data: any) => {
    dispatch(addItemStart(data));
  };

  React.useEffect(() => {
    if (lastAction === BaseAction.CREATE && lastActionSuccessMessage) {
      navigate('/', { state: { message: lastActionSuccessMessage } });
    }
  }, [lastAction, lastActionSuccessMessage, navigate]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Create Item
      </Typography>
      {lastAction == BaseAction.CREATE && lastActionLoading && <CircularProgress />}
      {lastAction == BaseAction.CREATE && lastActionError && <Alert severity="error">{lastActionError}</Alert>}
      <ItemForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default ItemCreatePage;
