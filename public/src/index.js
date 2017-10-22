import React from 'react';
import { render } from 'react-dom';
import Main from 'containers/main.container';
import { AppContainer } from 'react-hot-loader';

const renderApp = component => {
	render (
		<AppContainer>
			<Main />
		</AppContainer>,
		document.querySelector('#container')	
	)
}

renderApp(Main);

if (module.hot) {
	module.hot.accept('containers/main.container', () => { renderApp(Main) });
}