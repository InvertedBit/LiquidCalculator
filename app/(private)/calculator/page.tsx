'use client'
import { Tab, Tabs } from "@nextui-org/react";
import BaseCalculator from "@/components/calculators/BaseCalculator";


export default function Page() {


    return (
        <div className="container max-w-5xl mx-auto">
            <h1 className="text-4xl py-10">Calculator</h1>
            <Tabs aria-label="Calculator types" variant="bordered" color="primary">
                <Tab key="liquid" title="Liquid">
                    <BaseCalculator />
                </Tab>
                <Tab key="base" title="Base">
                    <BaseCalculator />
                </Tab>
            </Tabs>
        </div>
    );
}