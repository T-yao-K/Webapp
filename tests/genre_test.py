import requests
import time

def search_novels_by_genre_keyword(genre, keyword, limit=10):
    base_url = "https://api.syosetu.com/novelapi/api/"
    params = {
        "out": "json",
        "word": keyword,
        "genre": genre,
        "limit": limit,
        "of": "t-n-w-s-g",  # タイトル、Nコード、作者名、あらすじ、ジャンルを取得
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data[0]["allcount"] > 0:
            for novel in data[1:]:
                print(f"タイトル: {novel['title']}")
                print(f"Nコード: {novel['ncode']}")
                print(f"作者: {novel['writer']}")
                print(f"ジャンル: {novel['genre']}")
                print(f"あらすじ: {novel['story'][:100]}...")
                print("---")
        else:
            print("条件に合う小説が見つかりませんでした。")
    else:
        print(f"エラーが発生しました。ステータスコード: {response.status_code}")

    time.sleep(1)

if __name__ == "__main__":
    genre = input("ジャンル番号を入力してください（1: 恋愛、2: ファンタジー、...）: ")
    keyword = input("検索キーワードを入力してください: ")
    search_novels_by_genre_keyword(genre, keyword)
