import { DataGrid,type GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { productApi } from '../services/api';
import type { Product } from '../types/product';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';





export default function DataTable() {
  const [products,setProducts]=useState<Product[]>([])
  const [formData,setFormData]=useState({
    name:'',
    price:null,
    stock:null,
    taxPercentage:null
  })

  const [sale,setSale]=useState({
    id:'',
    price:null,
    quantity:null,
  })

  const [open, setOpen] =useState(false);
  const [open1, setOpen1] =useState(false);


  const getData=async()=>{
    try{
      const response=await productApi.getProducts();
      console.log(response.data.data.data)
      setProducts(response.data.data.data)
      console.log(products);
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])


const handleChange=(e:any)=>{
  const{name,value}=e.target;

  setFormData((prev)=>({...prev,[name]:value}))
}

const handleChange1=(e:any)=>{
  const{name,value}=e.target;

  setFormData((prev)=>({...prev,[name]:value}))
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

// const handleCreatePurhase=()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    productApi.creareProduct(formData)
    getData();
    setFormData({
       name:'',
      price:null,
      stock:null,
      taxPercentage:null
    })

    handleClose();
    
  };
  return (
    <Box>
      <Button onClick={handleClickOpen} >Create Product</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">SKU</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Stock</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">update</TableCell>
              <TableCell align="right">delete</TableCell>
              <TableCell align="right">add</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.sku}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.currentStock}</TableCell>
                <TableCell align="right">{row.taxPercentage}</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
                <TableCell align="right"><Button onClick={handleClickOpen1} variant="contained">Contained</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create product</DialogTitle>
        <DialogContent>
          
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="price"
              value={formData.price}
              onChange={handleChange}
              name="price"
              label="price"
              type="number"
              fullWidth
              variant="standard"
            />
            
            <TextField
              autoFocus
              required
              margin="dense"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              label="stock"
              type="number"
              fullWidth
              variant="standard"
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="taxPercentage"
              name="taxPercentage"
              value={formData.taxPercentage}
              onChange={handleChange}
              label="taxPercentage"
              type="number"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Enter qty</DialogTitle>
        <DialogContent>
          
          <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
              autoFocus
              required
              margin="dense"
              id="quantity"
              name="quantity"
              value={sale.quantity}
              onChange={handleChange1}
              label="quantity"
              type="number"
              fullWidth
              variant="standard"
            />
          </form>

          <form onSubmit={handleSubmit} id="subscription-form">
              <TextField
              autoFocus
              required
              margin="dense"
              id="price"
              name="price"
              value={sale.price}
              onChange={handleChange1}
              label="price"
              type="number"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>




  );
}
