# yaml-command-cli
> Yaml cmd cli.


## usage
```yml
vars:
  remote: /home/aric.zheng/aric-jswork/jsw-rails/db
  local: /Users/aric.zheng/aric-jswork/jsw-rails/db
commands:
  sync:
    - scp west:${{ vars.remote }}/production.sqlite3 ${{ vars.local }}/production.sqlite3
```
