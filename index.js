import "dotenv/config";
import fetch from "node-fetch";
// const notify = require("./sendNotify");

const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token";
const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list";
const rewardURL =
  "https://member.aliyundrive.com/v1/activity/sign_in_reward?_rx-s=mobile";
const refreshToeknArry = process.env.REFRESH_TOKENS.split(",").map((i) =>
  i.trim()
);

!(async () => {
  for (const elem of refreshToeknArry) {
    const queryBody = {
      grant_type: "refresh_token",
      refresh_token: elem,
    };

    //使用 refresh_token 更新 access_token
    fetch(updateAccesssTokenURL, {
      method: "POST",
      body: JSON.stringify(queryBody),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        let access_token = json.access_token;
        // console.log(access_token);

        //签到
        fetch(signinURL, {
          method: "POST",
          body: JSON.stringify(queryBody),
          headers: {
            Authorization: "Bearer " + access_token,
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((json) => {
            const signin_count = json["result"]["signInCount"];
            console.log("签到成功, 本月累计签到" + signin_count + "天" + "\n");

            //领取奖励
            fetch(rewardURL, {
              method: "POST",
              body: JSON.stringify({ signInDay: signin_count }),
              headers: {
                Authorization: "Bearer " + access_token,
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((json) => {
                console.log(
                  "本次签到获得" +
                    json["result"]["name"] +
                    " " +
                    json["result"]["description"] +
                    "\n"
                );
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  // await notify.sendNotifyBark(`v2free 自动签到结果`,allnotify)
})()
  .catch((e) => {
    console.error(`❗️  运行错误！\n${e}`);
  })
  .finally();
// notify.sendNotify(`v2free 自动签到结果`,allnotify)
