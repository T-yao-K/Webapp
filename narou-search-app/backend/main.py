from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NAROU_API_ENDPOINT = "https://api.syosetu.com/novelapi/api/"

GENRES = [
    "101", "102", "201", "202", "301", "302", "303", "304", "305", "306", "307",
    "401", "402", "403", "404", "9901", "9902", "9903", "9904", "9999", "9801"
]

@app.get("/search")
async def search_novels(
    keyword: str,
    limit: int = Query(default=10, le=500),
    genre: str = Query(default=None),
    order: str = Query(default="new", regex="^(new|favnovelcnt|reviewcnt|hyoka|impressioncnt|hyokacnt)$")
):
    params = {
        "out": "json",
        "lim": limit,
        "word": keyword,
        "order": order,
    }
    if genre:
        params["genre"] = genre
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.get(NAROU_API_ENDPOINT, params=params)
            response.raise_for_status()
            data = response.json()
            return data[1:]
        except httpx.TimeoutException:
            return {"error": "API request timed out"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {e}"}
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}

@app.get("/genres")
async def get_genres():
    genres = {
        "0": "未選択",
        "101": "異世界〔恋愛〕",
        "102": "現実世界〔恋愛〕",
        "201": "ハイファンタジー〔ファンタジー〕",
        "202": "ローファンタジー〔ファンタジー〕",
        "301": "純文学〔文芸〕",
        "302": "ヒューマンドラマ〔文芸〕",
        "303": "歴史〔文芸〕",
        "304": "推理〔文芸〕",
        "305": "ホラー〔文芸〕",
        "306": "アクション〔文芸〕",
        "307": "コメディー〔文芸〕",
        "401": "VRゲーム〔SF〕",
        "402": "宇宙〔SF〕",
        "403": "空想科学〔SF〕",
        "404": "パニック〔SF〕",
        "9901": "童話〔その他〕",
        "9902": "詩〔その他〕",
        "9903": "エッセイ〔その他〕",
        "9904": "リプレイ〔その他〕",
        "9999": "その他〔その他〕",
        "9801": "ノンジャンル〔ノンジャンル〕"
    }
    return genres

@app.get("/quiz")
async def get_quiz():
    genres = await get_genres()
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            # ランダムにジャンルを選択
            selected_genre = random.choice(GENRES)
            
            # 選択したジャンルの小説を取得（例えば20個）
            response = await client.get(NAROU_API_ENDPOINT, params={
                "out": "json",
                "lim": 20,
                "order": "random",
                "genre": selected_genre
            })
            response.raise_for_status()
            data = response.json()

            if len(data) < 21:  # 最初の要素はメタデータなので、21未満ならエラー
                return {"error": "十分な小説データを取得できませんでした"}

            novels = data[1:]  # メタデータを除外
            
            # 全ての小説データを返す
            return {
                "novels": [
                    {
                        "title": novel["title"],
                        "ncode": novel["ncode"],
                        "story": novel["story"],
                        "url": f"https://ncode.syosetu.com/{novel['ncode']}/"
                    }
                    for novel in novels
                ],
                "genre": selected_genre,
                "genre_name": genres[selected_genre]
            }

        except httpx.TimeoutException:
            return {"error": "API request timed out"}
        except httpx.HTTPStatusError as e:
            return {"error": f"HTTP error occurred: {e}"}
        except Exception as e:
            return {"error": f"An unexpected error occurred: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)