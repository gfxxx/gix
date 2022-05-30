import { exec } from 'child_process';

const command = process.argv.slice(2);

// Git Commands
const add = 'git add';
const commit = 'git commit -m "salut"';
const push = 'git push';

const init = () => {
  console.log({command})
  try {
    const cmds = []
    cmds.push('git init');
    cmds.push('git add .');
    // Get commit message and set it to "First commit" if none is provided
    const messageIndex = command.findIndex(e => e === '-m');
    const message = messageIndex !== -1 ? command[messageIndex + 1]: 'First commit';
    cmds.push(`git commit -m "${message}"`);
    // Get origin and throw error if no origin provided
    const originIndex = command.findIndex(e => e === '-o');
    if(originIndex === -1) throw new Error('An origin is required use -o to set origin');
    const origin = command[originIndex + 1];
    cmds.push(`git remote add origin ${origin}`)
    // Get branch and set it to master if none provided
    const branchIndex = command.findIndex(e => e === '-b');
    const branch = branchIndex !== -1 ? command[branchIndex + 1] : 'master';
    cmds.push(`git push origin ${branch}`)
    return cmds
  } catch (error) {
    console.error(error);
  }
}

const ac = () => {
  console.log('ac');
  // Get commit message and set it to "New commit" if none is provided
  const messageIndex = command.findIndex(e => e === '-m');
  const message = messageIndex !==1 ? command[messageIndex + 1]: 'New commit';
  return `git add . && git commit -m ${message}`;
}

const acp = () => {
  console.log('acp');
  // Get commit message and set it to "New commit" if none is provided
  const messageIndex = command.findIndex(e => e === '-m');
  const message = messageIndex !== -1 ? command[messageIndex + 1]: 'New commit';
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
  for(let c of com){
    exec(c, (err, stdout, stderr) => {
      if(err) console.error(err)
      if(stdout) console.log(stdout)
      if(stderr) console.error(stderr)
    })
  }
}

execut();