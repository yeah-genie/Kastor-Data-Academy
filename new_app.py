import streamlit as st
import streamlit.components.v1 as components
import os

# 페이지 설정
st.set_page_config(
    page_title="Kastor Data Academy",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Streamlit 기본 메뉴/푸터 숨기기
hide_streamlit_style = """
<style>
#MainMenu {visibility: hidden;}
footer {visibility: hidden;}
header {visibility: hidden;}
.stDeployButton {visibility: hidden;}
</style>
"""
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

# 모바일 감지 스크립트
mobile_detect_script = """
<script>
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth < 768;
}

// 모바일 여부를 Streamlit에 전달
if (isMobileDevice()) {
    window.parent.postMessage({type: 'streamlit:setComponentValue', value: 'mobile'}, '*');
} else {
    window.parent.postMessage({type: 'streamlit:setComponentValue', value: 'desktop'}, '*');
}
</script>
"""

# UI 로딩 함수
def load_ui(ui_type='desktop'):
    """모바일 또는 데스크톱 UI HTML 파일 로드"""
    if ui_type == 'mobile':
        html_path = os.path.join(os.path.dirname(__file__), 'mobile_ui.html')
    else:
        html_path = os.path.join(os.path.dirname(__file__), 'desktop_ui.html')

    with open(html_path, 'r', encoding='utf-8') as f:
        return f.read()

# 디바이스 타입 선택 (개발 모드용)
if 'device_type' not in st.session_state:
    st.session_state.device_type = 'desktop'

# 간단한 디바이스 선택기 (테스트용)
col1, col2, col3 = st.columns([1, 1, 8])
with col1:
    if st.button("📱 Mobile", use_container_width=True):
        st.session_state.device_type = 'mobile'
        st.rerun()
with col2:
    if st.button("💻 Desktop", use_container_width=True):
        st.session_state.device_type = 'desktop'
        st.rerun()

# UI 렌더링
html_content = load_ui(st.session_state.device_type)

# 전체 화면으로 HTML 렌더링
if st.session_state.device_type == 'mobile':
    components.html(html_content, height=900, scrolling=True)
else:
    components.html(html_content, height=800, scrolling=False)

# 현재 모드 표시
st.markdown(f"""
<div style="position: fixed; bottom: 10px; right: 10px; background: rgba(0,0,0,0.7);
            color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; z-index: 9999;">
    {st.session_state.device_type.upper()} MODE
</div>
""", unsafe_allow_html=True)
