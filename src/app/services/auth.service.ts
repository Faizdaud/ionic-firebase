import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc,Firestore, setDoc, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }



  async register({email, password}: {email:string; password:string}){
    try{
      const credentials = await createUserWithEmailAndPassword(this.auth, email, password);
      const ref = doc(this.firestore, 'users/${credentials.user.uid}');
      setDoc(ref,{ email});
      return credentials;
    } catch(e){
      console.log(e)
      return null;
    }
  }


  async login({email,password}: {email:string, password:string}){
    try{
     const credentials = await signInWithEmailAndPassword(
       this.auth, 
       email,
       password
     )
     return credentials;
    }catch(e){
     return null;
    }
 
   }

   resetPassword(email:string){
    return sendPasswordResetEmail(this.auth,email);
   }
}
