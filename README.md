# ゼミで制作したwebアプリです

なろうAPIを用いて、Web小説投稿サイト「小説家になろう」に投稿されている小説を検索できるものを実装してみました。  
React,FastAPI,Dockerを用いて実装しています。

## 動作環境  
* FastAPI: バージョン 0.68.0  
* React: バージョン 8.3.1  
* Docker: バックエンドは python:3.12、フロントエンドは node:22.4.1 ベースイメージを使用  

## 起動方法  
クローンし、narou-search-appのディレクトリに移動して以下のコマンドの実行  
~~~
docker-compose down
docker-compose build --no-cache
docker-compose up
~~~
以下のURLにアクセス  
http://localhost:3000


## Times
7/31：とりあえず動くものが完成。8/20に研究室にて行われる発表会に向けて改良・機能追加中。  
8/8:リファクタリングとUI周りの改善  
8/11:Gitにfrontend以下のディレクトリ・ファイルが反映されない問題の解決。動作環境、特にDocker周りの整理。  
8/14:クイズ機能の実装、検索結果にあらすじを表示できるように