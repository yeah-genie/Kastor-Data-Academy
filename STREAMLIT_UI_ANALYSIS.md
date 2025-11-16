# Kastor Data Academy - Streamlit UI Structure Analysis

## Overview

This project is an interactive, detective-themed data analysis game built with Streamlit and Claude AI. Users act as data detectives investigating a game balance manipulation case in "Legend Arena."

**Live App Location**: `/home/user/Kastor-Data-Academy/streamlit_app/app.py` (1185 lines)
**Production App**: `/home/user/Kastor-Data-Academy/app.py` (1631 lines - more features)

---

## 1. Main Entry Points

### Primary Streamlit Application
- **File**: `/home/user/Kastor-Data-Academy/streamlit_app/app.py` (Streamlit Cloud compatible)
- **File**: `/home/user/Kastor-Data-Academy/app.py` (Production version with more features)

### Configuration
```python
# Page Setup
st.set_page_config(
    page_title="캐스터 데이터 아카데미 - 에피소드 1",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="collapsed"
)
```

### Requirements
- **File**: `/home/user/Kastor-Data-Academy/streamlit_app/requirements.txt`
```
streamlit
anthropic
pandas
plotly
python-dotenv
```

---

## 2. UI Components & Organization

### Two-Column Layout System
```python
# Main layout
col_data, col_chat = st.columns([3, 2])

# Left Column (40%): Data Evidence Panel
with col_data:
    st.subheader("📊 사건 증거 데이터")
    # Data visualization and explorers

# Right Column (60%): Chat Interface
with col_chat:
    st.subheader("💬 데이터 탐정 파트너 캐스터")
    # Chat messages and interaction
```

### Right Column Components (Chat)

1. **Chat Display Container**
   - Displays conversation history between user and Kastor (AI partner)
   - Supports typing animation effect
   - Progress indicator (Stage indicator)
   - Auto-scroll JavaScript integration

2. **Interactive Elements**
   - `st.chat_input()` - User message input
   - `st.button()` - Choice selection
   - `st.columns()` - Multi-option layouts (choice buttons in 3 columns)

3. **Message Styling**
   - User messages: Gray gradient (right-aligned)
   - Assistant messages: Purple gradient (left-aligned, white text)
   - Smooth animations and hover effects

### Left Column Components (Data Evidence)

The data panel is stage-based and progressively reveals evidence:

#### Stage 1: Character Win Rate Data
```
📊 Scene 3: Graph Analysis
- DataFrame display of character statistics
- Bar chart visualization (color scale: Red → Yellow → Green)
- Reference line at 50% win rate
```

#### Stage 2: Daily Shadow Win Rate
```
📅 Scene 3-4: Daily Analytics
- Time-series line chart (red line for Shadow)
- Reference line at 50%
- Interactive zoom and hover features
- Shows critical spike on Jan 25
```

#### Stage 3: Patch Notes
```
📄 Scene 4: Official Record Check
- CSV table with columns:
  - 날짜 (Date), 버전 (Version), 캐릭터 (Character)
  - 변경사항 (Changes), 승인자 (Approver)
- Scrollable height (300px) for data exploration
```

#### Stage 4: Server Logs
```
🖥️ Scene 5: Log Analysis
- Filtered server logs table
- Critical evidence highlighted:
  - admin01_kaito, Modify, Shadow.base_stats
  - Timestamp: 2025-01-25T23:47:22Z
  - IP: 203.0.113.45 (suspicious - home IP)
  - Auth token: DBG-3344 (emergency access)
- Suspicious entries highlighted with warning banner
```

#### Stage 5: Player Profile
```
👤 Scene 6: Culprit Connection
- Player "Noctis" profile data
- Win rate jump visualization
- IP address: 203.0.113.45 (matches Kaito's home IP)
- Device fingerprint: DFP:7a9c42b1 (matches Kaito's phone)
- Match records table (15+ games)
```

#### Stage 6: Match Sessions
```
🎮 Scene 7: Evidence Timeline
- 25-Jan night match sessions
- All victories except 2 defeats
- Shows correlation with modification time
- Confirms player testing after unauthorized change
```

---

## 3. Key Features & Functionality

### A. Game Narrative Structure

**Theme**: Cyberpunk Detective Game about uncovering balance manipulation

**Main Case**: 
- Shadow character's win rate jumped from 50% → 85% on Jan 25
- No official patch record
- Investigation reveals Kaito (balance designer) made unauthorized modification

**Arc**:
1. **Scene 0**: Wake-up call from AI partner Kastor
2. **Scene 1**: Choose investigation hypothesis (3 options)
3. **Scene 3**: Analyze character data graphs
4. **Scene 4**: Check official patch notes (finds inconsistency)
5. **Scene 5-6**: Analyze server logs and identify culprit
6. **Scene 7**: Piece together evidence and resolve case
7. **Conclusion**: Celebrate success

### B. Interactive Game Elements

#### Mini-games (Gamified Learning)

1. **Mini-game 1.1: Anomaly Finding**
   - Find the exact date of the spike
   - Options: Jan 24, 25, 26
   - Teaches: Trend analysis and anomaly detection

2. **Mini-game 1.2: Timeline Puzzle**
   - Match events to timeline
   - Teaches: Correlation between events and changes

3. **Mini-game 1.3: Log Filtering**
   - Apply filters to find smoking gun
   - Criteria: Date 25 + User "Kaito" + Action "Modify"
   - Teaches: Data filtering and Boolean logic

#### Dialogue System

**Kastor AI Partner**:
- Claude 3.5 Haiku powered
- Maintains detective theme throughout
- Provides specific location hints (not generic advice)
- Food metaphors for engagement
- Celebrates user discoveries

**Context-aware Responses**:
```python
KASTOR_SYSTEM_PROMPT = """
- Role: Enthusiastic data detective partner
- Personality: Energetic, playful, obsessed with food
- Method: Guide users to data locations, celebrate discoveries
- Forbidden: Give answers before users try
"""
```

### C. Progression System

**Session State Tracking**:
```python
st.session_state = {
    "episode_stage": "scene_0",      # Current story stage
    "detective_score": 0,            # Points earned
    "badges": [],                    # Achievement badges
    "hints_used": 0,                 # Hint tracking
    "evidence_found": [],            # Collected evidence
    "user_name": None,               # Player name
    "messages": [],                  # Chat history
    "awaiting_name_input": False,    # State flag
}
```

**Stage Flow**:
```
scene_0 → scene_1_hypothesis → exploration → scene_3_graph
→ minigame_1_1 → choice_2_investigation → scene_4_patch_notes
→ minigame_1_2 → scene_5_server_logs → minigame_1_3
→ scene_6_player_profile → scene_7_timeline → conclusion
```

---

## 4. Page Structure & Navigation

### Single-Page Application
- **Design**: All content on one page (Streamlit's default)
- **Layout**: Responsive two-column design
- **Navigation**: Sequential stage progression (no multi-page routing)

### Content Visibility Control
```python
# Data panels appear only when relevant to current stage
if st.session_state.episode_stage in ["scene_3_graph", "minigame_1_1", ...]:
    with st.expander("📅 셰도우 일별 승률 변화"):
        # Show time-series data
```

### Progress Indicator
```python
scene_order = [
    "scene_0", "scene_1_hypothesis", "exploration", "scene_3_graph",
    "minigame_1_1", "choice_2_investigation", "scene_4_patch_notes",
    "minigame_1_2", "scene_5_server_logs", "minigame_1_3",
    "scene_6_player_profile", "scene_7_timeline", "conclusion"
]
# Displays: "Progress: 5/13"
```

---

## 5. Game & Interactive Elements

### A. Character-Driven Narrative

**Main Character: Kastor**
- AI partner with personality
- Uses detective terminology ("evidence", "clue", "suspect")
- Food metaphors for explanations
- Maintains enthusiasm throughout

**Other Characters (via messages)**:
- Maya (Game Director) - Client
- Kaito (Balance Designer) - Suspect
- Lucas (Manager) - Mentioned
- Noctis (Player) - Evidence of guilt

### B. Badge/Achievement System
```python
BADGE_EMOJIS = {
    "🔍 이상치 탐정": "exploration 완료",
    "📋 문서 분석가": "hypothesis_1 완료",
    "🖥️ 로그 헌터": "hypothesis_2 완료",
    "🎯 진실 추적자": "hypothesis_3 완료",
    "⭐ 마스터 탐정": "사건 해결 완료",
    "🔍 타임라인 마스터": "타임라인 퍼즐 완료",
    "💾 로그 헌터": "로그 필터링 완료"
}

# Awards with effects:
st.toast(f"🏆 배지 획득: {badge_name}!", icon="🎉")
if len(badges) % 3 == 0:
    st.balloons()  # Celebration effect
```

### C. Score System
```python
# Points awarded for:
- Correct hypothesis selection: +10 points
- Graph analysis: +25 points
- Timeline reasoning: +30 points
- Evidence discovery: +35 points
- Case resolution: +50 points
```

### D. Hint System
```python
STAGE_HINTS = {
    "scene_3_graph": [
        "💡 힌트 1: 왼쪽 데이터 패널을 펼쳐봐!",
        "💡 힌트 2: '📅 셰도우 일별 승률 변화' 섹션을 찾아봐!",
        "💡 힌트 3: 그래프에서 빨간 선이 수직으로 솟은 날짜를 찾아!"
    ],
    "scene_4_patch_notes": [
        "💡 힌트 1: 왼쪽에서 '📄 공식 패치 노트'를 펼쳐봐!",
        "💡 힌트 2: 2025-01-25를 찾아봐!",
        "💡 힌트 3: 셰도우 항목을 확인해!"
    ],
    "minigame_1_3": [
        "💡 힌트 1: 급등한 날짜를 선택해봐!",
        "💡 힌트 2: 수상한 사용자는 누구일까? 카이토를 선택해봐!",
        "💡 힌트 3: 수정(MODIFY) 작업을 선택해봐!"
    ]
}

# Tracked and limited per stage
st.session_state.hints_used += 1  # Penalty system
```

---

## 6. CSS/Styling Approach

### Styling Strategy
- **Method**: `st.markdown()` with inline CSS
- **Scope**: Global styles applied once
- **Browser Compatibility**: CSS3 with vendor prefixes
- **Animation Framework**: Keyframe animations

### Key Style Files

**Location**: Lines 63-400 in `/home/user/Kastor-Data-Academy/app.py`

### Global Styles Applied

#### A. Layout & Scrolling
```css
/* Full viewport layout */
html, body, [data-testid="stAppViewContainer"] {
    overflow: hidden !important;
    height: 100vh !important;
    max-height: 100vh !important;
}

/* Two-column layout */
[data-testid="column"] {
    height: 90vh !important;
    overflow-y: auto !important;
    padding: 0.5rem !important;
}

/* Scrollbar styling */
[data-testid="stVerticalBlock"]::-webkit-scrollbar {
    width: 8px;
}

[data-testid="stVerticalBlock"]::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}
```

#### B. Chat Message Styling
```css
/* User message (right-aligned, gray) */
.stChatMessage[data-testid="user-message"] {
    background: linear-gradient(135deg, #E5E5EA 0%, #D1D1D6 100%) !important;
    margin-left: 25% !important;
    border-bottom-right-radius: 4px !important;
}

/* Assistant message (left-aligned, purple) */
.stChatMessage[data-testid="assistant-message"] {
    background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%) !important;
    margin-right: 25% !important;
    border-bottom-left-radius: 4px !important;
    color: white !important;
}

/* Message spacing */
.stChatMessage {
    margin-bottom: 0.8rem !important;
    padding: 0.5rem !important;
    border-radius: 12px !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1) !important;
}
```

#### C. Badge Animation
```css
.badge {
    display: inline-block;
    padding: 0.3rem 0.6rem;
    margin: 0.2rem;
    border-radius: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-size: 0.9rem;
    font-weight: bold;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    animation: badgePop 0.3s ease-out;
}

@keyframes badgePop {
    0% { transform: scale(0); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
```

#### D. Evidence Card
```css
.evidence-card {
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.evidence-card.found {
    border-left-color: #51cf66;
    background: #f1f9f4;
    animation: evidenceFound 0.5s ease-out;
}

@keyframes evidenceFound {
    0% { transform: translateX(-20px); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
}
```

#### E. Patch Card (Data Visualization)
```css
.patch-card {
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    padding: 1.2rem;
    margin: 1rem 0;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.2s;
}

.patch-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.patch-card.suspicious {
    border-color: #fa5252;
    background: #fff5f5;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 4px 6px rgba(250, 82, 82, 0.2); }
    50% { box-shadow: 0 4px 12px rgba(250, 82, 82, 0.4); }
}
```

#### F. Mobile Responsive
```css
@media (max-width: 768px) {
    .block-container {
        padding: 0.5rem !important;
    }

    .stTabs [data-baseweb="tab-panel"] {
        height: 80vh !important;
        max-height: 80vh !important;
    }

    [data-testid="stVerticalBlock"] > div:has(.stChatMessage) {
        max-height: 65vh !important;
        padding-bottom: 100px !important;
    }

    .stExpander {
        font-size: 0.9rem;
    }
}
```

#### G. Accessibility (Reduced Motion)
```css
@media (prefers-reduced-motion: reduce) {
    .badge, .evidence-card.found, .patch-card.suspicious, .score-animation {
        animation: none !important;
    }
}
```

### Color Scheme

**Primary Colors**:
- Purple (Assistant): #7C3AED (Gradient to #6D28D9)
- Gray (User): #E5E5EA (Gradient to #D1D1D6)
- Success (Green): #51cf66
- Warning (Red): #fa5252
- Accent (Purple): #667eea

**Data Visualization**:
- Chart colors: Red → Yellow → Green (RdYlGn scale)
- Reference lines: Gray dashes
- Highlighting: Red for suspicious activity

---

## 7. Data Integration

### Data Files Used
```
/home/user/Kastor-Data-Academy/data/
├── characters.csv           # Character win rates
├── shadow_daily.csv        # Daily win rate tracking
├── patch_notes.csv         # Official patch records
├── server_logs_filtered.csv # Access logs with smoking gun
├── player_profile_noctis.csv # Suspect player profile
└── match_sessions_jan25.csv # Match records from incident
```

### Data Loading
```python
@st.cache_data
def load_data():
    characters = pd.read_csv("data/characters.csv")
    shadow_daily = pd.read_csv("data/shadow_daily.csv")
    patch_notes = pd.read_csv("data/patch_notes.csv")
    server_logs = pd.read_csv("data/server_logs_filtered.csv")
    player_profile = pd.read_csv("data/player_profile_noctis.csv")
    match_sessions = pd.read_csv("data/match_sessions_jan25.csv")
    return characters, shadow_daily, patch_notes, server_logs, player_profile, match_sessions
```

### Data Visualization Libraries
- **Plotly Express**: Bar charts, line charts
- **Plotly Graph Objects**: Custom interactive charts
- **Pandas**: DataFrames with `st.dataframe()`

---

## 8. Technical Features

### AI Integration

**Claude API Usage**:
- Model: `claude-3-5-haiku-20241022`
- Max tokens: 200
- Temperature: 0.8
- Method: Anthropic Python SDK

**Message Structure**:
```python
def get_kastor_response(user_message, context=""):
    messages = []
    
    # Last 5 messages for context
    for msg in st.session_state.messages[-5:]:
        messages.append({"role": msg["role"], "content": msg["content"]})
    
    messages.append({"role": "user", "content": user_message})
    
    response = client.messages.create(
        model="claude-3-5-haiku-20241022",
        max_tokens=200,
        temperature=0.8,
        system=KASTOR_SYSTEM_PROMPT + f"\n\n현재 상황: {context}",
        messages=messages
    )
    return response.content[0].text
```

### Animation Effects

**Typing Effect**:
```python
def display_message_with_typing(role, content, container=None):
    """Typing effect for messages"""
    full_response = ""
    for char in content:
        full_response += char
        message_placeholder.write(full_response + "▌")
        time.sleep(0.01)  # Speed control
    message_placeholder.write(full_response)
```

**JavaScript Auto-scroll**:
```javascript
// Auto-scroll chat to bottom on new messages
function scrollChatToBottom() {
    const containers = window.parent.document.querySelectorAll('[data-testid="stVerticalBlock"]');
    containers.forEach(container => {
        const chatMessages = container.querySelectorAll('.stChatMessage');
        if (chatMessages.length > 0) {
            container.scrollTop = container.scrollHeight;
        }
    });
}

// Check periodically and on DOM changes
setTimeout(scrollChatToBottom, 100);
setInterval(scrollChatToBottom, 500);
```

### Session Management

**Persistent State**:
```python
# Session state initialized once
if "messages" not in st.session_state:
    st.session_state.messages = []
if "episode_stage" not in st.session_state:
    st.session_state.episode_stage = "scene_0"
# ... 10+ other state variables
```

**Message History Management**:
```python
def add_message(role, content):
    st.session_state.messages.append({"role": role, "content": content})

# Latest message gets typing animation
# Previous messages displayed normally
for i, message in enumerate(st.session_state.messages[:-1]):
    with st.chat_message(message["role"]):
        st.write(message["content"])
```

---

## 9. Directory Structure

```
/home/user/Kastor-Data-Academy/
├── app.py                          # Main Streamlit app (production, 1631 lines)
├── streamlit_app/
│   ├── app.py                      # Streamlit Cloud version (1185 lines)
│   ├── requirements.txt
│   ├── README.md
│   └── .gitignore
├── data/                           # Game scenario data
│   ├── characters.csv
│   ├── shadow_daily.csv
│   ├── patch_notes.csv
│   ├── server_logs_filtered.csv
│   ├── player_profile_noctis.csv
│   └── match_sessions_jan25.csv
├── research_tool/                  # Data analysis tools
├── flutter_app/                    # Flutter mobile version
└── [Documentation files]
    ├── DETECTIVE_GAME_README.md
    ├── GAMIFICATION_FEATURES.md
    ├── STYLE_GUIDE.md
    ├── CYBERPUNK_UI_IMPROVEMENTS.md
    └── [Episode narratives and guides]
```

---

## 10. Summary: How It All Fits Together

### User Flow
1. **Entry**: User lands on Streamlit app
2. **Customization**: Kastor asks for user's name
3. **Case Brief**: Email from game director with problem statement
4. **Investigation**: User explores data progressively
5. **Mini-games**: Gamified learning checkpoints
6. **Climax**: Evidence connects suspect to crime
7. **Resolution**: User solves the case with score
8. **Replay**: Option to restart and try different approaches

### Technical Flow
1. **Frontend**: Streamlit renders two-column layout
2. **State**: Session state tracks story progression
3. **AI**: Claude generates contextual dialog
4. **Data**: CSVs visualized with Plotly
5. **Styling**: CSS handles animations and responsive design
6. **Persistence**: Chat history maintained throughout session

### Educational Goals
- **Teach**: Data anomaly detection (trend analysis)
- **Teach**: Data source validation (inconsistency finding)
- **Teach**: Log analysis and filtering
- **Teach**: Digital forensics (IP, device fingerprints)
- **Teach**: Hypothesis formation and testing
- **Engage**: Through narrative, characters, and gamification

---

## Key Files Reference

| File | Purpose | Lines | Key Components |
|------|---------|-------|-----------------|
| `/home/user/Kastor-Data-Academy/app.py` | Production Streamlit app | 1631 | Full features with hints system |
| `/home/user/Kastor-Data-Academy/streamlit_app/app.py` | Cloud-compatible version | 1185 | Core gameplay |
| `data/characters.csv` | Game state baseline | ~10 rows | Character stats |
| `data/shadow_daily.csv` | Timeline of incident | 16 days | Critical spike on day 25 |
| `data/patch_notes.csv` | Official records | 8 rows | Inconsistency evidence |
| `data/server_logs_filtered.csv` | Access logs | 16 entries | Smoking gun log |
| `data/player_profile_noctis.csv` | Suspect profile | 16 days | Win rate jump correlation |
| `data/match_sessions_jan25.csv` | Match records | 20 games | Testing spree evidence |

