import test from 'ava'
import exec from 'execa'
import path from 'path'

test('execute locks in correct order', (t) => {
  return exec('run-headless', {
    input: exec('browserify', [path.join(__dirname, 'fixtures', 'web-workers.js')]).stdout
  })
    .then(result => {
      t.is(result.stdout, `write 1
read 1
read 2
read 3
write 2
read 4`)
    })
})

test('execute locks in correct order on single thread', (t) => {
  return exec('run-headless', {
    input: exec('browserify', [path.join(__dirname, 'fixtures', 'web-workers-single-thread.js')]).stdout
  })
    .then(result => {
      t.is(result.stdout, `write 1
read 1
read 2
read 3
write 2
read 4`)
    })
})
