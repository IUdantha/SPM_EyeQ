import os
import subprocess
import sys
import cv2

from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/run_script', methods=['POST'])
def run_script():
    script_path = os.path.join(os.path.dirname(__file__), "BlinkCounter.py")
    subprocess.run([sys.executable, script_path])
    return 0


@app.route('/terminate', methods=['POST'])
def stop_script():
    cv2.destroyAllWindows()
    return 0


if __name__ == '__main__':
    app.run(debug=True, port=8000)