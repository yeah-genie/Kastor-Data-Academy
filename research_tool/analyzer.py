"""
Data Analyzer for Kastor Research Tool
Sentiment analysis, keyword extraction, trend analysis
"""

import pandas as pd
import numpy as np
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from collections import Counter
import re
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import os

class DataAnalyzer:
    def __init__(self, df):
        """
        Initialize analyzer with dataframe

        Args:
            df: DataFrame from scraper
        """
        self.df = df.copy()
        self.sentiment_analyzer = SentimentIntensityAnalyzer()
        self.insights = {}

        # Create output directory
        os.makedirs('output/charts', exist_ok=True)

    def analyze_sentiment(self):
        """감정 분석 수행"""
        print("\n📊 감정 분석 중...")

        def get_sentiment(text):
            if pd.isna(text) or text == '':
                return 0.0
            scores = self.sentiment_analyzer.polarity_scores(str(text))
            return scores['compound']  # -1 (매우 부정) ~ +1 (매우 긍정)

        # Title과 selftext 감정 분석
        self.df['title_sentiment'] = self.df['title'].apply(get_sentiment)
        self.df['text_sentiment'] = self.df['selftext'].apply(get_sentiment)
        self.df['overall_sentiment'] = (self.df['title_sentiment'] + self.df['text_sentiment']) / 2

        # 감정 카테고리 분류
        def categorize_sentiment(score):
            if score > 0.3:
                return 'Positive'
            elif score < -0.3:
                return 'Negative'
            else:
                return 'Neutral'

        self.df['sentiment_category'] = self.df['overall_sentiment'].apply(categorize_sentiment)

        # 통계
        sentiment_stats = self.df['sentiment_category'].value_counts()
        avg_sentiment = self.df['overall_sentiment'].mean()

        self.insights['sentiment'] = {
            'average': avg_sentiment,
            'distribution': sentiment_stats.to_dict(),
            'positive_ratio': (sentiment_stats.get('Positive', 0) / len(self.df) * 100),
            'negative_ratio': (sentiment_stats.get('Negative', 0) / len(self.df) * 100)
        }

        print(f"✓ 평균 감정 점수: {avg_sentiment:.3f}")
        print(f"✓ 긍정: {self.insights['sentiment']['positive_ratio']:.1f}%")
        print(f"✓ 부정: {self.insights['sentiment']['negative_ratio']:.1f}%")

        return self.df

    def extract_pain_points(self):
        """고통점(문제점) 추출"""
        print("\n🔍 고통점 분석 중...")

        pain_keywords = [
            'hard', 'difficult', 'struggle', 'frustrat', 'overwhelm',
            'confus', 'give up', 'quit', 'too much', 'don\'t understand',
            'can\'t', 'impossible', 'stuck', 'lost', 'help'
        ]

        def count_pain_keywords(text):
            if pd.isna(text):
                return 0
            text_lower = str(text).lower()
            return sum(1 for keyword in pain_keywords if keyword in text_lower)

        self.df['pain_score'] = (
            self.df['title'].apply(count_pain_keywords) +
            self.df['selftext'].apply(count_pain_keywords)
        )

        # Top pain points (높은 pain_score + 많은 upvotes)
        pain_posts = self.df[self.df['pain_score'] > 0].sort_values(
            ['pain_score', 'upvotes'],
            ascending=[False, False]
        ).head(20)

        self.insights['pain_points'] = {
            'total_posts_with_pain': len(pain_posts),
            'avg_pain_score': self.df['pain_score'].mean(),
            'top_pain_posts': pain_posts[['title', 'pain_score', 'upvotes', 'url']].to_dict('records')
        }

        print(f"✓ 고통점을 표현한 게시글: {len(pain_posts)}개")
        print(f"✓ 평균 고통점 점수: {self.df['pain_score'].mean():.2f}")

        return pain_posts

    def analyze_keywords(self):
        """키워드 빈도 분석"""
        print("\n📝 키워드 분석 중...")

        # 모든 텍스트 합치기
        all_text = ' '.join(
            self.df['title'].fillna('') + ' ' +
            self.df['selftext'].fillna('')
        )

        # 단어 추출 (영어 단어만, 최소 4글자)
        words = re.findall(r'\b[a-zA-Z]{4,}\b', all_text.lower())

        # 불용어 제거
        stopwords = {
            'this', 'that', 'with', 'from', 'have', 'been', 'were',
            'what', 'when', 'where', 'which', 'while', 'their', 'there',
            'would', 'could', 'should', 'about', 'other', 'some', 'such'
        }

        words = [w for w in words if w not in stopwords]

        # 상위 키워드
        word_freq = Counter(words)
        top_keywords = word_freq.most_common(50)

        self.insights['keywords'] = {
            'top_50': top_keywords,
            'total_unique_words': len(word_freq)
        }

        print(f"✓ 상위 10개 키워드:")
        for word, count in top_keywords[:10]:
            print(f"  - {word}: {count}회")

        return top_keywords

    def analyze_engagement(self):
        """참여도 분석 (upvotes, comments)"""
        print("\n👥 참여도 분석 중...")

        # 서브레딧별 평균 참여도
        engagement_by_sub = self.df.groupby('subreddit').agg({
            'upvotes': 'mean',
            'num_comments': 'mean',
            'upvote_ratio': 'mean'
        }).round(2)

        # 카테고리별 참여도
        engagement_by_category = self.df.groupby('category').agg({
            'upvotes': 'mean',
            'num_comments': 'mean'
        }).round(2)

        # 가장 인기있는 게시글 Top 10
        top_posts = self.df.nlargest(10, 'upvotes')[
            ['title', 'subreddit', 'upvotes', 'num_comments', 'url']
        ]

        self.insights['engagement'] = {
            'by_subreddit': engagement_by_sub.to_dict(),
            'by_category': engagement_by_category.to_dict(),
            'top_posts': top_posts.to_dict('records'),
            'avg_upvotes': self.df['upvotes'].mean(),
            'avg_comments': self.df['num_comments'].mean()
        }

        print(f"✓ 평균 업보트: {self.df['upvotes'].mean():.1f}")
        print(f"✓ 평균 댓글 수: {self.df['num_comments'].mean():.1f}")

        return engagement_by_sub

    def generate_wordcloud(self):
        """워드클라우드 생성"""
        print("\n☁️  워드클라우드 생성 중...")

        # 텍스트 준비
        text = ' '.join(
            self.df['title'].fillna('') + ' ' +
            self.df['selftext'].fillna('')
        )

        # 워드클라우드 생성
        wordcloud = WordCloud(
            width=1200,
            height=600,
            background_color='white',
            colormap='viridis',
            max_words=100,
            relative_scaling=0.5,
            min_font_size=10
        ).generate(text)

        # 저장
        plt.figure(figsize=(15, 7))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis('off')
        plt.title('Most Common Keywords in Reddit Posts', fontsize=20, pad=20)
        plt.tight_layout()

        filepath = 'output/charts/wordcloud.png'
        plt.savefig(filepath, dpi=300, bbox_inches='tight')
        plt.close()

        print(f"✓ 워드클라우드 저장: {filepath}")

        return filepath

    def create_visualizations(self):
        """데이터 시각화 생성"""
        print("\n📊 차트 생성 중...")

        # Set style
        sns.set_style("whitegrid")
        plt.rcParams['figure.facecolor'] = 'white'

        # 1. 감정 분포
        fig, axes = plt.subplots(2, 2, figsize=(15, 12))

        # 1-1. 감정 카테고리 분포
        sentiment_counts = self.df['sentiment_category'].value_counts()
        axes[0, 0].pie(
            sentiment_counts.values,
            labels=sentiment_counts.index,
            autopct='%1.1f%%',
            colors=['#4CAF50', '#FFC107', '#F44336']
        )
        axes[0, 0].set_title('Overall Sentiment Distribution', fontsize=14, fontweight='bold')

        # 1-2. 서브레딧별 게시글 수
        sub_counts = self.df['subreddit'].value_counts()
        axes[0, 1].barh(sub_counts.index, sub_counts.values, color='#2196F3')
        axes[0, 1].set_xlabel('Number of Posts')
        axes[0, 1].set_title('Posts by Subreddit', fontsize=14, fontweight='bold')

        # 1-3. 업보트 분포
        axes[1, 0].hist(self.df['upvotes'], bins=30, color='#FF9800', edgecolor='black')
        axes[1, 0].set_xlabel('Upvotes')
        axes[1, 0].set_ylabel('Frequency')
        axes[1, 0].set_title('Upvotes Distribution', fontsize=14, fontweight='bold')

        # 1-4. 고통점 점수 분포
        pain_dist = self.df['pain_score'].value_counts().sort_index()
        axes[1, 1].bar(pain_dist.index, pain_dist.values, color='#E91E63')
        axes[1, 1].set_xlabel('Pain Score')
        axes[1, 1].set_ylabel('Number of Posts')
        axes[1, 1].set_title('Pain Points Distribution', fontsize=14, fontweight='bold')

        plt.tight_layout()
        filepath1 = 'output/charts/overview.png'
        plt.savefig(filepath1, dpi=300, bbox_inches='tight')
        plt.close()

        print(f"✓ 개요 차트 저장: {filepath1}")

        # 2. 시간별 트렌드
        if 'created_utc' in self.df.columns:
            self.df['month'] = pd.to_datetime(self.df['created_utc']).dt.to_period('M')
            monthly_posts = self.df.groupby('month').size()

            fig, ax = plt.subplots(figsize=(12, 6))
            monthly_posts.plot(kind='line', marker='o', ax=ax, color='#9C27B0', linewidth=2)
            ax.set_xlabel('Month', fontsize=12)
            ax.set_ylabel('Number of Posts', fontsize=12)
            ax.set_title('Posting Trend Over Time', fontsize=14, fontweight='bold')
            ax.grid(True, alpha=0.3)

            plt.tight_layout()
            filepath2 = 'output/charts/trend.png'
            plt.savefig(filepath2, dpi=300, bbox_inches='tight')
            plt.close()

            print(f"✓ 트렌드 차트 저장: {filepath2}")

        return [filepath1]

    def get_insights_summary(self):
        """인사이트 요약"""
        return self.insights

    def save_analyzed_data(self, filename):
        """분석된 데이터 저장"""
        filepath = f"output/{filename}.xlsx"

        with pd.ExcelWriter(filepath, engine='openpyxl') as writer:
            # 전체 데이터
            self.df.to_excel(writer, sheet_name='Full Data', index=False)

            # 감정별 분리
            for sentiment in ['Positive', 'Neutral', 'Negative']:
                sentiment_df = self.df[self.df['sentiment_category'] == sentiment]
                if not sentiment_df.empty:
                    sentiment_df.to_excel(writer, sheet_name=sentiment, index=False)

            # 고통점 Top 20
            pain_posts = self.df[self.df['pain_score'] > 0].nlargest(20, 'pain_score')
            pain_posts.to_excel(writer, sheet_name='Top Pain Points', index=False)

            # 인기 게시글 Top 20
            top_posts = self.df.nlargest(20, 'upvotes')
            top_posts.to_excel(writer, sheet_name='Top Posts', index=False)

        print(f"\n✓ 분석 데이터 저장: {filepath}")
        return filepath


def main():
    """실행 예시"""
    # 데이터 로드 (scraper에서 생성한 파일)
    import glob
    latest_file = max(glob.glob('output/reddit_raw_data_*.csv'), key=os.path.getctime)

    print(f"\n📁 데이터 로드: {latest_file}")
    df = pd.read_csv(latest_file)

    # 분석
    analyzer = DataAnalyzer(df)
    analyzer.analyze_sentiment()
    analyzer.extract_pain_points()
    analyzer.analyze_keywords()
    analyzer.analyze_engagement()
    analyzer.generate_wordcloud()
    analyzer.create_visualizations()

    # 저장
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    analyzer.save_analyzed_data(f'reddit_analyzed_{timestamp}')

    return analyzer


if __name__ == "__main__":
    main()
