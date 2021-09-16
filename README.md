# generate-qrcode

## Usage

```
- name: Genarate QrCode
  uses: iChengbo/generate-qrcode@v0.0.2
  id: getQrcode
  with:
    file: ${{filePath}}
- name: echo path
  run: echo "${{ steps.getQRCode.outputs.QR_CODE_PNG_PATH }}"
```
