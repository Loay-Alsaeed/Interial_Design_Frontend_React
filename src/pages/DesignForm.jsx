import React, { useState } from 'react';
import Step1BasicInfo from '../components/AddDesign/Step1BasicInfo';
// import Step2Images from '../components/AddDesign/Step2Images';
import Step3KeyFeatures from '../components/AddDesign/Step3KeyFeatures';
import Step4Materials from '../components/AddDesign/Step4Materials';
import Step5Colors from '../components/AddDesign/Step5Colors';
import Step6Consideration from '../components/AddDesign/Step6Consideration';

function DesignForm() {
  const [step, setStep] = useState(1);
  const [designId, setDesignId] = useState(null);
  const [formData, setFormData] = useState({
    basicInfo: {},
    features: [],
    materials: [],
    colors: [],
    considerations: [],
    descriptions: [],
    concepts: []
  });
  const [isEditing, setIsEditing] = useState(false);

  const totalSteps = 6;

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (stepNumber) => {
    if (stepNumber <= step || isEditing) {
      setStep(stepNumber);
    }
  };

  console.log('formData', formData);
  console.log('designId', designId);

  const handleStepComplete = (stepData) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    nextStep();
  };


  const handleEdit = (stepNumber) => {
    setIsEditing(true);
    goToStep(stepNumber);
  };

  const renderProgressBar = () => {
    return (
      <div className="w-full mb-8">
        <div className="flex justify-between mb-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`flex items-center cursor-pointer ${index + 1 <= step || isEditing ? 'text-indigo-600' : 'text-gray-400'}`}
              onClick={() => goToStep(index + 1)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                index + 1 <= step ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300'
              }`}>
                {index + 1}
              </div>
              <span className="ml-2 text-sm font-medium">
                {index === 0 ? 'Basic Information' : index === 1 ? 'Key Feayures' : index === 2 ? 'Materials' : index === 3 ? 'Colors' : index === 4 ?  'More Information' : 'Finish'}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1BasicInfo
            onNext={(data) => handleStepComplete(data, 'basicInfo')}
            setDesignId={setDesignId}
            initialData={formData.basicInfo}
            isEditing={isEditing}
          />
        );
      case 2:
        return (
          <Step3KeyFeatures
            onNext={(data) => handleStepComplete(data, 'features')}
            onBack={prevStep}
            designId={designId}
            initialData={formData.features}
            isEditing={isEditing}
          />
        );
      case 3:
        return (
          <Step4Materials
          onNext={(data) => handleStepComplete(data, 'materials')}
          onBack={prevStep}
          designId={designId}
          initialData={formData.materials}
          isEditing={isEditing}
          />
        )
      case 4:
        return (
          <Step5Colors
            onNext={(data) => handleStepComplete(data, 'colors')}
            onBack={prevStep}
            designId={designId}
            initialData={formData.colors}
            isEditing={isEditing}
          />
        );
      case 5:
        return (
          <Step6Consideration
           onNext={({ considerations, descriptions, concepts }) => {
            handleStepComplete({ considerations, descriptions, concepts });
            }}
            onBack={prevStep}
            designId={designId}
            initialData={formData.considerations}
            isEditing={isEditing}
          />
        );
      
      default:
        return <div>تم الإدخال</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Design</h2>
          
          {renderProgressBar()}
          
          <div className="mt-8">
            {renderStep()}
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                إلغاء التعديل
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesignForm;
