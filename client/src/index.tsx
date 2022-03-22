import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Root from "./Root";

const queryClient = new QueryClient();

ReactDOM.render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<Root />
		</BrowserRouter>
	</QueryClientProvider>,
	document.getElementById("root")
);
