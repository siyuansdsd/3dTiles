import { QRCodeCanvas }  from 'qrcode.react'

const QRCodeGen = ({url, size}) => {
    return (
        <QRCodeCanvas value={url} size={size} />
    )
}

export default QRCodeGen