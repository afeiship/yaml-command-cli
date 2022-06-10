import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import ipt from 'ipt';
import nx from '@jswork/next';
import NxYamlConfiguration from '@jswork/next-yaml-configuration';
import '@jswork/next-tmpl';

const EXEC_MODE = ' && ';
const ENTRY_FILE = '.ycc.yml';
const opts = { stdin: process.stdin, stdout: process.stdout };

class YamlCommandCli extends Command {
  static strict = false;
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
    quite: flags.boolean({ char: 'q', description: 'quite mode', default: false })
  };

  get commands() {
    return this.conf.get('commands');
  }

  private conf;

  private getYmlPath(inCfgPath) {
    const cfg = inCfgPath || path.join(process.cwd(), ENTRY_FILE);
    const defPath = path.join(process.env.HOME!, ENTRY_FILE);
    if (fs.existsSync(defPath)) {
      return [defPath].concat(cfg);
    }
    return [defPath];
  }

  private getCmds(inCmd, inArgv) {
    const cmds = inCmd.split(',');
    const envs = this.conf.get('envs');
    const cmd = cmds
      .map((cmd) => {
        const pureCmd = this.commands[cmd].join(EXEC_MODE);
        return nx.tmpl(pureCmd, inArgv);
      })
      .join(EXEC_MODE);
    return !envs ? cmd : `${envs.join(' ')} ${cmd}`;
  }

  async run() {
    const { argv, flags } = this.parse(YamlCommandCli);
    const cfgPath = path.join(process.cwd(), '.ycc.yml');
    const ymlPath = this.getYmlPath(cfgPath);
    this.conf = new NxYamlConfiguration({ path: ymlPath });
    const cmdKeys = Object.keys(this.commands);

    ipt(cmdKeys, opts).then((res) => {
      const cmdStr = this.getCmds(res[0], argv);
      const cmdRes = execSync(cmdStr, { shell: '/bin/bash', encoding: 'utf8' });
      if (!flags.quite) console.log('cmd/response: ', cmdStr, cmdRes.trim());
    });
  }
}

export = YamlCommandCli;
