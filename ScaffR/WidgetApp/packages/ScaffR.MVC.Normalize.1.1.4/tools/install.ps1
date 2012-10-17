param($installPath, $toolsPath, $package, $project)

scaffold scaffr.mvc.normalize

get-projectitem "app_start" | % { $_.Delete() }
get-projectitem "global.asax.cs" | % { $_.Delete() }