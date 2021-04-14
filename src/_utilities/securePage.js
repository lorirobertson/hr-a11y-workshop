import Router from 'next/router';

const securePage = async ctx => {
	try {
		const token = ctx.req.cookies.access_token;
		if ( !token ) {
			if (ctx.res) {
				ctx.res.writeHead(302, {Location: '/login'})
				ctx.res.end();
			} else {
				Router.push('/login');
			}
		}

	} catch (err) {
		return err;
	}
}

export default securePage;