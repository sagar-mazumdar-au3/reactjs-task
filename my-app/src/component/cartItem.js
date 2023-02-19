import * as React from 'react';
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
import { addToCart, removeFromCart } from '../redux/productSlice';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCardActionArea = styled(CardActionArea)(() => `
    .MuiCardActionArea-focusHighlight {
        background: transparent;
    }
`);

function CartItem({ item, quan }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(quan);

  const handleChange = (event) => {
    setQuantity(event.target.value);
    dispatch(addToCart({ item, quan: event.target.value }));
  };


  return (
    <Grid item xs={12} md={12} sx={{ mt: 2 }}>
      <StyledCardActionArea sx={{ "&:hover": { backgroundColor: "transparent", cursor: 'default' } }}>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 220, height: 300, display: { xs: 'none', sm: 'block' } }}
            image={item.img}
            alt={item.name}
          />
          <CardContent>
            <Typography variant="subtitle1" noWrap>
              {item.name}
            </Typography>
            <Typography variant="subtitle1" noWrap color="text.secondary">
              {`Model : ${item.model}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {`Model : ${item.brand}`}
            </Typography>
            <Typography variant="subtitle1">
              {`Now : ₹${item.priceNow}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {`Was : ₹${item.priceWas}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {`Saving : ₹${item.priceWas - item.priceNow}`}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip icon={<StarIcon />} label={item.ratings} color="success" size="small" sx={{ mr: 1 }} />
              <small>{`(${item.rating}) Ratings`}</small>
            </Box>
            <Grid container spacing={1} sx={{ mt: 2 }}>
              <Grid item xs={3} sm={3} md={3}>
                <FormControl size="small" >
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
                <Box>
                  <IconButton aria-label="delete" size="large" onClick={() => { dispatch(removeFromCart(item.name)) }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Grid>

            </Grid>
          </CardContent>

        </Card>
      </StyledCardActionArea>
    </Grid>
  );
}

export default CartItem;


