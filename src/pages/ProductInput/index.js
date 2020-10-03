import React, { useState } from 'react';
import './productInput.css';
import ErrorDisplay from '../../components/ErrorDisplay';
// Material UI Stuff
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button'
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
  const [price, setPrice] = useState('');
  const [imgPath, setImgPath] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('form submitted');
    let ver_prod_type = productType === '' ?
      { pass: false, msg: 'Please select product type' } : { pass: true, value: productType, place: 'product_type' };
    let ver_flight_profile = flightProfile === '' ?
      { pass: false, msg: 'Please select mission flight profile' } : { pass: true, value: flightProfile, place: 'flight_profile' };
    let ver_mission_type = missionType === '' ?
      { pass: false, msg: 'Please select mission type' } : { pass: true, value: missionType, place: 'mission_type' };
    let ver_prod_name = productName === '' ?
      { pass: false, msg: 'Plase enter product name' } : { pass: true, value: productName, place: 'name' }
    let ver_prod_desc = productDescription === '' ?
      { pass: false, msg: 'Please enter a description of the product' } : { pass: true, value: productDescription, place: 'description' };
    let ver_price = price === '' ?
      { pass: false, msg: 'Please enter a price for the product' } : { pass: true, value: price, place: 'price' };
    let ver_img_path = imgPath === '' ?
      { pass: false, msg: 'Please enter an image path for the product' } : { pass: true, value: imgPath, place: 'img_path' };
    const verifyArr = [ver_prod_type, ver_flight_profile, ver_mission_type, ver_prod_name, ver_prod_desc, ver_price, ver_img_path];
    handleVerify(verifyArr)
  }

  const handleVerify = (verifyArr) => {
    console.log(verifyArr)
    const invalid = [...verifyArr].filter(ver => !ver.pass);
    if (invalid.length > 0) {
      // send errordisplay msg
      let error_arr = invalid.map(item => {
        return { code: 'invalid product input form item', message: item.msg }
      })
      console.log(error_arr)
      props.setErrors(error_arr);
    } else {
      let sendObj = {}
      verifyArr.forEach(item => {
        sendObj[item.place] = item.value
      })
      console.log(sendObj)
    }
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
      {props.displayError ? <ErrorDisplay errorMessages={props.errorMessages} clearErrors={props.clearErrors} /> : null}
      <div className="pi-wrapper">
        <div className="pi-top">
          <h1 className='pi-title'>Product Input</h1>
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
                      <MenuItem value='sat'>Satellite</MenuItem>
                      <MenuItem value='probe'>Probe</MenuItem>
                      <MenuItem value='lander'>Lander</MenuItem>
                      <MenuItem value='rover'>Rover</MenuItem>
                    </Select>
                    <FormHelperText>Some important payload text</FormHelperText>

                  </FormControl>
                </div>

                : <div className="select-pi empty-pi-select"></div>
            }
          </div>

          <div className="text-holder-tri">
            <div className="text-pi">
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



            <div className="text-pi">
              <InputGroup
                type='number'
                label='Product Price in millions'
                value={price}
                setValue={setPrice}
                placeholder='$00.00'
                auto_complete='off'
                id='product-price'
              >
              </InputGroup>
            </div>

            <div className="text-pi">
              <InputGroup
                type='text'
                label='Image Path'
                value={imgPath}
                setValue={setImgPath}
                placeholder='rocket.jpg'
                auto_complete='off'
                id='image-path'
              >
              </InputGroup>
            </div>
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

          <div className="text-holder-pi">
            <Button type='submit' variant='contained' color='primary'>Create</Button>
          </div>


        </form>
      </div>
    </div >
  );
}

export default ProductInput;