import requests
import time

def get_novel_info(ncode):
    base_url = "https://api.syosetu.com/novelapi/api/"
    params = {
        "out": "json",
        "ncode": ncode,
    }
    
    response = requests.get(base_url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data[0]["allcount"] > 0:
            novel = data[1]
            print(f"タイトル: {novel['title']}")
            print(f"作者: {novel['writer']}")
            print(f"あらすじ: {novel['story']}")
        else:
            print("小説が見つかりませんでした。")
    else:
        print(f"エラーが発生しました。ステータスコード: {response.status_code}")

    # APIの利用制限を考慮して1秒待機
    time.sleep(1)

if __name__ == "__main__":
    ncode = input("小説のNコードを入力してください（例: n9669bk）: ")
    get_novel_info(ncode)
