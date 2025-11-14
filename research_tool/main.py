#!/usr/bin/env python3
"""
Kastor Data Academy - 사업계획서 근거 자료 수집 도구
올인원 실행 스크립트

데이터 수집 → 분석 → 리포트 생성을 한 번에 실행
"""

import os
import sys
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def check_env_setup():
    """환경 변수 설정 확인"""
    required_vars = ['REDDIT_CLIENT_ID', 'REDDIT_CLIENT_SECRET']

    missing = [var for var in required_vars if not os.getenv(var)]

    if missing:
        print("❌ Reddit API 인증 정보가 설정되지 않았습니다!")
        print("\n📋 설정 방법:")
        print("1. https://www.reddit.com/prefs/apps 에서 'create app' 클릭")
        print("2. 'script' 타입으로 앱 생성")
        print("3. .env 파일에 다음 정보 입력:")
        print("   REDDIT_CLIENT_ID=your_client_id")
        print("   REDDIT_CLIENT_SECRET=your_client_secret")
        print("\n.env.example 파일을 참고하세요.")
        return False

    return True

def print_banner():
    """시작 배너 출력"""
    print("""
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🔍 Kastor Data Academy - 사업계획서 자료 수집 도구         ║
║                                                               ║
║   Reddit 커뮤니티 분석을 통한 시장 조사 자동화                ║
║   데이터 수집 → 분석 → 리포트 생성 올인원 도구               ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
    """)

def main():
    """메인 실행 함수"""
    print_banner()

    # 환경 변수 확인
    if not check_env_setup():
        sys.exit(1)

    print("\n" + "="*60)
    print("🚀 시작 시간:", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    print("="*60)

    try:
        # Step 1: 데이터 수집
        print("\n" + "#"*60)
        print("# STEP 1/4: Reddit 데이터 수집")
        print("#"*60)

        from scraper import RedditScraper

        scraper = RedditScraper()
        df = scraper.collect_all_data()

        if df.empty:
            print("\n❌ 데이터 수집 실패: 게시글을 찾을 수 없습니다.")
            return

        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        raw_csv, raw_excel = scraper.save_raw_data(df, f'reddit_raw_data_{timestamp}')

        # Step 2: 데이터 분석
        print("\n" + "#"*60)
        print("# STEP 2/4: 데이터 분석")
        print("#"*60)

        from analyzer import DataAnalyzer

        analyzer = DataAnalyzer(df)
        analyzer.analyze_sentiment()
        analyzer.extract_pain_points()
        analyzer.analyze_keywords()
        analyzer.analyze_engagement()

        # Step 3: 시각화 생성
        print("\n" + "#"*60)
        print("# STEP 3/4: 시각화 생성")
        print("#"*60)

        analyzer.generate_wordcloud()
        analyzer.create_visualizations()
        analyzed_file = analyzer.save_analyzed_data(f'reddit_analyzed_{timestamp}')

        # Step 4: 리포트 생성
        print("\n" + "#"*60)
        print("# STEP 4/4: 사업계획서용 리포트 생성")
        print("#"*60)

        from reporter import ReportGenerator

        reporter = ReportGenerator(analyzer, f'business_report_{timestamp}')
        report_path = reporter.generate_html_report()

        # 완료 메시지
        print("\n" + "="*60)
        print("✅ 모든 작업이 완료되었습니다!")
        print("="*60)

        print(f"\n📁 생성된 파일:")
        print(f"  1. 원본 데이터 (CSV): {raw_csv}")
        print(f"  2. 원본 데이터 (Excel): {raw_excel}")
        print(f"  3. 분석 데이터 (Excel): {analyzed_file}")
        print(f"  4. 📄 사업계획서 리포트: {report_path}")
        print(f"  5. 📊 차트: output/charts/")

        print(f"\n💡 다음 단계:")
        print(f"  1. 브라우저에서 리포트 열기:")
        print(f"     {os.path.abspath(report_path)}")
        print(f"  2. 리포트 하단의 '📄 PDF로 저장' 버튼 클릭")
        print(f"  3. 사업계획서에 삽입할 데이터/차트 선택")

        # 인사이트 요약
        insights = analyzer.get_insights_summary()

        print(f"\n🎯 핵심 인사이트 요약:")
        print(f"  • 총 {len(df)}개 게시글 분석")
        print(f"  • 평균 감정 점수: {insights['sentiment']['average']:.3f}")
        print(f"  • 긍정 비율: {insights['sentiment']['positive_ratio']:.1f}%")
        print(f"  • 부정 비율: {insights['sentiment']['negative_ratio']:.1f}%")
        print(f"  • 고통점 표현 게시글: {insights['pain_points']['total_posts_with_pain']}개")

        print(f"\n🏁 종료 시간:", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        print("\n" + "="*60 + "\n")

    except KeyboardInterrupt:
        print("\n\n⚠ 사용자에 의해 중단되었습니다.")
        sys.exit(0)

    except Exception as e:
        print(f"\n\n❌ 오류 발생: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == "__main__":
    main()
