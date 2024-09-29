from flask import Flask, jsonify, request

app = Flask(__name__)

# Định nghĩa một route đơn giản
@app.route('/', methods=['GET'])
def chao():
    return jsonify(message="Xin chao!")

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify(message="Node gọi Python trả lời, lô lô lô!")

# Chạy server
if __name__ == '__main__':
    app.run(debug=True)