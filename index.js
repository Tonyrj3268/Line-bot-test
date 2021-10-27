const https = require("https")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.LINE_ACCESS_TOKEN

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
      handleEvent(req.body.events[0])
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
/*function handleEvent(event) {
    if (event.replyToken === "00000000000000000000000000000000" || event.replyToken === "ffffffffffffffffffffffffffffffff")
        return Promise.resolve(null);
    if (event.type !== 'message' || event.message.type !== 'text') {
        // ignore non-text-message event
        return Promise.resolve(null);
    }
    if (event.message.text === '測試1') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'sticker',
                packageId: '1',
                stickerId: '1'
            },
            {
                type: 'image',
                originalContentUrl: 'https://developers.line.biz/media/messaging-api/messages/image-full-04fbba55.png',
                previewImageUrl: 'https://developers.line.biz/media/messaging-api/messages/image-167efb33.png'
            },
            {
                type: 'video',
                originalContentUrl: 'https://www.sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4',
                previewImageUrl: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
            },
            {
                type: 'audio',
                originalContentUrl: 'https://www.sample-videos.com/audio/mp3/crowd-cheering.mp3',
                duration: '27000'
            },
            {
                type: 'location',
                title: 'my location',
                address: "〒150-0002 東京都渋谷区渋谷２丁目２１−１",
                latitude: 35.65910807942215,
                longitude: 139.70372892916203
            }
        ]);
    }
    if (event.message.text === '測試2') {
        return client.replyMessage(event.replyToken, [
            {
                type: 'imagemap',
                baseUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/rich',
                altText: 'Imagemap alt text',
                baseSize: { width: 1040, height: 1040 },
                actions: [
                    { area: { x: 0, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/manga/en' },
                    { area: { x: 520, y: 0, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/music/en' },
                    { area: { x: 0, y: 520, width: 520, height: 520 }, type: 'uri', linkUri: 'https://store.line.me/family/play/en' },
                    { area: { x: 520, y: 520, width: 520, height: 520 }, type: 'message', text: 'URANAI!' },
                ],
                video: {
                    originalContentUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/video.mp4',
                    previewImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/imagemap/preview.jpg',
                    area: {
                        x: 280,
                        y: 385,
                        width: 480,
                        height: 270,
                    },
                    externalLink: {
                        linkUri: 'https://line.me',
                        label: 'LINE'
                    }
                },
            },
            {
                type: 'template',
                altText: 'Buttons alt text',
                template: {
                    type: 'buttons',
                    thumbnailImageUrl: 'https://github.com/line/line-bot-sdk-nodejs/raw/master/examples/kitchensink/static/buttons/1040.jpg',
                    title: 'My button sample',
                    text: 'Hello, my button',
                    actions: [
                        { label: 'Go to line.me', type: 'uri', uri: 'https://line.me' },
                        { label: 'Say hello1', type: 'postback', data: 'hello こんにちは' },
                        { label: '言 hello2', type: 'postback', data: 'hello こんにちは', text: 'hello こんにちは' },
                        { label: 'Say message', type: 'message', text: 'Rice=米' },
                    ],
                },
            },
            {
                type: 'flex',
                altText: 'this is a flex message',
                contents: {
                    type: 'bubble',
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'text',
                                text: 'hello'
                            },
                            {
                                type: 'text',
                                text: 'world'
                            }
                        ]
                    }
                }
            }
        ]);
    }

    // create a echoing text message
    const echo = { type: 'text', text: event.message.text };

    // use reply API
    return client.replyMessage(event.replyToken, echo);
}*/
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