'use client'
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export async function createBase(formData: FormData) {
    const supabase = createClient();

    const data = {
        name: formData.get('name'),
        description: formData.get('description'),
        pg: 50,
        vg: 50,
    };

    console.log(data);



    const { error } = await supabase
        .from('flavours')
        .insert(data);

    
    if (error) {
        redirect('/error')
    }

    redirect('/flavours')
}