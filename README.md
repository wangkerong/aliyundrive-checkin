# aliyundrive-checkin

## 说明
- 北京时间每日22:10签到
- 仅签到，月末时尝试一次性领取所有奖励

## secrets 配置
- `REFRESH_TOKENS`: 登录[阿里云盘](https://www.aliyundrive.com/drive)，在cookie中查找refresh_token字段
- `GP_TOKEN`: [前往设置](https://github.com/settings/tokens)
- `DO_NOT_REWARD`: 如果想要签到时领取奖励，请在 `.github/workflows/main.yml` 中将该参数设置为 `false`; 默认为 `true`
> 如果想要使用推送通知功能，请前往 [ImYrS/aliyun-auto-signin](https://github.com/ImYrS/aliyun-auto-signin/blob/main/How-To-Use-Action.md) 查看具体配置信息
