const modulesFiles = require.context('./modules', true, /\.js$/)

function camelize(str) {
    let camelizeRE = /-(\w)/g
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : ''
    })
}
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = camelize(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

if (!uni.$ui) {
    uni.$ui = {}
}

uni.$ui.props = modules
