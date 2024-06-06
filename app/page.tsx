import React from 'react';
import PromptInput from './components/PromptInput';

const App = () => {

  const returnResponse:any = {}

  return (
    <div className="flex w-full border justify-center">
        <PromptInput returnResponse={returnResponse}/>
    </div>
  );
}

export default App;

