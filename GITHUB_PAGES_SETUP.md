# 🚀 GitHub Pages 자동 배포 가이드

## 📋 현재 설정

✅ **자동 배포 시스템 활성화됨**

- **배포 URL**: https://yeah-genie.github.io/Kastor-Data-Academy/
- **자동 배포**: main 브랜치에 푸시할 때마다 자동 실행
- **빌드 시스템**: GitHub Actions
- **배포 브랜치**: gh-pages

## 🔄 작동 방식

### 1. 자동 배포 트리거

다음 경우에 자동으로 배포됩니다:

```bash
# flutter_app 폴더의 변경사항이 main 브랜치에 푸시될 때
git push origin main
```

### 2. 배포 프로세스

GitHub Actions가 자동으로:

1. ✅ Flutter 환경 설정 (Flutter 3.24.5)
2. ✅ 의존성 설치 (`flutter pub get`)
3. ✅ 웹 앱 빌드 (CanvasKit 렌더러)
4. ✅ GitHub Pages용 최적화 (.nojekyll 추가)
5. ✅ gh-pages 브랜치에 배포
6. ✅ 라이브 사이트 업데이트

**소요 시간**: 약 3-5분

### 3. 배포 확인

배포 상태는 다음에서 확인:
- GitHub 저장소 → Actions 탭
- https://github.com/yeah-genie/Kastor-Data-Academy/actions

## 🎯 사용 방법

### 개발 → 배포 워크플로우

```bash
# 1. 현재 브랜치에서 작업
cd flutter_app
# ... 코드 수정 ...

# 2. 변경사항 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# 3. 현재 브랜치에 푸시
git push origin 브랜치명

# 4. PR 생성 및 main에 머지
# GitHub에서 Pull Request 생성 → Merge

# 5. 자동 배포 시작! 🚀
# main 브랜치에 머지되면 자동으로 배포됩니다
```

### 수동 배포 트리거

GitHub Actions 탭에서 수동으로도 실행 가능:

1. GitHub 저장소 방문
2. Actions 탭 클릭
3. "Deploy to GitHub Pages" 워크플로우 선택
4. "Run workflow" 버튼 클릭
5. "Run workflow" 확인

## 📁 배포되는 파일

```
flutter_app/
├── assets/
│   ├── characters/       # 캐릭터 SVG 아바타
│   ├── episodes/         # 에피소드 데이터 (JSON, MD)
│   ├── sounds/           # 오디오 파일
│   └── images/           # 이미지 파일
├── lib/                  # Dart 소스 코드
└── web/
    ├── index.html        # 진입점
    ├── manifest.json     # PWA 설정
    └── icons/            # 앱 아이콘
```

## 🔍 배포 로그 확인

배포 중 문제가 생기면:

1. **Actions 탭에서 실패한 워크플로우 클릭**
2. **각 단계별 로그 확인**
3. **에러 메시지 확인**

일반적인 문제:
- ❌ Flutter 빌드 실패 → `flutter build web` 로컬에서 테스트
- ❌ 의존성 문제 → `pubspec.yaml` 확인
- ❌ 권한 문제 → Repository Settings에서 Actions 권한 확인

## ⚙️ 고급 설정

### base-href 변경

다른 경로에 배포하려면 `.github/workflows/deploy-web.yml` 수정:

```yaml
- name: 🏗️ Build Web App
  working-directory: flutter_app
  run: |
    flutter build web \
      --release \
      --web-renderer canvaskit \
      --base-href /다른-경로/  # 여기 수정
```

### 커스텀 도메인 사용

커스텀 도메인을 사용하려면:

1. **도메인 DNS 설정**:
   ```
   CNAME 레코드: www → yeah-genie.github.io
   A 레코드: @ → 185.199.108.153
                 → 185.199.109.153
                 → 185.199.110.153
                 → 185.199.111.153
   ```

2. **워크플로우에 CNAME 추가** (`.github/workflows/deploy-web.yml`):
   ```yaml
   - name: 📄 Create CNAME
     working-directory: flutter_app/build/web
     run: echo "your-domain.com" > CNAME
   ```

3. **GitHub Settings에서 도메인 설정**:
   - Repository Settings → Pages
   - Custom domain에 도메인 입력
   - Enforce HTTPS 체크

### 빌드 최적화

더 빠른 빌드를 원한다면:

```yaml
# HTML 렌더러 사용 (더 작은 번들 크기)
flutter build web --web-renderer html

# 트리 쉐이킹 활성화
flutter build web --tree-shake-icons

# 소스맵 생성 (디버깅용)
flutter build web --source-maps
```

## 📊 배포 통계

GitHub Actions를 통해 확인 가능:
- ✅ 빌드 성공률
- ⏱️ 평균 빌드 시간
- 📅 배포 히스토리
- 🔄 재시도 횟수

## 🛡️ 보안

현재 설정:
- ✅ `GITHUB_TOKEN` 사용 (자동 제공)
- ✅ 읽기/쓰기 권한만 부여
- ✅ gh-pages 브랜치만 접근
- ✅ 소스 코드 노출 없음

## 🎨 배포된 기능

현재 https://yeah-genie.github.io/Kastor-Data-Academy/ 에서 사용 가능:

- ✅ 한국어/영어 언어 전환
- ✅ 캐릭터 아바타 (카스터, 탐정, 마야)
- ✅ 채팅 인터페이스
- ✅ 데이터 시각화 (차트)
- ✅ 에피소드 1 전체
- ✅ 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ✅ PWA 지원 (설치 가능)

## 🔄 업데이트 흐름

```
코드 수정
   ↓
커밋 & 푸시
   ↓
PR 생성 & 리뷰
   ↓
main 브랜치에 머지
   ↓
🤖 GitHub Actions 자동 실행
   ↓
Flutter 웹 빌드
   ↓
gh-pages 브랜치 업데이트
   ↓
✨ 라이브 사이트 자동 업데이트!
   ↓
https://yeah-genie.github.io/Kastor-Data-Academy/
```

## 📞 문제 해결

### 배포가 안 됩니다

1. **Repository Settings 확인**:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)

2. **Actions 권한 확인**:
   - Settings → Actions → General
   - Workflow permissions: "Read and write permissions" 선택

3. **브랜치 보호 규칙 확인**:
   - Settings → Branches
   - gh-pages 브랜치에 보호 규칙 없는지 확인

### 사이트가 404 에러를 보여줍니다

1. **base-href 확인**:
   ```bash
   # 빌드 시 올바른 base-href 사용 확인
   --base-href /Kastor-Data-Academy/
   ```

2. **.nojekyll 파일 확인**:
   ```bash
   # gh-pages 브랜치에 .nojekyll 파일이 있는지 확인
   ```

3. **배포 완료 대기**:
   - 배포 후 1-2분 대기
   - 브라우저 캐시 지우기 (Ctrl+Shift+R)

## ✅ 체크리스트

배포 전 확인사항:

- [ ] `flutter build web` 로컬에서 성공하는가?
- [ ] 모든 assets이 `pubspec.yaml`에 포함되어 있는가?
- [ ] 변경사항이 main 브랜치에 머지되었는가?
- [ ] GitHub Actions 워크플로우가 성공했는가?
- [ ] 라이브 사이트에서 변경사항이 반영되었는가?

## 🎉 완료!

이제 main 브랜치에 푸시만 하면 자동으로 배포됩니다!

**다음 배포 예상 시간**: 커밋 후 3-5분

---

**Happy Deploying! 🚀**
