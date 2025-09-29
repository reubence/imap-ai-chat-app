import AuthForm from '@/components/auth-form'
import React from 'react'
import { signIn } from '../actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function Login() {
  return (
    <div className='max-w-sm mx-auto mt-32'>
        <Card>
        <CardHeader>
            <CardTitle>Login Form</CardTitle>
            <CardDescription>Enter Login Credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
            <AuthForm  active = "login" action = {signIn} />
        </CardContent>
        <CardFooter>
            <p>
                Don't have an account? {" "}
                <Link href={"/signup"} className='underline'>
                    Sign Up!
                </Link>
            </p>
        </CardFooter>
    </Card>
    </div>
  )
}

export default Login