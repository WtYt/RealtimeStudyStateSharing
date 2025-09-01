from flask import Flask

# Flaskアプリケーションインスタンスを作成します
# template_folderのパスを調整して、プロジェクトのルートにある'template'ディレクトリを指定します
app = Flask(__name__, template_folder='../template')

# ルーティングを定義したviewsをインポートします
from app import views
