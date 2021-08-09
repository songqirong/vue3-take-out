# 错误抛出异常
set -e

# push远程
git add .
git commit -m $1
git push


# 打包
npm run build

# 压缩
zip -rm dist.zip dist


