import React, { useState } from 'react';
import './productInput.css';

// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const ProductInput = (props) => {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [productType, setProductType] = useState('');
  const [missionProfile, setMissionProfile] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  }

  const handleChange = (e, set) => {
    set(e.target.value)
  }

  return (
    <div className="pi-container">
      <div className="pi-wrapper">
        <div className="pi-top">
          <h1 className='pi-title'>Product Input</h1>
          <p className="pi-instructions">This is the area where we can input different products into our store. It will first create a product and price in Stripe, pass back those ids for us to create the product in our firebase application.</p>
        </div>
        <form className="pi-form" onSubmit={(e) => handleSubmit(e)}>

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              id="product-type"
              value={productType}
              onChange={(e) => handleChange(e, setProductType)}
              label='Product Type' // This is important to have the label be able to break up the outline
            >
              <MenuItem value='rocket'>Rocket</MenuItem>
              <MenuItem value='payload'>Payload</MenuItem>
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id="mission-profile-label">Flight Profile</InputLabel>
            <Select
              labelId="mission-profule-label"
              id='mission-profule'
              value={missionProfile}
              onChange={e => handleChange(e, setMissionProfile)}
              label='Misson Type'
            >
              <MenuItem value="LEO">Low Earth Orbit</MenuItem>
              <MenuItem value='TL'>Trans-Lunar</MenuItem>
              <MenuItem value='DS'>Deep Space</MenuItem>

            </Select>
            <FormHelperText>Some important helper text</FormHelperText>

          </FormControl>

        </form>
      </div>
    </div>
  );
}

export default ProductInput;