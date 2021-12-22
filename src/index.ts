import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import nx from '@jswork/next';
import NxYamlConfiguration from '@jswork/next-yaml-configuration';
import nxTmpl from '@jswork/next-tmpl';

interface Option {
  label: string;
  value: string;
}

const EXEC_MODE = ' && ';

class YamlCommandCli extends Command {
  static strict = false;
  static description = 'describe the command here';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    cmd: flags.string({
      char: 'c',
      description: 'Execute the cmd from list.'
    }),
    list: flags.boolean({
      char: 'l',
      description: 'List all commands.'
    }),
    dryRun: flags.boolean({
      char: 'd',
      description: 'If show debug.'
    })
  };

  private conf;

  private getYmlPath(inCfgPath) {
    const cfg = inCfgPath || path.join(process.cwd(), '.ycc.yml');
    const defPath = path.join(process.env.HOME!, '.ycc.yml');
    if (fs.existsSync(defPath)) {
      return [defPath].concat(cfg);
    }
    return [defPath];
  }

  private getCmds(inCmd, inArgv) {
    const cmds = inCmd.split(',');
    const envs = this.envs;
    const cmd = cmds
      .map((cmd) => {
        const pureCmd = this.commands[cmd].join(EXEC_MODE);
        return nxTmpl(pureCmd, inArgv);
      })
      .join(EXEC_MODE);
    return !envs ? cmd : `${envs.join(' ')} ${cmd}`;
  }

  private cmd2list() {
    const cmds = this.commands;
    const list: string[] = [];
    nx.forIn(cmds, (key) => list.push(key));
    console.log('Current commands list:');
    console.log(list.join('\n'));
  }

  get envs() {
    const cfg = this.conf.gets();
    return cfg.envs;
  }

  get commands() {
    const cfg = this.conf.gets();
    return cfg.commands;
  }

  async run() {
    const { argv, flags } = this.parse(YamlCommandCli);

    const cfgPath = path.join(process.cwd(), '.ycc.yml');
    const ymlPath = this.getYmlPath(cfgPath);
    this.conf = new NxYamlConfiguration({ path: ymlPath });
    if (flags.list) return this.cmd2list();
    const cmd = this.getCmds(flags.cmd!, argv);
    if (flags.dryRun) return console.log('\ncommand:\n', cmd);
    console.log(execSync(cmd, { shell: '/bin/bash', encoding: 'utf8' }).trim());
  }
}

export = YamlCommandCli;
