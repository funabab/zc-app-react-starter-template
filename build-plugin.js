const shell = require('shelljs')
const package = require('./package.json')

function run() {
  const reDomain = /^(?:https?:\/\/)?([a-zA-Z0-9-]+\.zuri\.chat)\/?$/
  let { pluginDomain } = package

  if (!reDomain.test(pluginDomain)) {
    console.error(
      `pluginDomain is invalid.\nMake sure the pluginDomain in your package.json is set to a valid plugin url.`
    )
    process.exit(1)
  }

  pluginDomain = pluginDomain.replace(reDomain, `https://$1/`)

  shell.cd(__dirname)
  shell.env['PUBLIC_URL'] = pluginDomain
  shell.exec('react-scripts build')
}

if (require.main === module) {
  run()
}
