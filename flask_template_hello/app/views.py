from flask import render_template
from app import app

# ルートURL ('/') に対するビュー関数を定義します
@app.route('/')
def index():
    # 'index.html'テンプレートをレンダリングして返します
    # テンプレートに変数を渡すこともできます
    page_title = "Flask Sample App"
    main_message = "Hello World from Flask!"
    return render_template('index.html', title=page_title, message=main_message)
