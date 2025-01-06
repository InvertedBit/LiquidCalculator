'use client'
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Flavour, FlavourCard } from '@/components/cards/FlavourCard';

export default function Bases() {
	const router = useRouter();

	const [flavours, setFlavours] = useState(new Array<Flavour>);

	useEffect(() => {
		const supabase = createClient();

		supabase
			.from('flavours')
			.select()
			.then((data) => {
				if (data?.data) {
					setFlavours(data?.data);
				}
			});

	},[]);


	const flavourCards = flavours.map((item, key) => <FlavourCard key={key} {...item} />)

  return (
    <div className="container mx-auto max-w-5xl">
			<div className="flex flex-row">
				<h1 className="text-3xl basis-full">Flavours</h1>
				<Button color="primary" onPressEnd={() => router.push('/flavours/create')}>Create new</Button>
			</div>
			<div className="grid grid-cols-4 gap-5 py-10">
				{flavourCards}
			</div>
    </div>
  );
}
