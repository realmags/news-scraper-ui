// import logo from './logo.svg';
import { Button } from "carbon-components-react";

import "./app.scss";

function App() {
	return (
		<main className="content cds--css-grid">
			<h1 className="title cds--css-grid-column cds--col-span-4">
				Scrape news from Rappler and Manila Bulletin
			</h1>
			<Button className="cds--css-grid-column cds--col-span-4">
				This is mf button
			</Button>
		</main>
	);
}

export default App;
