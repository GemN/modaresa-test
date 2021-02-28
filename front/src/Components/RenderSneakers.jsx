import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

function SneakersModal({brand, open, onClose}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{brand.name} sneakers 👟</DialogTitle>
      <DialogContent dividers>
      <Grid container direction="column" justify="center" alignItems="center">
        <p>Sneakers count: {brand.sneakers.length}</p>
        {brand.sneakers.map((sneaker) =>
          <p style={{marginTop: 10, marginBottom: 10}} key={sneaker.id}>• {sneaker.name}</p>
        )}
      </Grid>
      </DialogContent>
    </Dialog>
  )
}

/**
 * This component renders the sneakers of a brand
 */
export default function RenderSneakers({ brand }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <SneakersModal brand={brand} open={open} onClose={() => setOpen(false)} />
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 15 }}
        onClick={() => setOpen(true)}
      >
        <h1>👟</h1>
      </Button>
    </>
  );
}