'use client'
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { BaseCard } from "@/components/cards/BaseCard";
import { Base } from '../../../../components/cards/BaseCard';

export default function Bases() {
	const router = useRouter();

	const [bases, setBases] = useState(new Array<Base>);

	useEffect(() => {
		const supabase = createClient();

		supabase
			.from('bases')
			.select()
			.then((data) => {
				if (data?.data) {
					setBases(data.data);
				}
			});

	},[]);


	const baseCards = bases.map((item, key) => <BaseCard key={key} base={item} />)

  return (
    <div className="container mx-auto max-w-5xl">
			<div className="flex flex-row">
				<h1 className="text-3xl basis-full">Bases</h1>
				<Button color="primary" onPressEnd={() => router.push('/bases/create')}>Create new</Button>
			</div>
			<div className="grid grid-cols-4 gap-5 py-10">
				{baseCards}
			</div>
    </div>
  );
}
