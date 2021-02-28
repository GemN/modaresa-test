import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from '@material-ui/icons/Delete';

import Swal from 'sweetalert2';

/**
 * This component handles the process of adding a new brand
 * If you give it a brand prop it can also update an existing brand
 */
export function NewBrandModal({ open, onClose, refreshFunction, brand }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [sneakers, setSneakers] = useState([]);

  const [updateMode, setUpdateMode] = useState(false);

  // State used to force the rerender of the modal
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    if (brand) {
      setName(brand.name);
      setCountry(brand.country);
      setDescription(brand.description);
      setSneakers(brand.sneakers)
      setUpdateMode(true);
    }
  }, [brand])

  const addNewSneaker = () => {
    if (sneakers.length === 0) {
      setSneakers([{ name: "", id: 1 }]);
    } else {
      let tmp = sneakers;
      tmp.push({ name: "", id: tmp[tmp.length - 1].id + 1 });
      setSneakers(tmp);
      setUpdate(!update);
    }
  };

  const modifySneaker = (id, value) => {
    let tmp = sneakers;
    const index = tmp.findIndex((sneaker) => id === sneaker.id)

    if (index !== -1) {
      tmp[index].name = value;
      setSneakers(tmp);
      setUpdate(!update);
    }
  }

  const deleteSneaker = (id) => {
    let tmp = sneakers;
    const index = tmp.findIndex((sneaker) => id === sneaker.id)

    if (index !== -1) {
      tmp.splice(index, 1);
      setSneakers(tmp);
      setUpdate(!update);
    }
  }

  const closeModal = () => {
    setName("");
    setCountry("");
    setDescription("");
    setSneakers([]);
    onClose();
    refreshFunction();
  }

  const addBrand = () => {
    if (name !== "" && country !== "" && sneakers.length > 0) {
      fetch("http://localhost:3001/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: updateMode
          ? JSON.stringify({
              name,
              country,
              sneakers,
              description,
              id: brand.id,
              update: true,
            })
          : JSON.stringify({ name, country, sneakers, description }),
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            toast: true,
            position: "bottom",
            timer: 3000,
            timerProgressBar: true,
            icon: "success",
            title: `Brand ${updateMode ? "updated" : "created"} succesfully`,
          });
          closeModal();
        } else {
          Swal.fire({
            toast: true,
            position: "bottom",
            timer: 3000,
            timerProgressBar: true,
            icon: "error",
            title: `Brand ${updateMode ? "update" : "creation"} error`,
          });
        }
      });
    } else {
      Swal.fire({
        toast: true,
        position: "bottom",
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "More informations about your brand are required"
      })
    }
  }

  return (
    <Dialog
      BackdropProps={{ style: { visibility: "hidden" } }}
      open={open}
      onClose={closeModal}
      scroll="paper"
    >
      <DialogTitle>
        {updateMode ? `Update brand ${brand.name}` : "Create a new brand"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container direction="column" justify="center" alignItems="center">
          <h2>Enter the name of your brand</h2>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            type="text"
            label="Name"
          />
          <h2>What is the country of your brand ? 🇫🇷</h2>
          <TextField
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            variant="outlined"
            type="text"
            label="Country"
          />
          <h2>Would you like to write a description ?</h2>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            type="text"
            label="Description"
            multiline
          />
          <h2>Add at least 1 sneaker to your brand 👟</h2>
          <Button variant="contained" color="primary" onClick={addNewSneaker}>
            Add Sneaker
          </Button>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ marginTop: 20 }}
          >
            {sneakers.map((sneaker, i) => (
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                key={i}
                style={{ marginTop: 10 }}
              >
                <TextField
                  onChange={(e) => modifySneaker(sneaker.id, e.target.value)}
                  variant="outlined"
                  type="text"
                  label="Sneaker model"
                  defaultValue={sneaker.name}
                />

                <Button
                  style={{ backgroundColor: "red", marginLeft: 25 }}
                  variant="contained"
                  onClick={() => deleteSneaker(sneaker.id)}
                >
                  <DeleteIcon style={{ color: "white" }} />
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={addBrand} color="primary">
          Add brand
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function AddBrand({ refreshFunction }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{marginTop: 30, marginBottom: 20}}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        <p style={{fontFamily: "Noto Sans KR", textTransform: "none"}}>Add a new brand</p>
      </Button>
      <NewBrandModal open={open} onClose={() => setOpen(false)} refreshFunction={refreshFunction} />
    </div>
  );
}
