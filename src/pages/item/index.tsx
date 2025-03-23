import React from 'react';
import * as Redux from 'react-redux';
import * as Router from 'react-router-dom';
import { RootState } from '@store';
import { fetchItemsStart } from '@store/actions/item';
import { Container, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import ItemTable from '@components/table/item';

/**
 * ItemListPage component
 * 
 * Displays a list of items fetched from the Redux store.
 * Shows loading spinner while fetching, error alert on failure,
 * and a message if no items are found.
 * Includes a button to navigate to the create item page.
 */
const ItemListPage: React.FC = () => {
  const dispatch = Redux.useDispatch();
  const navigate = Router.useNavigate();
  const { items, loading, error } = Redux.useSelector((state: RootState) => state.item);

  React.useEffect(() => {
    dispatch(fetchItemsStart());
  }, [dispatch]);

  /**
   * Navigates the user to the item creation page.
   */
  const handleAddItem = () => {
    navigate('/create');
  };

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Items</Typography>
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Add New Item
        </Button>
      </Stack>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && <ItemTable items={items} />}
    </Container>
  );
};

export default ItemListPage;
