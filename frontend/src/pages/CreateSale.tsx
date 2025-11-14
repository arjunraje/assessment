import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { productApi, saleApi } from "../services/api";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const CreateSale = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [saleResult, setSaleResult] = useState<any>(null);

  const [selectedItems, setSelectedItems] = useState<
    { productId: string; name: string; price: number; quantity: number }[]
  >([]);

  const getData = async () => {
    try {
      const response = await productApi.getProducts();
      setProducts(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addProduct = (product: Product) => {
    setSelectedItems((prev) => {
      const exists = prev.find((item) => item.productId === product.id);

      if (exists) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        },
      ];
    });
  };

  const handleCreateSale = async () => {
    if (selectedItems.length === 0) {
      console.log("No items selected.");
      return;
    }

    const payload = {
      products: selectedItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await saleApi.createSale(payload);
      console.log("Sale created:", response.data);

      setSaleResult(response.data.data);


      
      setSelectedItems([]);

    } catch (error: any) {
      console.log("Sale error:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">₹{product.price}</Typography>

                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => addProduct(product)}
                >
                  +
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <div style={{ marginTop: "40px" }}>
        <Typography variant="h6">Selected Items</Typography>
        {selectedItems.length === 0 && <p>No items added</p>}

        {selectedItems.map((item) => (
          <p key={item.productId}>
            {item.name} — {item.quantity} × ₹{item.price} ={" "}
            <strong>₹{item.quantity * item.price}</strong>
          </p>
        ))}
      </div>

      
      {selectedItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={handleCreateSale}
        >
          Create Sale
        </Button>
      )}
      {saleResult && (
        <div style={{ marginTop: "30px", padding: "20px", border: "1px solid #ccc" }}>
          <Typography variant="h6">Sale Bill</Typography>

          <p><strong>Sale ID:</strong> {saleResult.id}</p>
          <p><strong>Subtotal:</strong> ₹{saleResult.subtotal}</p>
          <p><strong>Total Tax:</strong> ₹{saleResult.totalTax}</p>
          <p><strong>Total Discount:</strong> ₹{saleResult.totalDiscount}</p>
          <p><strong>Grand Total:</strong> ₹{saleResult.grandTotal}</p>

          <h4>Items:</h4>
          {saleResult.items.map((item: any) => (
            <div key={item.id}>
              {item.product.name} — {item.quantity} × ₹{item.priceAtSale}
            </div>
          ))}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setSaleResult(null)}
          >
            Close Bill
          </Button>
        </div>
      )}

    </div>
  );
};

export default CreateSale;
