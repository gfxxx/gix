const command = process.argv.slice(2);

// Git Commands
const add = 'git add';
const commit = 'git commit -m "salut"';
const push = 'git push';

const init = () => {
  // Get origin and throw error if no origin provided
  try {
    const originIndex = command.findIndex(i => '-o');
    if(originIndex === -1) throw new Error('An origin is required use -o to set origin');
    const origin = command[originIndex + 1];
    // Get branch and set it to master if none provided
    const branchIndex = command.findIndex(i => '-b');
    const branch = branchIndex ? command[branchIndex + 1] : 'master';
    // Get commit message and set it to "First commit" if none is provided
    const messageIndex = command.findIndex(i => '-m');
    const message = messageIndex ? command[messageIndex + 1]: 'First commit';
  
    return `git init && git add . && git commit -m "${message}" && git remote add origin ${origin} && git push origin ${branch}`
  } catch (error) {
    console.error(error);
  }
}

const ac = () => {
  console.log('ac');
  // Get commit message and set it to "New commit" if none is provided
  const messageIndex = command.findIndex(i => '-m');
  const message = messageIndex ? command[messageIndex + 1]: 'New commit';
  return `git add . && git commit -m ${message}`;
}

const acp = () => {
  console.log('acp');
  // Get commit message and set it to "New commit" if none is provided
  const messageIndex = command.findIndex(i => '-m');
  const message = messageIndex ? command[messageIndex + 1]: 'New commit';
  return `git add . && git commit -m ${message} && git push`;
}

const execut = () => {
  let com;
  switch(command[0]) {
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