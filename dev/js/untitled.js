

 Url：v1/p/news/updateNews
请求方式：post
参数：id（稿件ID）
   status（0：未发刊，1:已发刊）
   channel（格式：
[{channelId,newsType,priceType,periodical,quantity,price},{channelId,newsType,priceType,periodical,quantity,price},]
）
   wordNumber（字数）
   hasChannel（0:没有渠道 1:有渠道）
   sourceId(1:自采 2:约稿)
   price(单价)
   priceType（1:字数 2:版面 3:篇 4:条）
   column（栏目中文）
   layoutPrice（版面奖）
   newsType（稿件细分Id）
   position（岗位中文）

（注：channel参数内容说明：
    channelId:渠道ID
    newsType（稿件细分Id）
    priceType（1:字数 2:版面 3:篇 4:条）
    periodical（期刊号）
    quantity（版面数/条数）
    price(单价)
  ）