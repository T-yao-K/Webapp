# ゼミで制作したwebアプリです

なろうAPIを用いて、Web小説投稿サイト「小説家になろう」に投稿されている小説を検索できるものを実装してみました。  
React,FastAPI,Dockerを用いて実装しています。

## 動作環境  
* FastAPI: バージョン 0.68.0  
* React: バージョン 17.0.2  
* Docker: バックエンドは python:3.8-slim、フロントエンドは node:14 ベースイメージを使用  

## 起動方法  
クローンして以下のコマンドの実行  
~~~
docker-compose down
docker-compose build --no-cache
docker-compose up
~~~

7/31現在：8/20に研究室にて行われる発表会に向けて改良・機能追加中です。
