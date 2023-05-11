# aliyundrive-checkin

## 说明
- 北京时间每日 12:00 签到

## secrets 配置
- `REFRESH_TOKENS`: 登录[阿里云盘](https://www.aliyundrive.com/drive)，在 `cookie` 中查找 `refresh_token` 字段
- `GP_TOKEN`: [前往设置](https://github.com/settings/tokens)
- `DO_NOT_REWARD`: 如果想要签到时<b>不领取奖励</b>，请在 `.github/workflows/main.yml` 中将该参数设置为 `true`; 默认为 `false`
> 如果想要使用推送通知功能，请前往 [ImYrS/aliyun-auto-signin](https://github.com/ImYrS/aliyun-auto-signin/blob/main/How-To-Use-Action.md) 查看具体配置信息
