import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';

const InputTodo = () => {
  const [description, setDescription] = useState('PAKYU ETOO LIST MO');
  const [label, setLabel] = useState('TODO LIST MO TO ULOL');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
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
      <h1 className="text-center mt-5">Todo List</h1>

      <form
        className="d-flex justify-content-center mt-3"
        style={{ textAlign: 'center', gap: '10px' }}
        onSubmit={onSubmitForm}>
        <Box sx={{ width: 500, maxWidth: '100%' }}>
          <TextField
            fullWidth
            label={label}
            id="outlined-search"
            type="search"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        <Button variant="outlined" type="submit" color="danger">
          Add List
        </Button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
