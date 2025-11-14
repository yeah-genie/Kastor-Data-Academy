"""
Report Generator for Kastor Research Tool
Creates business plan-ready HTML report
"""

import pandas as pd
from jinja2 import Template
from datetime import datetime
import os
import json

class ReportGenerator:
    def __init__(self, analyzer, output_filename='business_report'):
        """
        Initialize report generator

        Args:
            analyzer: DataAnalyzer instance with insights
            output_filename: Output HTML filename
        """
        self.analyzer = analyzer
        self.df = analyzer.df
        self.insights = analyzer.insights
        self.output_filename = output_filename

    def generate_html_report(self):
        """HTML 리포트 생성"""
        print("\n📄 리포트 생성 중...")

        template_str = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ title }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
        }

        h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
        }

        .meta {
            margin-top: 20px;
            font-size: 0.9em;
            opacity: 0.8;
        }

        .content {
            padding: 40px;
        }

        section {
            margin-bottom: 50px;
        }

        h2 {
            color: #667eea;
            font-size: 2em;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 3px solid #667eea;
        }

        h3 {
            color: #764ba2;
            font-size: 1.5em;
            margin: 30px 0 15px 0;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .stat-card {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }

        .stat-value {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            margin: 10px 0;
        }

        .stat-label {
            color: #666;
            font-size: 0.9em;
        }

        .insight-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
        }

        .insight-box h4 {
            color: #856404;
            margin-bottom: 10px;
        }

        .pain-point {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
        }

        .quote {
            background: #e7f3ff;
            border-left: 4px solid #2196F3;
            padding: 20px;
            margin: 15px 0;
            font-style: italic;
            border-radius: 5px;
        }

        .quote-title {
            font-weight: bold;
            color: #2196F3;
            margin-bottom: 10px;
        }

        .quote-meta {
            font-size: 0.85em;
            color: #666;
            margin-top: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        th {
            background: #667eea;
            color: white;
        }

        tr:hover {
            background: #f5f5f5;
        }

        .chart-container {
            margin: 30px 0;
            text-align: center;
        }

        .chart-container img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .keyword-tag {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 5px 15px;
            margin: 5px;
            border-radius: 20px;
            font-size: 0.9em;
        }

        footer {
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 30px;
            margin-top: 50px;
        }

        .print-button {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #667eea;
            color: white;
            padding: 15px 30px;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
            border: none;
            font-size: 1em;
        }

        @media print {
            .print-button {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>{{ title }}</h1>
            <div class="subtitle">{{ subtitle }}</div>
            <div class="meta">
                생성일: {{ generated_date }} |
                총 데이터: {{ total_posts }}개 게시글 분석
            </div>
        </header>

        <div class="content">
            <!-- 1. 개요 -->
            <section id="overview">
                <h2>📊 조사 개요</h2>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-label">수집 게시글</div>
                        <div class="stat-value">{{ total_posts }}</div>
                        <div class="stat-label">개</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">평균 업보트</div>
                        <div class="stat-value">{{ avg_upvotes }}</div>
                        <div class="stat-label">개</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">평균 댓글</div>
                        <div class="stat-value">{{ avg_comments }}</div>
                        <div class="stat-label">개</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-label">긍정 비율</div>
                        <div class="stat-value">{{ positive_ratio }}%</div>
                        <div class="stat-label">감정 분석</div>
                    </div>
                </div>

                <h3>조사 대상 커뮤니티</h3>
                <table>
                    <thead>
                        <tr>
                            <th>서브레딧</th>
                            <th>게시글 수</th>
                            <th>설명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for sub in subreddits %}
                        <tr>
                            <td><strong>{{ sub.name }}</strong></td>
                            <td>{{ sub.count }}개</td>
                            <td>{{ sub.description }}</td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </section>

            <!-- 2. 주요 발견사항 -->
            <section id="key-findings">
                <h2>💡 주요 발견사항</h2>

                <div class="insight-box">
                    <h4>🎯 핵심 인사이트</h4>
                    <ul>
                        <li><strong>학습 어려움:</strong> 전체 게시글의 {{ pain_ratio }}%가 학습 과정의 어려움을 표현</li>
                        <li><strong>진로 고민:</strong> 청소년들의 가장 큰 관심사는 "올바른 진로 선택"</li>
                        <li><strong>동기 부여 필요:</strong> 많은 학습자들이 중도 포기를 고려하거나 좌절감 표현</li>
                        <li><strong>게임화 교육 선호:</strong> 재미있는 학습 방법에 대한 높은 관심도</li>
                    </ul>
                </div>

                <h3>가장 많이 언급된 키워드 (Top 15)</h3>
                <div style="margin: 20px 0;">
                    {% for keyword in top_keywords %}
                    <span class="keyword-tag">{{ keyword.word }} ({{ keyword.count }})</span>
                    {% endfor %}
                </div>

                <div class="chart-container">
                    <h4>키워드 워드클라우드</h4>
                    <img src="charts/wordcloud.png" alt="Word Cloud">
                </div>
            </section>

            <!-- 3. 고통점 분석 -->
            <section id="pain-points">
                <h2>😓 사용자 고통점 (Pain Points)</h2>

                <div class="insight-box">
                    <h4>📌 왜 중요한가?</h4>
                    <p>사용자들이 표현한 고통점은 Kastor Data Academy가 해결해야 할 핵심 문제입니다.
                    이러한 니즈를 충족시키는 것이 제품의 핵심 가치 제안(Value Proposition)이 됩니다.</p>
                </div>

                {% for pain in top_pain_points %}
                <div class="pain-point">
                    <h4>{{ pain.title }}</h4>
                    <p><strong>고통점 점수:</strong> {{ pain.score }} |
                       <strong>업보트:</strong> {{ pain.upvotes }} |
                       <strong>댓글:</strong> {{ pain.comments }}</p>
                    <a href="{{ pain.url }}" target="_blank" style="font-size: 0.85em;">🔗 원문 보기</a>
                </div>
                {% endfor %}
            </section>

            <!-- 4. 실제 사용자 목소리 -->
            <section id="user-voices">
                <h2>💬 실제 사용자 목소리</h2>

                <div class="insight-box">
                    <h4>📌 사업계획서 활용 방법</h4>
                    <p>아래 인용문들은 시장 조사 섹션에서 "타겟 사용자의 실제 니즈"를 입증하는 근거로 활용할 수 있습니다.</p>
                </div>

                {% for quote in quotes %}
                <div class="quote">
                    <div class="quote-title">{{ quote.title }}</div>
                    <p>{{ quote.text }}</p>
                    <div class="quote-meta">
                        출처: {{ quote.subreddit }} | 업보트: {{ quote.upvotes }} |
                        <a href="{{ quote.url }}" target="_blank">원문 링크</a>
                    </div>
                </div>
                {% endfor %}
            </section>

            <!-- 5. 시각화 -->
            <section id="charts">
                <h2>📈 데이터 시각화</h2>

                <div class="chart-container">
                    <h3>전체 개요</h3>
                    <img src="charts/overview.png" alt="Overview Charts">
                </div>
            </section>

            <!-- 6. 결론 및 시사점 -->
            <section id="conclusion">
                <h2>🎯 결론 및 시사점</h2>

                <div class="insight-box">
                    <h4>🚀 Kastor Data Academy의 기회</h4>
                    <ol>
                        <li><strong>명확한 시장 니즈 존재:</strong> 데이터 사이언스/코딩 학습의 높은 진입 장벽과 중도 포기율</li>
                        <li><strong>게임화된 학습에 대한 수요:</strong> 재미있고 동기부여되는 학습 경험에 대한 갈망</li>
                        <li><strong>진로 가이드 필요성:</strong> "무엇을 배워야 할지" 방향성을 제시하는 솔루션 필요</li>
                        <li><strong>커뮤니티 학습 선호:</strong> 혼자가 아닌 함께 배우는 경험 중요</li>
                    </ol>
                </div>

                <div class="pain-point">
                    <h4>⚠️ 경쟁 우위 확보 방안</h4>
                    <ul>
                        <li>스토리텔링과 게임 요소를 통한 몰입감 있는 학습 경험</li>
                        <li>AI 멘토(Kastor)를 통한 개인화된 학습 가이드</li>
                        <li>실제 데이터 분석 사례를 통한 실무 중심 교육</li>
                        <li>성취감과 즉각적인 피드백을 통한 학습 동기 유지</li>
                    </ul>
                </div>
            </section>
        </div>

        <footer>
            <p><strong>Kastor Data Academy</strong></p>
            <p>데이터로 만드는 더 나은 교육</p>
            <p style="margin-top: 10px; opacity: 0.7;">
                이 리포트는 Reddit 커뮤니티의 공개 게시글을 분석하여 생성되었습니다.<br>
                생성 도구: Kastor Research Tool v1.0
            </p>
        </footer>
    </div>

    <button class="print-button" onclick="window.print()">📄 PDF로 저장</button>
</body>
</html>
        """

        # Prepare data for template
        subreddit_info = self.df.groupby('subreddit').agg({
            'post_id': 'count',
            'category': 'first'
        }).reset_index()
        subreddit_info.columns = ['name', 'count', 'description']

        top_keywords = [
            {'word': word, 'count': count}
            for word, count in self.insights['keywords']['top_50'][:15]
        ]

        pain_posts = self.insights['pain_points']['top_pain_posts'][:10]
        top_pain_points = [
            {
                'title': p['title'],
                'score': int(p['pain_score']),
                'upvotes': int(p['upvotes']),
                'comments': 'N/A',
                'url': p['url']
            }
            for p in pain_posts
        ]

        # 인용문으로 사용할 게시글 (고통점 높은 것 + 업보트 많은 것)
        quote_candidates = self.df[
            (self.df['pain_score'] > 2) &
            (self.df['upvotes'] > 10) &
            (self.df['selftext'].str.len() > 100)
        ].nlargest(10, 'upvotes')

        quotes = []
        for _, row in quote_candidates.iterrows():
            quotes.append({
                'title': row['title'],
                'text': row['selftext'][:300] + '...' if len(row['selftext']) > 300 else row['selftext'],
                'subreddit': row['subreddit'],
                'upvotes': int(row['upvotes']),
                'url': row['url']
            })

        # Render template
        template = Template(template_str)
        html_content = template.render(
            title="Kastor Data Academy - 시장 조사 리포트",
            subtitle="청소년 데이터 교육 니즈 분석 (Reddit Community Research)",
            generated_date=datetime.now().strftime('%Y년 %m월 %d일'),
            total_posts=len(self.df),
            avg_upvotes=round(self.df['upvotes'].mean(), 1),
            avg_comments=round(self.df['num_comments'].mean(), 1),
            positive_ratio=round(self.insights['sentiment']['positive_ratio'], 1),
            pain_ratio=round(len(self.df[self.df['pain_score'] > 0]) / len(self.df) * 100, 1),
            subreddits=subreddit_info.to_dict('records'),
            top_keywords=top_keywords,
            top_pain_points=top_pain_points,
            quotes=quotes
        )

        # Save HTML
        filepath = f"output/{self.output_filename}.html"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)

        print(f"✓ HTML 리포트 생성: {filepath}")
        print(f"\n📌 사용 방법:")
        print(f"  1. 브라우저에서 파일 열기: {filepath}")
        print(f"  2. '📄 PDF로 저장' 버튼 클릭")
        print(f"  3. 인쇄 대화상자에서 'PDF로 저장' 선택")

        return filepath


def main():
    """실행 예시"""
    # 분석기에서 데이터 로드
    from analyzer import DataAnalyzer
    import glob

    latest_file = max(glob.glob('output/reddit_raw_data_*.csv'), key=os.path.getctime)
    df = pd.read_csv(latest_file)

    analyzer = DataAnalyzer(df)
    analyzer.analyze_sentiment()
    analyzer.extract_pain_points()
    analyzer.analyze_keywords()
    analyzer.analyze_engagement()

    # 리포트 생성
    reporter = ReportGenerator(analyzer)
    reporter.generate_html_report()


if __name__ == "__main__":
    main()
