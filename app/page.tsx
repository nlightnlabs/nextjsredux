
import PromptInput from './components/PromptInput';


const handleSubmit =async (e:any)=>{
  "use server"
  console.log(FormData)
}

const App = async () =>{

  return (
    <div className="flex flex-col w-full items-center h-[100%]">
        <PromptInput/>
    </div>
  );
}

export default App;
