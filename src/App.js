import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
 
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  );
}

function Header() {
 return(
   <div className='flex flex-row px-8 py-5'>
    <h1 className='text-3xl'>Photogenia</h1>
   </div>
 )
}

function Main() {
  const [status, setStatus] = useState('idle')
  const [prompt, setPrompt] = useState('a picture of jungkook from BTS on a horse')
  const [result, setResult] = useState('')
  async function request(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  function showResult() {
    console.log(prompt)
    setStatus('loading')
    request({'inputs': prompt}).then((response) => {
      const url = URL.createObjectURL(response)
      setResult(url)
      setStatus('finished')
    })
  }

  window.onload = (ev) => showResult()
  
  function submitPrompt(ev) {
    ev.preventDefault()
    showResult()
    
  }
  return (
    <div className='py-10 px-16 w-full'>
      <h1 className=' text-4xl text-center mb-2'>Welcome To Photogenia</h1>
      <p className=' text-center mb-5'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid itaque adipisci error facilis, eius natus commodi dolor ducimus ut expedita neque? Repudiandae nemo dicta odit quaerat a libero officiis facilis!</p>
      <InputBox prompt={prompt} setPrompt={setPrompt} submitPrompt={submitPrompt} status={status} setResult={setResult} setStatus={setStatus}/>
      
      <div className=' py-5 flex flex-col items-center text-center w-full'>
        <h1 className='text-3xl mb-5'>Image</h1>
        <img src={result}></img>
      </div>
    </div>
  )
}

function InputBox({prompt="a picture of jungkook from BTS on a horse", setPrompt, status, submitPrompt}) {

  return (
    <>
      <form onSubmit={submitPrompt}>
        <div className='flex flex-row items-center w-full bg-gray-300 px-5 py-3 rounded-full'>
          
            <input type='text' value={prompt} onChange={(e) => setPrompt(e.target.value)} className='bg-transparent w-full outline-none' placeholder='Enter a prompt'></input>
            <Button text='Prompt' status={status}/>
          
        </div>
      </form>
    </>
  )
}



function Button({ text, status }) {
  if(status == 'loading') text = 'Loading...';
  return <button className='bg-sky-500 px-5 py-3 text-white rounded-full' disabled={status == 'loading'}>{ text }</button>
}

export default App;
