import AuthForm from '@/components/auth-form'
import React from 'react'
import { signUp } from '../actions'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function SignUp() {
  return (
    <div className='max-w-sm mx-auto mt-32'>
        <Card>
        <CardHeader>
            <CardTitle>SignUp Form</CardTitle>
            <CardDescription>Enter Credentials to create a new account</CardDescription>
        </CardHeader>
        <CardContent>
            <AuthForm  active = "signup" action = {signUp} />
        </CardContent>
        <CardFooter>
            <p>
                Do you already have an account? {" "}
                <Link href={"/signin"} className='underline'>
                    Sign In!
                </Link>
            </p>
        </CardFooter>
    </Card>
    </div>
  )
}

export default SignUp