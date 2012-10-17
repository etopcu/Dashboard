param($installPath, $toolsPath, $package, $project)

get-projectitem CassetteConfiguration.cs | % {$_.Delete()}