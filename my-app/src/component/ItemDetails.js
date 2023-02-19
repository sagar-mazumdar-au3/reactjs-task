import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addToCart } from '../redux/productSlice';
import { useDispatch } from 'react-redux';


const StyledCardActionArea = styled(CardActionArea)(() => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`);

function ItemDetails({ item }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };
  const addToCartF = (item) => {
    dispatch(addToCart({item, quan: quantity}));
  };
  

  return (
    <Grid item xs={12} md={6} sx={{ pt: 2 }}>
      <StyledCardActionArea sx={{ "&:hover": { backgroundColor: "transparent", cursor: 'default' } }}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h3" variant="h5" paragraph>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {`Model : ${item.model}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {`Model : ${item.brand}`}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {`Now : ₹${item.priceNow}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {`Was : ₹${item.priceWas}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
              {`Saving : ₹${item.priceWas - item.priceNow}`}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip icon={<StarIcon />} label={item.ratings} color="success" size="small" sx={{ mr: 1 }} />
              <small>{`(${item.rating}) Ratings`}</small>
            </Box>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={2} md={2} sx={{ mt: 2 }}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label="Quantity"
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={6} sx={{ mt: 2 }}>
                <Button variant="outlined" startIcon={<ShoppingCartIcon />} onClick={()=>{addToCartF(item)}}>
                  Add To Cart
                </Button>
              </Grid>
            </Grid>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 2 }}>
              {`Description : ${item.description}`}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 360, display: { xs: 'none', sm: 'block' } }}
            image={item.img}
            alt={item.name}
          />
        </Card>
      </StyledCardActionArea>
    </Grid>
  );
}

export default ItemDetails;


