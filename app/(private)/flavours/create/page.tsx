'use client'
import { Button, Form, Input, Textarea } from "@nextui-org/react";
import { createBase } from './actions';

export default function Page() {


    return (
        <div className="min-h-screen">
			<h1>Create new flavour</h1>
            <Form className="w-full max-w-xs">
                <Input name="name" label="Name" type="text" />
                <Textarea name="description" label="Description"></Textarea>

                <Button formAction={createBase} type="submit">Save</Button>
            </Form>
        </div>
    );
}