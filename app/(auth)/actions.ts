"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUp = async({email, password}: any) => {
    try{
        await auth.api.signUpEmail({
            headers: await headers(),
            body: {
                email, 
                password,
                name: email.split("@")[0],
            }
        })
    } catch (e: any){
        console.error(`Error signing up : ${e}`);
        throw new Error("Error signing up");
    }
    redirect("/");
};

export const signIn = async({email, password}: any) => {
    
    try{
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email, 
                password,
            }
        })
    } catch (e: any){
        console.error(`Error signing in : ${e}`);
        throw new Error("Error signing in");
    }
    redirect("/");
};

export const signOut = async() => {
    await auth.api.signOut({headers: await headers()});
    redirect("/login");
};