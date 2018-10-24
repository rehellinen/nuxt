/**
 *  BuyerToken.js
 *  Create By rehellinen
 *  Create On 2018/10/18 14:53
 */
import {Token} from "./Token"
import config from '../../../utils/config'
import {BuyerModel} from "../../model/BuyerModel"

export class BuyerToken extends Token{
  constructor() {
    const conf = {
      appId: config.WECHAT.BUYER_MP.APP_ID,
      appSecret: config.WECHAT.BUYER_MP.APP_SECRET,
      url: config.WECHAT_API.MP_CODE
    }
    super(conf)
  }


  async get (code) {
    // 从微信服务器拿到openId
    const data = await this.getFromWechat({
      grant_type: 'authorization_code',
      js_code: code
    })
    // 存入数据库并返回用户ID
    const userId = await (new BuyerModel()).saveOpenId(data.openid)
    // 生成需要缓存的数据
    const cachedData = {
      id: userId,
      scope: config.SCOPE.BUYER
    }
    // 生成Token以及相关数据
    return this.saveToCache(cachedData)
  }
}
