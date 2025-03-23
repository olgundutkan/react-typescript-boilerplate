import React from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { Item } from '@store/types/item';
import { useNavigate } from 'react-router-dom';
import { extractChangedFields } from '@utils/index';

/**
 * ItemForm Component
 *
 * A reusable form component for creating or editing an item.
 * Displays input fields for name and description.
 *
 * @component
 * @example
 * <ItemForm onSubmit={handleSubmit} initialValues={item} />
 */

interface ItemFormProps {
    /**
     * Optional initial values to populate the form.
     */
    initialValues?: Partial<Item>;

    /**
     * Callback function that is called when the form is submitted.
     * Receives the form data as argument.
     */
    onSubmit: (values: Partial<Item>) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({
    initialValues = {},
    onSubmit
}) => {
    const [formState, setFormState] = React.useState<Partial<Item>>(initialValues);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const diff = extractChangedFields(initialValues, {
            name: formState.name,
            description: formState.description,
        });
        if (!diff) {
            return navigate('/');

        }
        return onSubmit(diff);
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={formState.name || ''}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formState.description || ''}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
};

export default ItemForm;
