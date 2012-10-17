[T4Scaffolding.Scaffolder()][CmdletBinding()]
param(        
	[parameter(Mandatory = $true, ValueFromPipelineByPropertyName = $true)][string]$ModelType,
	[string]$Project,
	[string]$CodeLanguage,
	[string[]]$TemplateFolders,
	[switch]$Force = $false
)

Scaffold ScaffR.Repository.For $ModelType -Force:$Force
Scaffold ScaffR.Service.For $ModelType -Force:$Force