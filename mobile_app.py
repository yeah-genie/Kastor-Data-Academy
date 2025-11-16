import streamlit as st
import streamlit.components.v1 as components
import os

# 페이지 설정
st.set_page_config(
    page_title="Kastor Data Academy - Mobile",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# HTML 파일 읽기
def load_mobile_ui():
    """모바일 UI HTML 파일 로드"""
    html_path = os.path.join(os.path.dirname(__file__), 'mobile_ui.html')

    with open(html_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    return html_content

# 모바일 UI 렌더링
def render_mobile_ui():
    """HTML UI를 Streamlit에서 렌더링"""
    html_content = load_mobile_ui()

    # 전체 화면으로 HTML 렌더링
    components.html(html_content, height=900, scrolling=True)

# 메인 실행
if __name__ == "__main__":
    # Streamlit 기본 메뉴/푸터 숨기기
    hide_streamlit_style = """
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    </style>
    """
    st.markdown(hide_streamlit_style, unsafe_allow_html=True)

    # 모바일 UI 렌더링
    render_mobile_ui()
