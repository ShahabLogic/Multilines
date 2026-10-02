const { spawn } = require('child_process');
const path = require('path');

const root = __dirname;
const npmBin = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const api = spawn(process.execPath, [path.join(root, 'server.js')], {
  cwd: root,
  env: { ...process.env, API_PORT: process.env.API_PORT || '4301', HOST: '0.0.0.0' },
  stdio: 'inherit'
});
const web = spawn(npmBin, ['start'], {
  cwd: root,
  env: { ...process.env, HOST: '0.0.0.0', PORT: process.env.FRONTEND_PORT || '3000', BROWSER: 'none' },
  stdio: 'inherit'
});

function stop() {
  if (!api.killed) api.kill('SIGTERM');
  if (!web.killed) web.kill('SIGTERM');
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
api.on('exit', (code) => {
  if (code && code !== 0) console.error(`API server exited with code ${code}`);
});
web.on('exit', (code) => {
  if (code && code !== 0) console.error(`Frontend exited with code ${code}`);
});
