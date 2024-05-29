"use server";

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// import Zod to help validate forms
import { z } from 'zod';


// Once the database has been updated, the /dashboard/invoices path 
// will be revalidated, and fresh data will be fetched from the server.
import { revalidatePath } from 'next/cache';


// use rediret to redirect the user to /dashboard/invoices page after creation
import { redirect } from 'next/navigation';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'],{
      invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
  });
