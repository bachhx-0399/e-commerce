import { Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';

const middleware: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger({ collapsed: true }));
}

export default middleware;
