/*
 * @Author: iChengbo
 * @Date: 2021-09-16 14:50:11
 * @LastEditors: iChengbo
 * @LastEditTime: 2021-10-14 14:58:56
 * @FilePath: /action/src/main.ts
 */
import * as core from '@actions/core'
import QRCode from 'qrcode'
import stringHash from 'string-hash'

/**
 * 字符串 转为 二维码
 */
export async function run(): Promise<void> {
  try {
    const paths: string[] = core.getMultilineInput('paths')
    // 创建二维码
    // const QR_CODE_STRING = await QRCode.toString(text, {
    //   type: 'terminal'
    // })
    // core.info(QR_CODE_STRING)
    // core.setOutput('QR_CODE_STRING', QR_CODE_STRING)
    // core.info(`${paths.length}`)

    // const QR_CODE_BASE64 = await QRCode.toDataURL(text)
    // core.setOutput('QR_CODE_BASE64', QR_CODE_BASE64)

    const QR_CODE_PNG_NAMES: string[] = []

    for (const path of paths) {
      const QR_CODE_PNG_NAME = `${stringHash(path)}.png`
      QRCode.toFile(
        `${process.cwd()}/${QR_CODE_PNG_NAME}`,
        path,
        {type: 'png'},
        err => {
          if (err) throw err
          core.info(`完成：${QR_CODE_PNG_NAME}`)
          QR_CODE_PNG_NAMES.push(QR_CODE_PNG_NAME)
          if (QR_CODE_PNG_NAMES.length === paths.length) {
            core.info(`done: ${QR_CODE_PNG_NAMES}`)
            core.setOutput('QR_CODE_PNG_NAMES', QR_CODE_PNG_NAMES)
          }
        }
      )
    }
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    core.setFailed(error.message)
  }
}

run()
