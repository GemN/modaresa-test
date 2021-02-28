import React from 'react';

import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';

import Swal from 'sweetalert2';

/**
 * This component is used to render a delete button for the brand
 * It also handles the are you sure popup
 */
export default function DeleteBrand({ id, refreshFunction }) {

  const deleteBrand = (id) => {
    (async () => {
      fetch(`http://localhost:3001/brand?id=${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      }).then(res => {
        if (res.status === 200) {
          Swal.fire({
            toast: true,
            position: "bottom",
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: "Brand deleted succesfully"
          })
        } else {
          Swal.fire({
            toast: true,
            position: "bottom",
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: "Error occured"
          })
        }
        refreshFunction();
      })
    })();
  }

  const openDeleteModal = (id) => {
    Swal.fire({
      title: 'Are you sure ?',
      text: "You are about to delete a brand. You can't recover data from a deleted brand.",
      icon: "warning",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        deleteBrand(id);
      }
    })
  }

  return (
    <Button
      style={{ backgroundColor: "red" }}
      variant="contained"
      onClick={() => openDeleteModal(id)}
    >
      <DeleteIcon style={{ color: "white" }} />
    </Button>
  );
}