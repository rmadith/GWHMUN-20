import './style.scss';
import App from './Components/App';
const {render} = wp.element;

const Root = () => <App/>;
render(
	<Root/>,
	document.getElementById('white-label-root')
);

