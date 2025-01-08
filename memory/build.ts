import type {BuildConfig} from 'bun'

const defaultBuildConfig: BuildConfig = {
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'node',
}

// @ts-ignore top-level await is perfectly fine with the tsconfig
await Promise.all([
    Bun.build({
        ...defaultBuildConfig,
        format: 'esm',
        naming: '[dir]/[name].js'
    }),
    Bun.build({
        ...defaultBuildConfig,
        format: 'cjs',
        naming: '[dir]/[name].cjs'
    })
])