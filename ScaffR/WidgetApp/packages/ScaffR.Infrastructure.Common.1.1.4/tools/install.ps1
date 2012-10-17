param($installPath, $toolsPath, $package, $project)

Add-Project $infrastructureProjectName | With-Reference "System.ServiceModel,System.Configuration,System.Web,System.Runtime.Serialization,System.ComponentModel.DataAnnotations"

get-Project $coreProjectName | With-Reference "$infrastructureProjectName"

get-project | With-Reference "$infrastructureProjectName"

scaffold scaffr.infrastructure.common
