import { expect, test } from '@oclif/test';

import cmd = require('../src');

describe('ytl', () => {
  test
    .stdout()
    .do(() => cmd.run([]))
    .catch(/Command is required/);

  test
    .stdout()
    .do(() => cmd.run(['--list']))
    .it('runs ycc --list', (ctx) => {
      console.log('ctx.stdout', ctx.stdout);
      expect(ctx.stdout).to.contain('\ncmd1\ncmd2\ndynamic1');
    });

  test
    .stdout()
    .do(() => cmd.run(['-c cmd2 --dryRun']))
    .it('runs: ycc -c cmd2 -d', (ctx) => {
      expect(ctx.stdout).to.contain('KUBECONFIG=~/.kube/kube_config cd {0}');
    });
});
