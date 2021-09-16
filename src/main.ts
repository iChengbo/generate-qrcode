import * as core from '@actions/core'
import QRCode from 'qrcode'

/**
 * 字符串 转为 二维码
 */
export async function run(): Promise<void> {
  try {
    const text = core.getInput('text')
    // 创建二维码
    // const QR_CODE_STRING = await QRCode.toString(text, {
    //   type: 'terminal'
    // })
    // core.info(QR_CODE_STRING)
    // core.setOutput('QR_CODE_STRING', QR_CODE_STRING)

    const QR_CODE_BASE64 = await QRCode.toDataURL(text)
    core.setOutput('QR_CODE_BASE64', QR_CODE_BASE64)

    const QR_CODE_PNG_PATH = `${process.cwd()}/qrcode.png`
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
