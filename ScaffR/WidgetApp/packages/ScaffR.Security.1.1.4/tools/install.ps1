param($installPath, $toolsPath, $package, $project)

get-project $coreProjectName | with-reference 'System.IdentityModel,System.IdentityModel.Services,System.Web.Mvc'

get-project $serviceProjectName | with-reference 'System.IdentityModel,System.IdentityModel.Services,System.Web'

get-project | with-reference 'System.IdentityModel,System.IdentityModel.Services'

scaffold scaffr.security