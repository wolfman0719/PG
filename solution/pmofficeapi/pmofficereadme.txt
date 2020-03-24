JavaScript API for Officeを使って、Activity Reportを作成するサンプル

以下のサイトで公開されているAPIの使用方法を参考にして、作成しています。 

http://www.atmarkit.co.jp/ait/articles/1301/25/news063_3.html

1.　Caché　REST環境の設定

管理ポータル>システム管理>セキュリティ>アプリケーション>ウェブアプリケーション

新しいウェブ・アプリケーション作成ボタンを押す

添付のrest-setup.jpgの様に設定する
（ネームスペースはUSERまたは自分専用の名前を使用しても良い）



2.　cacheapp.xmlの内容を環境に合わせる

http://localhost:57772/csp/user/pmofiiceapi.CSPの部分を自分の環境に合わせる。

pmapp.xmlに関する設定事項は、http://www.atmarkit.co.jp/ait/articles/1301/25/news063_3.htmlを参照してください。

3.　activityreport.xlsxをoffice2013のexcelで開く

sheet2の所で、

挿入>個人用アプリをクリック

office用アプリの画面で共有フォルダーを選ぶ

最新の情報のボタンをクリック

PMAppというアイコンが表示されるのでそれをクリックし、下の挿入ボタンを押す

Sheet1にアクティビティ情報が表示されているか確認

