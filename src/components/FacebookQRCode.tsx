import { QRCodeCanvas } from "qrcode.react";

const FacebookQRCode = () => {
    const url = "https://www.facebook.com/share/1awoAgBvSK/";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center space-y-4">


                <div className="flex justify-center">
                    <QRCodeCanvas
                        value={url}
                        size={220}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="H"
                        includeMargin
                    />
                </div>

            </div>
        </div>
    );
};

export default FacebookQRCode;
