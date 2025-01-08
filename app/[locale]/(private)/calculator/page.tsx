'use client'
import { Tab, Tabs } from "@nextui-org/react";
import BaseCalculator from "@/components/calculators/BaseCalculator";
import { useTranslations } from "next-intl";


export default function Page() {

    const t = useTranslations('Calculator');

    return (
        <div className="container max-w-5xl mx-auto">
            <h1 className="text-4xl py-10">{t('title')}</h1>
            <Tabs aria-label={t('choose_calculator')} variant="bordered" color="primary">
                <Tab key="liquid" title={t('title_liquid')}>
                    <BaseCalculator />
                </Tab>
                <Tab key="base" title={t('title_base')}>
                    <BaseCalculator />
                </Tab>
            </Tabs>
        </div>
    );
}