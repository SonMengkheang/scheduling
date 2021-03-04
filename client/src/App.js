import  React from 'react';
import QRCode from 'qrcode.react';
import { useBarcode } from '@createnextapp/react-barcode';

const App = () => {

  const { inputRef } = useBarcode({
    value: '123245657891012',
    options: {
      format: "CODE128",
    }
  }); 
  const downloadQR = () => {
    const canvas = document.getElementById("QRCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QRCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const downloadBar = () => {
    const canvas = document.getElementById("BarCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "BarCode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div>
      <QRCode
        id="QRCode"
        value="QRCode"
        size={290}
        level={"H"}
        includeMargin={true}
      />
      <button onClick={downloadQR}>
        Download QR Code
      </button>

      <canvas
        id="BarCode"
        includeMargin={true}  
        ref ={inputRef}
      />
      <button onClick={downloadBar}>
        Download Bar Code
      </button>
    </div>
  )
}

export default App
