const path = require('path')

const view = (dir) => {
    return path.join(__dirname, "../../views/", dir)
}

module.exports = {
    view
}