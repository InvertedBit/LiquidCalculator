'use client'
import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';

export async function createBase(formData: FormData) {
    const supabase = await createClient();

    const data = {
        name: formData.get('name'),
        nicotine_type: formData.get('nicotineType'),
        nicotine_strength: formData.get('nicotineStrength'),
        pg: formData.get('pgContent'),
        vg: formData.get('vgContent'),
    };

    console.log(data);


    const { error } = await supabase
        .from('bases')
        .insert(data);

    
    if (error) {
        redirect('/error')
    }

    redirect('/bases')
}