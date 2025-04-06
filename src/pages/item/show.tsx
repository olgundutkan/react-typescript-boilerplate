import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { Container, Typography, Paper, Stack, CircularProgress, Alert } from '@mui/material';
import { getItemStart } from '@store/actions/item';
import { formatDate } from '@utils/index';

/**
 * ItemShowPage Component
 *
 * Displays detailed information about a single item.
 */
const ItemShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (id) {
      dispatch(getItemStart(Number(id)));
    }
  }, [dispatch, id]);

  const { selectedItem: item, lastAction, lastActionLoading, lastActionError } = useSelector((state: RootState) => state.item);

  if (lastActionLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (lastActionError) {
    return (
      <Container>
        <Alert severity="error">{lastActionError}</Alert>
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
        Item Details
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography><strong>ID:</strong> {item.id}</Typography>
          <Typography><strong>Name:</strong> {item.name}</Typography>
          <Typography><strong>Description:</strong> {item.description}</Typography>
          <Typography><strong>Created By:</strong> {item.createdBy}</Typography>
          <Typography><strong>Created At:</strong> {formatDate(item.created_at)}</Typography>
          <Typography><strong>Updated At:</strong> {formatDate(item.updated_at)}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ItemShowPage;
