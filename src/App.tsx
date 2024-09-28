import { useState } from "react"
import Navbar from "./components/Navbar"
import StepTwo from "./components/StepTwo"
import StepOne from "./components/StepOne"
import StepThree from "./components/StepThree"
import StepFour from "./components/StepFour"
import Finish from "./components/Finish"

const App = () => {
  const [formData, setFormData] = useState({
    stepOneData: {},
    stepTwoData: {},
    stepThreeData: {}
  });

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Function to handle data submission from child components
  const updateFormData = (step: string, data: object) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [step]: data
    }));
  }

  const handleNextStep = () => {
    setCurrentStep(prevStep => prevStep + 1);
  }

  const handlePreviousStep = () => {
    setCurrentStep(prevStep => (prevStep > 1 ? prevStep - 1 : 1));
  }

  return (
    <div className="container">
      <Navbar />

      <div className="form-step">
        {currentStep === 1 && (
          <StepOne onNext={handleNextStep} updateFormData={updateFormData} />
        )}
        {currentStep === 2 && (
          <StepTwo
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && <StepThree
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            updateFormData={updateFormData}
          />}
        {currentStep === 4 && <StepFour
            formData = {formData}
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />}
        {currentStep > 4 && <Finish /> }
      </div>

      {/* Debugging purpose: Shows current formData */}
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
    </div>
  )
}

export default App;