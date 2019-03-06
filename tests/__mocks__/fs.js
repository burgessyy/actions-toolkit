const fs = jest.genMockFromModule('fs')
const realFs = jest.requireActual('fs')

const fileHolder = new Map()

// Allow reading from disk.
fs.readFile = realFs.readFile

// Write file contents to memory.
fs.writeFile = jest.fn((path, contents, cb) => {
  fileHolder.set(path, contents)
  // In mock world, we can never fail. :')
  cb(null)
})

fs.mkdir = jest.fn((path, cb) => { cb(null) })

// Add a helper method for getting memory FS.
fs.__getContents = path => fileHolder.get(path)

module.exports = fs
