# PG

IRIS実践プログラミングガイドDocker Build


## ビルドプロセス

### Build & Run
* `docker-compose up -d --build`

## 管理ポータル起動方法

[localhost:52779/csp/sys/%25CSP.Portal.Home.zen?IRISUsername=_system&IRISPassword=SYS](http://localhost:52779/csp/sys/%25CSP.Portal.Home.zen?IRISUsername=_system&IRISPassword=SYS)

## クルデンシャル情報

|項目           |値         |
|--------------|-----------|
|システムログイン |_system    |
|パスワード　	 |SYS  |

## ローカルセットアップ

* `>set inc = c:\git\pg\PM\PM.inc`
* `>write $system.OBJ.Load(inc)`
* `>set file = c:\git\pg\PM\SetUp.cls`
* `>write $system.OBJ.Load(file,"ck")`
* `>set dir = c:\git\pg`
* `>write ##class(PM.SetUp).SetupLocal(dir)`

