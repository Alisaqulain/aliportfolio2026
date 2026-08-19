import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function run(label, command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...options,
  })
  child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`[${label}] exited with code ${code}`)
    }
  })
  return child
}

console.log('Starting MCA API (port 3001) and Next.js (port 3000)...')
console.log('Env check: http://localhost:3000/check')
console.log('Env check API: http://localhost:3000/api/mca/check?format=html')
console.log('OAuth setup: http://localhost:3000/api/mca/google/auth\n')

const api = run('api', process.execPath, [join(__dirname, 'dev-api.mjs')])
const next = run('next', process.execPath, [
  join(root, 'node_modules/next/dist/bin/next'),
  'dev',
])

function shutdown() {
  api.kill()
  next.kill()
  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
