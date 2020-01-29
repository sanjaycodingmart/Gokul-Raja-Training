import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckboxListSecondary from './ShowUserList.js'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginLeft:theme.spacing(65),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Create a Group Name', 'Add Group Members'];
}

function getStepContent(stepIndex,name) {
  switch (stepIndex) {
    case 0:
      return ;
    case 1:
  return <CheckboxListSecondary group={name}/>;
    // case 2:
    //   return 'Lets Finish Creating It';
    default:
      return 'Unknown stepIndex';
  }
}

export default function CreateGroupChat() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [groupName,setGroupName]=React.useState("")
  const steps = getSteps();
  const groupChange =(e)=>setGroupName(e.target.value)
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>Check the Group in Side Bar</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{activeStep>0? getStepContent(activeStep,groupName):<Fragment><label>Enter Group Name :</label><form onSubmit={handleNext}><input type="text" onChange={groupChange} value={groupName}/></form></Fragment>}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep === 0 && <Button variant="contained" color="primary" onClick={handleNext}>
              Next
                
              </Button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
