
import { useState,useCallback, useEffect, useRef } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(8);
  const [numall,setNumall] = useState(false);
  const [charset,setCharSet] = useState(false);
  const [password,setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const copyclipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,50)
    window.navigator.clipboard.writeText(password)
  },[password])


  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numall) str += "0123456789"
    if(charset) str += "!@#$%^&*_+{}[]><?:'~`"

    for (let i = 1; i <= length; i++) {
      
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)


  },[length,numall,charset,setPassword])

  useEffect(() => {
    passwordGenerator()
  },[length,numall,charset,passwordGenerator])

  return (
    <>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500
        bg-gray-800'>
        <h1 className='text-center text-white my-3'> Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
            <input 
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
            ></input>
            <button
            onClick={copyclipboard}
             className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            copy</button>
        </div>
            <div className='flex text-sm gap-x-2'>
              <div className='flex item-center gap-x-1'>
                  <input type='range' min={8} max={50} value={length}
                   className='cursor-pointer'
                   onChange={(e) => {setLength(e.target.value)}}>
                   </input>
                   <label>Length:{length}</label>
              </div>
              <div className='flex item-center gap-x-1'>
                  <input 
                    type='checkbox'
                    defaultChecked = {numall}
                    id='numberInput'
                    onChange={() => {
                      setNumall((prev) => !prev)
                    }}
                  ></input>
                  <label htmlFor='numberInput'>Numbers</label>
              </div>
              <div className='flex item-center gap-x-1'>
                  <input 
                    type='checkbox'
                    defaultChecked = {charset}
                    id='numberInput'
                    onChange={() => {
                      setCharSet((prev) => !prev)
                    }}
                  ></input>
                  <label htmlFor='numberInput'>Character</label>
              </div>
            </div>
        </div>
    </>
  )
}

export default App
