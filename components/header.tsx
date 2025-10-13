'use client'

import React from 'react'
import { Button } from './ui/button'
import { signOut } from '@/app/(auth)/actions'
import { useRouter } from 'next/navigation';
import { generateId } from 'better-auth';

function Header() {

    const router = useRouter();

    const handleNewChat = () => {
        router.push(`/${generateId()}`);
    }

  return (
    <div className='flex justify-between items-center p-4 border-b bg-background'>
        <h1 className='text-2xl font-bold'>
            IMAP AI Chat
        </h1>
        <div className='flex gap-2'>
            <Button variant={'outline'} onClick = {handleNewChat} >
                New Chat
            </Button>
            <Button variant={'default'} onClick = {signOut} >
                Sign Out
            </Button>
        </div>

    </div>
  )
}

export default Header