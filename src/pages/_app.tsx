import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../../theme';

import '../styles/globals.scss';
import 'macro-css';
import { Header } from '../components/Header';
import Head from 'next/head';

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

export default MyApp;
