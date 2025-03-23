import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store';
import { Container, Typography, Paper, Stack, CircularProgress, Alert } from '@mui/material';
import { getItemStart } from '@store/actions/item';

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

  const { selectedItem: item, loading, error } = useSelector((state: RootState) => state.item);

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
        Item Details
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography><strong>ID:</strong> {item.id}</Typography>
          <Typography><strong>Name:</strong> {item.name}</Typography>
          <Typography><strong>Description:</strong> {item.description}</Typography>
          <Typography><strong>Created By:</strong> {item.createdBy}</Typography>
          <Typography><strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}</Typography>
          {item.updatedAt && (
            <Typography><strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}</Typography>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default ItemShowPage;
