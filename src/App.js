import React from 'react';

import { useState,useEffect } from 'react';
import {isConfiguredAzure,analyzeImage} from './api/azure-image-analysis.js';
import {isConfiguredOpenAI,generateImage} from './api/openai-image-generation.js';


function App() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [apiResponse2, setApiResponse2] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);


  useEffect(() => {
    
    if (!isConfiguredAzure() && !isConfiguredOpenAI()) {
      setIsConfigured(false);
    }
   
  }, []);

  const DisplayResults = () => {

    return (
      //show image preview and apiresponse 

      <div>
        <h2>Computer Vision Analysis</h2>
        <img style={{ width: 300, height: 300 }} src={inputValue} alt="Image to analyze" />
        <p>{inputValue}</p>
        <p>{apiResponse}</p>
      </div>
    );
  };

  const GenerateImage = () => {
    return (

      <div>
        <h2>OPENAI Image Generator</h2>
        <img style={{ width: 500, height: 500 }} src={apiResponse2} alt="Image generate" />
      </div>
    );
  };


const validateUrl = (inputValue) => {
    try {
      new URL(inputValue);
      return true;
    } catch (error) {
      return false;
    }
}

  const handleAnalyzeClick = async () => {
    setApiResponse2('');
    setIsProcessing(true);
    if (!validateUrl(inputValue)) {
      alert('Please enter a valid URL');
      setIsProcessing(false);
      setApiResponse('');
      return;
    }
    const response = await analyzeImage(inputValue);

    setApiResponse(response);
    setIsProcessing(false);
  };

  const handleGenerateClick = async () => {
    setApiResponse('');
    setIsProcessing(true);
    if (validateUrl(inputValue)) {
      alert('Please enter a valid prompt');
      setIsProcessing(false);
      setApiResponse2('');
      return;
    }
    const response = await generateImage(inputValue);
 
      setApiResponse2(response.data[0].url);
      setIsProcessing(false);
  };

  return (
    <div className="App">
      {isConfigured ? (
        <>
          <h1>Computer Vision</h1>
          <p>Insert URL or type prompt</p>
          <input
            placeholder="Insert URL to analyze or generate a prompt"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br />
          <button style={{ margin: 10 }} onClick={handleAnalyzeClick}>
            Analyze
          </button>
          <button onClick={handleGenerateClick}>Generate</button>
          <br />
          <br />
          {/* show GenerateImage or DisplayResults based on the button clicked */}
          {isProcessing ? <p>Processing...</p> : null}
          {apiResponse ? <DisplayResults /> : null}
          {apiResponse2 ? <GenerateImage /> : null}
        </>
      ) : (
        <p>Site is not well configured</p>
      )}
    </div>
  );
}

export default App;
