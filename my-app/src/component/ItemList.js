import React from 'react';
import AppBar from '@mui/material/AppBar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import { useSelector, useDispatch } from 'react-redux';
import {
  setItemDetails,
  selectStore,
  removeItemDetails,
  showHideCart
} from '../redux/productSlice';
import ItemDetails from "./ItemDetails"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CartDetails from "./cartDetails";

const theme = createTheme();

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function ItemList() {
  const state = useSelector(selectStore);
  const dispatch = useDispatch();

  const setItemDetail = (item) => {
    dispatch(setItemDetails(item));
  }

  const backHandlar = () => {
    if (state.isShowCart)
      dispatch(showHideCart());
    else
      dispatch(removeItemDetails());
  }



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar >
          <IconButton aria-label="cart" sx={{ mr: 2, cursor: 'pointer' }} onClick={() => { dispatch(showHideCart()) }}>
            <StyledBadge badgeContent={state.cart.length} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
          <Typography sx={{ cursor: 'pointer', }} variant="h6" color="inherit" noWrap onClick={() => { dispatch(showHideCart()) }}>
            Cart
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 2, bgcolor: '#eceff1' }} maxWidth="md">
          {((state.itemDetails && Object.keys(state.itemDetails).length > 0) || state.isShowCart) && <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => { backHandlar() }}>
            Back
          </Button>}

          {state.isShowCart ? <CartDetails /> : state.itemDetails && Object.keys(state.itemDetails).length ? <ItemDetails item={state.itemDetails} />
            :
            <Grid container spacing={6} sx={{ pt: 2 }}>
              {state.itemList.map((card) => (
                <Grid key={card.name} item xs={12} sm={6} md={4} onClick={() => { setItemDetail(card) }}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  >
                    <CardMedia
                      component="img"
                      height="55%"
                      image={card.img}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography noWrap gutterBottom variant="h6" component="h3">
                        {card.name}
                      </Typography>
                      <Typography noWrap={true} >
                        {card.description}
                      </Typography>
                      <Typography noWrap variant="h6" component="h2">
                        {`₹ ${card.priceNow}`}
                      </Typography>
                      <Typography variant="caption" component="del">
                        {`₹ ${card.priceWas}`}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Chip icon={<StarIcon />} label={card.ratings} color="success" size="small" sx={{ mr: 1 }} />
                      <small>{`(${card.rating})`}</small>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>}
        </Container>
      </main>
    </ThemeProvider>
  );
}


