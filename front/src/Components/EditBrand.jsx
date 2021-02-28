import React, { useState } from 'react';

import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import { NewBrandModal } from './AddBrand';

/**
 * This component is used to edit a brand
 * Under the hood it uses the NewBrandModal used by the AddBrand component
 */
export default function EditBrand({ brand, refreshFunction }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <NewBrandModal
        open={open}
        onClose={() => setOpen(false)}
        refreshFunction={refreshFunction}
        brand={brand}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 15 }}
        onClick={() => setOpen(true)}
      >
        <EditIcon style={{color: "#FFFFFF"}} />
      </Button>
    </>
  );
}