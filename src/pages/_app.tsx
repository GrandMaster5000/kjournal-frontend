import '../styles/globals.scss';
import 'macro-css';
import Head from 'next/head';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../../theme';
import { Header } from '../components/Header';
import { wrapper } from '../redux/store';
import { setUserData } from '../redux/slices/user.slice';
import { Api } from '../utils/api';

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

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
	try {
		const userData = await Api(ctx).user.getMe();

		store.dispatch(setUserData(userData));
	} catch (err) {
		if (ctx.asPath === '/write') {
			ctx.res.writeHead(302, {
				Location: '/403',
			});
			ctx.res.end();
		}
		console.log(err);
	}

	return {
		pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
	};
});

export default wrapper.withRedux(MyApp);
