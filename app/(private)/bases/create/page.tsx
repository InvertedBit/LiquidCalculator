'use client'
import { Button, Form, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { createBase } from './actions';

export default function Page() {

    const [pgContent, setPgContent] = useState("50");
    const [vgContent, setVgContent] = useState("50");
//   useEffect(() => {
//       const pgContentNumeric = Number.parseInt(pgContent);
//       const newVgContent = (100 - pgContentNumeric).toString();
//       if (vgContent != newVgContent)
//       {
//           setVgContent(newVgContent);
//       }
//   },[pgContent]);

//   useEffect(() => {
//       const vgContentNumeric = Number.parseInt(vgContent);
//       const newPgContent = (100 - vgContentNumeric).toString();
//       if (pgContent != newPgContent)
//       {
//           setVgContent(newPgContent);
//       }
//   },[vgContent]);

    const setRatio = (valueString: string, type: string) => {
        let value = Number.parseInt(valueString);
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }

        const invertedValue = 100 - value;
        
        if (type === "pg") {
            setPgContent(value.toString());
            setVgContent(invertedValue.toString());
        } else if (type === "vg") {
            setVgContent(value.toString());
            setPgContent(invertedValue.toString());
        }
    }

    return (
        <div className="min-h-screen">
            <div className="container max-w-3xl mx-auto">
                <h1 className="text-4xl py-10">Create new base</h1>
                <Form className="w-full max-w-xs">
                    <Input name="name" label="Name" type="text" />
                    <Select name="nicotineType" label="Nicotine type">
                        <SelectItem key="none">No Nicotine</SelectItem>
                        <SelectItem key="freebase-nicotine">Freebase Nicotine</SelectItem>
                        <SelectItem key="salt-nicotine">Salt Nicotine</SelectItem>
                    </Select>
                    <Input name="nicotineStrength" label="Nicotine strength" endContent={<span><sup>mg</sup>/<sub>ml</sub></span>} type="number" />
                    <Input name="pgContent" label="PG content" type="number" value={pgContent} onValueChange={(value) => setRatio(value, 'pg')} endContent="%" />
                    <Input name="vgContent" label="VG content" type="number" value={vgContent} onValueChange={(value) => setRatio(value, 'vg')} endContent="%" />

                    <Button formAction={createBase} color="primary" type="submit">Save</Button>
                </Form>
            </div>
        </div>
    );
}