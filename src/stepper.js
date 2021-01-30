import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({

/*
  const フック関数 = makeStyles((theme) => ({
  クラス: {
    プロパティ: 文字列の設定値,
    // 他のプロパティの定め
  },
  // 他のクラス
}));
*/

  root: {
		marginTop: 300,
    width: '100%',
  },

  button: {
		marginRight: 100,
		// marginRight: theme.spacing(1),
  },

  instructions: {
    marginTop: 100,
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

}));


function getSteps() {
  return ['Select coffee flavers ( level1 )', 'Select coffee flavers ( level2 )', 'Select coffee flavers ( level3 )', 'Register coffee flavers'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select';
    case 1:
      return 'Select';
    case 2:
      return 'Select';
    case 3:
      return 'Register!';
    default:
      return 'Unknown step';
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  // useState: 現在のstateの値とそれを更新するための関数をペアにして返す
				//
  const [skipped, setSkipped] = React.useState(new Set());
  // Set(): 重複する値は認めないリスト

  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      // 現在のstateの状態がskippedの中に含まれている場合
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // stateとskippedの値を更新
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
					
    // stateの値を更新
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });

  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
						// 現在の状態が1の場合
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
			<div>
				{activeStep === steps.length ? (
					<div>
						<Typography className={classes.instructions}>
							All steps completed - you&apos;re finished
						</Typography>
						<Button onClick={handleReset} className={classes.button}>
							Reset
						</Button>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
						<div>
							<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
								Back
							</Button>
							{isStepOptional(activeStep) && (
								<Button
									variant="contained"
									color="primary"
									onClick={handleSkip}
									className={classes.button}
								>
									Skip
								</Button>
							)}

							<Button
								variant="contained"
								color="primary"
								onClick={handleNext}
								className={classes.button}
							>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
  );
}

