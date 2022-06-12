import { useEffect, useState } from "react";
import { Search, Loading } from "carbon-components-react";
import Card from "./components/Card";

import "./app.scss";
import useDebounce from "./hooks/useDebounce";

function App() {
	const [newsData, setNewsData] = useState(undefined);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [searchKeyword, setSearchKeyword] = useState("");
	const debouncedValue = useDebounce(searchKeyword);

	// Effect to fetch search results
	useEffect(() => {
		const fetchSearchResults = async () => {
			const endpoint = "http://localhost:1337/api/news/" + debouncedValue;

			try {
				setIsLoading(() => true);
				const response = await fetch(endpoint);
				const blob = await response.json();
				setNewsData(() => blob.data);

				if (blob) {
					setIsError(() => false);
					setIsLoading(() => false);
				}
			} catch (err) {
				console.error(err);
				setIsError(() => true);
				setIsLoading(() => false);
			}
		};

		fetchSearchResults();
	}, [debouncedValue]);

	// Effect to fetch data on initial mount
	useEffect(() => {
		const fetchData = async () => {
			const endpoint = "http://localhost:1337/api/news";

			try {
				setIsLoading(() => true);
				const response = await fetch(endpoint);
				const blob = await response.json();
				setNewsData(() => blob.data);

				if (blob) {
					setIsError(() => false);
					setIsLoading(() => false);
				}
			} catch (err) {
				console.error(err);
				setIsError(() => true);
				setIsLoading(() => false);
			}
		};

		fetchData();
	}, []);
	return (
		<main className="container px-4 pt-12 mx-auto">
			<h1 className="title text-2xl text-center mb-10">
				Scrape news from Rappler and Manila Bulletin
			</h1>
			<Search
				className="bg-neutral-100 mb-8"
				labelText="Search"
				placeholder="Search news"
				onChange={(e) => setSearchKeyword(e.target.value)}
			/>
			{isError && (
				<span className="mx-auto w-fit flex items-center">
					Cannot fetch data
				</span>
			)}
			{isLoading && (
				<span className="mx-auto w-fit flex items-center">
					<Loading
						description="Data loading indicator"
						withOverlay={false}
						small
						active
					/>
					<span className="mx-4">Loading data...</span>
				</span>
			)}
			{newsData && (
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{newsData.map((newsItem) => (
						<li
							key={newsItem.headline}
							className="w-fit h-fit border border-[#f4f4f4]"
						>
							<Card {...newsItem} />
						</li>
					))}
				</ul>
			)}
		</main>
	);
}

export default App;
