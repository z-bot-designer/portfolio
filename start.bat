@echo off
chcp 65001 >nul
cls

REM =========================================
REM  个人作品集网站 - 本地服务器一键启动
REM =========================================

echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║  个人作品集网站 - 本地服务器一键启动             ║
echo  ╚══════════════════════════════════════════════════╝
echo.

REM 检查 Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo  [X] 未检测到 Node.js
    echo.
    echo  请先安装 Node.js：
    echo  https://nodejs.org/
    echo.
    echo  安装完成后重新运行此文件
    echo.
    pause
    exit /b 1
)

node -v 2>&1 | find "v" >nul
if errorlevel 1 (
    echo  [X] 未检测到 Node.js
    echo.
    echo  请先安装 Node.js：
    echo  https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js 已安装
node -v
echo.

REM 切换目录
cd /d "%~dp0"

REM 检查 server.js
if not exist "server.js" (
    echo  [X] 未找到 server.js 文件
    echo.
    pause
    exit /b 1
)

echo  [OK] 文件检查通过
echo.
echo  ╔══════════════════════════════════════════════════╗
echo  ║  服务器正在启动...                               ║
echo  ║  访问地址将在下方显示                            ║
echo  ╚══════════════════════════════════════════════════╝
echo.

REM 启动服务器
node server.js

echo.
echo  服务器已停止运行
pause
