import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import path from 'path';
import nx from '@jswork/next';
import NxYamlConfiguration from '@jswork/next-yaml-configuration';

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

  private static getCmds(inCmds) {
    return inCmds.join(' && ');
  }

  private conf;

  get commands() {
    const cfg = this.conf.gets();
    return cfg.commands;
  }

  async run() {
    const { args, flags } = this.parse(YamlCommandCli);
    if (!flags.cmd) return;
    const cfgPath = args.config || path.join(process.cwd(), '.ycc.yml');
    this.conf = new NxYamlConfiguration({ path: cfgPath });
    const cmd = YamlCommandCli.getCmds(this.commands[flags.cmd!]);
    if (flags.dryRun) {
      console.log('config:', cfgPath);
      console.log('command:', cmd);
    } else {
      console.log(execSync(cmd, { shell: '/bin/bash', encoding: 'utf8' }).trim());
    }
  }
}

export = YamlCommandCli;
