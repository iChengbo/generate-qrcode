import * as core from '@actions/core'
import QRCode from 'qrcode'

/**
 * 1. 入参：file(文件地址)、cdn(CDN 地址)
 * 2. CDN：
 *   2.1 根据文件地址 path 生成 jsDelivr CDN 地址
 *   2.2 若有自建 CDN，则生成自建的 CDN 地址？
 * 3. 二维码：CDN 地址生成二维码图片
 */
export async function run(): Promise<void> {
  try {
    const file = core.getInput('file')
    // 构建 CDN 地址
    const cdn = `https://cdn.jsdelivr.net/gh/${file}`
    // TODO：自定义 CDN

    // 创建二维码
    // const QR_CODE_STRING = await QRCode.toString(cdn, {
    //   type: 'terminal'
    // })
    // core.info(QR_CODE_STRING)
    // core.setOutput('QR_CODE_STRING', QR_CODE_STRING)

    const QR_CODE_BASE64 = await QRCode.toDataURL(cdn)
    core.setOutput('QR_CODE_BASE64', QR_CODE_BASE64)

    const QR_CODE_PNG_PATH = `${process.cwd()}/qrcode.png`
    QRCode.toFile(QR_CODE_PNG_PATH, cdn, {type: 'png'}, err => {
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
