import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/style/fonts';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(
	<BrowserRouter>
		<App></App>
	</BrowserRouter>
);
