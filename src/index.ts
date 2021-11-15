import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import NxYamlConfiguration from '@jswork/next-yaml-configuration';

const EXEC_MODE = ' && ';

class YamlCommandCli extends Command {
  static description = 'describe the command here';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    cmd: flags.string({
      char: 'c',
      description: 'Execute the cmd from list.'
    }),
    dryRun: flags.boolean({
      char: 'd',
      description: 'If show debug.'
    })
  };

  static args = [{ name: 'config' }];

  private conf;

  private getYmlPath(inCfgPath) {
    const cfg = inCfgPath || path.join(process.cwd(), '.ycc.yml');
    const defPath = path.join(process.env.HOME!, '.ycc.yml');
    if (fs.existsSync(defPath)) {
      return [defPath].concat(cfg);
    }
    return [defPath];
  }

  private getCmds(inCmd) {
    const cmds = inCmd.split(',');
    return cmds
      .map((cmd) => {
        return this.commands[cmd].join(EXEC_MODE);
      })
      .join(EXEC_MODE);
  }

  get commands() {
    const cfg = this.conf.gets();
    return cfg.commands;
  }

  async run() {
    const { args, flags } = this.parse(YamlCommandCli);
    if (!flags.cmd) return;
    const cfgPath = args.config || path.join(process.cwd(), '.ycc.yml');
    const ymlPath = this.getYmlPath(cfgPath);
    this.conf = new NxYamlConfiguration({ path: ymlPath });
    const cmd = this.getCmds(flags.cmd!);
    if (flags.dryRun) return console.log('command:', cmd);
    console.log(execSync(cmd, { shell: '/bin/bash', encoding: 'utf8' }).trim());
  }
}

export = YamlCommandCli;
