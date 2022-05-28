const command = process.argv;

const value = command[2];

// Git Commands
const add = 'git add';
const commit = 'git commit -m "salut"';
const push = 'git push';

const init = () => {
  return 'git init && git add . && git commit -m "first commit" && git remote add origin https://github.com/gfxxx/gix.git && git push origin master'
}

const ac = () => {
  console.log('ac');
  return add + ' && ' + commit;
}

const acp = () => {
  console.log('acp');
  return add + ' && ' + commit + ' && ' + push;
}

const execut = () => {
  let com;
  switch(value) {
    case 'init':
      com = init();
      break;
    case 'ac':
      com = ac();
      break;
    case 'acp':
      com = acp();
      break;
    default:
      console.log('unknown command')
  }
  require('child_process').exec(com, (err, stdout, stderr) => {
    if(err) console.error(err)
    if(stdout) console.log(stdout)
    if(stderr) console.error(stderr)
  })
}

execut();