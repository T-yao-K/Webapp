import requests
import time

def get_rankings(ranking_type="daily", limit=10):
    base_url = "https://api.syosetu.com/novelapi/api/"
    params = {
        "out": "json",
        "order": ranking_type,
        "limit": limit,
        "of": "t-n-w-s-g-bp",  # タイトル、Nコード、作者名、あらすじ、ジャンル、ブックマーク数を取得
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data[0]["allcount"] > 0:
            for i, novel in enumerate(data[1:], 1):
                print(f"{i}位:")
                print(f"タイトル: {novel['title']}")
                print(f"Nコード: {novel['ncode']}")
                print(f"作者: {novel['writer']}")
                print(f"ジャンル: {novel['genre']}")
                print(f"ブックマーク数: {novel.get('bookmark', '情報なし')}")
                print(f"あらすじ: {novel['story'][:100]}...")
                print("---")
        else:
            print("ランキング情報を取得できませんでした。")
    else:
        print(f"エラーが発生しました。ステータスコード: {response.status_code}")

    time.sleep(1)

if __name__ == "__main__":
    ranking_type = input("ランキングの種類を選択してください（daily, weekly, monthly, quarter, yearly, alltime）: ")
    get_rankings(ranking_type)
