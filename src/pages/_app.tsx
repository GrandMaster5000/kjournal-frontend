import '../styles/globals.scss';
import 'macro-css';
import Head from 'next/head';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../../theme';
import { Header } from '../components/Header';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps }) {
	return (
		<MuiThemeProvider theme={theme}>
			<Head>
				<title>KJoutnal</title>
			</Head>
			<CssBaseline />
			<Header />
			<Component {...pageProps} />
		</MuiThemeProvider>
	);
}

export default wrapper.withRedux(MyApp);
