import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageMain from './components/PageMain';
import { SignIn } from './components/auth/SignIn';

import { AuthProvider, useAuth } from './hooks/useAuth';
import { SignUp } from './components/auth/SignUp';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { UpdateProfile } from './components/auth/UpdateProfile';

function App() {
  const { 
    emailAndPasswordSignIn, 
    emailAndPasswordSignUp,
    sendPasswordReset,
    error
  } = useAuth();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageMain />} />
          <Route path="/signIn" element={<SignIn onSignIn={emailAndPasswordSignIn} error={error}/>}/>
          <Route path="/signUp" element={<SignUp onSignUp={emailAndPasswordSignUp} error={error}/>}/>
          <Route path="/forgot-password" element={<ForgotPassword onSendReset={sendPasswordReset} error={error} />}/>
          <Route path='/update-profile' element={<UpdateProfile />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
