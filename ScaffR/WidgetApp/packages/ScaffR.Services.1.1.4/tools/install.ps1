param($installPath, $toolsPath, $package, $project)

Add-Project $serviceProjectName | with-reference "$dataProjectName,$coreProjectName,System.ServiceModel,System.Runtime.Serialization,System.ComponentModel.DataAnnotations"

Get-Project | With-Reference $serviceProjectName

scaffold ScaffR.Services

