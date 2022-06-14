# yaml-command-cli
> Yaml cmd cli.

## installation
```shell
# public
npm i -g @jswork/yaml-command-cli

# private
git clone https://github.com/afeiship/yaml-command-cli.git
cd yaml-command-cli
npm link
```

## usage
```yml
# .ycc.yml
name: project_name
cache: 2QBKI2nT
vars:
  remote: /home/aric.zheng/aric-jswork/jsw-rails/db
  local: ${{ env.HOME }}/aric-jswork/jsw-rails/db
commands:
  sync:
    - scp west:${{ vars.remote }}/production.sqlite3 ${{ vars.local }}/production.sqlite3
  prd2dev:
    - cd ${{ vars.local }}
    - cp production.sqlite3 development.sqlite3
  dynamic1:
    - cd {0}
    - tar zcf {1}.tar.gz *.png
    - ls -alh
```

## configuration
```conf
; in home dir
~/.ycc.yml

; in project dir
current_project_dir/.ycc.yml
```
