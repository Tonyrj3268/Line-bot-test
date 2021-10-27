const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

var bot = linebot({
  channelId: '1656571928',
  channelSecret: 'cfda70340cba17a1cfa203c50044b3fb',
  channelAccessToken: 'CtY96gkFaHKWVH7oTGt0r3lxJnoCueluKV+2OFYF9UXBAfFCdalir0tqsbQeUjLgUwSr900bhB9yOqMDfK+/d6JI2TKpdDt3zNubyizUBdeSi24u1txOrSNRr7HER7QHhifdgi/0yc+uwp+FLPQnwwdB04t89/1O/w1cDnyilFU='
});

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get("/", (req, res) => {
  res.sendStatus(200)
})

app.post("/webhook", (req, res) =>{
        /*Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
        })*/
        console.log("123")
  res.send("HTTP POST request sent to the webhook URL!")
  if (req.body.events[0].type === "message") {
      // Message data, must be stringified
      const dataString = JSON.stringify(
      handleEvent(event)
      /*{
        replyToken: req.body.events[0].replyToken,
        messages: [
          {
            "type": "text",
            "text": "Hello, user"
          },
          {
            "type": "text",
            "text": "May I help you?"
          }
        ]
      }*/)}}

function handleEvent(event){
/*if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log('Test hook recieved: ' + JSON.stringify(event.message));
  }
  console.log(`User ID: ${event.source.userId}`)*/
  console.log('123')
  switch(event.type){
  case "message":
  const message = event.message;
        switch (message.type) {
          case 'text':
            return handleText(message, event.replyToken, event.source);
          case 'image':
            return handleImage(message, event.replyToken);
          case 'video':
            return handleVideo(message, event.replyToken);
          case 'audio':
            return handleAudio(message, event.replyToken);
          case 'location':
            return handleLocation(message, event.replyToken, event.source);
          case 'sticker':
            return handleSticker(message, event.replyToken);
          default:
            throw new Error(`Unknown message: ${JSON.stringify(message)}`);
        }
      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);


  }

}

function handleText(message, replyToken, source) {
  switch (message.text) {
    case "公車":
        return client.replyMessage(replyToken, [
          {
            type: 'image',
            originalContentUrl: 'https://kbus.com.tw/upload/ckeditor/images/%E7%9B%B4-E25-1100308.jpg',
            previewImageUrl: 'https://developers.line.biz/media/messaging-api/messages/image-167efb33.png'
          }
        ]);
    /*case '溫泉':
        return client.replyMessage(replyToken,[
        {
                                                  "type": "bubble",
                                                  "hero": {
                                                    "type": "image",
                                                    "url": "https://storage.googleapis.com/smiletaiwan-cms-cwg-tw/article/201901/article-5c3bfec68ea43.jpg",
                                                    "size": "full",
                                                    "aspectRatio": "20:13",
                                                    "aspectMode": "cover",
                                                    "action": {
                                                      "type": "uri",
                                                      "uri": "http://linecorp.com/"
                                                    }
                                                  },
                                                  "body": {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "contents": [
                                                      {
                                                        "type": "text",
                                                        "text": "寶來溫泉",
                                                        "weight": "bold",
                                                        "size": "xl"
                                                      },
                                                      {
                                                        "type": "box",
                                                        "layout": "baseline",
                                                        "margin": "md",
                                                        "contents": [
                                                          {
                                                            "type": "icon",
                                                            "size": "sm",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                                          },
                                                          {
                                                            "type": "icon",
                                                            "size": "sm",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                                          },
                                                          {
                                                            "type": "icon",
                                                            "size": "sm",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                                          },
                                                          {
                                                            "type": "icon",
                                                            "size": "sm",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
                                                          },
                                                          {
                                                            "type": "icon",
                                                            "size": "sm",
                                                            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
                                                          },
                                                          {
                                                            "type": "text",
                                                            "text": "4.0",
                                                            "size": "sm",
                                                            "color": "#999999",
                                                            "margin": "md",
                                                            "flex": 0
                                                          }
                                                        ]
                                                      },
                                                      {
                                                        "type": "box",
                                                        "layout": "vertical",
                                                        "margin": "lg",
                                                        "spacing": "sm",
                                                        "contents": [
                                                          {
                                                            "type": "box",
                                                            "layout": "baseline",
                                                            "spacing": "sm",
                                                            "contents": [
                                                              {
                                                                "type": "text",
                                                                "text": "Place",
                                                                "color": "#aaaaaa",
                                                                "size": "sm",
                                                                "flex": 1
                                                              },
                                                              {
                                                                "type": "text",
                                                                "text": "Kaohsiung Six-turtle",
                                                                "wrap": true,
                                                                "color": "#666666",
                                                                "size": "sm",
                                                                "flex": 5
                                                              }
                                                            ]
                                                          },
                                                          {
                                                            "type": "box",
                                                            "layout": "baseline",
                                                            "spacing": "sm",
                                                            "contents": [
                                                              {
                                                                "type": "text",
                                                                "text": "Time",
                                                                "color": "#aaaaaa",
                                                                "size": "sm",
                                                                "flex": 1
                                                              },
                                                              {
                                                                "type": "text",
                                                                "text": "10:00 - 23:00",
                                                                "wrap": true,
                                                                "color": "#666666",
                                                                "size": "sm",
                                                                "flex": 5
                                                              }
                                                            ]
                                                          }
                                                        ]
                                                      }
                                                    ]
                                                  },
                                                  "footer": {
                                                    "type": "box",
                                                    "layout": "vertical",
                                                    "spacing": "sm",
                                                    "contents": [
                                                      {
                                                        "type": "button",
                                                        "style": "link",
                                                        "height": "sm",
                                                        "action": {
                                                          "type": "uri",
                                                          "label": "CALL",
                                                          "uri": "https://linecorp.com"
                                                        }
                                                      },
                                                      {
                                                        "type": "button",
                                                        "style": "link",
                                                        "height": "sm",
                                                        "action": {
                                                          "type": "uri",
                                                          "label": "WEBSITE",
                                                          "uri": "https://smiletaiwan.cw.com.tw/article/1327"
                                                        }
                                                      },
                                                      {
                                                        "type": "spacer",
                                                        "size": "sm"
                                                      }
                                                    ],
                                                    "flex": 0
                                                  }
                                                }])*/

    default:
      console.log(`Echo message to ${replyToken}: ${message.text}`);
      const echo = {
        type: 'text',
        text: message.text
      };
      return client.replyMessage(replyToken, echo);
  }
}

      // Request header
      const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + TOKEN
      }

      // Options to pass into the request
      const webhookOptions = {
        "hostname": "api.line.me",
        "path": "/v2/bot/message/reply",
        "method": "POST",
        "headers": headers,
        "body": dataString
      }

      // Define request
      const request = https.request(webhookOptions, (res) => {
        res.on("data", (d) => {
          process.stdout.write(d)
        })
      })

      // Handle error
      request.on("error", (err) => {
        console.error(err)
      })

      // Send data
      request.write(dataString)
      request.end()
    }
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})