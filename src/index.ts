import { Command, flags } from '@oclif/command';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import ipt from '@jswork/ipt';
import chalk from 'chalk';
import nx from '@jswork/next';
import NxYamlConfiguration from '@jswork/next-yaml-configuration';
import NxLruFsStorage from '@jswork/next-lru-fs-storage';
import '@jswork/next-tmpl';
import '@jswork/next-random-string';

const EXEC_MODE = ' && ';
const ENTRY_FILE = '.ytl.yml';
const STUB_CACHE = { store: null, set: () => {}, get: () => null };
const initYaml =
  'name: project_name\n' +
  `cache: ${nx.randomString(8)}\n` +
  'vars:\n' +
  '  home: ${{ env.HOME }}\n' +
  '  var1: value1\n' +
  'tasks:\n' +
  '  cmd1:\n' +
  '    - echo "hello"\n' +
  '  cmd2:\n' +
  '    - echo "world"\n';

class Ytl extends Command {
  static strict = false;
  static description = 'Yaml task list.';

  static flags = {
    help: flags.help({ char: 'h' }),
    quite: flags.boolean({ char: 'q', description: 'quite mode', default: false }),
    init: flags.boolean({ char: 'i', description: 'init config file' })
  };

  get commands() {
    return this.conf.get('tasks');
  }

  get entryfile() {
    return path.join(process.cwd(), ENTRY_FILE);
  }

  get cache() {
    const cacheKey = this.conf.get('cache');
    if (!cacheKey) return STUB_CACHE;
    const store = new NxLruFsStorage(cacheKey);
    return {
      store,
      set: (value) => store.set('ipt', value),
      get: () => store.get('ipt')
    };
  }

  get conf() {
    if (!fs.existsSync(this.entryfile)) {
      console.log(chalk.red.bold('🤡: ytl config file not found, please run `ytl --init`'));
      process.exit(1);
    }
    return new NxYamlConfiguration({ path: this.getYmlPath(this.entryfile) });
  }

  private getYmlPath(inCfgPath) {
    const cfg = inCfgPath || path.join(process.cwd(), ENTRY_FILE);
    const defPath = path.join(process.env.HOME!, ENTRY_FILE);
    if (fs.existsSync(defPath)) {
      return [defPath].concat(cfg);
    }
    return [inCfgPath];
  }

  private getCmdStr(inCmd, inArgv) {
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

  async initConfig() {
    fs.writeFileSync(this.entryfile, initYaml);
    console.log('init ytl config file success, at ', this.entryfile);
  }

  async main(inParsed) {
    const { argv, flags } = inParsed;
    const cache = this.cache;

    const res = await ipt(Object.keys(this.commands), { default: cache.get() });
    const cmdStr = this.getCmdStr(res, argv);
    const cmdRes = execSync(cmdStr, { shell: '/bin/bash', encoding: 'utf8' });
    cache.set(res);
    if (flags.quite) return;
    console.log(chalk.white.bold('commands: ') + chalk.green.bold(cmdStr));
    console.log(cmdRes.trim());
  }

  async run() {
    const { argv, flags } = this.parse(Ytl);
    if (flags.init) return await this.initConfig();
    this.main({ argv, flags });
  }
}

export = Ytl;
