import React from 'react'
import Upper from '../Shades/Upper'
import Lower from '../Shades/Lower'
import { useState } from 'react';
import Pdf from './Pdf'
import {AiOutlinePlusCircle} from 'react-icons/ai'

const Management = () => {
    const [folderName, setfolderName] = useState(false)  //the grade input
    const [subj,setSubj]=useState('')  //admin wants to add a subject
    const [pdfs, setPdfs] = useState(false);
   
    const Adding=()=>{
        setSubj(true)
    }

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen bg-neutral-100 gap-10'>
        <Upper/>
        <Lower/>
        <p className='md:text-6xl text-4xl font-extrabold text-indigo-500 pb-6'>Welcome Admin👋</p>

          {subj ?
          <>
           <Pdf pdfs={pdfs} setPdf={setPdfs} folderName={folderName} setfolderName={setfolderName} />
          </>
          : 
          <>
          <p className='md:text-3xl text-xl font-extrabold text-indigo-500 '>Enter the grade you want to Add</p>
          <input
            className="lg:w-[40%] w-[90%] py-3 bg-neutral-700 bg-opacity-10 rounded-2xl outline-none px-4"
            type="Grade"
            placeholder='Grade *'
            value={folderName}
            onChange={(e) => setfolderName(e.target.value)}
            required
          >
          </input>

         <AiOutlinePlusCircle onClick={Adding} className='bg-indigo-500 text-5xl p-2 font-bold rounded-full text-white cursor-pointer'/>
         </>
          }



    </div>
  )
}

export default Management

/*          */
