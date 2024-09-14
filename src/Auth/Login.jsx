import React from 'react'
import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import Upper from '../Shades/Upper'
import Lower from '../Shades/Lower'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setIsLoading] = useState(false);
  
  
    const validateEmail = (email) => {
  
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return regex.test(email);
    };
  
    const handleSignIn = async (e) => {
      e.preventDefault();
  
      if (!validateEmail(email)) {
        alert('Please enter a valid email.');
        return;
      }
      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
      }
  
      try {
        setIsLoading(true);
        const { user, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          alert('Sign in failed. Please check your credentials and try again.');
        } else {
          alert('Sign in successful!');
  
  
        }
      } catch (error) {
        console.log('Error:', error.message);
      } finally {
        setIsLoading(false);
      }
  
      setIsLoading(true);
  
      setTimeout(() => {
        setIsLoading(false);
  
      }, 2000);
  
  
    };
  
  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center bg-neutral-100'>
        <Upper/>
        <Lower/>
     
        <div className='flex flex-col items-center justify-center lg:w-[80%] w-[90%] z-20'>
    <p className="text-zinc-800 text-2xl font-semibold font-['Noto Sans'] mt-10">Welcome ADMIN!</p>
        <p className="text-md text-zinc-800 text-base font-normal font-['Noto Sans'] mt-10">Enter your Email</p>
        <input
          className="lg:w-[60%] w-[90%] py-3 bg-neutral-700 bg-opacity-10 rounded-2xl outline-none px-4"
          type="email"
          placeholder='Email *'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p className="text-md text-zinc-800 text-base font-normal font-['Noto Sans'] mt-10">Enter your Password</p>
        <div className="flex justify-between lg:w-[60%] w-[90%] py-3 bg-neutral-700 bg-opacity-10 rounded-2xl">
          <input
            type={showPassword ? 'text' : 'password'}
            className='bg-transparent w-full outline-none px-4'
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className=" pr-4 ">

            {showPassword ? (
              <AiOutlineEyeInvisible
                className="w-6 h-6 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <AiOutlineEye
                className="w-6 h-6 text-gray-400 cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
        </div>

     
        {loading ? <div className="bg-indigo-500 hover:bg-indigo-700 flex justify-center items-center h-[50px] lg:w-[60%] w-[90%]  text-white text-md font-semibold hover:font-bold hover:scale-105 font-['Noto Sans'] rounded-2xl  shadow-md mt-12">Loading...</div>
          : <button className="bg-indigo-500 hover:bg-indigo-700 h-[50px] lg:w-[60%] w-[90%]  text-white text-md font-semibold hover:font-bold hover:scale-105 font-['Noto Sans'] rounded-2xl  shadow-md mt-12"
            onClick={handleSignIn}>Login</button>
        }

</div>
    </div>
  )
}

export default Login
