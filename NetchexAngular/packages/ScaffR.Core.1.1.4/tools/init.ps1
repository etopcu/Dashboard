param($installPath, $toolsPath, $package)

$global:coreProjectName = $rootnamespace + ".Core"

Import-Module (Join-Path $toolsPath "CoreHelpers/CoreHelpers.psm1")