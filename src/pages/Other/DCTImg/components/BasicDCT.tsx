import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
/*

// 转换为灰度图
function convertToGrayscale(dataArray: number[]) {
  const data = [...dataArray];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];

    const g = data[i + 1];

    const b = data[i + 2];

    // 计算灰度值

    const gray = 0.299 * r + 0.587 * g + 0.114 * b;

    data[i] = data[i + 1] = data[i + 2] = gray;
  }
  return data;
}

function compressImg(imgSrc: string, imgWidth: number = 8): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    if (!imgSrc) {
      reject("imgSrc can not be empty!");
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      canvas.width = imgWidth;
      canvas.height = imgWidth;
      ctx?.drawImage(img, 0, 0, imgWidth, imgWidth);
      const data = ctx?.getImageData(0, 0, imgWidth, imgWidth) as ImageData;
      resolve(data);
    };
    img.src = imgSrc;
  });
}

// 一维数组升维
function createMatrix(arr: number[]) {
  const length = arr.length;
  const matrixWidth = Math.sqrt(length);
  const matrix = [];
  for (let i = 0; i < matrixWidth; i++) {
    const _temp = arr.slice(i * matrixWidth, i * matrixWidth + matrixWidth);
    matrix.push(_temp);
  }
  return matrix;
}

// 从矩阵中获取其“左上角”大小为 range × range 的内容
function getMatrixRange(matrix: number[][], range: number = 1) {
  const rangeMatrix = [];
  for (let i = 0; i < range; i++) {
    for (let j = 0; j < range; j++) {
      rangeMatrix.push(matrix[i][j]);
    }
  }
  return rangeMatrix;
}

function getPHashFingerprint(data: number[]) {
  const dctData = dct(convertToGrayscale(data));
  const dctMatrix = createMatrix(dctData);
  const rangeMatrix = getMatrixRange(dctMatrix, dctMatrix.length / 8);
  const rangeAve =
    rangeMatrix.reduce((pre, cur) => pre + cur, 0) / rangeMatrix.length;
  return rangeMatrix.map((val) => (val >= rangeAve ? 1 : 0)).join("");
}

function memoizeCosines(N: number, cosMap: any) {
  cosMap = cosMap || {};
  cosMap[N] = new Array(N * N);

  const PI_N = Math.PI / N;

  for (let k = 0; k < N; k++) {
    for (let n = 0; n < N; n++) {
      cosMap[N][n + k * N] = Math.cos(PI_N * (n + 0.5) * k);
    }
  }
  return cosMap;
}

function dct(signal: number[], scale: number = 2) {
  const L = signal.length;
  let cosMap = null;

  cosMap = memoizeCosines(L, cosMap);

  const coefficients = signal.map(function () {
    return 0;
  });

  return coefficients.map(function (_, ix) {
    return (
      scale *
      signal.reduce(function (prev, cur, index) {
        return prev + cur * cosMap[L][index + ix * L];
      }, 0)
    );
  });
}
*/

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const handleImage = async () => {
    if (imageUrl) {
      // const { data } = await compressImg(imageUrl);
      // console.log(getPHashFingerprint(data));
    }
  };

  useEffect(() => {
    handleImage();
  }, [imageUrl]);

  const beforeUpload = (file: FileType) => {
    getBase64(file, (url) => {
      setImageUrl(url);
    });
    return false;
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default App;
