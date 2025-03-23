import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';

/**
 * Modal Component
 *
 * A generic modal dialog component using Material UI.
 * Supports optional title, confirm and cancel buttons, and custom children content.
 *
 * @component
 * @example
 * <Modal
 *   open={isOpen}
 *   title="Delete Item"
 *   onClose={handleClose}
 *   onConfirm={handleDelete}
 *   confirmText="Delete"
 *   cancelText="Cancel"
 * >
 *   Are you sure you want to delete this item?
 * </Modal>
 */

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean;

  /** Optional title displayed in the modal header */
  title?: string;

  /** Function called when the cancel/close button is clicked */
  onClose: () => void;

  /** Optional function called when the confirm button is clicked */
  onConfirm?: () => void;

  /** Text for the confirm button (defaults to "OK") */
  confirmText?: string;

  /** Text for the cancel button (defaults to "Cancel") */
  cancelText?: string;

  /** Content to be rendered inside the modal */
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  children,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        {onConfirm && (
          <Button onClick={onConfirm} variant="contained" color="primary">
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;