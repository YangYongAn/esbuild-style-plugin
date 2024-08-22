import 'jest'
import * as esbuild from 'esbuild'
import path from 'path'

import stylePlugin from '../../src'

const basePath = './test/repeat-css/src/pages'

test('Test @repeat-css', async () => {
  await esbuild.build({
    entryPoints: [path.join(basePath, 'main.jsx'), path.join(basePath, 'sub.jsx')],
    outdir: path.join(basePath, 'dist'),
    bundle: true,
    plugins: [
      testPlugin(),
      stylePlugin({
        onEvent: (event, data) => {
          console.log('event:', event, data)
        }
      }),
    ],
    jsxFactory: 'h',
    metafile: true
  })
})

function testPlugin() {
  return {
    name: 'test-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onEnd(result => {
        console.log('onEnd', result)
      })
    }
  }
}
