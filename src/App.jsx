import './App.css';
import image from './images/bmi.png';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';

function App() {
  const [Weight, setWeight] = useState("");
  const [Height, setHeight] = useState("");
  const [Total, setTotal] = useState("");
  const [category, setCategory] = useState(""); 
  const [isWeight, isSetWeight] = useState(true);
  const [isHeight, isSetHeight] = useState(true);
  const [open, setOpen] = useState(false); 

  const validate = (e) => {
    if (!!e.target.value.match('^[0-9.]*$')) {
      if (e.target.name === 'weight') {
        setWeight(e.target.value);
        isSetWeight(true);
      } else {
        setHeight(e.target.value);
        isSetHeight(true);
      }
    } else {
      if (e.target.name === 'weight') {
        setWeight(e.target.value);
        isSetWeight(false);
      } else {
        setHeight(e.target.value);
        isSetHeight(false);
      }
    }
  };

  const handleCalculation = () => {
    const heightInMeters = Height / 100; 
    const bmi = (Weight / (heightInMeters ** 2)).toFixed(2); 
    setTotal(bmi);
    
   
    let bmiCategory = '';
    if (bmi < 18.5) {
      bmiCategory = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      bmiCategory = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obesity';
    }
    setCategory(bmiCategory);
    
    setOpen(true); 
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setTotal("");
    setCategory("");
    isSetWeight(true);
    isSetHeight(true);
  };

  const handleClose = () => {
    handleReset();
    setOpen(false);
  };

  return (
    <>
      <div className="app-container w-100 d-flex align-items-center justify-content-center">
        <div className="bmi-calculator p-5 rounded shadow">
          <h1 className="text-center text text-light mb-4">BMI CALCULATOR</h1>
          <div className="row">
            <div className="col-md-6">
              <Box>
                <TextField
                  id="weight"
                  label="Weight (kg)"
                  variant="standard"
                  name="weight"
                  
                  fullWidth
                  className="mb-4"
                  value={Weight}
                  onChange={(e) => validate(e)}
                />
                {!isWeight && <span className="text-danger">*Invalid data</span>}
                <TextField
                  id="height"
                  label="Height (cm)"
                  name="height"
                  variant="standard"
                  fullWidth
                  className="mb-4"
                  value={Height}
                  onChange={(e) => validate(e)}
                />
                {!isHeight && <span className="text-danger">*Invalid data</span>}
              </Box>
              <div className="d-flex justify-content-start mt-4">
                <Button
                  variant="contained"
                  color="success"
                  className="me-2"
                  onClick={handleCalculation}
                  disabled={!(Weight && Height)}
                >
                  Calculate
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReset}
                  disabled={!(Weight && Height)}
                >
                  Reset
                </Button>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center mt-3">
              <img className="bmi-image" src={image} alt="BMI" />
            </div>
          </div>
        </div>
      </div>

    
      <Dialog open={open} onClose={handleClose} className="custom-dialog">
        <DialogTitle className="text-center">BODY MASS INDEX </DialogTitle>
        <DialogContent className="text-center">
          <img src="https://cdn-icons-png.flaticon.com/128/4228/4228692.png" alt="" width={'100%'} height={'300px'}/>
          <h3>Your BMI is: <strong>{Total}</strong></h3>
          <p>The result indicates that you are: <strong>{category}</strong></p>
        </DialogContent>
        <div className="d-flex justify-content-center mb-3">
          <Button variant="contained" className='btn btn-danger' color='error' onClick={handleClose}>
            Close
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default App;
