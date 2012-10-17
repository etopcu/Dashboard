param($installPath, $toolsPath, $package, $project)

install-package Ninject -Project $infrastructureProjectName

get-project $infrastructureProjectName | With-Reference "System.Web.Http,System.Web"

Scaffold ScaffR.Ninject