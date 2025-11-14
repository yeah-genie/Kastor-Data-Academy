"""
Reddit Data Scraper for Kastor Data Academy
Uses PRAW (Python Reddit API Wrapper)
"""

import praw
import pandas as pd
from datetime import datetime
import os
from dotenv import load_dotenv
from tqdm import tqdm
import time
from config import SUBREDDITS, MAX_POSTS_PER_KEYWORD, TIME_FILTER, SORT_BY

# Load environment variables
load_dotenv()

class RedditScraper:
    def __init__(self):
        """Initialize Reddit API connection"""
        self.reddit = praw.Reddit(
            client_id=os.getenv('REDDIT_CLIENT_ID'),
            client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
            user_agent=os.getenv('REDDIT_USER_AGENT', 'Kastor_Research_Bot/1.0')
        )

        # Test connection
        try:
            self.reddit.user.me()
            print("✓ Reddit API 연결 성공 (읽기 전용)")
        except:
            print("✓ Reddit API 연결 성공 (익명 모드)")

    def search_subreddit(self, subreddit_name, keywords, max_posts=50):
        """
        서브레딧에서 키워드 검색

        Args:
            subreddit_name: 서브레딧 이름
            keywords: 검색 키워드 리스트
            max_posts: 키워드당 최대 게시글 수

        Returns:
            DataFrame with collected posts
        """
        all_posts = []
        subreddit = self.reddit.subreddit(subreddit_name)

        print(f"\n{'='*60}")
        print(f"📊 수집 중: r/{subreddit_name}")
        print(f"{'='*60}")

        for keyword in tqdm(keywords, desc=f"r/{subreddit_name}"):
            try:
                # Search with keyword
                search_results = subreddit.search(
                    query=keyword,
                    sort=SORT_BY,
                    time_filter=TIME_FILTER,
                    limit=max_posts
                )

                for post in search_results:
                    post_data = {
                        'subreddit': f"r/{subreddit_name}",
                        'keyword': keyword,
                        'post_id': post.id,
                        'title': post.title,
                        'selftext': post.selftext[:500] if post.selftext else '',  # 첫 500자만
                        'author': str(post.author) if post.author else '[deleted]',
                        'created_utc': datetime.fromtimestamp(post.created_utc),
                        'upvotes': post.score,
                        'upvote_ratio': post.upvote_ratio,
                        'num_comments': post.num_comments,
                        'url': f"https://reddit.com{post.permalink}",
                        'collected_at': datetime.now()
                    }
                    all_posts.append(post_data)

                # Rate limiting
                time.sleep(0.5)

            except Exception as e:
                print(f"\n⚠ 오류 ({keyword}): {str(e)}")
                continue

        df = pd.DataFrame(all_posts)
        print(f"✓ r/{subreddit_name}: {len(df)}개 게시글 수집")

        return df

    def collect_all_data(self):
        """모든 서브레딧에서 데이터 수집"""
        all_data = []

        print(f"\n{'#'*60}")
        print(f"# Kastor Data Academy - Reddit 데이터 수집")
        print(f"{'#'*60}\n")

        for subreddit_name, config in SUBREDDITS.items():
            print(f"\n목표: {config['description']}")

            df = self.search_subreddit(
                subreddit_name,
                config['keywords'],
                MAX_POSTS_PER_KEYWORD
            )

            if not df.empty:
                df['category'] = config['description']
                all_data.append(df)

        # Combine all dataframes
        if all_data:
            combined_df = pd.concat(all_data, ignore_index=True)

            # Remove duplicates (same post found by multiple keywords)
            combined_df = combined_df.drop_duplicates(subset=['post_id'])

            print(f"\n{'='*60}")
            print(f"📈 총 수집 결과")
            print(f"{'='*60}")
            print(f"총 게시글: {len(combined_df)}개")
            print(f"서브레딧별:")
            print(combined_df.groupby('subreddit').size())

            return combined_df

        return pd.DataFrame()

    def save_raw_data(self, df, filename):
        """원본 데이터 저장"""
        if df.empty:
            print("⚠ 저장할 데이터가 없습니다.")
            return

        # Create output directory
        os.makedirs('output', exist_ok=True)

        # Save as CSV
        csv_path = f"output/{filename}.csv"
        df.to_csv(csv_path, index=False, encoding='utf-8-sig')

        # Save as Excel (더 보기 좋음)
        excel_path = f"output/{filename}.xlsx"
        df.to_excel(excel_path, index=False, engine='openpyxl')

        print(f"\n✓ 데이터 저장 완료:")
        print(f"  - CSV: {csv_path}")
        print(f"  - Excel: {excel_path}")

        return csv_path, excel_path


def main():
    """실행 예시"""
    scraper = RedditScraper()

    # 데이터 수집
    df = scraper.collect_all_data()

    # 저장
    if not df.empty:
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        scraper.save_raw_data(df, f'reddit_raw_data_{timestamp}')

        return df

    return None


if __name__ == "__main__":
    main()
