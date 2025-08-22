@echo off
title Build-A-Plane (Batch Edition)
color 0A

:: =================================================================
:: :: MAIN MENU
:: =================================================================
:main_menu
cls
echo.
echo  ============================================
echo  ==                                        ==
echo  ==        B U I L D - A - P L A N E       ==
echo  ==                                        ==
echo  ============================================
echo.
echo            (A Simple Batch Game)
echo.
echo.
echo   [1] Build a New Plane
echo   [2] Exit Game
echo.

choice /c 12 /n /m "Choose an option: "
if errorlevel 2 goto :eof
if errorlevel 1 goto :start_build


:: =================================================================
:: :: START THE BUILD PROCESS (Reset Stats)
:: =================================================================
:start_build
set plane_speed=0
set plane_agility=0
set plane_durability=0

:: Let's start with the first component
goto :build_fuselage


:: =================================================================
:: :: PART SELECTION - FUSELAGE
:: =================================================================
:build_fuselage
cls
echo.
echo  --- STEP 1 of 4: CHOOSE A FUSELAGE ---
echo.
echo   [1] Lightweight Frame
echo       (Speed: +5, Agility: +5, Durability: -3)
echo.
echo   [2] Standard Chassis
echo       (Speed: +2, Agility: +2, Durability: +2)
echo.
echo   [3] Armored Hull
echo       (Speed: -4, Agility: -4, Durability: +8)
echo.

choice /c 123 /n /m "Select your fuselage: "
if errorlevel 3 goto :fuselage_3
if errorlevel 2 goto :fuselage_2
if errorlevel 1 goto :fuselage_1

:fuselage_1
set /a plane_speed+=5
set /a plane_agility+=5
set /a plane_durability-=3
goto :build_wings

:fuselage_2
set /a plane_speed+=2
set /a plane_agility+=2
set /a plane_durability+=2
goto :build_wings

:fuselage_3
set /a plane_speed-=4
set /a plane_agility-=4
set /a plane_durability+=8
goto :build_wings


:: =================================================================
:: :: PART SELECTION - WINGS
:: =================================================================
:build_wings
cls
echo.
echo  --- STEP 2 of 4: CHOOSE WINGS ---
echo.
echo   [1] Glider Wings
echo       (Speed: -2, Agility: +8, Durability: -2)
echo.
echo   [2] Fighter Wings
echo       (Speed: +4, Agility: +4, Durability: +0)
echo.
echo   [3] Bomber Wings
echo       (Speed: -3, Agility: -3, Durability: +6)
echo.

choice /c 123 /n /m "Select your wings: "
if errorlevel 3 goto :wings_3
if errorlevel 2 goto :wings_2
if errorlevel 1 goto :wings_1

:wings_1
set /a plane_speed-=2
set /a plane_agility+=8
set /a plane_durability-=2
goto :build_engine

:wings_2
set /a plane_speed+=4
set /a plane_agility+=4
set /a plane_durability+=0
goto :build_engine

:wings_3
set /a plane_speed-=3
set /a plane_agility-=3
set /a plane_durability+=6
goto :build_engine


:: =================================================================
:: :: PART SELECTION - ENGINE
:: =================================================================
:build_engine
cls
echo.
echo  --- STEP 3 of 4: CHOOSE AN ENGINE ---
echo.
echo   [1] Single Propeller
echo       (Speed: +3, Agility: +1, Durability: +1)
echo.
echo   [2] Twin Jet Engines
echo       (Speed: +8, Agility: -2, Durability: +2)
echo.
echo   [3] Experimental Rocket
echo       (Speed: +12, Agility: -5, Durability: -4)
echo.

choice /c 123 /n /m "Select your engine: "
if errorlevel 3 goto :engine_3
if errorlevel 2 goto :engine_2
if errorlevel 1 goto :engine_1

:engine_1
set /a plane_speed+=3
set /a plane_agility+=1
set /a plane_durability+=1
goto :build_tail

:engine_2
set /a plane_speed+=8
set /a plane_agility-=2
set /a plane_durability+=2
goto :build_tail

:engine_3
set /a plane_speed+=12
set /a plane_agility-=5
set /a plane_durability-=4
goto :build_tail


:: =================================================================
:: :: PART SELECTION - TAIL
:: =================================================================
:build_tail
cls
echo.
echo  --- STEP 4 of 4: CHOOSE A TAIL ---
echo.
echo   [1] Simple Rudder
echo       (Speed: +0, Agility: +1, Durability: +0)
echo.
echo   [2] Stabilized Fin
echo       (Speed: +1, Agility: +3, Durability: +2)
echo.
echo   [3] No Tail (Unstable!)
echo       (Speed: +2, Agility: -6, Durability: -3)
echo.

choice /c 123 /n /m "Select your tail: "
if errorlevel 3 goto :tail_3
if errorlevel 2 goto :tail_2
if errorlevel 1 goto :tail_1

:tail_1
set /a plane_agility+=1
goto :calculate_flight

:tail_2
set /a plane_speed+=1
set /a plane_agility+=3
set /a plane_durability+=2
goto :calculate_flight

:tail_3
set /a plane_speed+=2
set /a plane_agility-=6
set /a plane_durability-=3
goto :calculate_flight


:: =================================================================
:: :: CALCULATE AND DISPLAY FLIGHT REPORT
:: =================================================================
:calculate_flight
cls
echo.
echo  ============================================
echo  ==                                        ==
echo  ==            FLIGHT REPORT               ==
echo  ==                                        ==
echo  ============================================
echo.
echo  Your Plane's Final Stats:
echo  -------------------------
echo    Speed      : %plane_speed%
echo    Agility    : %plane_agility%
echo    Durability : %plane_durability%
echo.
echo  Pilot's Notes:
echo  --------------
echo.

:: Speed evaluation
if %plane_speed% GTR 12 echo  - "This thing is a blur! A true speed demon!"
if %plane_speed% LEQ 12 if %plane_speed% GTR 6 echo  - "A respectable speed. It gets the job done."
if %plane_speed% LEQ 6 echo  - "It struggles to get off the ground. Slower than a snail."

:: Agility evaluation
if %plane_agility% GTR 8 echo  - "Turns on a dime! Incredibly nimble."
if %plane_agility% LEQ 8 if %plane_agility% GTR 2 echo  - "Handles like a standard aircraft. Predictable."
if %plane_agility% LEQ 2 echo  - "It turns like a cargo ship. Avoid sharp corners!"

:: Durability evaluation
if %plane_durability% GTR 8 echo  - "Built like a flying tank! It can take a real beating."
if %plane_durability% LEQ 8 if %plane_durability% GTR 2 echo  - "Standard hull integrity. Should hold up fine."
if %plane_durability% LEQ 2 echo  - "This plane is made of paper and glue. Be careful!"
echo.
echo.
pause
goto :main_menu