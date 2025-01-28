import React, { useState } from 'react'
import Login from './login';
import Signup from './signup';
import { LoginMode } from '../../shared/enum';

const OnBoarding = () => {
  const [isLogin, setIsLogin] = useState(LoginMode.login);
  return (
    <div className='w-full flex justify-center'>
      {
        isLogin === LoginMode.login ?
        <Login loginMode={setIsLogin}/>:
        <Signup loginMode={setIsLogin}/>
      }
    </div>
  )
}

export default OnBoarding