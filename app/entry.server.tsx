import './entry.server.env';
import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import ReactDOMServer from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context?: AppLoadContext
) {
  const renderToReadableStream = ReactDOMServer.renderToReadableStream || 
    (ReactDOMServer as any).default?.renderToReadableStream;

  if (!renderToReadableStream) {
    // Fallback to renderToString for compatibility
    const markup = ReactDOMServer.renderToString(
      <RemixServer context={remixContext} url={request.url} />
    );
    
    responseHeaders.set('Content-Type', 'text/html');
    return new Response(`<!DOCTYPE html>${markup}`, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  }

  let shellRendered = false;
  
  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      onError(error: unknown) {
        responseStatusCode = 500;
        if (shellRendered) {
          console.error(error);
        }
      },
    }
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  shellRendered = true;

  responseHeaders.set('Content-Type', 'text/html');
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}