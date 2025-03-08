async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./node');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
  } else {
    const { worker } = await import('./browser');
    worker.start({
      onUnhandledRequest: 'bypass',
      quiet: true,
      waitUntilReady: true,
    });
  }
}

initMocks();

export {};
