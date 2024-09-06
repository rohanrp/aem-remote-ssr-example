import { NextRequest, NextResponse } from 'next/server';
const { FRONT_END_HOST } = process.env;
export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl
    const {
        path = '',
		host = ''
    } = Object.fromEntries(searchParams.entries())
	const tempPath = path.split(process.env.NEXT_PUBLIC_AEM_PATH_PREFX || '')
	const payload = {
		html: '',
	}
	try {
		const pageToHit = tempPath[tempPath.length - 1] || '';
		const suffix = `?t=${new Date().getTime()}&aem=true`;
    	const url = (FRONT_END_HOST || '') + pageToHit + suffix;
		console.log('fetching html from ', url)
		const pageRes = await fetch(url, { headers: {
			'aemModelHeader': path
		} });

		
		const pageText = await pageRes.text();
		payload.html = pageText;
		
	} catch (e) {
		//
	}
	return NextResponse.json(payload, {
		headers: {
			'Access-Control-Allow-Origin': `${host}`,
			'Access-Control-Allow-Credentials': 'true'
		}
	});
}