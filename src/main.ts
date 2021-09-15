/*
 * @Author: iChengbo
 * @Date: 2021-09-14 22:04:39
 * @LastEditors: iChengbo
 * @LastEditTime: 2021-09-15 11:11:45
 * @FilePath: /action/src/main.ts
 */
import * as core from '@actions/core'
import * as fs from 'fs'
import * as qrCreate from 'qr-image'

/**
 * 1. 入参：file(文件地址)、cdn(CDN 地址)
 * 2. CDN：
 *   2.1 根据文件地址 path 生成 jsDelivr CDN 地址
 *   2.2 若有自建 CDN，则生成自建的 CDN 地址？
 * 3. 二维码：CDN 地址生成二维码图片
 * 4. 图片添加至项目中？
 * 5. ~~修改类似 CHANGELOG 的文件?~~
 * 6. git add + commit?
 */
export async function run(): Promise<void> {
  try {
    const file = core.getInput('file')
    core.info(typeof file)
    core.info(`入口文件 ${file}`)
    core.debug(file)
    core.info(file)
    // // 构建 CDN 地址
    const cnd = `https://cdn.jsdelivr.net/gh/${file}`

    // // 创建二维码
    const qr_png = qrCreate.image(cnd, {type: 'png'})

    // TODO: 生成的图片保存地址
    if (!fs.existsSync('./qrcode')) {
      fs.mkdirSync('./qrcode')
    }
    qr_png.pipe(fs.createWriteStream(`./qrcode/${+new Date()}.png`))
    qr_png.pipe(fs.createWriteStream(`./qrcode/lastest.png`))

    core.info('已经生成二维码啦')

    // TODO: git add + git commit
  } catch (error) {
    // core.setFailed(error.message)
  }
}

run()
