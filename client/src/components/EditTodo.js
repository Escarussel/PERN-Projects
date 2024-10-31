import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 1,
  p: 5,
};

const EditTodo = ({ todo }) => {
  console.log(todo);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(todo ? todo.description : '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (todo) setDescription(todo.description);
  };

  const updateDescription = async (e) => {
    e.preventDefault();
    if (!todo) return;
    try {
      const body = { description };
      await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      window.location = '/';
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="danger"
        onClick={handleOpen}
        disabled={!todo}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description">
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Edit Todo
          </Typography>
          <Box component="form" onSubmit={updateDescription} sx={{ mt: 2 }}>
            <TextField
              label="Update"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              sx={{ mr: 2 }}
              disabled={!todo}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
};

export default EditTodo;
