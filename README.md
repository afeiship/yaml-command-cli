# yaml-command-cli
> Yaml cmd cli.

## installation
```shell
git clone https://github.com/afeiship/yaml-command-cli.git
cd yaml-command-cli
npm link
```

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
  dynamic1:
    - cd {0}
    - tar zcf {1}.tar.gz *.png
    - ls -alh
```


```conf
❯ ycc -c dynamic1 ~/Downloads picture
total 380680
drwx------+ 16 alo7.aric  staff   512B Nov 15 14:01 .
drwxr-xr-x+ 79 alo7.aric  staff   2.5K Nov 15 11:29 ..
-rw-r--r--@  1 alo7.aric  staff   6.0K Nov 11 09:48 .DS_Store
-rw-r--r--@  1 alo7.aric  staff   102K Nov 11 11:03 Snip20211111_100.png
-rw-r--r--@  1 alo7.aric  staff    39K Nov 11 14:52 Snip20211111_102.png
-rw-r--r--@  1 alo7.aric  staff    19K Nov 11 15:58 Snip20211111_103.png
-rw-r--r--@  1 alo7.aric  staff   141K Nov 11 18:04 Snip20211111_105.png
-rw-r--r--@  1 alo7.aric  staff    53K Nov 11 10:39 Snip20211111_98.png
-rw-r--r--@  1 alo7.aric  staff    95K Nov 12 16:33 Snip20211112_106.png
-rw-r--r--@  1 alo7.aric  staff   6.8K Nov 15 09:57 Snip20211115_107.png
-rw-r--r--   1 alo7.aric  staff   237B Nov  9 09:45 package.json
-rw-r--r--   1 alo7.aric  staff   415K Nov 15 14:01 picture.tar.gz
```


```shell
# command: sync
ycc -c sync

# command: prd2dev
ycc -c prd2dev

# composite
ycc -c sync,prd2dev

# dynamic args
ycc -c dynamic1 ~/Downloads picture
```


## configuration
```conf
; in home dir
~/.ycc.yml

; in project dir
current_project_dir/.ycc.yml
```
