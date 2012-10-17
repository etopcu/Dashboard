param($installPath, $toolsPath, $package, $project)

get-projectitem deleteme.txt | % { $_.Delete() }