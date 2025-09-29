"use client"

import { Label } from '@radix-ui/react-label'
// import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useActionState } from 'react';

function AuthForm({active, action}: any) {
    const buttonLabel = active === "login" ? "Login" : "Sign Up";
    
    const [error, formAction, isPending] = useActionState<Error | null, FormData>(
        async (_: Error | null , formData: FormData) => {
          const data = Object.fromEntries(formData.entries())
          
          try{
            await action(data)  
          } catch(error){
            if(error instanceof Error){
                return error;
            }
          }
          return null
        },
        null,
    )

    
  return (
    <form action={formAction} className='relative flex flex-col gap-8'>
        <div className='space-y-4'>
            <Label>Email</Label>
            <Input 
            name='email'
            type='email'
            placeholder='Enter Email...'
            required             />

            <Label>Password</Label>
            <Input 
            name='password' 
            type='password'
            placeholder='Enter Password...'
            required />

            {error && <p className="text-red-500">{error.message}</p>}

            <Button
            type='submit'
            disabled={isPending}
            >
                {buttonLabel}
            </Button>
        </div>
    </form>
  )
}

export default AuthForm