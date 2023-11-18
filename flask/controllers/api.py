# MySQLdbのインポート
import MySQLdb


def dbtest():
    # データベースへの接続とカーソルの生成
    connection = MySQLdb.connect(
        host='db',
        port=3306,
        user='root',
        passwd='root',
        db='db',
        # テーブル内部で日本語を扱うために追加
        charset='utf8'
    )
    cursor = connection.cursor()

    # # テーブルの初期化
    # cursor.execute("DROP TABLE IF EXISTS name_age_list")

    # # テーブルの作成
    # cursor.execute("""CREATE TABLE name_age_list(
    #     id INT(11) AUTO_INCREMENT NOT NULL,
    #     name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci,
    #     age INT(3) NOT NULL,
    #     PRIMARY KEY (id)
    #     )""")

    # # データの追加
    # cursor.execute("""INSERT INTO name_age_list (name, age)
    #     VALUES ('タロー', '25'),
    #     ('ジロー', '23'),
    #     ('サブロー', '21')
    #     """)

    # 一覧の表示
    cursor.execute("SELECT * FROM account")

    rows = cursor.fetchall()
    for row in rows:
        print(row)

    # 保存を実行
    connection.commit()

    # 接続を閉じる
    connection.close()

    return rows

def login(id, password):
    flag_exist = False
    
    # データベースへの接続とカーソルの生成
    connection = MySQLdb.connect(
        host='db',
        port=3306,
        user='root',
        passwd='root',
        db='db',
        # テーブル内部で日本語を扱うために追加
        charset='utf8'
    )
    cursor = connection.cursor()

    # 一覧の表示
    cursor.execute(f"SELECT * FROM account WHERE `id` = '{id}' AND `pass` = '{password}'")

    rows = cursor.fetchall()
    for row in rows:
        flag_exist = True
        print(row)

    # 保存を実行
    connection.commit()

    # 接続を閉じる
    connection.close()
    
    return flag_exist

    # return rows
    
    
def get_Login_data():
    login_data = {
        "id": "",
        "pass": ""
    }
    
    # データベースへの接続とカーソルの生成
    connection = MySQLdb.connect(
        host='db',
        port=3306,
        user='root',
        passwd='root',
        db='db',
        # テーブル内部で日本語を扱うために追加
        charset='utf8'
    )
    cursor = connection.cursor()

    # 一覧の表示
    cursor.execute(f"SELECT * FROM account WHERE `id` = 'renge' AND `pass` = '2212'")

    rows = cursor.fetchall()
    for row in rows:
        print(row)
        login_data['id'] = row[0]
        login_data['pass'] = row[1]

    # 保存を実行
    connection.commit()

    # 接続を閉じる
    connection.close()
    
    return login_data