import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        typecheck: {
            tsconfig: './tsconfig.json',
        },
        include: ['**/*.{test,int.test}.{js,ts}'],
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'istanbul',
        },
    },
});
