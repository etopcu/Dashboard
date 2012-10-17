param($installPath, $toolsPath, $package, $project)

Add-Project $dataProjectName | With-Reference "System.ServiceModel,System.Runtime.Serialization,$coreProjectName"

Get-Project | With-Reference $dataProjectName

scaffold ScaffR.Data.common