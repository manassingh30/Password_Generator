import { useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const [length,setLength] = useState(8)
  const[numbersAllowed,setNumbersAllowed] = useState(false);
  const[charAllowed,setCharAllowed] = useState(false);
  const[password,setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordgenerator = useCallback(() => {
    let pass= ""
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) str+="0123456789";
    if(charAllowed) str +="!@#$%^&*_+-={}[]|";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random() *str.length+1);
      pass +=str.charAt(char)
    }
    console.log(pass);
    setPassword(pass)

  },[length,numbersAllowed,charAllowed,setPassword])

  const copypasswordtoclipboard = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator();
  },[length,numbersAllowed,charAllowed,passwordgenerator])
  return (
    <>
      
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-9 text-orange-400 bg-gray-800'>
      <h1 className='text-4xl text-center text-white mb-3'>Password Generator</h1>
      <div className='flex shadow rounded-2xl overflow-hidden mb-4 py-3'>
          <input type="text"
          value = {password}
          className='outline-none w-full py-3 px-1'
          readOnly
          ref={passwordRef}
          placeholder='Password' />

          <button 
          onClick={copypasswordtoclipboard}
          className='bg-blue-700 text-sky-300 px-1 py-1 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>

          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numbersAllowed}
            id='numberInput'
            onChange={()=>{
              setNumbersAllowed((prev) =>!prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setCharAllowed((prev) =>!prev);
            }} />
            <label htmlFor="characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
