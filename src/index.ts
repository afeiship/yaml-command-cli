import { Command, flags } from "@oclif/command";
import nx from "@jswork/next";
import NxYamlConfiguration from "@jswork/next-yaml-configuration";

class YamlCommandCli extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "config" }];

  private conf;

  async run() {
    const { args, flags } = this.parse(YamlCommandCli);
    this.conf = new NxYamlConfiguration({ path: args.config });
    console.log(this.conf.gets());
  }
}

export = YamlCommandCli;
