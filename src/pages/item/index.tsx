import React from 'react';
import * as Redux from 'react-redux';
import * as Router from 'react-router-dom';
import { RootState } from '@store';
import { fetchItemsStart } from '@store/actions/item';
import { Container, Typography, CircularProgress, Alert, Button, Stack } from '@mui/material';
import ItemTable from '@components/table/item';
import { BaseAction } from '@store/reducers/item';
import { useLocation } from 'react-router-dom';


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
  const { items, lastAction, lastActionLoading, lastActionError, lastActionSuccessMessage } = Redux.useSelector((state: RootState) => state.item);
  const location = useLocation();
  const [pageMessage, setPageMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (location.state?.message) {
      setPageMessage(location.state.message);
      window.history.replaceState({}, document.title); // state'i temizle
    }
  }, [location.state]);

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

      {lastAction == BaseAction.INDEX && lastActionLoading && <CircularProgress />}
      {lastAction == BaseAction.DELETE && lastActionLoading && <CircularProgress />}
      {lastAction === BaseAction.DELETE && lastActionSuccessMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>{lastActionSuccessMessage}</Alert>
      )}
      {lastAction === BaseAction.DELETE && lastActionError && (
        <Alert severity="error" sx={{ mb: 2 }}>{lastActionError}</Alert>
      )}
      {pageMessage && <Alert severity="success" sx={{ mb: 2 }}>{pageMessage}</Alert>}
      {lastAction == BaseAction.INDEX && lastActionError && <Alert severity="error">{lastActionError}</Alert>}

    <ItemTable items={items} />
    </Container>
  );
};

export default ItemListPage;
