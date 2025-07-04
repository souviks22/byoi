import { greet } from '../src';

test('greets by name', () => {
    expect(greet('Souvik')).toBe('Hello, Souvik!');
});
