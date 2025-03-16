from flask import Flask, jsonify

app = Flask(__name__)

# 預設的 LIFF ID
LIFF_ID = "2007067558-PaEYb4om"

@app.route('/api/liff/getLiffId', methods=['GET'])
def get_liff_id():
    return jsonify({'liffId': LIFF_ID})

if __name__ == '__main__':
    app.run(debug=True)

