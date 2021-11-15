# yaml-command-cli
> Yaml cmd cli.


## usage
```yml
# .ycc.yml
vars:
  remote: /home/aric.zheng/aric-jswork/jsw-rails/db
  local: ${{ env.HOME }}/aric-jswork/jsw-rails/db
commands:
  sync:
    - scp west:${{ vars.remote }}/production.sqlite3 ${{ vars.local }}/production.sqlite3
  prd2dev:
    - cd ${{ vars.local }}
    - cp production.sqlite3 development.sqlite3
```

```shell
# command: sync
ycc -c sync

# command: prd2dev
ycc -c prd2dev

# composite
ycc -c sync,prd2dev
```
