import { Link } from "carbon-components-react";

export default function Card({ headline, link, imageUrl, source }) {
	return (
		<a href={link}>
			<span className="card flex flex-col p-2 gap-2">
				<span className="bg-slate-200">
					<img className="object-cover" src={imageUrl} alt={headline} />
				</span>
				<span className="flex flex-col justify-between">
					<span className="">
						<h4 className="title text-lg">{headline}</h4>
						<p className="text-sm">Source: {source}</p>
					</span>
					<Link className="self-end">Read more</Link>
				</span>
			</span>
		</a>
	);
}
