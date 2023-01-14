import * as http from 'http';

export const showInformationAboutResponse = (req: http.IncomingMessage, res: http.ServerResponse) => {
	const MILLISEC = 1000;
	console.log(req.method, req.url, res.statusCode, process.hrtime()[0] / MILLISEC + ' ms');
}

export const isUUID = (str: string): boolean => {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(str);
}

