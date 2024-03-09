import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str =" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if (numbers) str += "0123456789"
    if(characters) str += "!@$%^&*()_+"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)

  },[length,numbers,characters,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 100)
    window.navigator.clipboard.writeText(password)

  },[password]) 

  
  useEffect(() => {
    passwordGenerator()
  },[length,numbers,characters,passwordGenerator])


  
  return (
    
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
    <h1 className='text-white text-center my-4'>Password generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input
     type="text"
     value={password}
     className="outline-none w-full py-1 px-3"
     placeholder="Password"
     readOnly
     ref={passwordRef}/>

     <button 
     onClick={copyPasswordToClipboard} 
     type="button"
     className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-red-800 focus:outline-none focus:ring focus:border-blue-300 transition duration-300'
     >copy</button>




    </div>

    <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
      <input
      type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e)=>{setLength(e.target.value)}}>
      </input>
      <label>Length: {length}</label>
    </div>
    <div>
      <input   type="checkbox"
          defaultChecked={numbers}
          id="numberInput"
          onChange={() => {
              setCharacters((prev) => !prev);
          }}/>
    </div>
    <label>Characters: {characters}</label>

    <div>
      <input   type="checkbox"
          defaultChecked={characters}
          id="characterInput"
          onChange={() => {
              setNumbers((prev) => !prev);
          }}/>
    </div>
    <label>Numbers: {numbers}</label>

    </div>
    </div>
    
  )
}

export default App
