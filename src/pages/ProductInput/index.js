import React, { useState } from 'react';
import './productInput.css';

// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputGroup from '../../components/InputGroup';
import TextArea from '../../components/TextArea';

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
  const [flightProfile, setFlightProfile] = useState('');
  const [missionType, setMissionType] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
  }

  const handleChange = (e, set) => {
    set(e.target.value);
    if (e.target.value === 'rocket' || e.target.value === 'payload') {
      clearBelowProd();

    }
  }

  const clearBelowProd = () => {
    setMissionType('');
    setProductName('');
    setProductDescription('');
  }

  return (
    <div className="pi-container">
      <div className="pi-wrapper">
        <div className="pi-top">
          <h1 className='pi-title'>Product Input</h1>
          <p className="pi-instructions">This is the area where we can input different products into our store. It will first create a product and price in Stripe, pass back those ids for us to create the product in our firebase application.</p>
        </div>
        <form className="pi-form" onSubmit={(e) => handleSubmit(e)}>

          <div className="selects-holder-pi">
            <div className="select-pi">

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

            </div>

            <div className="select-pi">
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id="flight-profile-label">Flight Profile</InputLabel>
                <Select
                  labelId="flight-profile-label"
                  id='flight-profile'
                  value={flightProfile}
                  onChange={e => handleChange(e, setFlightProfile)}
                  label='Flight Profile'
                >
                  <MenuItem value="LEO">Low Earth Orbit</MenuItem>
                  <MenuItem value='TL'>Trans-Lunar</MenuItem>
                  <MenuItem value='DS'>Deep Space</MenuItem>

                </Select>
                <FormHelperText>Some important helper text</FormHelperText>

              </FormControl>
            </div>


            {productType === 'rocket' ?
              <div className="select-pi">
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='mission-type-rocket-label'>Mission Type</InputLabel>
                  <Select
                    labelId='mission-type-rocket-label'
                    id='missionType'
                    value={missionType}
                    onChange={e => handleChange(e, setMissionType)}
                    label='Mission Type'
                  >
                    <MenuItem value='manned'>Manned Mission</MenuItem>
                    <MenuItem value='unmanned'>Unmanned Mission</MenuItem>
                  </Select>
                  <FormHelperText>Some important rocket text</FormHelperText>

                </FormControl>
              </div>

              :
              productType === 'payload' ?
                <div className='select-pi'>
                  <FormControl variant='outlined' className={classes.formControl}>
                    <InputLabel id='mission-type-payload-label'>Mission Type</InputLabel>
                    <Select
                      labelId='mission-type-payload-label'
                      id='missionType'
                      value={missionType}
                      onChange={e => handleChange(e, setMissionType)}
                      label='Mission Type'
                    >
                      <MenuItem value='earth-sat'>Earth Satellites</MenuItem>
                      <MenuItem value='planetary-sat'>Beyond Earth Satellites</MenuItem>
                      <MenuItem value='landers'>Landers</MenuItem>
                      <MenuItem value='rovers'>Rovers</MenuItem>
                    </Select>
                    <FormHelperText>Some important payload text</FormHelperText>

                  </FormControl>
                </div>

                : <div className="select-pi empty-pi-select"></div>
            }
          </div>


          <div className="text-holder-pi">
            <InputGroup
              value={productName}
              setValue={setProductName}
              id='product-name'
              label='Product Name'
              auto_complete='off'
              placeholder="Name"
              type='text'
              className='pi-text-input'
            ></InputGroup>
          </div>

          <div className="text-holder-pi">
            <TextArea
              value={productDescription}
              setValue={setProductDescription}
              label='Product Description'
              id='product-description'
              placeholder='enter description here...'
              auto_complete='off'
            ></TextArea>
          </div>


        </form>
      </div>
    </div >
  );
}

export default ProductInput;