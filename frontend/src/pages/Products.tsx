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

  const [open, setOpen] =useState(false);

  useEffect(()=>{
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
  getData()
},[])


const handleChange=(e:any)=>{
  const{name,value}=e.target;

  setFormData((prev)=>({...prev,[name]:value}))
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    productApi.creareProduct(formData)

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
              <TableCell align="right">Stock&nbsp;(g)</TableCell>
              <TableCell align="right">Tax</TableCell>
              <TableCell align="right">update</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.stock}</TableCell>
                <TableCell align="right">{row.taxPercentage}</TableCell>
                <TableCell align="right">Update</TableCell>
                <TableCell align="right">Delete</TableCell>
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
    </Box>




  );
}
