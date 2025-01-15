import React from 'react'
import {Auth} from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import './login.css'

const Login = ({supabase}) => {
  return (
    <div id='container-login'>
        <div id='login'>
            <Auth
            supabaseClient={supabase}
            appearance={{theme: ThemeSupa}}
            theme="dark"
            providers={['discord']}
            />
        </div>
    </div>
  )
}

export default Login