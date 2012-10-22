param($installPath, $toolsPath, $package)

# initialize the global variables
$global:baseProject = Get-Project
$global:namespace = $baseProject.Properties.Item("DefaultNamespace").Value
$global:rootNamespace = $namespace

if ($namespace.LastIndexOf('.') -gt 0){ 
	$global:rootNamespace = $namespace.Substring(0,$namespace.LastIndexOf('.'))
}

Import-Module (Join-Path $toolsPath "ProjectHelpers/ProjectHelpers.psm1")
Import-Module (Join-Path $toolsPath "ScaffoldingHelpers/ScaffoldingHelpers.psm1")
Import-Module (Join-Path $toolsPath "XmlHelpers/XmlHelpers.psm1")


