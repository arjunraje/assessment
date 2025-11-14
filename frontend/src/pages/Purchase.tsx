import { useEffect, useState } from "react";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { productApi, purchaseApi } from "../services/api";
import type { Product } from "../types/product";

const PurchasePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<{ productId: string; quantity: number ,purchasePrice:number}>({
    productId: "",
    purchasePrice:0,
    quantity: 1,
  });

  const getProducts = async () => {
    try {
      const response = await productApi.getProducts();
      setProducts(response.data.data.data);
    } catch (err) {
      console.error("Failed loading products", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handlePurchase = async () => {
    if (!selected.productId || selected.quantity <= 0) {
      console.error("Invalid purchase input");
      return;
    }

    try {
      const res = await purchaseApi.createPurchase({
        productId: selected.productId,
        quantity: selected.quantity,
        purchasePrice:selected.purchasePrice,
      });

      console.log("Purchase success:", res.data);

      setSelected({productId:"",purchasePrice:0,quantity:0})
      alert(res.data.message);
    } catch (err) {
      console.error("Purchase failed", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>Create Purchase</Typography>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                border: selected.productId === product.id ? "2px solid blue" : "1px solid #ddd",
              }}
            >
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ₹{product.price}
                </Typography>

                <TextField
                  type="number"
                  label="Quantity"
                  sx={{ mt: 2 }}
                  value={selected.productId === product.id ? selected.quantity : ""}
                  onChange={(e) =>
                    setSelected({
                      productId: product.id,
                      quantity: Number(e.target.value),
                      purchasePrice:Number(product.price)
                    })
                  }
                />

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selected.productId && (
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3 }}
          onClick={handlePurchase}
        >
          Submit Purchase
        </Button>
      )}
    </div>
  );
};

export default PurchasePage;
