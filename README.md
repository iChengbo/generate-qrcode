# generate-qrcode

## Usage

```
- name: Genarate QrCode
  uses: iChengbo/generate-qrcode@v0.0.2
  id: getQrcode
  with:
    text: ${{string content}} # eg: https://cdn.jsdelivr.net/gh/iChengbo/genetate-action/package.json
    name: qrcode              # not required
- name: echo qrcode png name
  run: echo "${{ steps.getQRCode.outputs.QR_CODE_PNG_NAME }}"
```
