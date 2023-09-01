import "dotenv/config";
import fetch from "node-fetch";

const updateAccesssTokenURL = "https://auth.aliyundrive.com/v2/account/token";
const signinURL = "https://member.aliyundrive.com/v1/activity/sign_in_list";
const rewardURL =
  "https://member.aliyundrive.com/v1/activity/sign_in_reward?_rx-s=mobile";
const refreshToeknArry = process.env.REFRESH_TOKENS.split(",").map((i) =>
  i.trim()
);
const PUSH_TOKEN = process.env.PUSH_TOKEN

async function sendPushNotification(signin_count, rewardInfo) {
  const pushURL =
    `http://www.pushplus.plus/send?token=${PUSH_TOKEN}&title=` +
    `签到成功，本月签到${signin_count}天` +
    "&content=" +
    `本次签到获得:${rewardInfo}` +
    "&template=txt&channel=wechat";

  await fetch(pushURL, { method: "POST" });
}

(async () => {
  for (const elem of refreshToeknArry) {
    const queryBody = {
      grant_type: "refresh_token",
      refresh_token: elem,
    };

    try {
      // 使用 refresh_token 更新 access_token
      const updateAccessTokenResponse = await fetch(updateAccesssTokenURL, {
        method: "POST",
        body: JSON.stringify(queryBody),
        headers: { "Content-Type": "application/json" },
      });
      const updateAccessTokenData = await updateAccessTokenResponse.json();

      const access_token = updateAccessTokenData.access_token;

      // 签到
      const signinResponse = await fetch(signinURL, {
        method: "POST",
        body: JSON.stringify(queryBody),
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      });
      const signinData = await signinResponse.json();

      const signin_count = signinData.result.signInCount;
      console.log("签到成功, 本月累计签到" + signin_count + "天" + "\n");

      // 领取奖励
      const rewardResponse = await fetch(rewardURL, {
        method: "POST",
        body: JSON.stringify({ signInDay: signin_count }),
        headers: {
          Authorization: "Bearer " + access_token,
          "Content-Type": "application/json",
        },
      });
      const rewardData = await rewardResponse.json();

      const rewardInfo =
        rewardData.result.name + " " + rewardData.result.description;
      console.log("本次签到获得" + rewardInfo + "\n");

      // 发送推送通知
      await sendPushNotification(signin_count, rewardInfo);
    } catch (err) {
      console.log(err);
    }
  }
})().catch((e) => {
  console.error(`❗️  运行错误！\n${e}`);
});

