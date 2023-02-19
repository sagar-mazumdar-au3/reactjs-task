import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import CartItem from "./cartItem"
import {
  selectStore
} from '../redux/productSlice';

function CartDetails() {
  const state = useSelector(selectStore);

  const totalHandler = (cart) => {
    let total = 0;
    cart.map((item) => {
      total += (item.item.priceNow * item.quan)
    })
    return total;
  };


  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid item xs={7} md={7}>
        <Typography component="h3" variant="h5" paragraph>
          {`Cart (${state.cart.length} item)`}
        </Typography>
        {state.cart.map((item) => {
          return <CartItem quan={item.quan} item={item.item} />
        })}
      </Grid>
      <Grid item xs={5} md={5}>
        <Card sx={{ display: 'flex', mt: 6 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h6" variant="h6" paragraph>
              Order Summary
            </Typography>
            {state.cart.map((item) => {
              return <Grid container spacing={3}>
                <Grid item xs={6} md={6}>
                  <Typography color="text.secondary" paragraph>
                    <small>{`${item.item.name} - ( ₹${item.item.priceNow} × ${item.quan} )`}</small>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1" color="text.secondary" paragraph>
                    ₹{Number(item.item.priceNow) * Number(item.quan)}
                  </Typography>
                </Grid>
              </Grid>
            })}
            <hr />
            <Grid container spacing={1}>
              <Grid item xs={6} md={6}>
                <Typography color="text.secondary" paragraph>
                  Total
                </Typography>
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography variant="subtitle1" color="text.secondary" paragraph>
                  ₹{totalHandler(state.cart)}
                </Typography>
              </Grid>
            </Grid>
            <hr />
            <Box align="center">
              <Button variant="contained">Checkout</Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CartDetails;



