import * as core from '@actions/core'
import QRCode from 'qrcode'
import stringHash from 'string-hash'

/**
 * 字符串 转为 二维码图片
 */
export async function run(): Promise<void> {
  try {
    const text = core.getInput('text')
    const name = core.getInput('name')

    const QR_CODE_BASE64 = await QRCode.toDataURL(text)
    core.setOutput('QR_CODE_BASE64', QR_CODE_BASE64)

    const QR_CODE_PNG_NAME = name ? `${name}.png` : `${stringHash(text)}.png`
    core.setOutput('QR_CODE_PNG_NAME', QR_CODE_PNG_NAME)

    const QR_CODE_PNG_PATH = `${process.cwd()}/${QR_CODE_PNG_NAME}`
    QRCode.toFile(QR_CODE_PNG_PATH, text, {type: 'png'}, err => {
      if (err) throw err
      core.info('done')
      core.setOutput('QR_CODE_PNG_PATH', QR_CODE_PNG_PATH)
    })
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    core.setFailed(error.message)
  }
}

run()
