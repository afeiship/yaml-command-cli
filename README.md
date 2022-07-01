# ytl
> Yaml task list.

## installation
```shell
# public
npm i -g @jswork/ytl

# private
git clone https://github.com/afeiship/ytl.git
cd ytl
npm i && npm link
npm run build
```

## usage
```yml
# .ytl.yml
name: project_name
cache: 2QBKI2nT
vars:
  remote: /home/aric.zheng/aric-jswork/jsw-rails/db
  local: ${{ env.HOME }}/aric-jswork/jsw-rails/db
tasks:
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
~/.ytl.yml

; in project dir
current_project_dir/.ytl.yml
```
