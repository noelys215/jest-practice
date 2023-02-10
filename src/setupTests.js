import '@testing-library/jest-dom';

import { sever } from './mocks/server.js';
beforeAll(() => sever.listen());

afterEach(() => sever.resetHandlers);

afterAll(() => sever.close());
