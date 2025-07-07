'use client'
import * as React from 'react';

import { useState, useContext } from "react";
import { ProdutoContext } from "@/context";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Notify() {


  let {openDial, setOpenDial} = useContext(ProdutoContext);
 
  const handleClose = () => {
    setOpenDial(false);
  };

  return (
    <>

      <Dialog
        open={openDial}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atenção!!!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <DialogTitle style={{fontSize:'16px'}}>
              E necessário que pelo menos um dos ícones esteja selecionado, para  definir seu tipo de contato.
            </DialogTitle>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}