ECHO OFF

reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OS=32||set OS=64

set OS=32

ECHO.
ECHO ----------------------------------------
ECHO copy file to converter
ECHO ----------------------------------------

mkdir "%~dp0\App_Data"
mkdir "%~dp0\FileConverter\bin"
mkdir "%~dp0\FileConverter\bin\HtmlFileInternal"

cd /D "%~dp0\FileConverter\bin" || goto ERROR
copy "..\..\..\core\build\bin\win_64\icudt.dll" "."
copy "..\..\..\core\build\bin\icu\win_%OS%\icudt55.dll" "."
copy "..\..\..\core\build\bin\icu\win_%OS%\icuuc55.dll" "."
copy "..\..\..\core\build\lib\DoctRenderer.config" "."
copy "..\..\..\core\build\lib\win_%OS%\doctrenderer.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\HtmlRenderer.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\DjVuFile.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\XpsFile.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\PdfReader.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\PdfWriter.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\HtmlFile.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\UnicodeConverter.dll" "."
copy "..\..\..\core\build\lib\win_%OS%\HtmlFileInternal.exe" ".\HtmlFileInternal"
xcopy /s/h/e/k/c/y/q "..\..\..\core\build\cef\win_%OS%" ".\HtmlFileInternal"
copy "..\..\..\core\build\bin\win_%OS%\x2t.exe" "."

"..\..\..\core\build\bin\AllFontsGen\win_%OS%.exe" "%windir%\Fonts" "%~dp0\..\sdkjs\common\AllFonts.js" "%~dp0\..\sdkjs\common\Images" "%~dp0\FileConverter\bin\font_selection.bin"

mkdir "%~dp0\SpellChecker\dictionaries"
cd /D "%~dp0\SpellChecker" || goto ERROR
xcopy /s/e/k/c/y/q "..\..\dictionaries" ".\dictionaries"

:ERROR
:SUCCESS
pause
