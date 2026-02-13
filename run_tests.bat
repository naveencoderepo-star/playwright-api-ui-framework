
@echo off
setlocal

:: --- Configuration ---
:: Ensure this matches your project root if the script is moved
set "PROJECT_ROOT=%~dp0"
set "NODE_ENV=qa"

:: --- Step 1: Install Dependencies ---
echo [INFO] Installing dependencies...
call npm ci
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies.
    exit /b %ERRORLEVEL%
)

:: --- Step 2: Install Playwright Browsers ---
echo [INFO] Installing Playwright browsers...
call npx playwright install --with-deps
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install Playwright browsers.
    exit /b %ERRORLEVEL%
)

:: --- Step 3: Run Tests ---
:: You can pass arguments to this script to filter tests, e.g., "run_tests.bat --project=chromium"
echo [INFO] Running Playwright tests...
call npx playwright test %*
set TEST_EXIT_CODE=%ERRORLEVEL%

:: --- Step 4: Generate/Show Report (Optional for CI, usually handled by plugins) ---
:: echo [INFO] Generating report...
:: call npx playwright show-report

if %TEST_EXIT_CODE% NEQ 0 (
    echo [ERROR] Tests failed with exit code %TEST_EXIT_CODE%.
    exit /b %TEST_EXIT_CODE%
)

echo [INFO] All tests passed successfully.
exit /b 0
